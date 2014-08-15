
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// FUNCTIONS | HELPERS
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

Visualizer.prototype.compile = function(data, code, tmpl){
  var self = this;

  var helper = self.getHelper(); 

  //data (re-declare)
  var data   = _.extend({}, data);

  //code
  var func   = eval(code);
      data   = func(data,helper);

  //tmpl
  var cmpl   = PlainHandlebars.compile(tmpl);
  var html   = helper.htmlStrToStr( cmpl(data) );

  return html;
}

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getHelper = function(){
  var self = this;

  return {
          htmlStrToStr: _encodeHtmlStrToStr,
    reduceToSingleLine: _reduceToSingleLine,
               wrapUID: _uid_ToHtmlUID,
              wrapUIDs: _recurseValue_changingRefsToHtmlUID
  }
}

// --------------------------------------------------------------------------------------------------------------------

function _encodeStrToHtmlStr(str) {
  return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
}

// --------------------------------------------------------------------------------------------------------------------

function _encodeHtmlStrToStr(str) {
  return String(str)
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"');
}

// --------------------------------------------------------------------------------------------------------------------

function _reduceToSingleLine(str) {
  return str.replace(/\t/g, '')           // remove all tabs
            .replace(/\r?\n|\r/g, '')     // removes new lines
            .replace(/ +?/g, ' ')         // replace multiple spaces with a single space
            .trim();                      // remove starting/ending spaces
}

// --------------------------------------------------------------------------------------------------------------------

function _recurseValue_changingRefsToHtmlUID(values) {
  var me = Visualizer.prototype;

  var isArr = (values instanceof Array);

  // ------------------------------------------------------------------------------------
  // Exit Conditions
  // ------------------------------------------------------------------------------------

  if ( !isArr && me.isUID(values) )
    return _uid_ToHtmlUID(-1/*=>id*/,values/*=>uid*/);

  if ( me.isRefObj(values) )
    return _uid_ToHtmlUID( me.getRefID(values), me.getRefUID(values) );

  // ------------------------------------------------------------------------------------
  // Recurse
  // ------------------------------------------------------------------------------------

  if(isArr)
    values.forEach( function(value,i) {
      values[i] = _recurseValue_changingRefsToHtmlUID(value);
    });

  // ------------------------------------------------------------------------------------

  return values;

};//recurseValue_changingRefsToHtmlUID

// --------------------------------------------------------------------------------------------------------------------

function _uid_ToHtmlUID(id, uid) {
  var me = Visualizer.prototype;

  // ------------------------------------------------------------------------------------

  var isNr  = me.isNumber(id);
  var isUID = me.isUID(uid);

  if( !isNr )
    console.warn('WARNING | uid_ToHtmlUID | invalid id: ', id);

  if( !isUID )
    console.warn('WARNING | uid_ToHtmlUID | invalid uid: ', uid);    

  // ------------------------------------------------------------------------------------

  if (id < 0)  //ToDo: think about this ...
    id = 'n/a';

  // ------------------------------------------------------------------------------------

  var data = {
     id: id,
    uid: uid
  }

  // ------------------------------------------------------------------------------------

  var code = multiline.stripIndent(function() {/*
      "use strict";

      (function (data,helper) {
          return data;
      });
  */}).trim();

  // ------------------------------------------------------------------------------------

  var tmpl = multiline.stripIndent(function(){/*
      <div class="_uid">
        <div class="_val">id: {{ id }} | {{ uid }}</div><div id="{{ uid }}" class="_ptr"></div>
      </div>
  */});

  // ------------------------------------------------------------------------------------

  var html = me.compile(data,code,tmpl);

  // ------------------------------------------------------------------------------------

  return html;

}; //uid_ToHtmlUID

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// END
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
