
// --------------------------------------------------------------------------------------------------------------------
// RENDER SNAPSHOT 
// --------------------------------------------------------------------------------------------------------------------

// TB => Tab Spaces
Visualizer.prototype.prerender = function(snapshot, TB) {
  var me = Visualizer.prototype;
  var self = this;

	TB = TB || "";

  //Visualizer.Renderer.Text.js
  snapshot.stackInfo = me.renderStackAsText(snapshot.stack, TB);
  snapshot.heapInfo = me.renderHeapAsText(snapshot.heap, TB);

	//Visualizer.Renderer.Html.js
	snapshot.stackHtml = me.renderStackAsHtml(snapshot.stack, TB);
	snapshot.heapHtml = me.renderHeapAsHtml(snapshot.heap, TB);
}

// --------------------------------------------------------------------------------------------------------------------
// RENDER FRAME
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderFrame = function(frame, TB) {
  var me = Visualizer.prototype;
  var self = this;

	TB = TB || "";

	//Visualizer.Renderer.Html.js
	frame.text = me.renderFrameAsText(frame, TB);
	frame.html = me.renderFrameAsHtml(frame, TB);
}

// --------------------------------------------------------------------------------------------------------------------
// RENDER NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderNode = function(node, TB) {
  var me = Visualizer.prototype;
  var self = this;

	TB = TB || "";

	// Visualizer.RenderText.js
	node.text = me.renderNodeAsText(node, TB);

	//Visualizer.RenderHtml.js
	node.html = self.renderNodeAsHtml(node, TB);

}

// --------------------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
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

Visualizer.prototype.setDrawProperties = function (obj) {
  var me = Visualizer.prototype;
  var self = this;

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

/** /
//SNAPSHOT
, render: {
      // stackInfo: function(TB)   { return snapshot.stackInfo = me.renderStackAsText(snapshot.stack, TB || "");  } //Visualizer.Renderer.Text.js
    // , heapInfo: function(TB)    { return snapshot.heapInfo = me.renderHeapAsText(snapshot.heap, TB || "");     } //Visualizer.Renderer.Text.js

    // , layoutInfo: function(TB)  { return snapshot.layoutInfo = me.extractLayoutInfo(snapshot, TB || "" );      } //Visualizer.DebugInfo.js

    // , stackHtml: function(TB)   { return snapshot.stackHtml = me.renderStackAsHtml(snapshot.stack, TB || "");  } //Visualizer.Renderer.Html.js
    // , heapHtml: function(TB)    { return snapshot.heapHtml = me.renderHeapAsHtml(snapshot.heap, TB || "");     } //Visualizer.Renderer.Html.js
  }
/**/

/** /
//FRAME
, render: {
      text: function(TB) { return frame.text = me.renderFrameAsText(frame, TB || ""); } //Visualizer.Renderer.Text.js
    , html: function(TB) { return frame.html = me.renderFrameAsHtml(frame, TB || ""); } //Visualizer.Renderer.Html.js

    , layoutInfo: function(TB)  { return frame.layoutInfo = me.extractFrameLayoutInfo(frame, TB || "" ); } //Visualizer.DebugInfo.js
  }
/**/

/** /
//NODE
, render: {
    location: NodeLocationTypeEnum.UNDEFINED

  , text: function(TB) { return node.text = me.renderNodeAsText(node, TB || ""); } //Visualizer.RenderText.js
  , html: function(TB) { return node.html = self.renderNodeAsHtml(node, TB || ""); } //Visualizer.RenderHtml.js

  , layoutInfo: function(TB) { return node.layoutInfo = me.extractNodeLayoutInfo(node, TB || ""); } //Visualizer.DebugInfo.js
}
/**/
