
// --------------------------------------------------------------------------------------------------------------------
// DebugInfo: UI
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.updateDebugInfoUI = function(i) { var self = this; var me = Visualizer.prototype;
  if ( !self.isValidSnapshotIndex(i) )
    return;

  var snapshot = self.getSnapshot(i);

  var traceInfo = self.getTraceInfoTextArea();
  if (traceInfo) traceInfo.val( snapshot.traceInfo );

  var stackInfo = self.getStackInfoTextArea();
  if (stackInfo) stackInfo.val( snapshot.stackInfo );

  var heapInfo = self.getHeapInfoTextArea();
  if (heapInfo) heapInfo.val( snapshot.heapInfo );

  var stackHtml = self.getStackHtmlInfoTextArea();
  if (stackHtml) stackHtml.val( snapshot.stackHtml );

  var heapHtml = self.getHeapHtmlInfoTextArea();
  if (heapHtml) heapHtml.val( snapshot.heapHtml );

  var layoutInfo = self.getLayoutInfoTextArea();
  if (layoutInfo) layoutInfo.val( snapshot.layoutInfo );

  var refInfo = self.getReferencesInfoTextArea();
  if (refInfo) refInfo.val(
      "-----------------------------------------------------\n" +
      "REFERENCES INFO"                                  + "\n" +
      "-----------------------------------------------------\n" +
      snapshot.referencesInfo                            + "\n" +
      "-----------------------------------------------------\n" +
      "PLUMBING INFO"                                    + "\n" +
      "-----------------------------------------------------\n" +
      snapshot.plumbingInfo                              + "\n" +
      "-----------------------------------------------------\n" +
      "COORDINATE INFO"                                  + "\n" +
      "-----------------------------------------------------\n" +
      snapshot.coordinateInfo                            + "\n"
  );
};

