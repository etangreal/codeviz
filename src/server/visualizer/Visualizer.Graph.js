
// --------------------------------------------------------------------------------------------------------------------
// VISUALIZER GRAPH
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.newUID = function() {
  var me = Visualizer.prototype;
  var self = this;

  if (self._uid == undefined)
      self._uid = 0;

  return 'UID' + self._uid++;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.newSnapshot = function(id) {
  var me = Visualizer.prototype;
  var self = this;

  var snapshot = {
    id: id || 0,                        //id: a.k.a -> sid (snapshot id) by its child nodes. 
                                        //id: is the numbered index of the snapshot in the list of snapshots

 docId: undefined,                      // each snapshot has a permanent unique document Id
   uid: self.newUID()                   // uid: unique id of this snapshot.
                                        //   Together docId & uid can be used by the client(i.e. browser) to keep track of which snapshots its seen. 
                                        //   Every time the snapshot is regenerated it will have the same docId but a new uid.

    //CORE
    , stack: []
    , heap: []
    , layout: []

    //META-DATA
    , meta: {
        line: -1
      , event: 'UNDEFINED'
      , func_name: 'UNDEFINED'
      , stdout: 'UNDEFINED'
    }

    //REGISTRY
    , references: {}                    //A mapping of the simple short integer id to a UID
    , plumbing: {}                      //A mapping of UIDs 'from' one object 'to' another object
    , coordinates: {}                   //Maps object's UID to {x,y} coordinates

    //UI DRAW/LAYOUT (client side only)
    , draw: {
        isInit: false
      , maxStackWidth: 0

      //Pointers
      , baseNode: undefined             // Pointer to the base Render node 
      , baseMod: undefined              // Pointer to the base Modifier 
      , stackNode: undefined            // Pointer to the stack's Render node
      , stackMod: undefined             // Pointer to the stack's Modifier
      , heapNode: undefined             // Pointer to the heap's Render node
      , heapMod: undefined              // Pointer to the heap's Modifier
    }

    //PRE-RENDERED (for debugging)
    , stackHtml: ''
    , heapHtml: ''
    , html: ''

    //DEBUG INFO
    , traceInfo: ''
    , stackInfo: ''
    , heapInfo: ''
    , layoutInfo: ''
    , referencesInfo: ''
    , plumbingInfo: ''
    , coordinateInfo: ''

  };//snapshot

  return snapshot;

};//newSnapshot

// --------------------------------------------------------------------------------------------------------------------
// STACK FRAME
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.newFrame = function(id,sid) {
  var me = Visualizer.prototype;
  var self = this;

  var frame = {
      id: id || 0                     //   frame id -> derived from the trace data
    , sid: sid || 0                   //snapshot id
    , uid: self.newUID()              //  unique id
    , gid: ''                         //  global id -> id remains the same for the same object across snapshots

    //CORE
    , name: ''
    , locals: []

    //META-DATA
    , meta: {
          is_highlighted: false
        , is_parent: false
        , func_name: ''
        , is_zombie: false
        , parent_frame_id_list: []
        , unique_hash: ''
      }

    //PRE-RENDERED TEXT & HTML
    , text: ''
    , html: ''

    // ----------------------------------------------------------------------------------------------------------------

    //Pointers (client side only)
    , parent: undefined               //added during rendering. Pointer to the node 'above' in the render tree
    , snapshot: undefined             //added during rendering. Pointer to the snapshot this node belongs to

    //UI DRAW/LAYOUT DATA (client side only)
    , draw: {
          uid: self.newUID()                
                                                // SEE: api.jquery.com/offset
        , position: { x:0, y:0, z:0 }           //  current position relative to the offset parent
        , offset: { x:0, y:0 }                  //  current position of an element relative to the document
        , width: 0
        , height: 0
        , location: NodeLocationTypeEnum.STACK

        // Draw Objects (future pointers)
        , modifier: undefined           //famous.core.modifier (for current node position)
        , surface: undefined            //famous.core.Surface

        // Draw Function (future pointers)
        , show: undefined
        , move: undefined
        , log: undefined
        , cleanup: undefined

        , onDeploy: undefined
        , subsribeToOnDeploy: undefined
        , unsubscribeFromOnDeploy: undefined
      }

      // --------------------------------------------------------------------------------------------------------------

    //DEBUG INFO
    , layoutInfo: ''

  };//frame

  return frame;
};

// --------------------------------------------------------------------------------------------------------------------
// NODE LOCATION TYPE ENUM
// --------------------------------------------------------------------------------------------------------------------

  // NodeLocationTypeEnum
  //  SEE: codeViz/src/common/enum.js

// --------------------------------------------------------------------------------------------------------------------
// NODE TYPE ENUM
// --------------------------------------------------------------------------------------------------------------------

  // NodeTypeEnum
  //  SEE: codeViz/src/common/enum.js

// --------------------------------------------------------------------------------------------------------------------
// NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.newNode = function(id,sid) {
  var me = Visualizer.prototype;
  var self = this;

  var node = {
       id: id || 0                    //id -> derived from the trace data
    , sid: sid || 0                   //snapshot id
    , uid: self.newUID()              //unique id
    , gid: ''                         //global id -> id remains the same for the same object across snapshots

    //CORE
    , name: ''
    , inherits: []                    //todo: should change this to: "parents" so that it implies both "inherits" and "instanceof"
    , value: []
    , pointer: []
    , pointerUID: []

    //PRE-RENDERED TEXT & HTML
    , text: ''
    , html: ''

    // ----------------------------------------------------------------------------------------------------------------

    //Pointers (client side only)
    , parent: undefined               //added during rendering. Pointer to the node 'above' in the render tree
    , snapshot: undefined             //added during rendering. Pointer to the snapshot this node belongs to

    //UI DRAW/LAYOUT DATA (client side only)
    , draw: {
        uid: self.newUID()
      , location: NodeLocationTypeEnum.HEAP
                                      // SEE: api.jquery.com/offset
      , position: { x:0, y:0, z:0 }   //  current position relative to the offset parent
      , offset: { x:0, y:0 }          //  current position of an element relative to the root parent
      , width: 0
      , height: 0

      // Draw Objects (future pointers)
      , modifier: undefined           //famous.core.modifier (for current node position)
      , surface: undefined            //famous.core.Surface

      // Draw Function (future pointers)
      , show: undefined
      , move: undefined
      , log: undefined
      , cleanup: undefined

      , onDeploy: undefined
      , subsribeToOnDeploy: undefined
      , unsubscribeFromOnDeploy: undefined
    }

    // ----------------------------------------------------------------------------------------------------------------

    //DEBUG INFO
    , layoutInfo: ''

  };//node

  return node;
};

// --------------------------------------------------------------------------------------------------------------------
// HASH FUNCTIONS (unused)
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getFrameHashCode = function(frame) {

  var metaStr =
      frame.meta.is_highlighted +
          frame.meta.is_parent +
          frame.meta.func_name +
          frame.meta.is_zombie +
          frame.meta.parent_frame_id_list.join() +
          frame.meta.unique_hash;

  var frameStr =
      frame.id +
          frame.name +
          frame.locals.join() +
          metaStr;

  return frameStr.hashCode();
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getNodeHashCode = function(node) {

  var nodeStr =
          node.id +
          node.name +
          node.inherits.join() +
          value.join();

  return nodeStr.hashCode();
};

// --------------------------------------------------------------------------------------------------------------------

String.prototype.hashCode = function() {
  // werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method

  var hash = 0, char;
  if (this.length == 0) return hash;

  for (var i = 0, l = this.length; i < l; i++) {
    char  = this.charCodeAt(i);
    hash  = ((hash<<5)-hash)+char;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
};

// --------------------------------------------------------------------------------------------------------------------
// END
// --------------------------------------------------------------------------------------------------------------------
