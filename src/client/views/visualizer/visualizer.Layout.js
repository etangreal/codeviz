
function Visualizer() {} // Declare Visualizer - just to satisfy meteor...

// // --------------------------------------------------------------------------------------------------------------------
// // GET-FRAME-COORDINATES
// // --------------------------------------------------------------------------------------------------------------------

// Visualizer.prototype.getFrameCoordinates = function(frame) {
//   var me = Visualizer.prototype;
//   var self = this;

//   var coordinates = frame.snapshot.coordinates;

//   coordinates[frame.draw.uid] = self.getCoordinates(frame.draw.uid, frame);
//   console.log('uid: ', frame.draw.uid, '|coordinates[frame.draw.uid]', coordinates[frame.draw.uid]);

//   frame.locals.forEach( function(local) {
//     local.pointerUID.forEach( function(uid) {
//       coordinates[uid] = self.getCoordinates(uid, frame);
//       console.log('uid: ', uid, '|coordinates[uid]', coordinates[uid])
//     });
//   });//forEach Local

// }//getFrameCoordinates

// // --------------------------------------------------------------------------------------------------------------------
// // GET-HEAP-OBJ-COORDINATES
// // --------------------------------------------------------------------------------------------------------------------

// Visualizer.prototype.getHeapObjCoordinates = function(heapObj) {
//   var me = Visualizer.prototype;
//   var self = this;

//   var coordinates = heapObj.snapshot.coordinates;

//   coordinates[heapObj.uid] = self.getCoordinates(heapObj.uid, heapObj);
//   coordinates[heapObj.draw.uid] = self.getCoordinates(heapObj.draw.uid, heapObj);

//   heapObj.pointerUID.forEach( function(uid) {
//     coordinates[uid] = self.getCoordinates(uid, heapObj);
//   });

// }//getHeapObjCoordinates

// // --------------------------------------------------------------------------------------------------------------------
// // GET-COORDINATES
// // --------------------------------------------------------------------------------------------------------------------

// Visualizer.prototype.getCoordinates = function(uid, parent) { 
//   var me = Visualizer.prototype;
//   var self = this;

//   //child
//   var c = $( "#" + uid );
//   var cw = c.width();
//   var ch = c.height();

//   console.log('cw: ', cw);
//   console.log('ch: ', ch);

//   //relative
//   var element = document.getElementById(uid);
//   var wrapper = document.getElementById(parent.draw.uid).offsetParent;
//   var r = me.getRelativePosition( element , wrapper );

//   console.log('r: ', r);

//   //parent
//   var p = parent.draw.position;
//   var w = parent.draw.width;
//   var h = parent.draw.height;

//   console.log('p: ', p);

//   var x = p.x - w/2;
//   var y = p.y + h/2;

//   return {
//       x: x + r.x + cw/2
//     , y: y - r.y - ch/2
//     , z: 0
//   };

// };//getCoordinates

// // --------------------------------------------------------------------------------------------------------------------
// // HELPER | GET-RELATIVE-POSITION
// // --------------------------------------------------------------------------------------------------------------------

// Visualizer.prototype.getRelativePosition = function(element, parent) {
//   // www.kirupa.com/html5/get_element_position_using_javascript.htm

//   var x = 0;
//   var y = 0;

//   while(element) {
//     x += (element.offsetLeft - element.scrollLeft + element.clientLeft);
//     y += (element.offsetTop - element.scrollTop + element.clientTop);
//     element = (element == parent) ? undefined : element.offsetParent;
//   }

//   return { x: x, y: y, z: 0 };

// };//getRelativePosition

// --------------------------------------------------------------------------------------------------------------------
// END
// --------------------------------------------------------------------------------------------------------------------
