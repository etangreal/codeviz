
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// RENDER | STACK
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

Visualizer.prototype.renderStackTmpl = function(stack) {
  var me = Visualizer.prototype;
  var self = this;

  stack.forEach(function(frame) {
    frame.render = me.renderFrameTmpl(frame);
  });

};

// --------------------------------------------------------------------------------------------------------------------
// RENDER | STACK | FRAME 
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderFrameTmpl = function(frame) {
  var me = Visualizer.prototype;
  var self = this;

  // ------------------------------------------------------------------------------------

  var duid   = frame.draw.uid;
  var cls    = (frame.meta.is_highlighted) ? '_frame _active' : '_frame';
  var locals = [];

  frame.locals.forEach( function(node) {
    locals.push({
      name: node.name,
      value: self.recurseValue_changingRefsToHtmlUID(node.value)
    });
  });

  // ------------------------------------------------------------------------------------

  var data = {
      duid: duid,
       cls: cls,
     fname: frame.name,
    locals: locals
  }

  // ------------------------------------------------------------------------------------

  var tmpl =
  '<div id="{{ duid }}" class="{{ cls }}"> \
    <table> \
      <tr><td><div class="_fname">{{ name }}</div></td></tr> \
      <tr><td> \
        <table class="_locals"> \
        {{#each locals}} \
          <tr> \
            <td><div class="_name">{{ this.name }}</div></td> \
            <td><div class="_value">{{ this.value }}</div></td> \
          </tr> \
        {{/each}} \
        </table> \
      </td></tr> \
    </table> \
  </div>';

  var html = '';

  // ------------------------------------------------------------------------------------

  frame.render = {
    data: data,
    tmpl: tmpl,
    html: html
  }

};//renderFrameTmpl

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// RENDER | HEAP
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

Visualizer.prototype.renderHeapTmpl = function(heap) {
  var me = Visualizer.prototype;
  var self = this;

  heap.forEach(function(heapObj) {
    if (heapObj.type == NodeTypeEnum.NONE) // #HACK: skip the first 'dummy' object
      return;

    heapObj.render = self.renderHeapNodeTmpl(heapObj);
  });
};

// --------------------------------------------------------------------------------------------------------------------
// VISITOR | HEAP | NODES
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderHeapNodeTmpl = function(node) {
  var me = Visualizer.prototype;
  var self = this;

  if ( node.type == NodeTypeEnum.NONE || node.type == NodeTypeEnum.UNKNOWN )
    return me.renderEmptyNodeTmpl();

  if ( node.type == NodeTypeEnum.POINTER )
    return self.renderRefNodeTmpl(node);

  if ( node.type == NodeTypeEnum.FUNCTION )
    return self.renderFuncNodeTmpl(node);

  if ( node.type == NodeTypeEnum.CLASS )
    return self.renderClassNodeTmpl(node);

  if ( node.type == NodeTypeEnum.INSTANCE )
    return self.renderInstanceNodeTmpl(node);

  if ( node.type == NodeTypeEnum.LIST )
    return self.renderListNodeTmpl(node);

  if ( node.type == NodeTypeEnum.TUPLE )
    return self.renderTupleNodeTmpl(node);

  if ( node.type == NodeTypeEnum.SET )
    return self.renderSetNodeTmpl(node);

  if ( node.type == NodeTypeEnum.DICT )
    return self.renderDictNodeTmpl(node);

  return me.renderUnknownNodeTmpl(node);
};

// --------------------------------------------------------------------------------------------------------------------
// RENDER | HEAP | EMPTY NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderEmptyNodeTmpl = function() {
  console.warn("WARNING: renderEmptyNodeTmpl => we have an empty node. This was unexpected.");

  var uid = "UID-EMPTY";
  var cls = "_empty";

  // ------------------------------------------------------------------------------------

  data = {
    uid: uid,
    cls: cls
  }

  // ------------------------------------------------------------------------------------

  var tmpl = '<div id="{{ uid }}" class="{{ cls }}">Unknown Node</div>';
  var html = '';

  // ------------------------------------------------------------------------------------

  return {
    data: data,
    tmpl: tmpl,
    html: html
  }

};//renderEmptyNodeTmpl

