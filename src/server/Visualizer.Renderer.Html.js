
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderHtml = function(snapshots, canvas) {
  var me = Visualizer.prototype;
  var self = this;

  if( snapshots && canvas )
    snapshots.forEach( function(snapshot) {

      // --------------------------------------------------------------------------

      var stack = snapshot.stack;

      stack.forEach( function(frame) {

        canvas.append(frame.html);
        frame.draw.updateProperties();

      });

      // --------------------------------------------------------------------------

      var heap = snapshot.heap;

      heap.forEach( function(heapObj) {
        if (heapObj.id == 0) return; //ToDo: #HACK the first heap object is a "dummy/fill-in" this is because the trace object id starts from 1!

        canvas.append( heapObj.html );
        heapObj.draw.updateProperties();

      });

      // --------------------------------------------------------------------------

      self.calcLayout(snapshot);
      self.layoutHtml(snapshot);

      snapshot.stackInfo = snapshot.render.stackInfo();  //update the snapshot's stack info
      snapshot.heapInfo = snapshot.render.heapInfo();    //update the snapshot's heap info

      // --------------------------------------------------------------------------

    });//forEach-snapshots

    //self.doPlumbing( snapshots );

};//renderHtml

// ---------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.layoutHtml = function(snapshot) {
  var me = Visualizer.prototype;
  var self = this;

  // --------------------------------------------------------------------------

  var stack = snapshot.stack;

  stack.forEach( function(frame) {

    var f = $("#"+frame.draw.uid);

        f.css({
            position: "absolute"
          , left: frame.draw.position.x + "px"
          , top: frame.draw.position.y + "px"
        });

        f.hide();

  });//forEach-Frame

  // --------------------------------------------------------------------------

  var heap = snapshot.heap;

  heap.forEach(function(heapObj) {

    var h = $("#"+heapObj.draw.uid);

        h.css({
            position: "absolute"
          , left: heapObj.draw.position.x + "px"
          , top: heapObj.draw.position.y + "px"
        });

        h.hide();
  });

  // --------------------------------------------------------------------------

};//layoutHtml

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.prerenderHtml = function(snapshot, TB) {
  var me = Visualizer.prototype;
  var self = this;

  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  snapshot.stackHtml = me.renderStackAsHtml(snapshot.stack, TB);
  snapshot.heapHtml = me.renderHeapAsHtml(snapshot.heap, TB);

  snapshot.html =
      '<div class="_snapshot">'     + Br +
          snapshot.stackHtml        +
          snapshot.heapHtml         +
      '</div><!-- /._snapshot -->'  ;
};

// --------------------------------------------------------------------------------------------------------------------
// RENDER | STACK
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderStackAsHtml = function(stack, TB) {
  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var html = TB + '<div class="_stack">' + Br;

  stack.forEach(function(frame) {
    frame.html = me.renderFrameAsHtml(frame, TB+Tb);

    html += TB + "<!-------------------------------------------------------->" + Br;
    html += frame.html;
  });

  html += TB + '</div><!-- stack -->' + Br;

  return html;
};

// --------------------------------------------------------------------------------------------------------------------
// RENDER | STACK-FRAME
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderFrameAsHtml = function(frame,TB) {
  var me = Visualizer.prototype;
  var self = this;

  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var locals = "";

  frame.locals.forEach( function(node) {
    node.html = self.renderFrameNodeAsHtml(node, TB+Tb+Tb+Tb);
    locals += node.html;
  });

  var table =
          TB + Tb +   '<table class="_locals"><!-- locals -->'          + Br +
                         locals                                         +
          TB + Tb +   '</table><!-- /locals -->'                        + Br ;

  var duid = frame.draw.uid;
  var cls = (frame.meta.is_highlighted) ? '_frame _active' : '_frame';

  var frameHtml =
          TB +      '<div id="'+duid+'" class="'+cls+'">'                                 + Br +
          TB +      '<table>'                                                             + Br +
          TB + Tb +     '<tr><td><div class="_fname">' + frame.name + '</div></td></tr>'  + Br +
          TB + Tb +     '<tr><td>'                                                        + Br +
                            table                                                         +
          TB + Tb +     '</td></tr>'                                                      + Br +
          TB +      '</table>'                                                            + Br +
          TB +      '</div><!-- /frame -->'                                               + Br ;

  return frameHtml;
};

