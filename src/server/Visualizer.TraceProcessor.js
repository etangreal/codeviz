
// --------------------------------------------------------------------------------------------------------------------
// PROCESS TRACE (main function)
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.processTrace = function(trace, code) { 
  var me = Visualizer.prototype;
  var self = this;

  self.clearSnapshots();
  self.clearTrace();
  self.clearCode();

  if ( !self.setTrace(trace) || !self.setCode(code) ) {
    console.error("ERROR: processTrace => could not process trace. Invalid trace/code.");
    return;
  }

  // ------------------------------------------------------------------------------------------------------------------

  var snapshots = self.getSnapshots();

  _.each(trace, function(entry, i, list) {

    var snapshot = self.newSnapshot(i);
    var stack = snapshot.stack;

    // TRACE
    snapshot.traceInfo  = self.extractTraceInfo( entry, i );           //extract the trace debug info on the current trace entry
    snapshot.meta = self.extractSnapshotMeta( entry );                 //snapshot <- meta data

    // STACK
    stack.push( self.extractGlobalFrame( entry, i ) );                 //stack <- global frame
    snapshot.stack = stack.concat( self.processStack( entry, i ) );    //stack <- stack frames
    //self.extractStackInfo(snapshot);                                   //extract the stack debug info of the current snapshot

    // HEAP
    snapshot.heap  = self.processHeap( entry, i );                     //heap <- all heap objects
    //self.extractHeapInfo(snapshot);                                    //extract the heap debug info of the current snapshot

    // REFERENCES
    me.registerSnapshotReferences( snapshot );                         //populate the references registry
    self.extractReferencesInfo( snapshot );                            //extract the debug info of the references

    // PLUMBING
    me.registerSnapshotPlumbing( snapshot );                           //populate the plumbing registry (used to draw the references)
    self.extractPlumbingInfo( snapshot );                              //extract the debug info of the plumbing registry

    // RENDER
    self.prerender( snapshot );                                         //pre-renders: stack & frame -> text & html

    // LAYOUT 
    // calculate the layout
    // snapshot.layoutInfo = me.extractLayoutInfo(snapshot);

    // PUSH
    snapshots.push( snapshot );

  });// _.each(trace ...

};//processTrace

// --------------------------------------------------------------------------------------------------------------------
// PROCESS | SNAPSHOT META-DATA
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.extractSnapshotMeta = function(traceEntry) {
  return {
         line: traceEntry.line,
        event: traceEntry.event,
    func_name: traceEntry.func_name,
       stdout: traceEntry.stdout
  }
};

