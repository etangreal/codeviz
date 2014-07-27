
// ------------------------------------------------------------------------------------------------
// REQUIRE
// ------------------------------------------------------------------------------------------------

fs = require('fs');
var page = require('webpage').create();

// ------------------------------------------------------------------------------------------------
// DECLARATIONS
// ------------------------------------------------------------------------------------------------

var html    = '<html><head></head><body>test<div id="d2">div d2</div></body></html>';
var file    = '/Users/ernst/PROJECTS/active/codeviz/src/private/test.html';
var inner   = '<div id="UID80" class="_heap _node _func">testing-text-to-html</div>';

if ( !fs.isFile(file) )
    console.log('file does not exists.');

var fileUrl = 'file://' + file;

// ------------------------------------------------------------------------------------------------
// CONFIGURE
// ------------------------------------------------------------------------------------------------

//page.viewportSize = { width: 800, height : 600 };
//page.setContent(html,'');
// page.content = html;

//console.log(page.plainText);

//phantom.injectJs('libs/jquery-1.8.2.min.js');
//phantom.injectJs('css/style.css');

// ------------------------------------------------------------------------------------------------
// EVENTS
// ------------------------------------------------------------------------------------------------

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

// ------------------------------------------------------------------------------------------------

page.onLoadFinished = function(status) {
    console.log('onLoadFinished');
    console.log('page-content: ', page.content);
};

// ------------------------------------------------------------------------------------------------

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

// ------------------------------------------------------------------------------------------------
// FUNCTION
// ------------------------------------------------------------------------------------------------

var f1 = function() {
    console.log('f1');

    var html = '<div>hello world</div>';

    var el = document.createElement('div');
    el.id = 'myDiv';
    el.innerHTML = html;
    el.style.background = 'white';
    document.body.appendChild(el);

    console.log('f1: ', document.body.textContent);
}

// ------------------------------------------------------------------------------------------------

var f2 = function() {
    console.log('f2');

    document.write('<html><head></head><body>bite me :D</body></html>');
    console.log('f2: ', document.body.textContent);
}

// ------------------------------------------------------------------------------------------------

var f3 = function(args) {
    console.log('f3');

    var a = args[0];
    var b = args[1];

    console.log(a,b);
}

// ------------------------------------------------------------------------------------------------

var f4 = function() {
    console.log('f4');

    var status = 'success';
    if (status !== 'success') {
        console.log('FAIL to load the address');
        phantom.exit();
    }

    page.includeJs('libs/jquery-1.8.2.min.js', function() { 
        console.log('injectJs');
        //var l = $('#mydiv');
        //console.log( l.html() );

        page.evaluate(function() {
            console.log('page.evaluate: document-content: ', document.body.textContent);
        })

        page.render('test.png');
        phantom.exit();
    });

    console.log('end-of-f4');
}

// ------------------------------------------------------------------------------------------------
// "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"

f5 = function() {
    console.log('f5');

    page.includeJs('libs/jquery-1.8.2.min.js', function() {
        console.log('page.includeJs');
        var res = page.evaluate(function() {
            console.log('testing ...');
            return $('#mydiv').html();
        });

        console.log('res: ', res);
        phantom.exit();
    });
}

// ------------------------------------------------------------------------------------------------

f6 = function() {
    console.log('f6');

    var res = page.evaluate(function() {
        console.log('testing ...');
        return $('#mydiv').html();
    });

    console.log('res: ', res);
    phantom.exit();
}

// ------------------------------------------------------------------------------------------------

var f7 = function(inner) {
    console.log('f7');

    var html = '<div>hello world</div>';

    var el = document.createElement('div');
    el.id = 'myDiv';
    el.innerHTML = inner;
    el.style.background = 'white';
    document.body.appendChild(el);

    console.log('f7: ', document.body.innerHTML);
}

// ------------------------------------------------------------------------------------------------

var f8 = function(htmlText) {
    console.log('f8');

    String.prototype.toDomElement = function () {
        var wrapper = document.createElement('div');
        wrapper.className = "toDomWrapper";
        wrapper.innerHTML = this;

        return wrapper;
    };

    document.body.appendChild( htmlText.toDomElement() );

    console.log('f8: ', document.body.innerHTML);
}


// ------------------------------------------------------------------------------------------------
// EVALUATE
// ------------------------------------------------------------------------------------------------

//args = [ 'x51', 'angels' ]
// page.evaluate(f8, inner);
// phantom.exit();

page.open(fileUrl, f4);


// ------------------------------------------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------------------------------------------

//var output = document.getElementById("container");
//    output.appendChild( html.toDomElement() )



// ------------------------------------------------------------------------------------------------
// SUNDRY
// ------------------------------------------------------------------------------------------------

console.log('end-of-file');


// ------------------------------------------------------------------------------------------------
// END
// ------------------------------------------------------------------------------------------------
