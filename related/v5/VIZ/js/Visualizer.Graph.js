
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.newUID = function() { var self = this;
  if (self._uid == undefined)
      self._uid = 0;

  return "UID" + self._uid++;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.newSnapshot = function(id) { var self = this; var me = Visualizer.prototype;
  var snapshot = {
      id: id || 0

    //CORE
    , stack: []
    , heap: []
    , layout: []

    //META-DATA
    , meta: {
        line: -1
      , event: "UNDEFINED"
      , func_name: "UNDEFINED"
      , stdout: "UNDEFINED"
    }

    //REGISTRY
    , references: {}                    //Maps the simple short integer id to UIDs
    , plumbing: {}                      //Maps UIDs 'from' one object 'to' another object
    , coordinates: {}                   //Maps UIDs to {x,y} coordinates

    //RENDER FUNCTIONS
    , render: {
          stackInfo: function(TB)   { return snapshot.stackInfo = me.renderStackAsText(snapshot.stack, TB || "");  } //Visualizer.RenderText.js
        , heapInfo: function(TB)    { return snapshot.heapInfo = me.renderHeapAsText(snapshot.heap, TB || "");     } //Visualizer.RenderText.js
        , layoutInfo: function(TB)  { return snapshot.layoutInfo = me.extractLayoutInfo(snapshot, TB || "" );      } //Visualizer.DebugInfo.js

        , stackHtml: function(TB)   { return snapshot.stackHtml = me.renderStackAsHtml(snapshot.stack, TB || "");  } //Visualizer.RenderHtml.js
        , heapHtml: function(TB)    { return snapshot.heapHtml = me.renderHeapAsHtml(snapshot.heap, TB || "");     } //Visualizer.RenderHtml.js
      }

    //DEBUG INFO
    , traceInfo: ""
    , stackInfo: ""
    , heapInfo: ""
    , layoutInfo: ""
    , referencesInfo: ""
    , plumbingInfo: ""
    , coordinateInfo: ""

    //PRE-RENDERED OUTPUT
    , stackHtml: ""
    , heapHtml: ""
    , html: ""
  };

  return snapshot;
};

// --------------------------------------------------------------------------------------------------------------------
// STACK FRAME
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.newFrame = function(id,sid) { var self = this; var me = Visualizer.prototype;

  var frame = {
      id: id || 0                     //frame id -> derived from the trace
    , sid: sid || 0                   //snapshot id
    , uid: self.newUID()              //unique id
    , gid: ""                         //global id -> each object registers it's hash in a global registry. All "similarly hashed" objects get the same gid
    , hashCode: function() { return me.getFrameHashCode(frame); } //Visualizer.Graph.js

    //CORE
    , name: ""
    , locals: []

    //META-DATA
    , meta: {
          is_highlighted: false
        , is_parent: false
        , func_name: ""
        , is_zombie: false
        , parent_frame_id_list: []
        , unique_hash: ""
      }

    //RENDER FUNCTIONS
    , render: {
          text: function(TB) { return frame.text = me.renderFrameAsText(frame, TB || ""); } //Visualizer.RenderText.js
        , html: function(TB) { return frame.html = me.renderFrameAsHtml(frame, TB || ""); } //Visualizer.RenderHtml.js

        , layoutInfo: function(TB)  { return frame.layoutInfo = me.extractFrameLayoutInfo(frame, TB || "" ); } //Visualizer.DebugInfo.js
      }

    //UI DRAW/LAYOUT DATA
    , draw: {
          uid: self.newUID()
        , position: { x:0, y:0, z:0 }
        , offset: {x:0, y:0}
        , width: 0
        , height: 0

        , updateProperties: function() { me.setDrawProperties(frame); } //Visualizer.Graph.js
        , log: function() { me.logDrawProperties(frame); } //Visualizer.Graph.js
      }

    //DEBUG INFO
    , layoutInfo: ""

    //PRE-RENDERED OUTPUT
    , text: ""
    , html: ""
  };

  return frame;
};

// --------------------------------------------------------------------------------------------------------------------
// NODE TYPES //
// --------------------------------------------------------------------------------------------------------------------

var NodeLocationTypeEnum = {
    UNDEFINED: "UNDEFINED"
  , STACK: "STACK"
  , HEAP: "HEAP"
};

var NodeTypeEnum = {
    NONE:"<NONE>"
  , UNKNOWN: "<UNKNOWN>"

  , PRIMITIVE:"PRIMITIVE"
  , ARRAY:"ARRAY"
  , LIST:"LIST"
  , TUPLE:"TUPLE"
  , SET: "SET"
  , DICT: "DICT"
  , FUNCTION: "FUNCTION"
  , CLASS:"CLASS"
  , INSTANCE: "INSTANCE"
  , POINTER:"REF"
};

// --------------------------------------------------------------------------------------------------------------------
// NODE //
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.newNode = function(id,sid) { var self = this, me = Visualizer.prototype;

  var node = {
      id: id || 0
    , sid: sid || 0                   //snapshot id
    , uid: self.newUID()
    , gid: ""                         //global id -> each object registers it's hash in a global registry. All objects with the same hash get the same gid
    , hashCode: function() { return me.getNodeHashCode(node); } //Visualizer.Graph.js

    //CORE
    , type: NodeTypeEnum.NONE
    , name: ""
    , inherits: []                //todo: should change this to: "parents" so that it implies both "inherits" and "instanceof"
    , value: []
    , pointer: []
    , pointerUID: []

    //RENDER FUNCTIONS
    , render: {
        location: NodeLocationTypeEnum.UNDEFINED

      , text: function(TB) { return node.text = me.renderNodeAsText(node, TB || ""); } //Visualizer.RenderText.js
      , html: function(TB) { return node.html = self.renderNodeAsHtml(node, TB || ""); } //Visualizer.RenderHtml.js

      , layoutInfo: function(TB) { return node.layoutInfo = me.extractNodeLayoutInfo(node, TB || ""); } //Visualizer.DebugInfo.js
    }

    //UI DRAW/LAYOUT DATA
    , draw: {
        uid: self.newUID()
      , position: {x:0, y:0, z:0}
      , offset: {x:0, y:0}
      , width: 0
      , height: 0

      , updateProperties: function() { me.setDrawProperties(node); } //Visualizer.Graph.js
      , log: function() { me.logDrawProperties(node); } //Visualizer.Graph.js
    }

    //DEBUG INFO
    , layoutInfo: ""

    //PRE-RENDERED OUTPUT
    , text: ""
    , html: ""
  };

  return node;
};

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

Visualizer.prototype.getNodeHashCode = function(node) {

  var nodeStr =
          node.id +
          node.name +
          node.inherits.join() +
          value.join();

  return nodeStr.hashCode();
};

String.prototype.hashCode = function() {
  //http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/

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

Visualizer.prototype.logDrawProperties = function(obj) {
  var Br = "\n";
  console.log(
      "uid: " + obj.draw.uid + Br +
      "width: " + obj.draw.width + Br +
      "height: " + obj.draw.height + Br +
      "position.x: " + obj.draw.position.x + Br +
      "position.y: " + obj.draw.position.y + Br +
      "position.z: " + obj.draw.position.z + Br +
      "offset.x: " + obj.draw.offset.x + Br +
      "offset.y: " + obj.draw.offset.y + Br
  );
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.setDrawProperties = function (obj) { var self = this, me = Visualizer.prototype;
  if( me.isUndefined(obj) || me.isUndefined(obj.draw) ) {
    console.error("ERROR: setNodeProperties => undefined obj.");
    return;
  }

  var elem = $("#"+obj.draw.uid).parent(); //every object (frame or heap) has a parent div "toDomWrapper" which wraps it

  if( me.isUndefined(elem) )
    console.error("ERROR: setNodeProperties => undefined element.");

  if ( !elem.hasClass( "toDomWrapper" ) )
    console.error("ERROR: setNodeProperties => element does not have parent with class 'toDomWrapper'.");

  obj.draw.width = elem.width();
  obj.draw.height = elem.height();

  var pos = elem.position();
  var off = elem.offset();

  if( me.isUndefined(pos) || me.isUndefined(off) )
    console.warn("WARNING: setDrawProperties => position/offset undefined. uid: " + obj.draw.uid);

  obj.draw.position.x = pos.left;
  obj.draw.position.y = pos.top;
  obj.draw.offset.x = off.left;
  obj.draw.offset.y = off.top;

  if ( isNaN(pos.left) )
    console.warn("WARNING: setDrawProperties => position.left is NaN.");

  if ( isNaN(pos.top) )
    console.warn("WARNING: setDrawProperties => position.top is NaN.");

  if ( isNaN(off.left) )
    console.warn("WARNING: setDrawProperties => offset.left is NaN.");

  if ( isNaN(off.top) )
    console.warn("WARNING: setDrawProperties => offset.top is NaN.");
};

// --------------------------------------------------------------------------------------------------------------------
// END
// --------------------------------------------------------------------------------------------------------------------
