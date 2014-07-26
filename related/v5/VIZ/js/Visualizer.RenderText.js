
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderStackAsText = function(stack, TB) {
  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var text = "";

  stack.forEach( function(frame) {
    text += TB + "-----------------------------------------------------------" + Br;
    text += frame.render.text(TB);
  });

  return text;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderFrameAsText = function(frame,TB) { var self = this; var me = Visualizer.prototype;
  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var locals = "";

  frame.locals.forEach( function(node) {
    locals += node.render.text(TB+Tb+Tb);
  });

  var meta = frame.meta;
  var metaInfo =
          TB + Tb +       "Meta {"                                      + Br +
          TB + Tb + Tb +     "is_highlighted: " + meta.is_highlighted   + Br +
          TB + Tb + Tb +     "is_parent: " + meta.is_parent             + Br +
          TB + Tb + Tb +     "func_name: " + meta.func_name             + Br +
          TB + Tb + Tb +     "is_zombie: " + meta.is_zombie             + Br +
          TB + Tb + Tb +     "parent_frame_id_list: " +
                              meta.parent_frame_id_list.join()          + Br +
          TB + Tb + Tb +     "unique_hash: " + meta.unique_hash         +
          TB +            " }"                                          + Br ;

  var draw = frame.draw;
  var pos = TB + Tb + Tb +      "{x:"+draw.position.x + ", y:"+draw.position.y+"}";
  var drawInfo =
          TB + Tb +       "Draw { "                 +
                          " uid: " + draw.uid       +
                          pos                       +
                          " Width: " +  draw.width  +
                          " Height: " + draw.height +
                          " }"                      + Br ;

  var localsInfo =
          TB + Tb +     "locals: ["                 + Br +
                           locals                   +
          TB + Tb +     "]"                         ;

  var frameInfo =
          TB +      "Frame: { "                     +
                        "id: " + frame.id + ", "    +
                        "sid: " + frame.sid + ", "  +
                        "uid: " + frame.uid + ", "  +
                        "name: " + frame.name       + Br +
                        metaInfo                    +
                        drawInfo                    +
                        localsInfo                  +
                    "}"                             + Br ;

  return frameInfo;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderHeapAsText = function(heap, TB) {
  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var objects = "";

  heap.forEach( function(heapObj) {
    objects += heapObj.render.text(TB+Tb);
  });

  var heapInfo =
      TB +      "-----------------------------------------------------------" + Br +
      TB +      "Heap: [ "                                                    + Br +
                  objects                                                     +
      TB +      "]"                                                           + Br ;

  return heapInfo;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderNodeAsText = function(node, TB) {
  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var inherits = (node.inherits.length <= 0) ? "" :
      TB + Tb +       "inherits: "  + node.inherits + Br;

  var draw = node.draw;
  var pos = TB + Tb + Tb +      "{x:"+draw.position.x + ", y:"+draw.position.y+"}";
  var drawInfo =
          TB + Tb +       "Draw { "                        +
                              "uid: " + draw.uid           + Br +
                              pos                          +
                              " Width: " +  draw.width     +
                              " Height: " + draw.height    +
                          " }"                             + Br ;

  var nodeInfo =
          TB +        "{"                                  +
                          "id: "        + node.id          + ", " +
                          "sid: "       + node.sid         + ", " +
                          "uid: "       + node.uid         + ", " +
                          "type: "      + node.type        + Br +
          TB + Tb +       "name: "      + node.name        + Br +
                          drawInfo                         +
                          inherits                         +
          TB + Tb +       "value: "     + node.value       + Br +
          TB + Tb +       "pointer: "   + node.pointer     + Br +
          TB + Tb +       "pointerUID: "+ node.pointerUID  +
                      "}"                                  + Br ;

  return nodeInfo;
};

// --------------------------------------------------------------------------------------------------------------------