// --------------------------------------------------------------------------------------------------------------------
// RENDER | STACK-FRAME | NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderFrameNodeAsHtml = function(node, TB) {
  var me = Visualizer.prototype;
  var self = this;

  if (node.type == NodeTypeEnum.NONE || node.type == NodeTypeEnum.UNKNOWN )
    return me.renderEmptyNodeAsHtml();

  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var verbose = self.isVerbose();
  var value   = self.recurseValueRefsToHtmlUID(node.value,verbose);

  var nodeHtml =
      TB +      '<tr>'                                + Br +
      TB + Tb +   '<td>' + node.name + '</td>'        + Br +
      TB + Tb +   '<td>' + value + '</td>'            + Br +
      TB +      '</tr>'                               + Br ;

  return nodeHtml;
};

// --------------------------------------------------------------------------------------------------------------------
// RENDER | HEAP
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderHeapAsHtml = function(heap, TB) {
  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var heapInfo = TB + '<div class="_heap">' + Br;

  heap.forEach(function(heapObj) {
    if (heapObj.type == NodeTypeEnum.NONE)
      return;

    heapObj.html = self.renderHeapNodeAsHtml(heapObj, TB+Tb);

    heapInfo += TB + "<!-------------------------------------------------------->" + Br;
    heapInfo += heapObj.html;
  });

  heapInfo += TB + '</div><!-- heap -->' + Br;

  return heapInfo;
};

// --------------------------------------------------------------------------------------------------------------------
// FLOW CONTROL | RENDER | HEAP NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderHeapNodeAsHtml = function(node, TB) {
  var me = Visualizer.prototype;
  var self = this;

  if ( node.type == NodeTypeEnum.NONE || node.type == NodeTypeEnum.UNKNOWN )
    return me.renderEmptyNodeAsHtml();

  if ( node.type == NodeTypeEnum.POINTER )
    return self.renderRefNodeAsHtml(node, TB);

  if ( node.type == NodeTypeEnum.FUNCTION )
    return self.renderFuncNodeAsHtml(node, TB);

  if ( node.type == NodeTypeEnum.CLASS )
    return self.renderClassNodeAsHtml(node, TB);

  if ( node.type == NodeTypeEnum.POINTER )
    return self.renderRefNodeAsHtml(node, TB);

  if ( node.type == NodeTypeEnum.INSTANCE )
    return self.renderInstanceNodeAsHtml(node, TB);

  if ( node.type == NodeTypeEnum.LIST )
    return self.renderListNodeAsHtml(node, TB);

  if ( node.type == NodeTypeEnum.TUPLE )
    return self.renderTupleNodeAsHtml(node, TB);

  if ( node.type == NodeTypeEnum.SET )
    return self.renderSetNodeAsHtml(node, TB);

  if ( node.type == NodeTypeEnum.DICT )
    return self.renderDictNodeAsHtml(node, TB);

  return me.renderUnknownNodeAsHtml(node, TB);
};

// --------------------------------------------------------------------------------------------------------------------
// RENDER | EMPTY NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderEmptyNodeAsHtml = function() {
  console.warn("WARNING: renderEmptyNodeAsHtml => we have an empty node. This was unexpected.");

  var Br = "\n";
  var uid = "UID-EMPTY";
  var cls = "_empty";

  return '<div id="'+uid+'" class="'+cls+'">Unknown Node</div>'+ Br;
};

