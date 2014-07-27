
// ------------------------------------------------------------------------------------------------
// REQUIRE
// ------------------------------------------------------------------------------------------------
var page    = require('webpage').create();

var fs      = require('fs');
var system  = require('system');
var stdin	  = system.stdin;
var stdout	= system.stdout;

// ------------------------------------------------------------------------------------------------
// DECLARATIONS
// ------------------------------------------------------------------------------------------------

var file    = fs.workingDirectory + '/assets/app/test.html';
var fileUrl = 'file://' + file;

var stdin_htmlAsText = '';

// ------------------------------------------------------------------------------------------------
// CONFIGURE
// ------------------------------------------------------------------------------------------------

page.viewportSize = { width: 800, height : 600 };

var content  = '<html><head>';
    content += '  <link rel="stylesheet" href="./css/style.css" />';
 // content += '  <script src="libs/jquery-1.8.2.min.js"></script>';
    content += '</head><body>/body></html>';

//page.content = content;
//page.injectJs('libs/jquery-1.8.2.min.js');

// ------------------------------------------------------------------------------------------------
// EVENTS
// ------------------------------------------------------------------------------------------------

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.onLoadFinished = function() {
  console.log('done loading...');
}

// ------------------------------------------------------------------------------------------------
// FUNCTIONS
// ------------------------------------------------------------------------------------------------

var log = function(obj) {
  var Br = "\n";
  console.log(
             "uid: " + obj.uid        + Br +
           "width: " + obj.width      + Br +
          "height: " + obj.height     + Br +
      "position.x: " + obj.position.x + Br +
      "position.y: " + obj.position.y + Br +
      "position.z: " + obj.position.z + Br +
        "offset.x: " + obj.offset.x   + Br +
        "offset.y: " + obj.offset.y   + Br
  );
};

// ------------------------------------------------------------------------------------------------

getProperties = function (ids) {
  console.log('getProperties: ids:', ids);
  // var ids = [];
  // $('[id]').each(function() {          //get all elements that have an 'id='
  //     ids.push($(this).attr("id"));    //add id to array
  // });

  var objs = [];

  // ----------------------------------------------------------------------------------------------

  ids.forEach(function(id) {
    var obj = {
        uid: id
      , position: {x:0, y:0, z:0}
      , offset: {x:0, y:0}
      , width: 0
      , height: 0
    };

    console.log( document.documentElement.scrollTop );
    var rect = document.getElementById(id).getBoundingClientRect();
    console.log( 'left, top, right, bottom', rect.left, rect.top, rect.right, rect.bottom );

    var el = $("#"+obj.uid).parent();  //every obj's parent has a div "toDomWrapper"

    // console.log('******* ELEMENT **********');
    // console.log( el.html() );

    if (!el.hasClass("toDomWrapper")) {
      console.log( 'uid: ', obj.uid, ' | el: ', el.html() );

    } else {
      obj.width = el.width();
      obj.height = el.height();

      var pos = el.position();
      obj.position.x = pos.left;
      obj.position.y = pos.top;

      var off = el.offset();
      obj.offset.x = off.left;
      obj.offset.y = off.top;

      objs.push(obj);
    }//if(!el..else)

  });//ids.forEach

  // ----------------------------------------------------------------------------------------------

  return JSON.stringify(objs);
  // return ids;

};//getDrawProperties

// ------------------------------------------------------------------------------------------------

var insertHtml = function(htmlAsText) {

  String.prototype.toDomElement = function () {
    var wrapper = document.createElement('div');
    wrapper.className = "toDomWrapper";
    wrapper.innerHTML = this;

    return wrapper;
  };

  document.body.appendChild( htmlAsText.toDomElement() );
}

// ------------------------------------------------------------------------------------------------

var onPageLoad = function(status) {
    console.log('onPageLoad. status: ', status);

    // if (status !== 'success') {
    //     console.log('FAIL to load the address');
    //     phantom.exit(1);
    // }

    var objs = JSON.parse(stdin_htmlAsText);
    var ids = [];

    console.log('objs: ', stdin_htmlAsText );

    objs.forEach( function(obj) {
        page.evaluate(insertHtml, obj.html);
        ids.push(obj.uid);
    });

    var res = page.evaluate(getProperties, ids);

    console.log( page.content );

    stdout.writeLine(res);
    //phantom.exit(0);

    window.setTimeout(function () {
      page.render('test.png');
      phantom.exit();
    }, 200);
}

// ------------------------------------------------------------------------------------------------
// EXECUTE
// ------------------------------------------------------------------------------------------------

console.log('stdin.readLine');
stdin_htmlAsText = stdin.readLine();
console.log('stdin_htmlAsText', stdin_htmlAsText);

console.log('page.open');
page.open(fileUrl, onPageLoad);
//onPageLoad({status: 'success'});

// ------------------------------------------------------------------------------------------------
// END
// ------------------------------------------------------------------------------------------------

/** /
phantom.onError = function(msg, trace) {
  var msgStack = ['PHANTOM ERROR: ' + msg];

  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
    });
  }

  console.error(msgStack.join('\n'));
  phantom.exit(1);
};

// ------------------------------------------------------------------------------------------------

page.onError = function(msg, trace) {
  var msgStack = ['ERROR: ' + msg];

  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
  }

  console.error(msgStack.join('\n'));
};
/**/