// --------------------------------------------------------------------------------------------------------------------
// RENDER | HEAP | REFERENCE NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderRefNodeTmpl = function(node) {
  var me = Visualizer.prototype;
  var self = this;

  console.warn("WARNING | renderRefNodeTmpl | We have a reference node. This was unexpected: ", node);

  // ------------------------------------------------------------------------------------

  var duid    = node.draw.uid;
  var uid     = self.uidAsHtmlUID(node.id, node.uid);
  var cls     = "_heap _ref";
  var value   = self.recurseValue_changingRefsToHtmlUID(node.value);

  // ------------------------------------------------------------------------------------

  var data = {
       duid: duid,
        cls: cls,
        uid: uid,
       type: node.type,
       name: node.name,
      value: value,
    pointer: node.pointer
  }

  // ------------------------------------------------------------------------------------

  var tmpl =
  '<div id="{{ duid }}" class="{{ cls }}"> \
  <table> \
    <tr> \
      <td>{{ uid }}</td> \
      <td>{{ type }}</td> \
      <td>{{ name }}</td> \
      <td>{{ value }}</td> \
      <td>{{ pointer }}</td> \
    </tr> \
  </table> \
  </div>';

  var html = '';

  // ------------------------------------------------------------------------------------

  return {
    data: data,
    tmpl: tmpl,
    html: html
  }

};//renderRefNodeTmpl

// --------------------------------------------------------------------------------------------------------------------
// RENDER | HEAP | FUNCTION NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderFuncNodeTmpl = function(node) {
  var me = Visualizer.prototype;
  var self = this;

  // ------------------------------------------------------------------------------------

  var duid    = node.draw.uid;
  var uid     = self.uidAsHtmlUID(node.id, node.uid);
  var cls     = "_heap _func";

  // ------------------------------------------------------------------------------------

  var data = {
    duid: duid,
     cls: cls,
     uid: uid,
    type: node.type,
    name: node.name
  }

  // ------------------------------------------------------------------------------------

  var tmpl =
  '<div id="{{ duid }}" class="{{ cls }}"> \
    <table> \
      <thead> \
        <tr> \
          <td colspan="2">{{ type }} </td> \
        </tr> \
      </thead> \
      <tbody> \
        <tr> \
        <td>{{ uid }}</td> \
        <td>{{ name </td> \
        </tr> \
      </tbody> \
    </table> \
  </div>';

  var html = '';

  // ------------------------------------------------------------------------------------

  return {
    data: data,
    tmpl: tmpl,
    html: html
  }

};//renderFuncNodeTmpl

// --------------------------------------------------------------------------------------------------------------------
// RENDER | HEAP | CLASS NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderClassNodeTmpl = function( node ) {
  var me = Visualizer.prototype;
  var self = this;

  // ------------------------------------------------------------------------------------

  var duid    = node.draw.uid;
  var uid     = self.uidAsHtmlUID(node.id, node.uid);
  var cls     = "_heap _class";
  var values  = self.recurseValue_changingRefsToHtmlUID(node.value);

  // ------------------------------------------------------------------------------------

  var data = {
        duid: duid,
         cls: cls,
         uid: uid,
        type: node.type,
        name: node.name,
    inherits: node.inherits,
      values: values
  }

  // ------------------------------------------------------------------------------------

  var tmpl =
  '<div id="{{ duid }}" class="{{ cls }}"> \
    <table> \
    <thead> \
        <tr> \
          <td>{{ uid }}</td> \
          <td>{{ type }}</td> \
          <td>{{ name }}</td> \
          <td>{{ inherits }}</td> \
        </tr> \
    <thead> \
    <tbody> \
      <tr> \
        <table class="_properties"> \
          <tr> \
            {{#each values}} \
              <td>{{ this }}</td> \
            {{/each}} \
          </tr> \
        </table> \
      </tr> \
    </tbody> \
    </table> \
  </div>';

  var html = '';

  // ------------------------------------------------------------------------------------

  return {
    data: data,
    tmpl: tmpl,
    html: html
  }

};//renderClassNodeTmpl

