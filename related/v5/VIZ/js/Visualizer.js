
// --------------------------------------------------------------------------------------------------------------------
// INIT
// --------------------------------------------------------------------------------------------------------------------

function Visualizer(container, data, options) { var self = this; var me = Visualizer.prototype;
  options = options || {}; //todo: store/use options?

  self.init(container);
  self.setVisualizer(data, container, options);
}

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.init = function( container ) { var self = this; var me = Visualizer.prototype;
  self.initVisualizerCanvas( container );
  self.initVerbose( false );
  self.initSnapshot();

  //RenderHtml
  //self.initPlumber();

  //RenderGl
  self.initGlRenderer( container );

  //DebugInfo
  self.initTraceInfoTextArea();
  self.initStackInfoTextArea();
  self.initHeapInfoTextArea();
//self.getStackHtmlInfoTextArea();
//self.getHeapHtmlInfoTextArea();
//self.getLayoutInfoTextArea();
//self.getReferencesInfoTextArea();
};

// --------------------------------------------------------------------------------------------------------------------
// UI
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.updateUI = function(i) { var self = this; var me = Visualizer.prototype;
  if ( !self.isValidSnapshotIndex(i) )
    return;

  self.updateDebugInfoUI(i);
  self.setCurrentSnapshotNo(i);

  //var currSnapshot = self.getCurrentSnapshot();
  //var prevSnapshot = self.getPreviousSnapshot();
  //self.showHtml(currSnapshot, prevSnapshot);

  self.getGlRenderer().showScene(i);
};

// --- Visualizer Canvas ----------------------------------------------------------------------------------------------

