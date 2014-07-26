
// --------------------------------------------------------------------------------------------------------------------
// VISUALIZER GRAPH
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.newUID = function() {
  var me = Visualizer.prototype;
  var self = this;

  if (self._uid == undefined)
      self._uid = 0;

  return "UID" + self._uid++;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.newSnapshot = function(id) {
  var me = Visualizer.prototype;
  var self = this;

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
    , references: {}                    //A mapping of the simple short integer id to a UID
    , plumbing: {}                      //A mapping of UIDs 'from' one object 'to' another object
    , coordinates: {}                   //Maps object's UID to {x,y} coordinates

    //RENDER-TEMPLATE-DATA
    , stackHtml: ""
    , heapHtml: ""
    , html: ""

    //DEBUG INFO
    , traceInfo: ""
    , stackInfo: ""
    , heapInfo: ""
    , layoutInfo: ""
    , referencesInfo: ""
    , plumbingInfo: ""
    , coordinateInfo: ""

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
      id: id || 0                     //frame id -> derived from the trace data
    , sid: sid || 0                   //snapshot id
    , uid: self.newUID()              //unique id
    , gid: ""                         //global id -> id remains the same for the same object across snapshots

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

    //RENDER-TEMPLATE-DATA
    , text: ""
    , html: ""

    //UI DRAW/LAYOUT DATA
    , draw: {
          uid: self.newUID()
        , position: { x:0, y:0, z:0 }
        , offset: {x:0, y:0}
        , width: 0
        , height: 0
      }

    //DEBUG INFO
    , layoutInfo: ""

  };

  return frame;
};

// --------------------------------------------------------------------------------------------------------------------
// NODE TYPES
// --------------------------------------------------------------------------------------------------------------------

NodeLocationTypeEnum = {
    UNDEFINED: "UNDEFINED"
  , STACK: "STACK"
  , HEAP: "HEAP"
};

// --------------------------------------------------------------------------------------------------------------------

NodeTypeEnum = {
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
// NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.newNode = function(id,sid) {
  var me = Visualizer.prototype;
  var self = this;

  var node = {
      id: id || 0                     //id -> derived from the trace data
    , sid: sid || 0                   //snapshot id
    , uid: self.newUID()              //unique id
    , gid: ''                         //global id -> id remains the same for the same object across snapshots

    //CORE
    , type: NodeTypeEnum.NONE
    , name: ''
    , inherits: []                //todo: should change this to: "parents" so that it implies both "inherits" and "instanceof"
    , value: []
    , pointer: []
    , pointerUID: []

    //RENDER-TEMPLATE-DATA
    , location: NodeLocationTypeEnum.UNDEFINED
    , text: ""
    , html: ""

    //UI DRAW/LAYOUT DATA
    , draw: {
        uid: self.newUID()
      , position: {x:0, y:0, z:0}
      , offset: {x:0, y:0}
      , width: 0
      , height: 0

      , updateProperties: function() { me.setDrawProperties(node); } //Visualizer.Renderer.js
      , log: function() { me.logDrawProperties(node); } //Visualizer.Renderer.js
    }

    //DEBUG INFO
    , layoutInfo: ""

  };

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