// --------------------------------------------------------------------------------------------------------------------
// RENDER | REFERENCE NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderRefNodeAsHtml = function( node, TB ) {
  var me = Visualizer.prototype;
  var self = this;

  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";
  var verbose = self.isVerbose();

  console.warn("WARNING: renderRefNodeAsHtml => we have a reference node. This was unexpected.");

  var duid    = node.draw.uid;
  var uidHtml = self.uidAsHtmlUID(node.uid, verbose);
  var value   = self.recurseValueRefsToHtmlUID(node.value, verbose);
  var id      = (!verbose) ? uidHtml : uidHtml + '{id:' + node.id + '}';
  var cls     = "_heap _node _ref";

  var table =
          TB +           '<table>'                           + Br +
          TB + Tb +        '<tr>'                            + Br +
          TB + Tb + Tb +     '<td>' + id + '</td>'           + Br +
          TB + Tb + Tb +     '<td>' + node.type + '</td>'    + Br +
          TB + Tb + Tb +     '<td>' + node.name + '</td>'    + Br +
          TB + Tb + Tb +     '<td>' + value + '</td>'        + Br +
          TB + Tb + Tb +     '<td>' + node.pointer + '</td>' + Br +
          TB + Tb +        '</tr>'                           + Br +
          TB +           '</table>'                          + Br ;

  var nodeHtml =
          TB +           '<div id="'+duid+'" class="'+cls+'">'+ Br +
                            table                            +
          TB +           '</div><!-- /_node _ref -->'        + Br ;

  return nodeHtml;
};

// --------------------------------------------------------------------------------------------------------------------
// RENDER | FUNCTION NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderFuncNodeAsHtml = function( node, TB ) {
  var me = Visualizer.prototype;
  var self = this;

  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var verbose = self.isVerbose();

  var duid    = node.draw.uid;
  var uidHtml = self.uidAsHtmlUID(node.uid, verbose);
  var id      = (!verbose) ? uidHtml : uidHtml + '{id:' + node.id + '}';
  var cls     = "_heap _node _func";

  var table =
          TB +           '<table>'                           + Br +
          TB +           '<thead>'                           + Br +
          TB + Tb +        '<tr>'                            + Br +
          TB + Tb + Tb +     '<td colspan="2">' +
                                node.type +
                             '</td>'                         + Br +
          TB + Tb +        '</tr>'                           + Br +
          TB +           '</thead>'                          + Br +
          TB +           '<tbody>'                           + Br +
          TB + Tb +        '<tr>'                            + Br +
          TB + Tb + Tb +     '<td>' + id + '</td>'           + Br +
          TB + Tb + Tb +     '<td>' + node.name + '</td>'    + Br +
          TB + Tb +        '</tr>'                           + Br +
          TB +           '</tbody>'                          + Br +
          TB +           '</table>'                          + Br ;

  var nodeHtml =
          TB +           '<div id="'+duid+'" class="'+cls+'">'  + Br +
                            table                               +
          TB +           '</div><!-- /_node _func -->'          + Br ;

  return nodeHtml;
};

// --------------------------------------------------------------------------------------------------------------------
// RENDER | CLASS NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderClassNodeAsHtml = function( node, TB ) {
  var me = Visualizer.prototype;
  var self = this;

  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var verbose = self.isVerbose();

  var duid    = node.draw.uid;
  var uidHtml = self.uidAsHtmlUID(node.uid, verbose);
  var id      = (!verbose) ? uidHtml : uidHtml + '{id:' + node.id + '}';
  var cls     = "_heap _node _class";

  var values = self.recurseValueRefsToHtmlUID(node.value, verbose);
  var properties = self.nodeValuesAsHtmlTable(values, TB);

  var table =
          TB +           '<table>'                            + Br +
          TB +           '<thead>'                            + Br +
          TB + Tb +        '<tr>'                             + Br +
          TB + Tb + Tb +     '<td>' + id + '</td>'            + Br +
          TB + Tb + Tb +     '<td>' + node.type +     '</td>' + Br +
          TB + Tb + Tb +     '<td>' + node.name +     '</td>' + Br +
          TB + Tb + Tb +     '<td>' + node.inherits + '</td>' + Br +
          TB + Tb +        '</tr>'                            + Br +
          TB +           '<thead>'                            + Br +
          TB +           '<tbody>'                            + Br +
          TB + Tb +        '<tr>'                             + Br +
                              properties.asRow                +
          TB + Tb +        '</tr>'                            + Br +
          TB +           '</tbody>'                           + Br +
          TB +           '</table>'                           + Br ;

  var nodeHtml =
          TB +          '<div id="'+duid+'" class="'+cls+'">' + Br +
                          table                               +
                          properties.asTable                  +
          TB +          '</div><!-- /_node _class -->'        + Br ;

  return nodeHtml;
};