Visualizer.prototype.initVisualizerCanvas = function(canvas) { var self = this;
  if (self._visualizerCanvas != undefined) {
    console.error("ERROR: initVisualizerCanvas => already initialized.");
    return false;
  }

  if ( !self.isValidCanvas(canvas) )
    return false;

  self._visualizerCanvas = canvas;
  return true;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getVisualizerCanvas = function() { var self = this;
  if ( !self.isValidCanvas(self._visualizerCanvas) )
    return undefined;

  return self._visualizerCanvas;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.setVisualizerCanvas = function(canvas) { var self = this;
  if ( !self.isValidCanvas(canvas) )
    return false;

  self._visualizerCanvas = canvas;
  return true;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isValidCanvas = function(canvas) {
  if (canvas == undefined) {
    console.error("ERROR: isValidCanvas => canvas undefined.");
    return false;
  }

  if ( !canvas.is("div") ) {
    console.error("ERROR: canvas is not a 'div' element.");
    return false;
  }

  return true;
};

// --- Visualizer -----------------------------------------------------------------------------------------------------

Visualizer.prototype.setVisualizer = function(data,container,options) { var self = this;
  container = container || self.getVisualizerCanvas();
  options = options || {};

  self.setVisualizerCanvas(container);
  self.updateTrace(data);

  var snapshots = self.getSnapshots();

  //self.renderHtml(snapshots,container);
  self.getGlRenderer().prerenderGL( snapshots );
};

// --------------------------------------------------------------------------------------------------------------------
// PROPERTIES
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.initVerbose = function(isVerbose) { var self = this; var me = Visualizer.prototype;
  if (self._verbose != undefined) {
    console.error("ERROR: initVerbose => was already defined!");
    return false;
  }

  self._verbose = isVerbose || false;
  return true;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isVerbose = function() { var self = this; var me = Visualizer.prototype;
  if (self._verbose == undefined) {
    console.error("ERROR: isVerbose was not defined!");
    self.initVerbose();
  }

  return self._verbose;
};

// --------------------------------------------------------------------------------------------------------------------

// --- Snapshots ------------------------------------------------------------------------------------------------------

Visualizer.prototype.initSnapshot = function() { var self = this; var me = Visualizer.prototype;
  if (self._snapshots != undefined) {
    console.error("ERROR: initSnapshot => was already defined!");
    return false;
  }

  self._snapshots = [];
  return true;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getSnapshots = function() { var self = this; var me = Visualizer.prototype;
  if (self._snapshots == undefined) {
    console.error("ERROR: getSnapshots => was not defined.");
    self.initSnapshot();
  }

  return self._snapshots;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getSnapshot = function(i) { var self = this, me = Visualizer.prototype;
  if ( !self.isValidSnapshotIndex(i) || i < 0 )
    return undefined;

  return self._snapshots[i];
};

// --------------------------------------------------------------------------------------------------------------------
// snapshot state: current & previous (NOTE: "previously displayed snapshot No")

Visualizer.prototype.setCurrentSnapshotNo = function(i) { var self = this, me = Visualizer.prototype;
  self._previousSnapshotIndex = self._currentSnapshotIndex || -1;
  self._currentSnapshotIndex = self.getValidSnapshotIndex(i);
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getCurrentSnapshotNo = function() { var self = this; var me = Visualizer.prototype;
  if (self._currentSnapshotIndex == undefined) {
    console.error("ERROR: getCurrentLine => getCurrentLine was undefined.");
    self._currentSnapshotIndex = 0;
  }

  return self.getValidSnapshotIndex(self._currentSnapshotIndex);
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getPreviousSnapshotNo = function() { var self = this, me = Visualizer.prototype;
  if (self._previousSnapshotIndex == undefined) {
    console.warn("WARN: getPreviousSnapshotNo => _previousSnapshotIndex was undefined.");
    self._previousSnapshotIndex = -1;
  }

  return self.getValidSnapshotIndex(self._previousSnapshotIndex);
};

// --------------------------------------------------------------------------------------------------------------------
// snapshot shortcuts: current & previous ("previously displayed snapshot")
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getCurrentSnapshot = function() { var self = this, me = Visualizer.prototype;
  var i = self.getCurrentSnapshotNo();
  return self.getSnapshot(i);
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getPreviousSnapshot = function() { var self = this, me = Visualizer.prototype;
  var i = self.getPreviousSnapshotNo();
  return self.getSnapshot(i);
};

// --------------------------------------------------------------------------------------------------------------------
// snapshot helpers
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getSnapshotsCount = function() { var self = this; var me = Visualizer.prototype;
  return self.getSnapshots().length;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.clearSnapshots = function() { var self = this;
  if (self._snapshots == undefined) {
    console.error("ERROR: clearSnapshots => snapshots undefined");
    self.initSnapshot();
  }

  self._snapshots.length = 0; //ToDo: make sure this is valid! Could cause memory leaks?
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getValidSnapshotIndex = function(i) { var self = this; var me = Visualizer.prototype;
  if ( i == undefined || i == null || !me.isNumber(i) ) {
    console.error("ERROR: getValidSnapshotIndex => index is not a number.");
    i = 0;
  }

  var length = self.getSnapshotsCount();

  if (length == 0) {
    console.error("WARNING: getValidSnapshotIndex => there are currently no snapshots.");
    return -1;
  }

  if (i < -1) {
    console.error("ERROR: getValidSnapshotIndex => index less than -1, i:" + i);
    i = -1;
  }

  if (i >= length) {
    i = length-1;
    console.error("ERROR: getValidSnapshotIndex => index: larger than snapshot's. returning: ", i);
  }

  return i;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isValidSnapshotIndex = function(i) { var self = this; var me = Visualizer.prototype;
  if ( i == undefined || i == null || !me.isNumber(i) ) {
    console.error("ERROR: getValidSnapshotIndex => index is not a number.");
    return false;
  }

  var length = self.getSnapshotsCount();

  if (i >= -1 && i < length)
    return true;

  else {
    console.error("ERROR: Invalid Snapshot Index("+i+") requested. Snapshots Count: " + length);
    return false;
  }
};

// --------------------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.deepCopyObj = function(obj) {
  var clone;

  //clone = $.extend(true, {},obj);
  clone = JSON.parse( JSON.stringify(obj) );

  return clone;
};

String.prototype.rtrim = function() {
  return this.replace(/\s*$/g, "");
};

// --------------------------------------------------------------------------------------------------------------------
// END
// --------------------------------------------------------------------------------------------------------------------