// --------------------------------------------------------------------------------------------------------------------
// PROCESS | HEAP
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.processHeap = function(traceEntry,sid) {
  var me = Visualizer.prototype;
  var self = this;

  var heap = [];
      heap.push( self.emptyNode(0,sid) );    //#HACK -> just to have the node id values equivalent to the heap array index position.

  var heapToProcess = traceEntry.heap;

  for(var key in heapToProcess)
    if ( heapToProcess.hasOwnProperty(key) ) {

      var heapObj = heapToProcess[key];
      var node = self.newHeapNode(heapObj,key/*=>id*/,sid);

      heap.push( node );
    }

  return heap;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.recursivelyProcessNodeRefs = function(values) {
  var me = Visualizer.prototype;
  var self = this;

  var pointers = [];
  var pointerUIDs = [];

  if (values instanceof Array)

    values.forEach( function(value) {
      if ( self.isRefObj(value) ) {
        var uid = self.newUID();
        value.push(uid);                    //add the uid to the ref e.g: ["REF",2] -> ["REF",2,"UID101"]

        pointers.push( value[1] );
        pointerUIDs.push( uid );

      } else {
        var collected = self.recursivelyProcessNodeRefs(value);

        pointers = pointers.concat ( collected.pointers );
        pointerUIDs = pointerUIDs.concat( collected.pointerUIDs );
      }
    });

  return { 
       pointers: pointers,
    pointerUIDs: pointerUIDs
  };
};

// --------------------------------------------------------------------------------------------------------------------
// PROCESS | STACK FRAMES
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.extractGlobalFrame = function(traceEntry,sid) {
  var me = Visualizer.prototype;
  var self = this;

  var localsToProcess = traceEntry.globals;
  var order = traceEntry.ordered_globals;

  var frame        = self.newFrame();
      frame.id     = 0;
      frame.sid    = sid;
      frame.name   = "Global Frame";
      frame.locals = self.processFrameLocals(localsToProcess, order);
      frame.meta   = self.extractGlobalFrameMeta(traceEntry);

  return frame;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.extractGlobalFrameMeta = function(traceEntry) {

  var stack = traceEntry.stack_to_render;

  return {
          is_highlighted: (stack.length == 0), 
               is_parent: (stack.length > 1),
               func_name: "",
               is_zombie: false,
    parent_frame_id_list: [],
             unique_hash: ""                     //global_frame?
  }

};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.processStack = function(traceEntry,sid) {
  var me = Visualizer.prototype;
  var self = this;

  var frames = [];

  var stack = traceEntry.stack_to_render;

  for(var key in stack)
    if ( stack.hasOwnProperty(key) ) {

      var frameToProcess = stack[key];
      frames.push( self.processFrame(frameToProcess,sid) );

    }

  return frames;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.processFrame = function(frameToProcess,sid) {
  var me = Visualizer.prototype;
  var self = this;

  var order = frameToProcess.ordered_varnames;
  var localsToProcess = frameToProcess.encoded_locals;

  var id           = frameToProcess.frame_id;

  var frame        = self.newFrame(id,sid);
      frame.name   = frameToProcess.func_name;
      frame.locals = self.processFrameLocals(localsToProcess, order);
      frame.meta   = me.extractFrameMeta(frameToProcess);

  return frame;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.processFrameLocals = function(localsToProcess, order) {
  var me = Visualizer.prototype;
  var self = this;

  var nodes = [];

  for(var key in order)
    if ( order.hasOwnProperty( key ) &&
        localsToProcess.hasOwnProperty( order[key] ) ){

      var nodeInfo = localsToProcess[order[key]];
      var id = key;
      var name = order[key];

      var node = self.newFrameNode(nodeInfo, id, name);

      nodes.push( node );
    }

  return nodes;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.extractFrameMeta = function(frame) {
  return {
      is_highlighted: frame.is_highlighted,
           is_parent: frame.is_parent,
           func_name: frame.func_name,
           is_zombie: frame.is_zombie,
parent_frame_id_list: frame.parent_frame_id_list,
         unique_hash: frame.unique_hash
  };
};

// --------------------------------------------------------------------------------------------------------------------
// CREATE REGISTRY | SNAPSHOT REFERENCES ( A mapping of the short integer id => to a UID | for each object in the snapshot )
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.registerSnapshotReferences = function(snapshot) {
  var me = Visualizer.prototype;
  var self = this;

  if (snapshot == undefined || snapshot.heap == undefined) {
    console.error("ERROR: undefined snapshot/stack.");
    return;
  }

  snapshot.references = {};
  var references = snapshot.references;

  snapshot.heap.forEach( function(obj) {
    if (obj.type == NodeTypeEnum.NONE || obj.type == NodeTypeEnum.UNKNOWN)
      return;

    if ( !(obj.id in references) )
      references[obj.id] = obj.uid;
    else
      console.error("ERROR: registerSnapshotReferences => class '" + obj.id + "' already exists in the references dictionary");

    if ( obj.type == NodeTypeEnum.CLASS )
      if ( !(obj.name in references) )
        references[obj.name] = obj.uid;
      else
        console.error("ERROR: registerSnapshotReferences => class '" + obj.name + "' already exists in the references dictionary");
  });

  me.extractReferencesInfo( snapshot );
};

// --------------------------------------------------------------------------------------------------------------------
// CREATE REGISTRY | SNAPSHOT PLUMBING ( A mapping of UIDs 'from' one object 'to' another object )
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.registerSnapshotPlumbing = function(snapshot) {
  var me = Visualizer.prototype;
  var self = this;

  if (snapshot == undefined || snapshot.stack == undefined || snapshot.heap == undefined) {
    console.error("ERROR: doPlumbing => undefined snapshot/heap/stack.");
    return;
  }

  snapshot.plumbing = {};

  var plumbing = snapshot.plumbing;
  var references = snapshot.references;
  var stack = snapshot.stack;
  var heap = snapshot.heap;

  // -------------------------------------------------------------------------------------------------------------------
  // STACK
  // -------------------------------------------------------------------------------------------------------------------

  stack.forEach( function(frame) {
    frame.locals.forEach( function(node) {
      if (node.type == undefined || node.type == NodeTypeEnum.NONE || node.type == NodeTypeEnum.UNKNOWN) {
        console.warn("WARNING: registerSnapshotPlumbing => node with node.type undefined/NONE/UNKNOWN detected on stack.");
        return;
      }

      me.registerNodePointerPlumbing(node, references, plumbing);
    });//locals
  });//frame

  // -------------------------------------------------------------------------------------------------------------------
  // HEAP
  // -------------------------------------------------------------------------------------------------------------------

  heap.forEach( function(obj) {
    if (obj.type == undefined || obj.type == NodeTypeEnum.NONE || obj.type == NodeTypeEnum.UNKNOWN) {
      if(obj.id != 0)//#HACK: Not cool, I know. I put one "EMPTY" node on the heap because the nodes in the heap trace's IDs starts from 1.
        console.warn("WARNING: registerSnapshotPlumbing => node with node.type undefined/NONE/UNKNOWN detected on heap.");
      return;
    }

    me.registerNodePointerPlumbing(obj, references, plumbing);
    me.registerNodeInheritsPlumbing(obj, references, plumbing);
  });//heap

  // -------------------------------------------------------------------------------------------------------------------
  // EXTRACT PLUMBING DEBUG-INFO
  // -------------------------------------------------------------------------------------------------------------------

  me.extractPlumbingInfo( snapshot );

};//registerSnapshotPlumbing

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.registerNodePointerPlumbing = function(node, references, plumbing) {
  var me = Visualizer.prototype;
  var self = this;

  if (node.pointer == undefined || node.pointerUID == undefined || references == undefined || plumbing == undefined) {
    console.error("ERROR: registerNodePlumbingReferences => undefined pointers/references/plumbing");
    return;
  }

  var pointers = node.pointer;
  var pointerUIDs = node.pointerUID;

  pointers.forEach( function(ptr,i) {
    if (ptr in references) {
      var from = pointerUIDs[i];
      var to = references[ptr];

      self.addReferenceToPlumbing(from,to,plumbing);
    }

    //else: if (ptr not in references)
    else {
      console.error("ERROR: registerNodePointersToPlumbing => could not find reference. ptr:" + ptr + " i:" + i);
      console.log(ptr);
    }
  });//pointer

};

// --------------------------------------------------------------------------------------------------------------------
// CREATE REGISTRY | PLUMBING
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.registerNodeInheritsPlumbing = function(node, references, plumbing) {
  var me = Visualizer.prototype;
  var self = this;

  if (node.inherits == undefined || references == undefined || plumbing == undefined) {
    console.error("ERROR: registerNodePlumbingReferences => undefined pointers/references/plumbing");
    return;
  }

  var uid = node.uid;
  var inherits = node.inherits;

  inherits.forEach( function(ptr,i) {
    if (ptr in references) {
      var from = uid;
      var to = references[ptr];

      me.addReferenceToPlumbing(from,to,plumbing);
    }

    //else: if (ptr not in references)
    else {
      console.log(ptr);
      console.error("NOTE: registerNodeInheritsPlumbing => could not find reference.");
    }
  });//pointer
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.addReferenceToPlumbing = function (from, to, plumbing) {
  if (from == undefined || to == undefined || plumbing == undefined) {
    console.error("ERROR: addReferenceToPlumbing => undefined from/to/plumbing");
    return;
  }

  if (from in plumbing) {
    var entry = plumbing[from];

    if ( entry.indexOf(to) )
      console.error("ERROR: registerNodePointersToPlumbing => plumbing entry already contains reference uid.");

    entry.push( to );
  }

  //else: if ('from' not in plumbing) add new entry
  else
    plumbing[from] = [to];
};

// --------------------------------------------------------------------------------------------------------------------
// PROPERTY | SNAPSHOT
// --------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.clearSnapshots = function() { 
  var self = this;

  if (self._snapshots == undefined)
    self._snapshots = []

  self._snapshots.length = 0;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getSnapshots = function() { 
  var self = this;

  if (self._snapshots == undefined)
    self._snapshots = []

  return self._snapshots;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getSnapshot = function(i) { 
  var self = this;

  if ( !self.isValidSnapshotIndex(i) )
    return undefined;

  return self._snapshots[i];
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getSnapshotsCount = function() { 
  var self = this;
  return self.getSnapshots().length;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isValidSnapshotIndex = function(i) {
  var me = Visualizer.prototype;
  var self = this;

  if ( i == undefined || i == null || !me.isNumber(i) ) {
    console.error("ERROR: isValidSnapshotIndex => index is not a number.");
    return false;
  }

  var length = self.getSnapshotsCount();
  
  if (length <= 0) {
    console.error("ERROR: isValidSnapshotIndex => There are no snapshots, therefor no valid index exists");
    return false;
  }

  var isValidIndex = ( i >= 0 && i < length)

  if (!isValidIndex) {
    console.error("ERROR: isValidSnapshotIndex => Invalid index requested.");
  }

  return isValidIndex;
};

// --------------------------------------------------------------------------------------------------------------------
// PROPERTY | TRACE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.clearTrace = function() { 
  var self = this;
  self._trace = '';
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.setTrace = function(trace) { 
  var self = this;

  if (trace == undefined) {
    console.error("ERROR: setTrace => trace is undefined.");
    return false;
  }

  self._trace = trace;
  return true;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getTrace = function() { 
  var self = this;

  if (self._trace == undefined) {
    console.error("ERROR: getTrace => Trace is undefined.");
    self._trace = [];
  }

  return self._trace;
};

// --------------------------------------------------------------------------------------------------------------------
// PROPERTY | CODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.clearCode = function() { 
  var self = this;
  self._code = '';
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.setCode = function(code) { 
  var me = Visualizer.prototype;
  var self = this;

  // code = code.trim() //don't do this ... since the trace matches the code line for line

  if ( code == undefined || !me.isString(code) || code.trim() == '' ) {
    console.error("ERROR: setCode => code is undefined/invalid.");
    return false;
  }

  self._code = code;
  return true;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getCode = function() {
  var me = Visualizer.prototype;
  var self = this;

  if (self._code == undefined) {
    console.warn("WARN: getTrace => Code was undefined.");
    self._code = '';
  }

  return self._code;
};

// --------------------------------------------------------------------------------------------------------------------
// CREATE NODE | FRAME (STACK)
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.newFrameNode = function(nodeInfo, id, name) {
  var me = Visualizer.prototype;
  var self = this;

  var node = self.newNode( id );
      node.location = NodeLocationTypeEnum.STACK;
      node.name = name;

  if ( me.isRefObj( nodeInfo ) ) {
    var uid = self.newUID();
    nodeInfo.push(uid);               //add the uid to the ref e.g: ["REF",2] -> ["REF",2,"UID101"]

    node.type = NodeTypeEnum.POINTER;
    node.value.push( nodeInfo );
    node.pointer.push( nodeInfo[1] );
    node.pointerUID.push( uid );

  } else {
    node.type = NodeTypeEnum.PRIMITIVE;
    node.value = nodeInfo;
  }

  return node;
};

// --------------------------------------------------------------------------------------------------------------------
// CREATE NODE | HEAP
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.newHeapNode = function( heapObj, id, sid ) {
  var me = Visualizer.prototype;
  var self = this;

  if ( heapObj == undefined || !me.isArray(heapObj) )
    console.error("ERROR: newHeapNode => invalid heapObj.");

  if ( self.isRefObj(heapObj) )                 //if the heap obj is a pointer (strange case, should actually not happen - just in case though)
    return self.refNode( node, heapObj );

  // ------------------------------------------------------------------------------------------------------------------
  
  var node = self.newNode( id, sid );
      node.type = heapObj[0];                 //the first element is always the type
      node.location = NodeLocationTypeEnum.HEAP;

  var values = [];
      _.extend(values, heapObj);  //true=>deep-copy
      values.shift();             //drop the first element

  var collected = self.recursivelyProcessNodeRefs(values);
      node.pointer = collected.pointers;
      node.pointerUID = collected.pointerUIDs;

  // ------------------------------------------------------------------------------------------------------------------

  if (node.type == NodeTypeEnum.FUNCTION)
    return self.funcNode(node,values);

  if (node.type == NodeTypeEnum.CLASS)
    return self.classNode(node,values);

  if (node.type == NodeTypeEnum.INSTANCE)
    return self.instanceNode(node,values);

  if(node.type == NodeTypeEnum.LIST)
    return self.listNode(node,values);

  if (node.type == NodeTypeEnum.TUPLE)
    return self.tupleNode(node,values);

  if (node.type == NodeTypeEnum.SET)
    return self.setNode(node,values);

  if (node.type == NodeTypeEnum.DICT)
    return self.dictNode(node,values);

  // ------------------------------------------------------------------------------------------------------------------

  return self.errorNode(node,values);

};//newHeapNode

// --------------------------------------------------------------------------------------------------------------------
// CREATE NODE | EMPTY
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.emptyNode = function(id,sid) { 
  var me = Visualizer.prototype;
  var self = this;
  
  var node = self.newNode( id, sid );
      node.type = NodeTypeEnum.NONE;

  return node;
};

// --------------------------------------------------------------------------------------------------------------------
// CREATE NODE | REFERENCE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.refNode = function( node, values ) {
  node.value = values;
  node.pointer = values[1];

  return node;
};

// --------------------------------------------------------------------------------------------------------------------
// CREATE NODE | FUNCTION
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.funcNode = function( node, values ) {
  node.name = values[0];
  values.shift();
  node.value = values;

  return node;
};

// --------------------------------------------------------------------------------------------------------------------
// CREATE NODE | CLASS
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.classNode = function( node, values ) { 
  var me = Visualizer.prototype;
  var self = this;

  node.name = values[0];
  values.shift();

  node.inherits = node.inherits.concat( values[0] );
  values.shift();

  node.value = values;

  return node;
};

// --------------------------------------------------------------------------------------------------------------------
// CREATE NEW NODES | INSTANCE NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.instanceNode = function( node, values ) {
  var me = Visualizer.prototype;
  var self = this;

  node.inherits = node.inherits.concat( values[0] );
  values.shift();

  node.value = values;

  return node;
};

// --------------------------------------------------------------------------------------------------------------------
// CREATE NODE | LIST
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.listNode = function( node, values ) {
  node.value = values;

  return node;
};

// --------------------------------------------------------------------------------------------------------------------
// CREATE NODE | TUPLE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.tupleNode = function( node, values ) {
  node.value = values;

  return node;
};

// --------------------------------------------------------------------------------------------------------------------
// CREATE NODE | SET
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.setNode = function( node, values ) {
  node.value = values;

  return node;
};

// --------------------------------------------------------------------------------------------------------------------
// CREATE NODE | DICTIONARY
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.dictNode = function( node, values ) {
  node.value = values;

  return node;
};

// --------------------------------------------------------------------------------------------------------------------
// CREATE NODE | ERROR
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.errorNode = function( node, values ) {
  console.error("ERROR: errorNode => Unknown Type.");
  node.name = NodeTypeEnum.UNKNOWN;
  node.value = values;

  return node;
};

// --------------------------------------------------------------------------------------------------------------------
// FUNCTIONS | HELPERS
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getRefUID = function(obj) {
  var me = Visualizer.prototype;
  var self = this;

  if ( !me.isRefObj(obj) ) {
    console.error("ERROR: getRefUID => expected obj of type 'RefObj'");
    return "";
  }

  if ( !(obj.length == 3) ) {
    console.error("ERROR: getRef => obj does not have a UID");
    return "";
  }

  return obj[2];
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isUID = function(value) {
  var me = Visualizer.prototype;
  var self = this;

  if ( !me.isString(value) )
    return false;

  var re = /UID[0-9]+/;
  return re.test( value );
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isRefObj = function(obj) {
  var me = Visualizer.prototype;
  var self = this;

  var isArr = ( obj instanceof Array && (obj.length == 2 || obj.length == 3) );
  if (!isArr) return false;

  var isStr = typeof (obj[0]) === "string";
  if (!isStr) return false;

  if (NodeTypeEnum.POINTER != "REF")
    console.error("ERROR: expected NodeTypeEnum.POINTER == 'REF'");

  var isRef = ( (obj[0]).toUpperCase() == NodeTypeEnum.POINTER );
  var isVal = me.isNumber( obj[1] );

  if (isRef && !isVal)
    console.error("WARNING: isRefObj => isVal test failed on obj:{"+obj+"}");

  var isUID = (
      obj.length == 2 ||
          (obj.length == 3 && me.isUID( obj[2] ) )
      );

  if (isRef && isVal && !isUID) //just to keep an eye on the UID
    console.error("WARNING: isRefObj => isUID test failed on obj:{"+obj+"}");

  return (isRef && isVal && isUID);
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isArray = function(obj) {
  return (obj instanceof Array);
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isString = function(str) {
  return (typeof str === "string");
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isUndefined = function(obj) {
  return (typeof obj == 'undefined' || obj === void 0); // || obj === null ??
};

//http://flippinawesome.org/2013/12/09/exploring-the-abyss-of-null-and-undefined-in-javascript/
//function isUndefined(obj){
//  return obj === void 0;
//}

// --------------------------------------------------------------------------------------------------------------------
// END
// --------------------------------------------------------------------------------------------------------------------