// --------------------------------------------------------------------------------------------------------------------
// RENDER | INSTANCE NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderInstanceNodeAsHtml = function( node, TB ) {
  var me = Visualizer.prototype;
  var self = this;

  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var verbose = self.isVerbose();

  var duid     = node.draw.uid;
  var uidHtml = self.uidAsHtmlUID(node.uid, verbose);
  var id      = (!verbose) ? uidHtml : uidHtml + '{id:' + node.id + '}';
  var cls     = "_heap _node _instance";

  var values    = self.recurseValueRefsToHtmlUID(node.value, verbose);
  var properies = me.nodeValuesAsHtmlTable(values, TB);

  var table =
          TB +           '<table>'                            + Br +
          TB + Tb +        '<tr>'                             + Br +
          TB + Tb + Tb +     '<td>' + id + '</td>'            + Br +
          TB + Tb + Tb +     '<td>' + node.type + '</td>'     + Br +
          TB + Tb + Tb +     '<td>' + node.inherits + '</td>' + Br +
                                properies.asRow               +
          TB + Tb +        '</tr>'                            + Br +
          TB +           '</table>'                           + Br ;

  var nodeHtml =
          TB +           '<div id="'+duid+'" class="'+cls+'">'  + Br +
                            table                               +
                            properies.asTable                   +
          TB +           '</div><!-- /_node _instance -->'      + Br ;

  return nodeHtml;
};

// --------------------------------------------------------------------------------------------------------------------
// RENDER | LIST NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderListNodeAsHtml = function( node, TB ) {
  var me = Visualizer.prototype;
  var self = this;

  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var verbose = self.isVerbose();

  var duid     = node.draw.uid;
  var uidHtml = self.uidAsHtmlUID(node.uid, verbose);
  var id      = (!verbose) ? uidHtml : uidHtml + '{id:' + node.id + '}';
  var cls     = "_heap _node _list";

  var values = self.recurseValueRefsToHtmlUID(node.value, verbose);

  var table =
          TB +           '<table>'                           + Br +
          TB + Tb +        '<tr>'                            + Br +
          TB + Tb + Tb +     '<td>' + id + '</td>'           + Br +
          TB + Tb + Tb +     '<td>' + node.type + '</td>'    + Br +
          TB + Tb + Tb +     '<td>' + values + '</td>'       + Br +
          TB + Tb +        '</tr>'                           + Br +
          TB +           '</table>'                          + Br ;

  var nodeHtml =
          TB +           '<div id="'+duid+'" class="'+cls+'">'  + Br +
                            table                               +
          TB +           '</div><!-- /_node _list -->'          + Br ;

  return nodeHtml;
};

