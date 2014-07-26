// --------------------------------------------------------------------------------------------------------------------
// PLUMBING (jsPlumb)
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.doPlumbing = function(snapshots) {
  var me = Visualizer.prototype;
  var self = this;

  jsPlumb.ready(function() {

    snapshots.forEach(function(snapshot) {
      self.doPlumbingForSnapshot(snapshot);
    });

  });//ready

};//doPlumbing

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.doPlumbingForSnapshot = function(snapshot) {
  var me = Visualizer.prototype;
  var self = this;

  jsPlumb.ready(function() {

    var plumbing = snapshot.plumbing;

    for (var key in plumbing)
      if (plumbing.hasOwnProperty(key) ) {
        var from = key;
        var tos = plumbing[key];

        tos.forEach( function(to) {
          self.connectPlumbing(from,to);
        });
      }

  });//ready

};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.connectPlumbing = function(from, to) {
  var me = Visualizer.prototype;
  var self = this;

  if (from == undefined || to == undefined) {
    console.error("ERROR: PlumbingConnection => from/to undefined.");
    return;
  }

  var plumber = self.getPlumber();
  var connector = self.getPlumbingConnector();
  var container = self.getVisualizerCanvas();

  plumber.connect({
      source: from
    , target: to
    , container: container
  } , connector );
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.initPlumber = function() {
  var me = Visualizer.prototype;
  var self = this;

  var brightRed = '#e93f34';
  var connectorBaseColor = '#005583';
  var connectorHighlightColor = brightRed;

  if (self._plumber !== undefined)
    console.error("ERROR: initPlumber => plumber is already defined!");

  self._plumber = jsPlumb.getInstance({
      Endpoint: [ "Dot", {radius:3} ]
    , EndpointStyles: [ {fillStyle: connectorBaseColor}, {fillstyle: null} /* make right endpoint invisible */ ]
    , Anchors: [ "RightMiddle", "LeftMiddle" ]
    , PaintStyle: { lineWidth:1, strokeStyle: connectorBaseColor }
    , Connector: [ "StateMachine" ]
    , Overlays: [
        [ "Arrow", { length: 10, width:7, foldback:0.55, location:1 } ]
    ]
    , EndpointHoverStyles: [ { fillStyle: connectorHighlightColor }, {fillstyle: null} /* make right endpoint invisible */ ]
    , HoverPaintStyle: { lineWidth: 1, strokeStyle: connectorHighlightColor }
  });

  jsPlumb.Defaults.Container = self.getVisualizerCanvas();

};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getPlumber = function() {
  var me = Visualizer.prototype;
  var self = this;

  if (self._plumber == undefined) {
    console.error("ERROR: getPlumber => plumber was not initialized.");
    self.initPlumber();
  }

  return self._plumber;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getPlumbingConnector = function() {
  var stateMachineConnector = {
    connector: "StateMachine"
    , paintStyle: { lineWidth:1, strokeStyle:"#056" }
    , hoverPaintStyle: { strokeStyle:"#dbe300" }
    , anchors: ["LeftMiddle", "LeftMiddle"]
    , endpoint: ["Dot", {radius: 4}]
    , anchor: "Continuous"

    , overlays:[ ["PlainArrow", {location:1, width:5, length:12} ]]
  };

  return stateMachineConnector;
};

// --------------------------------------------------------------------------------------------------------------------
// END
// --------------------------------------------------------------------------------------------------------------------
