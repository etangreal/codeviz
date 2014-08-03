
_.extend(Visualizer.prototype, {

    // ----------------------------------------------------------------------------------------------------------------
    // EXTRACT | COORDINATE-INFO
    // ----------------------------------------------------------------------------------------------------------------

    extractCoordinateInfo: function(snapshot) {
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

          }//if

    },//extractCoordinateInfo

    // ----------------------------------------------------------------------------------------------------------------
    // EXTRACT | LAYOUT-INFO
    // ----------------------------------------------------------------------------------------------------------------

    extractLayoutInfo: function(snapshot,TB) {
      var me = Visualizer.prototype;
      var self = this;

      TB = TB || "";
      var Br = "\n";

      var layoutInfo = "";

      snapshot.stack.forEach( function(frame) {
        frame.layoutInfo = me.extractFrameLayoutInfo(frame, TB);

        layoutInfo += TB + "-----------------------------------------------------------" + Br;
        layoutInfo += frame.layoutInfo;
      });

      snapshot.heap.forEach( function(heapObj) {
        heapObj.layoutInfo = me.extractNodeLayoutInfo(heapObj, TB);

        layoutInfo += TB + "-----------------------------------------------------------" + Br;
        layoutInfo += heapObj.layoutInfo;
      });

      return layoutInfo;

    },//extractLayoutInfo

    // ----------------------------------------------------------------------------------------------------------------

    extractFrameLayoutInfo: function(frame,TB) {
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

    },//extractFrameLayoutInfo

    // ----------------------------------------------------------------------------------------------------------------

    extractNodeLayoutInfo: function(node,TB) {
      TB = TB || "";
      var Br = "\n";
      var Tb = "\t";

      var draw = node.draw;
      var pos =
          "Pos {x: " + draw.position.x + ", y: " + draw.position.y + "} " +
          "Off {x: " + Math.round(draw.offset.x) + ", y: " + Math.round(draw.offset.y) + "}" ;

      var layoutInfo =
                    "Heap id: " + node.id            + Br +
                    "Draw: "                         + Br +
              Tb +      "uid: " + draw.uid           + Br +
              Tb +      pos                          + Br +
              Tb +      " Width: " +  draw.width     + Br +
              Tb +      " Height: " + draw.height    + Br ;

      return layoutInfo;

    }//extractNodeLayoutInfo

    // ----------------------------------------------------------------------------------------------------------------

}); //_.extend(Visualizer.prototype

// --------------------------------------------------------------------------------------------------------------------
// END
// --------------------------------------------------------------------------------------------------------------------