// --------------------------------------------------------------------------------------------------------------------
// RENDER | HEAP | INSTANCE NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderInstanceNodeTmpl = function( node ) {
  var me = Visualizer.prototype;
  var self = this;

  // ------------------------------------------------------------------------------------

  var duid    = node.draw.uid;
  var uid     = self.uidAsHtmlUID(node.id, node.uid);
  var cls     = "_heap _instance";
  var values  = self.recurseValue_changingRefsToHtmlUID(node.value);

  // ------------------------------------------------------------------------------------

  var data = {
        duid: duid,
         cls: cls,
         uid: uid,
        type: node.type,
        name: node.name,
    inherits: node.inherits,
      values: values
  }

  // ------------------------------------------------------------------------------------

  var tmpl =
  '<div id="{{ duid }}" class="{{ cls }}"> \
    <table> \
    <thead> \
        <tr> \
          <td>{{ uid }}</td> \
          <td>{{ type }}</td> \
          <td>{{ name }}</td> \
          <td>{{ inherits }}</td> \
        </tr> \
    <thead> \
    <tbody> \
      <tr> \
        <table class="_properties"> \
          <tr> \
            {{#each values}} \
              <td>{{ this }}</td> \
            {{/each}} \
          </tr> \
        </table> \
      </tr> \
    </tbody> \
    </table> \
  </div>';

  var html = '';

  // ------------------------------------------------------------------------------------

  return {
    data: data,
    tmpl: tmpl,
    html: html
  }

};//renderInstanceNodeTmpl

// --------------------------------------------------------------------------------------------------------------------
// RENDER | HEAP | LIST NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderListNodeTmpl = function(node) {
  var me = Visualizer.prototype;
  var self = this;

  // ------------------------------------------------------------------------------------

  var duid    = node.draw.uid;
  var uid     = self.uidAsHtmlUID(node.id, node.uid);
  var cls     = "_heap _list";
  var values  = self.recurseValue_changingRefsToHtmlUID(node.value);

  // ------------------------------------------------------------------------------------

  var data = {
      duid: duid,
       uid: uid,
       cls: cls,
      type: node.type,
    values: values
  }

  // ------------------------------------------------------------------------------------

  var tmpl =
 '<div id="{{ duid }}" class="{{ cls }}"> \
  <table> \
    <tr> \
      <td>{{ uid }}</td> \
      <td>{{ type }}</td> \
      <td> \
        {{#each values}} \
          {{ this }} \
        {{/each}}} \
      </td> \
    </tr> \
  </table> \
  </div>';

  html = '';

  // ------------------------------------------------------------------------------------

  return {
    data: data,
    tmpl: tmpl,
    html: html
  }

};//renderListNodeTmpl

// --------------------------------------------------------------------------------------------------------------------
// RENDER | HEAP | TUPLE NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderTupleNodeTmpl = function(node) {
  var me = Visualizer.prototype;
  var self = this;

  // ------------------------------------------------------------------------------------

  var duid    = node.draw.uid;
  var uid     = self.uidAsHtmlUID(node.id, node.uid);
  var cls     = "_heap _tuple";
  var values  = self.recurseValue_changingRefsToHtmlUID(node.value);

  // ------------------------------------------------------------------------------------

  var data = {
      duid: duid,
       uid: uid,
       cls: cls,
      type: node.type,
    values: values
  }

  // ------------------------------------------------------------------------------------

  var tmpl =
 '<div id="{{ duid }}" class="{{ cls }}"> \
    <table> \
      <thead> \
        <tr> \
            <td colspan="2">{{ type }}</td> \
        </tr> \
      </thead> \
      <tbody> \
        <tr> \
            <td>{{ uid }}</td> \
            <td> \
              {{#each values}} \
                {{ this }} \
              {{/each}} \
            </td> \
        </tr> \
      </tbody> \
    </table> \
  </div>';

  var html = '';

  // ------------------------------------------------------------------------------------

  return {
    data: data,
    tmpl: tmpl,
    html: html
  }

};//renderTupleNodeTmpl

// --------------------------------------------------------------------------------------------------------------------
// RENDER | HEAP | SET NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderSetNodeTmpl = function(node) {
  var me = Visualizer.prototype;
  var self = this;

  // ------------------------------------------------------------------------------------

  var duid    = node.draw.uid;
  var uid     = self.uidAsHtmlUID(node.id, node.uid);
  var cls     = "_heap _set";
  var values  = self.recurseValue_changingRefsToHtmlUID(node.value);

  // ------------------------------------------------------------------------------------

  var data = {
      duid: duid,
       uid: uid,
       cls: cls,
      type: node.type,
    values: values
  }

  // ------------------------------------------------------------------------------------

  var nodeTmpl =
  '<div id="{{ duid }}" class="{{ cls }}"> \
    <table> \
      <tr> \
        <td></td> \
        <td>{{ type }}</td> \
        <td> \
          {{#each values}} \
            {{ this }} \
          {{/each}} \
        </td> \
      </tr> \
    </table> \
  </div>';

  var tmpl = nodeTmpl;

  // ------------------------------------------------------------------------------------

  return {
    data: data,
    tmpl: tmpl,
    html: html
  }

};//renderSetNodeTmpl

