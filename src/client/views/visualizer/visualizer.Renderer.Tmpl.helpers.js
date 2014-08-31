
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// FUNCTIONS | HELPERS
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

Visualizer.prototype.compile = function(data, code, tmpl) {
  var me   = Visualizer.prototype;
  var self = this;

  var helper = me.getHelper(); 

  //data (clone & redeclare)
  var data   = _clone(data);

  try {

    //code
    var func   = eval(code);
        data   = func(data,helper,PlainHandlebars);

  } catch(e) {
    console.log('error: ', e.message)
  }

  //tmpl
  var cmpl   = PlainHandlebars.compile(tmpl);
  var html   = helper.htmlStrToStr( cmpl(data) );

  return html;
}

// --------------------------------------------------------------------------------------------------------------------

function _clone(data) {
  return JSON.parse(JSON.stringify(data));
}

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getHelper = function(){
  var me = Visualizer.prototype;
  var self = this;

  return {
          htmlStrToStr: _encodeHtmlStrToStr,
    reduceToSingleLine: _reduceToSingleLine,
               wrapUID: _uid_ToHtmlUID,
              wrapUIDs: _recurseValue_changingRefsToHtmlUID,
                 toBin: _toBin,
               toBin64: _toBin64,
          toChessboard: _toChessboard
  }
}

// --------------------------------------------------------------------------------------------------------------------

function _toBin(num) {

    if(num >= 0) {
        return num.toString(2);

    } else {
        /* Here you could represent the number in 2s compliment but this is not what 
           JS uses as its not sure how many bits are in your number range. There are 
           some suggestions http://stackoverflow.com/questions/10936600/javascript-decimal-to-binary-64-bit 
        */
        return (~num).toString(2);
    }
}

// --------------------------------------------------------------------------------------------------------------------

function _toBin64(num) {

  function pad(len) {
    var s = '00000000'+'00000000'+'00000000'+'00000000'+'00000000'+'00000000'+'00000000'+'00000000'
    var l = s.length-len;
    var sub = s.substr(0, l);

    return sub;
  }

  var val = _toBin(num);
  var len = val.length;

  val = pad(len) + val;

  return val;
}

// --------------------------------------------------------------------------------------------------------------------

function _toChessboard(bits) {
  
  var board = []; 
  for(var j=0; j<8; j++) {
    board.push( bits.slice(j*8,j*8+8).split("") );
  }

  return board;
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
