
// ------------------------------------------------------------------------------------------------
// REQUIRE
// ------------------------------------------------------------------------------------------------

var fs 		= require('fs');
var system 	= require('system');
var stdin	= system.stdin;
var stdout	= system.stdout;
var page 	= require('webpage').create();

// ------------------------------------------------------------------------------------------------
// READ-STDIN
// ------------------------------------------------------------------------------------------------

var innerHtml = stdin.readLine();
// console.log('phantomjs: test3.js: innerHtml:', innerHtml);

// ------------------------------------------------------------------------------------------------
// DECLARATIONS
// ------------------------------------------------------------------------------------------------

var base = fs.workingDirectory;
console.log(base);

// ------------------------------------------------------------------------------------------------
// CONFIGURE
// ------------------------------------------------------------------------------------------------

page.viewportSize = { width: 800, height : 600 };

// var content  = '<html><head>';
// 	content += '<link rel="stylesheet" href="./css/style.css" />';
// 	content += '</header><body>';
// 	content += '<script src="libs/jquery-1.8.2.min.js"></script>'
// 	content += innerHtml;
// 	content += '</body></html>';
// page.content = content;
// page.injectJs('libs/jquery-1.8.2.min.js');

var file    = '/Users/ernst/PROJECTS/active/codeviz/src/private/test.html';
var fileUrl = 'file://' + file;

// ------------------------------------------------------------------------------------------------
// EVENTS
// ------------------------------------------------------------------------------------------------

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

// ------------------------------------------------------------------------------------------------

// page.onLoadFinished = function(status) {};

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
// FUNCTIONS
// ------------------------------------------------------------------------------------------------

getDrawProperties = function () {

	var ids = [];
	$('[id]').each(function() { 		//get all elements that have an 'id='
  		ids.push($(this).attr("id")); 	//add id to array
	});

	console.log('getDrawProperties:', ids);

	//if( me.isUndefined(obj) || me.isUndefined(obj.draw) )

	//every obj has parent div "toDomWrapper"
	//var el = $("#"+obj.draw.uid).parent();

	//if ( !el.hasClass( "toDomWrapper" ) )

	// obj.draw.width = el.width();
	// obj.draw.height = el.height();

	// var pos = el.position();
	// var off = el.offset();

	//if( me.isUndefined(pos) || me.isUndefined(off) )

	// obj.draw.position.x = pos.left;
	// obj.draw.position.y = pos.top;
	// obj.draw.offset.x = off.left;
	// obj.draw.offset.y = off.top;

	//if ( isNaN(pos.left) )
	//if ( isNaN(pos.top)  )
	//if ( isNaN(off.left) )
	//if ( isNaN(off.top)  )

	return ids;

};//getDrawProperties

// ------------------------------------------------------------------------------------------------

var insertHtml = function(html) {

    String.prototype.toDomElement = function () {
        var wrapper = document.createElement('div');
        wrapper.className = "toDomWrapper";
        wrapper.innerHTML = this;

        return wrapper;
    };

    document.body.appendChild( html.toDomElement() );
}

// ------------------------------------------------------------------------------------------------

var f4 = function() {
    console.log('f4');

    var status = 'success';
    if (status !== 'success') {
        console.log('FAIL to load the address');
        phantom.exit();
    }

    page.evaluate(insertHtml, innerHtml);
    var res = page.evaluate(getDrawProperties);

    stdout.writeLine('res: ', res);
    page.render('test.png');
    phantom.exit();
}

// ------------------------------------------------------------------------------------------------
// EVALUATE
// ------------------------------------------------------------------------------------------------

page.open(fileUrl,f4);
// var res = page.evaluate(getDrawProperties);
// phantom.exit();

// ------------------------------------------------------------------------------------------------
// END
// ------------------------------------------------------------------------------------------------

/** /
var insertHtml = function(htmlText) {

    String.prototype.toDomElement = function () {
        var wrapper = document.createElement('div');
        wrapper.className = "toDomWrapper";
        wrapper.innerHTML = this;

        return wrapper;
    };

    document.body.appendChild( htmlAsText.toDomElement() );
}
/**/