// --------------------------------------------------------------------------------------------------------------------
// RENDER | HEAP | DICTIONARY NODE
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderDictNodeTmpl = function(node) {
  var me = Visualizer.prototype;
  var self = this;

  // ------------------------------------------------------------------------------------

  var duid    = node.draw.uid;
  var uid     = self.uidAsHtmlUID(node.id, node.uid);
  var cls     = "_heap _dict";
  var values  = self.recurseValue_changingRefsToHtmlUID(node.value);

  // ------------------------------------------------------------------------------------

  var data = {
      duid: duid,
       uid: uid,
       cls: cls,
      type: type,
    values: values
  }

  // ------------------------------------------------------------------------------------

  var tmpl =
  '<div id="{{ duid }}" class="{{ cls }}"> \
  <table> \
    <tr> \
      <td>{{ uid }}</td> \
      <td>{{ type }}</td> \
      <td> \
        {{#each values}} \
          {{ this }} \
        {{/each}} \
      </td> \
    </tr> \
  </table> \
  </div>';

  var html = '';

  // ------------------------------------------------------------------------------------

  return {
    data: data,
    tmpl: tmpl,
    html: html
  }

};//renderDictNodeTmpl

// --------------------------------------------------------------------------------------------------------------------
// RENDER | HEAP | UNKNOWN NODE (error)
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.renderUnknownNodeTmpl = function(node) {
  console.warn('WARNING | renderUnknownNodeTmpl | Unknown Node type: ', node);

  // ------------------------------------------------------------------------------------

  var duid = node.draw.uid;
  var cls  = '_heap _unknown';

  // ------------------------------------------------------------------------------------

  var data = {
    duid: duid,
     cls: cls
  }

  // ------------------------------------------------------------------------------------

  var tmpl = '<div id="{{ duid }}" class="{{ cls }}">Unknown Node</div>';
  var html = '';

  // ------------------------------------------------------------------------------------

  return {
      data: data,
      tmpl: tmpl,
      html: html
  }

};//renderUnknownNodeTmpl

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// FUNCTIONS | HELPERS
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

Visualizer.prototype.recurseValue_changingRefsToHtmlUID = function(values) {
  var me = Visualizer.prototype;
  var self = this;

  var isArr = (values instanceof Array);

  // ------------------------------------------------------------------------------------
  // Exit Conditions
  // ------------------------------------------------------------------------------------

  if ( !isArr && me.isUID(values) )
    return self.uidAsHtmlUID(0/*=>id*/,values/*=>uid*/);

  if ( me.isRefObj(values) )
    return self.uidAsHtmlUID( me.getRefID(values), me.getRefUID(values) );

  // ------------------------------------------------------------------------------------
  // Recurse
  // ------------------------------------------------------------------------------------

  if(isArr)
    values.forEach( function(value,i) {
      values[i] = self.recurseValue_changingRefsToHtmlUID(value);
    });

  // ------------------------------------------------------------------------------------

  return values;

};//recurseValue_changingRefsToHtmlUID

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.uidAsHtmlUID = function(id, uid) {
  var me = Visualizer.prototype;
  var self = this;

  // ------------------------------------------------------------------------------------

  var isNr  = me.isNumber(id);
  var isUID = me.isUID(uid);

  if( !isNr )
    console.warn('WARNING | uidAsHtmlUID | invalid id: ', id);

  if( !isUID )
    console.warn('WARNING | uidAsHtmlUID | invalid uid: ', uid);    

  // ------------------------------------------------------------------------------------

  var data = {
     id: id,
    uid: uid
  }

  // ------------------------------------------------------------------------------------

  var tmpl =
  '<div class="_uid" > \
    <div class="_val">id: {{ id }}|</div><div id="{{ uid }}" class="_ptr"></div> \
  </div>';

  var html = '';

  // ------------------------------------------------------------------------------------

  return tmpl; //ToDo: return merged template...

}; //uidAsHtmlUID

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// END
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