// --------------------------------------------------------------------------------------------------------------------
// RENDER | TUPLE NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderTupleNodeAsHtml = function( node, TB ) {
  var me = Visualizer.prototype;
  var self = this;

  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var verbose = self.isVerbose();

  var duid    = node.draw.uid;
  var uidHtml = self.uidAsHtmlUID(node.uid, verbose);
  var id      = (!verbose) ? uidHtml : uidHtml + '{id:' + node.id + '}';
  var cls     = "_heap _node _tuple";

  var values = self.recurseValueRefsToHtmlUID(node.value, verbose);

  var locals = "";
  values.forEach( function(value) {
    locals += TB+Tb+Tb+Tb + '<td>' + value + '</td>' + Br ;
  });

  var localsTable =
          TB + Tb + Tb +      '<table class="_bdr">'         + Br +
          TB + Tb + Tb + Tb +   '<tr>'                       + Br +
                                   locals                    +
          TB + Tb + Tb + Tb +   '</tr>'                      + Br +
          TB + Tb + Tb +      '</table>'                     + Br ;

  var table =
          TB +           '<table>'                           + Br +
          TB +           '<thead>'                           + Br +
          TB + Tb +        '<tr>'                            + Br +
          TB + Tb + Tb +     '<td colspan="2">' +
                                node.type +
                             '</td>'                         + Br +
          TB + Tb +        '</tr>'                           + Br +
          TB +           '</thead>'                          + Br +
          TB +           '<tbody>'                           + Br +
          TB + Tb +        '<tr>'                            + Br +
          TB + Tb + Tb +     '<td>' + id + '</td>'           + Br +
          TB + Tb + Tb +     '<td>'                          + Br +
                                localsTable                  +
          TB + Tb + Tb +     '</td>'                         + Br +
          TB + Tb +        '</tr>'                           + Br +
          TB +           '</tbody>'                          + Br +
          TB +           '</table>'                          + Br ;

  var nodeHtml =
          TB +           '<div id="'+duid+'" class="'+cls+'">'  + Br +
                           table                                +
          TB +           '</div><!-- /_node _tuple -->'         + Br ;

  return nodeHtml;
};

// --------------------------------------------------------------------------------------------------------------------
// RENDER | SET NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderSetNodeAsHtml = function( node, TB ) {
  var me = Visualizer.prototype;
  var self = this;

  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var verbose = self.isVerbose();

  var duid     = node.draw.uid;
  var uidHtml = self.uidAsHtmlUID(node.uid, verbose);
  var id      = (!verbose) ? uidHtml : uidHtml + '{id:' + node.id + '}';
  var cls     = "_heap _node _set";

  var values = self.recurseValueRefsToHtmlUID(node.value, verbose);

  var table =
          TB +           '<table>'                           + Br +
          TB + Tb +        '<tr>'                            + Br +
          TB + Tb + Tb +     '<td>' + id + '</td>'           + Br +
          TB + Tb + Tb +     '<td>' + node.type + '</td>'    + Br +
          TB + Tb + Tb +     '<td>' + values + '</td>'       + Br +
          TB + Tb +        '</tr>'                           + Br +
          TB +           '</table>'                          + Br ;

  var nodeHtml =
          TB +           '<div id="'+duid+'" class="'+cls+'">'  + Br +
                            table                               +
          TB +           '</div><!-- /_node _set -->'           + Br ;

  return nodeHtml;
};

// --------------------------------------------------------------------------------------------------------------------
// RENDER | DICTIONARY NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderDictNodeAsHtml = function( node, TB ) {
  var me = Visualizer.prototype;
  var self = this;

  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var verbose = self.isVerbose();

  var duid     = node.draw.uid;
  var uidHtml = self.uidAsHtmlUID(duid, verbose);
  var id      = (!verbose) ? uidHtml : uidHtml + '{id:' + node.id + '}';
  var cls     = "_heap _node _dict";

  var values = self.recurseValueRefsToHtmlUID(node.value, verbose);

  var table =
          TB +           '<table>'                           + Br +
          TB + Tb +        '<tr>'                            + Br +
          TB + Tb + Tb +     '<td>' + id + '</td>'           + Br +
          TB + Tb + Tb +     '<td>' + node.type + '</td>'    + Br +
          TB + Tb + Tb +     '<td>' + values + '</td>'       + Br +
          TB + Tb +        '</tr>'                           + Br +
          TB +           '</table>'                          + Br ;

  var nodeHtml =
          TB +           '<div id="'+duid+'" class="'+cls+'">'+ Br +
                            table                            +
          TB +           '</div><!-- /_node _dict -->'       + Br ;

  return nodeHtml;
};

