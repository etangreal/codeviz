
// ------------------------------------------------------------------------------------------------
// REQUIRE
// ------------------------------------------------------------------------------------------------
var page    = require('webpage').create();

var fs      = require('fs');
var stdin	= require('system').stdin;
var stdout	= require('system').stdout;

// ------------------------------------------------------------------------------------------------
// DECLARATIONS
// ------------------------------------------------------------------------------------------------

var file    = fs.workingDirectory + '/assets/app/test.html';
var fileUrl = 'file://' + file;

var stdinput = stdin.readLine();

// ------------------------------------------------------------------------------------------------
// PAGE | EVENTS
// ------------------------------------------------------------------------------------------------

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

// ------------------------------------------------------------------------------------------------
// FUNCTIONS
// ------------------------------------------------------------------------------------------------

var appendHtmlToPage = function(htmlAsText) {

	String.prototype.toDomElement = function () {
		var wrapper = document.createElement('div');
		wrapper.className = "toDomWrapper";
		wrapper.innerHTML = this;

		return wrapper;
	};

	document.body.appendChild( htmlAsText.toDomElement() );
}

// ------------------------------------------------------------------------------------------------

getProperties = function (ids) {
  
	var objs = [];

	ids.forEach(function(id) {

		var obj = {
			uid: id
			, position: {x:0, y:0, z:0}
			, offset: {x:0, y:0}
			, width: 0
			, height: 0
		};

		var el = $("#"+obj.uid).parent();  //every obj's parent has a div "toDomWrapper"

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

		}//if(!el..)
	});//ids.forEach

	return JSON.stringify(objs);

};//getDrawProperties

// ------------------------------------------------------------------------------------------------

var process = function(stdinput) {

	var ids = [];
	var objs = JSON.parse(stdinput);

	objs.forEach( function(obj) {
		page.evaluate(appendHtmlToPage, obj.html);
		ids.push(obj.uid);
	});
  
  	return ids;
}


// ------------------------------------------------------------------------------------------------

var onPageLoaded = function(status) {
    if (status !== 'success') {
        console.log('FAIL to load the address');
        phantom.exit(1);
    }

    var ids = process(stdinput);
    var res = page.evaluate(getProperties, ids);

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

page.open(fileUrl, onPageLoaded);

// ------------------------------------------------------------------------------------------------
// END
// ------------------------------------------------------------------------------------------------

