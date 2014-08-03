

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

// ---------------------------------------------------------------------------------------------------------------------

function _updateDrawProperties(obj) {
  var me = Visualizer.prototype;
  var self = this;

  var elem = $('#'+obj.draw.uid).parent(); //every object (frame or heap) has a parent div 
                                           //'famous.core.Surface' which wraps it

  if( me.isUndefined(elem) )
    console.error('ERROR: setNodeProperties => undefined element.');

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

};

// --------------------------------------------------------------------------------------------------------------------
// END
// --------------------------------------------------------------------------------------------------------------------