// --------------------------------------------------------------------------------------------------------------------
// RENDER | ERROR | UNKNOWN NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderUnknownNodeAsHtml = function( node, TB ) {
  console.error("ERROR: renderUnknownNodeAsHtml => Unknown Node type.");

  var Br = "\n";
  var duid     = node.draw.uid;
  var cls = "_heap _node _unknown";

  return '<div id="'+duid+'" class="'+cls+'">Unknown Node</div>'+ Br;
};

// --------------------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.nodeValuesAsHtmlTable = function( values, TB ) {
  TB = TB || "";
  var Br = "\n";
  var Tb = "\t";

  var table = "";
  var row = "";

  if ( values instanceof Array ) {
    table = TB + '<table class="_properties">'                  + Br;

    values.forEach( function(value) {
      if (value instanceof Array) {

        table += TB + Tb +         '<tr>'                       + Br ;
        value.forEach( function(val) {
          table += TB + Tb + Tb +     '<td>' + val + '</td>'    + Br ;
        });
        table += TB + Tb +         '</tr>'                      + Br ;

      } else {
        table += TB + Tb +         '<tr>'                       + Br ;
        table += TB + Tb + Tb +       '<td>' + value + '</td>'  + Br ;
        table += TB + Tb +         '</tr>'                      + Br ;
      }

    });

    table += TB + '</table>'                                    + Br ;
  }

  //if values is not an array:
  else
    row = TB + Tb + Tb +     '<td>' + values + '</td>' + Br ;

  return {asTable: table, asRow: row};
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.recurseValueRefsToHtmlUID = function(values, verbose) {
  var me = Visualizer.prototype;
  var self = this;

  verbose = verbose || self.isVerbose();
  var isArr = (values instanceof Array);

  if ( !isArr && me.isUID(values) )
    return self.uidAsHtmlUID(values,verbose);

  if ( me.isRefObj(values) )
    return self.asHtmlUID( me.getRefUID(values), values, verbose );

  if(isArr)
    values.forEach( function(value,i) {
      values[i] = self.recurseValueRefsToHtmlUID(value, verbose);
    });

  return values;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.uidAsHtmlUID = function(uid, verbose) {
  var me = Visualizer.prototype;
  var self = this;

  verbose = verbose || self.isVerbose();

  if( !me.isUID(uid) )
    return uid;

  return self.asHtmlUID(uid/*=>uid*/,uid/*=>to-display*/, verbose);
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.asHtmlUID = function(uid, values, verbose) {
  var me = Visualizer.prototype;
  var self = this;

  verbose = verbose || self.isVerbose();

  var uid = (verbose) ?
      '<div id="' + uid + '" class="_uid">' + values + '</div>' :
      '<div id="' + uid + '" class="_uid _ptr">' + '</div>';

  return '<div class="_ptrWrapper" >'+uid+'</div>';
};

// --------------------------------------------------------------------------------------------------------------------

String.prototype.toDomElement = function () {
  var wrapper = document.createElement('div');
  wrapper.className = "toDomWrapper";
  wrapper.innerHTML = this;

  return wrapper;
};

// --------------------------------------------------------------------------------------------------------------------
// END
// --------------------------------------------------------------------------------------------------------------------


// --------------------------------------------------------------------------------------------------------------------
// FLOW CONTROL | STACK ? HEAP | RENDER NODE
// --------------------------------------------------------------------------------------------------------------------

/** /
Visualizer.prototype.renderNodeAsHtml = function(node, TB) {
  var me = Visualizer.prototype;
  var self = this;

  if (node.location == NodeLocationTypeEnum.UNDEFINED) {
    console.error("ERROR: renderNodeAsHtml => node location undefined");
    return '<div>LOCATION UNDEFINED</div>'
  }

  if (node.location == NodeLocationTypeEnum.STACK)
    return self.renderFrameNodeAsHtml(node,TB);

  if (node.location == NodeLocationTypeEnum.HEAP)
    return self.renderHeapNodeAsHtml(node,TB);

  console.error("ERROR: renderNodeAsHtml => unknown node location.");
  return '<div>UNKNOWN NODE</div>';
};
/**/