
// --------------------------------------------------------------------------------------------------------------------
// PRE-RENDER SNAPSHOT AS: HTML & TEXT-INFO 
// --------------------------------------------------------------------------------------------------------------------

// TB => Tab Spaces
Visualizer.prototype.prerender = function(snapshot, TB) {
  var me = Visualizer.prototype;
  var self = this;

	TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  //Visualizer.Renderer.Text.js
  snapshot.stackInfo = me.renderStackAsText(snapshot.stack, TB);
  snapshot.heapInfo = me.renderHeapAsText(snapshot.heap, TB);

	//Visualizer.Renderer.Html.js
	snapshot.stackHtml = me.renderStackAsHtml(snapshot.stack, TB);
	snapshot.heapHtml = me.renderHeapAsHtml(snapshot.heap, TB);

  //Visualizer.Renderer.Tmpl.js
  me.renderStackTmpl(snapshot.stack);
  me.renderHeapTmpl(snapshot.heap);

}

// --------------------------------------------------------------------------------------------------------------------
// END
// --------------------------------------------------------------------------------------------------------------------