// --------------------------------------------------------------------------------------------------------------------
// DebugInfo: EXTRACTION FUNCTIONS
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.extractTraceInfo = function(traceEntry, i) { var self = this, me = Visualizer.prototype;
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

Visualizer.prototype.getTabs = function(count) {
  var tabs = "";
  for (var i=0; i < count; i++) {
    tabs = tabs + "\t";
  }

  return tabs;
};

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

Visualizer.prototype.extractCoordinateInfo = function(snapshot) {
  if (snapshot == undefined || snapshot.coordinates == undefined || snapshot.coordinateInfo == undefined) {
    console.error("ERROR: extractPlumbingInfo => undefined snapshot/coordinates/coordinateInfo.");
    return;
  }

  snapshot.coordinateInfo = "";
  var coordinates = snapshot.coordinates;

  for( var key in coordinates )
    if ( coordinates.hasOwnProperty(key) ) {

      var co = coordinates[key];
      snapshot.coordinateInfo +=
          "uid: " + key + " { " +
              "x: " + Math.round(co.x) + ", " +
              "y: " + Math.round(co.y) +
          " }\n";

    }//for
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.extractLayoutInfo = function(snapshot,TB) {
  var Br = "\n";

  var layoutInfo = "";

  snapshot.stack.forEach( function(frame) {
    layoutInfo += TB + "-----------------------------------------------------------" + Br;
    layoutInfo += frame.render.layoutInfo();
  });

  snapshot.heap.forEach( function(heapObj) {
    layoutInfo += TB + "-----------------------------------------------------------" + Br;
    layoutInfo += heapObj.render.layoutInfo();
  });

  return layoutInfo;
};

Visualizer.prototype.extractFrameLayoutInfo = function(frame,TB) {
  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var draw = frame.draw;
  var pos =
      "Pos {x: " + draw.position.x + ", y: " + draw.position.y + "} " +
      "Off {x: " + Math.round(draw.offset.x) + ", y: " + Math.round(draw.offset.y) + "}" ;

  var layoutInfo =
                "Frame id: " + frame.id          + Br +
                "Draw: "                         + Br +
          Tb +      "uid: " + draw.uid           + Br +
          Tb +      pos                          + Br +
          Tb +      " Width: " +  draw.width     + Br +
          Tb +      " Height: " + draw.height    + Br ;

  return layoutInfo;
};

Visualizer.prototype.extractNodeLayoutInfo = function(node,TB) {
  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var draw = node.draw;
  var pos =
      "Pos {x: " + draw.position.x + ", y: " + draw.position.y + "} " +
      "Off {x: " + Math.round(draw.offset.x) + ", y: " + Math.round(draw.offset.y) + "}" ;

  var layoutInfo =
                "Heap id: " + node.id           + Br +
                "Draw: "                         + Br +
          Tb +      "uid: " + draw.uid           + Br +
          Tb +      pos                          + Br +
          Tb +      " Width: " +  draw.width     + Br +
          Tb +      " Height: " + draw.height    + Br ;

  return layoutInfo;
};

// --------------------------------------------------------------------------------------------------------------------
// DebugInfo: UI-PROPERTIES
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.initTraceInfoTextArea = function() { var self = this; var me = Visualizer.prototype;
  if (self._traceInfoTextArea != undefined)
    console.error("ERROR: initTraceInfoTextArea => self._traceInfoTextArea was already defined!");

  self._traceInfoTextArea = $("#_traceInfoTextArea");
};

Visualizer.prototype.getTraceInfoTextArea = function() { var self = this; var me = Visualizer.prototype;
  if (self._traceInfoTextArea == undefined) {
    console.error("ERROR: getTraceInfoTextArea => was not initialized");
    self.initTraceInfoTextArea();
  }

  if ( self._traceInfoTextArea.is("textarea") )
    return self._traceInfoTextArea;

  console.error("ERROR: Could not find trace Info TextArea (HTMLTextAreaElement).");
  return undefined;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.initStackInfoTextArea = function() { var self = this; var me = Visualizer.prototype;
  if ( self._stackInfoTextArea != undefined)
    console.error("ERROR: initStackInfoTextArea => self._stackInfoTextArea was already defined!");

  self._stackInfoTextArea = $("#_stackInfoTextArea");
};

Visualizer.prototype.getStackInfoTextArea = function() { var self = this; var me = Visualizer.prototype;
  if (self._stackInfoTextArea == undefined) {
    console.error("ERROR: getStackInfoTextArea => was not initialized");
    self.initStackInfoTextArea();
  }

  if ( self._stackInfoTextArea.is("textarea") )
    return self._stackInfoTextArea;

  console.error("ERROR: Could not find stack Info TextArea (HTMLTextAreaElement).");
  return undefined;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.initHeapInfoTextArea = function() { var self = this; var me = Visualizer.prototype;
  if ( self._heapInfoTextArea != undefined)
    console.error("ERROR: initStackInfoTextArea => self._heapInfoTextArea was already defined!");

  self._heapInfoTextArea = $("#_heapInfoTextArea");
};

Visualizer.prototype.getHeapInfoTextArea = function() { var self = this; var me = Visualizer.prototype;
  if (self._heapInfoTextArea == undefined) {
    console.error("ERROR: getHeapInfoTextArea => was not initialized");
    self.initHeapInfoTextArea();
  }

  if ( self._heapInfoTextArea.is("textarea") )
    return self._heapInfoTextArea;

  console.error("ERROR: Could not find heap Info TextArea (HTMLTextAreaElement).");
  return undefined;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getStackHtmlInfoTextArea = function() { var self = this; var me = Visualizer.prototype;
  if (self._stackHtmlInfoTextArea == undefined)
    self._stackHtmlInfoTextArea = $("#_stackHtmlInfoTextArea");

  if ( self._stackHtmlInfoTextArea.is("textarea") )
    return self._stackHtmlInfoTextArea;

  console.error("ERROR: Could not find stack Html Info TextArea (HTMLTextAreaElement).");
  return undefined;
};

Visualizer.prototype.getHeapHtmlInfoTextArea = function() { var self = this; var me = Visualizer.prototype;
  if (self._heapHtmlInfoTextArea == undefined)
    self._heapHtmlInfoTextArea = $("#_heapHtmlInfoTextArea");

  if ( self._heapHtmlInfoTextArea.is("textarea") )
    return self._heapHtmlInfoTextArea;

  console.error("ERROR: Could not find heap Html Info TextArea (HTMLTextAreaElement).");
  return undefined;
};

Visualizer.prototype.getLayoutInfoTextArea = function() { var self = this; var me = Visualizer.prototype;
  if (self._layoutInfoTextArea == undefined)
    self._layoutInfoTextArea = $("#_layoutInfoTextArea");

  if ( self._layoutInfoTextArea.is("textarea") )
    return self._layoutInfoTextArea;

  console.error("ERROR: getLayoutInfoTextArea => Could not find layoutInfo TextArea (HTMLTextAreaElement).");
  return undefined;
};

Visualizer.prototype.getReferencesInfoTextArea = function() { var self = this; var me = Visualizer.prototype;
  if (self._referencesInfoTextArea == undefined)
    self._referencesInfoTextArea = $("#_referencesInfoTextArea");

  if ( self._referencesInfoTextArea.is("textarea") )
    return self._referencesInfoTextArea;

  console.error("ERROR: getReferencesInfoTextArea => Could not find references Info TextArea (HTMLTextAreaElement).");
  return undefined;
};

// --------------------------------------------------------------------------------------------------------------------
// END
// --------------------------------------------------------------------------------------------------------------------

