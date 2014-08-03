
// --------------------------------------------------------------------------------------------------------------------
// VISUALIZER (CONSTRUCTOR)
// --------------------------------------------------------------------------------------------------------------------

Visualizer = function Visualizer() {
  var self = this;

  self.clearSnapshots();
  self.clearTrace();
  self.clearCode();
}

// --------------------------------------------------------------------------------------------------------------------
// EXTRACT | TRACE-INFO
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.extractTraceInfo = function(traceEntry, i) {
  var me = Visualizer.prototype;
  var self = this;

  var renderAsText = self.recursivelyRenderObjAsText;

  var traceInfo = "";
  var TABS = 2;

  traceInfo += "-------------------------------------------------------------\n";
  traceInfo += "Trace Entry: " + i + "\n\n";

  traceInfo += "\t{line}: " + traceEntry.line + "\n";
  traceInfo += "\t{event}: " + traceEntry.event + "\n";
  traceInfo += "\t{func_name}: " + traceEntry.func_name + "\n";
  traceInfo += "\t{stdout}: " + traceEntry.stdout + "\n";

  traceInfo += "\t{ordered_globals}: " + traceEntry.ordered_globals + "\n";
  traceInfo += renderAsText(traceEntry.ordered_globals, TABS);

  traceInfo += "\t{globals}: " + traceEntry.globals + "\n";
  traceInfo += renderAsText(traceEntry.globals, TABS);

  traceInfo += "\t{heap}: " + traceEntry.heap + "\n";
  traceInfo += renderAsText(traceEntry.heap, TABS);

  traceInfo += "\t{stack_to_render}: " + traceEntry.stack_to_render + "\n";
  traceInfo += renderAsText(traceEntry.stack_to_render, TABS);
  traceInfo += "\n-------------------------------------------------------------\n";

  return traceInfo;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.recursivelyRenderObjAsText = function (obj, tabCount) {

  tabCount = tabCount || 0;
  var getTabs = Visualizer.prototype.getTabs;
  var printObj = Visualizer.prototype.recursivelyRenderObjAsText;

  var tabs = getTabs(tabCount++);
  var text = "";

  for(var key in obj)
    if ( obj.hasOwnProperty(key) ) {
      text += tabs + "[" + key + "]: " + obj[key] + "\n";

      var isArr = obj[key] instanceof Array;
      var isObj = obj[key] instanceof Object;

      if ( isArr || isObj )
        text += printObj(obj[key], tabCount);
    }

  return text;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getTabs = function(count) {
  var tabs = "";
  for (var i=0; i < count; i++) {
    tabs = tabs + "\t";
  }

  return tabs;
};

// --------------------------------------------------------------------------------------------------------------------
// EXTRACT | STACK-INFO
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.extractStackInfo = function(snapshot, TB) {
  var me = Visualizer.prototype;
  var self = this;

  TB = TB || "";

  //Visualizer.Renderer.Text.js
  snapshot.stackInfo = me.renderStackAsText(snapshot.stack, TB);
}

// --------------------------------------------------------------------------------------------------------------------
// EXTRACT | HEAP-INFO
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.extractHeapInfo = function(snapshot, TB) {
  var me = Visualizer.prototype;
  var self = this;

  TB = TB || "";

  //Visualizer.Renderer.Text.js
  snapshot.heapInfo = me.renderHeapAsText(snapshot.heap, TB);
}

// --------------------------------------------------------------------------------------------------------------------
// EXTRACT | REFERENCES-INFO
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.extractReferencesInfo = function(snapshot) {
  if (snapshot == undefined || snapshot.references == undefined || snapshot.referencesInfo == undefined) {
    console.error("ERROR: extractPlumbingInfo => undefined snapshot/references/referencesInfo.");
    return;
  }

  snapshot.referencesInfo = "";
  var references = snapshot.references;

  for(var key in references)
    if ( references.hasOwnProperty(key) ) {
      snapshot.referencesInfo += "key: " + key + ", uid: " + references[key] + "\n";
    }
};

// --------------------------------------------------------------------------------------------------------------------
// EXTRACT | PLUMBING-INFO
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.extractPlumbingInfo = function(snapshot) {
  if (snapshot == undefined || snapshot.plumbing == undefined || snapshot.plumbingInfo == undefined) {
    console.error("ERROR: extractPlumbingInfo => undefined snapshot/plumbing/plumbingInfo.");
    return;
  }

  snapshot.plumbingInfo = "";
  var plumbing = snapshot.plumbing;

  for(var key in plumbing)
    if ( plumbing.hasOwnProperty(key) ) {
      var refs = "";
      plumbing[key].forEach( function(ref) { refs += ref + ", " });
      snapshot.plumbingInfo += "From: " + key + ", To: " + plumbing[key] + "\n";
    }
};

// --------------------------------------------------------------------------------------------------------------------
// EXTRACT | COORDINATE-INFO
// --------------------------------------------------------------------------------------------------------------------

// Client-Side
//  SEE: src/client/views/visualizer/visualizer.DebugInfo.js

// --------------------------------------------------------------------------------------------------------------------
// EXTRACT | LAYOUT-INFO
// --------------------------------------------------------------------------------------------------------------------

// Client-Side
//  SEE: src/client/views/visualizer/visualizer.DebugInfo.js

// --------------------------------------------------------------------------------------------------------------------
// END
// --------------------------------------------------------------------------------------------------------------------
