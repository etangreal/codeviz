

function Visualizer() {

}

// --------------------------------------------------------------------------------------------------------------------
// RENDER
// --------------------------------------------------------------------------------------------------------------------

/** /
Visualizer.prototype.render = function(snapshot, canvas) {
  var me = Visualizer.prototype;
  var self = this;

  //if( !(snapshots && canvas) )

  // --------------------------------------------------------------------------

  var stack = snapshot.stack;

  stack.forEach( function(frame) {

    // canvas.append(frame.html);
    // frame.draw.updateProperties();

  });

  // --------------------------------------------------------------------------

  var heap = snapshot.heap;

  heap.forEach( function(heapObj) {
    if (heapObj.id == 0) return; //ToDo: #HACK the first heap object is a "dummy/fill-in" this is because the trace object id starts from 1!

    //canvas.append( heapObj.html );
    //heapObj.draw.updateProperties();

  });

  // --------------------------------------------------------------------------

  //self.calcLayout(snapshot);
  //self.layoutHtml(snapshot);

  // --------------------------------------------------------------------------

    //self.doPlumbing( snapshots );

};//render
/**/

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
// END
// --------------------------------------------------------------------------------------------------------------------
