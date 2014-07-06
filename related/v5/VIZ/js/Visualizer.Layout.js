
// --------------------------------------------------------------------------------------------------------------------
// LAYOUT //
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.calcLayout = function(snapshot) { var self = this, me = Visualizer.prototype;

  // --------------------------------------------------------------------------
  // STACK
  // --------------------------------------------------------------------------

  var framePaddingY = 20;

  var frameX = 0;
  var frameY = 0;

  var maxFrameWidth = 0;

  var stack = snapshot.stack;

  stack.forEach(function(frame) { //FRAME

    var width = frame.draw.width;
    var height = frame.draw.height;
    if (width > maxFrameWidth) maxFrameWidth = width;

    frame.draw.position.x = frameX + width/2;
    frame.draw.position.y = frameY - height/2;

    frameY = frameY - height - framePaddingY;

    // ------------------------------------------------------------------------
    //update the snapshot coordinates registry by adding this frames pointerUIDs to the registry along with the frames coordinates

  });//forEach-frame

  // --------------------------------------------------------------------------
  // HEAP
  // --------------------------------------------------------------------------

  var heapPaddingY = 20;

  var heapX = 100;
  var heapY = 0;

  heapX += maxFrameWidth;

  var heap = snapshot.heap;

  heap.forEach(function(heapObj) { //HEAP
    if (heapObj.id == 0) return; //ToDo: #HACK: skip the first "EMPTY" heapObj, its just a placeholder

    var width = heapObj.draw.width;
    var height = heapObj.draw.height;

    heapObj.draw.position.x = heapX + width/2;
    heapObj.draw.position.y = heapY - height/2;

    heapY = heapY - height - heapPaddingY;

  });//forEach-HeapObj

  // --------------------------------------------------------------------------

  self.calcCoordinates(snapshot);

};//calcLayout

// --------------------------------------------------------------------------------------------------------------------


Visualizer.prototype.calcCoordinates = function(snapshot) { var self = this, me = Visualizer.prototype;

  // --------------------------------------------------------------------------
  // COORDINATES
  // --------------------------------------------------------------------------

  var coordinates = snapshot.coordinates;
  var stack = snapshot.stack;
  var heap = snapshot.heap;

  // --------------------------------------------------------------------------

  stack.forEach(function(frame) { //FRAME

    coordinates[frame.draw.uid] = self.getCoordinates(frame.draw.uid,frame);

    frame.locals.forEach( function(local) {
      local.pointerUID.forEach( function(uid) {
        coordinates[uid] = self.getCoordinates(uid,frame);
      });
    });//forEach Local

  });//forEach FRAME

  // --------------------------------------------------------------------------

  heap.forEach(function(heapObj) { //HEAP
    if (heapObj.id == 0) return; //ToDo: #HACK: skip the first "EMPTY" heapObj, its just a placeholder

    coordinates[heapObj.uid] = self.getCoordinates(heapObj.uid, heapObj);
    coordinates[heapObj.draw.uid] = self.getCoordinates(heapObj.draw.uid,heapObj);

    heapObj.pointerUID.forEach( function(uid) {
      coordinates[uid] = self.getCoordinates(uid,heapObj);
    });

  });//forEach HEAP

  // --------------------------------------------------------------------------

};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getCoordinates = function(uid,parent) { var self = this, me = Visualizer.prototype;

  //child
  var c = $( "#"+uid );
  var cw = c.width();
  var ch = c.height();

  //relative
  var element = document.getElementById(uid);
  var wrapper = document.getElementById(parent.draw.uid).offsetParent;
  var r = me.getRelativePosition( element , wrapper );

  //parent
  var p = parent.draw.position;
  var w = parent.draw.width;
  var h = parent.draw.height;

  var x = p.x - w/2;
  var y = p.y + h/2;

  return {
      x: x + r.x + cw/2
    , y: y - r.y - ch/2
    , z: 0
  };
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getRelativePosition = function(element, parent) {
  // http://www.kirupa.com/html5/get_element_position_using_javascript.htm

  var x = 0;
  var y = 0;

  while(element) {
    x += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    y += (element.offsetTop - element.scrollTop + element.clientTop);
    element = (element == parent) ? undefined : element.offsetParent;
  }

  return { x: x, y: y, z: 0 };
};

// --------------------------------------------------------------------------------------------------------------------
// END
// --------------------------------------------------------------------------------------------------------------------