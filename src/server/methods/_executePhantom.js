
// --------------------------------------------------------------------------------------------------------------------
// REQUIRE
// --------------------------------------------------------------------------------------------------------------------

//var fs 			= Npm.require('fs');
var path 			= Npm.require('path');
var process 		= Npm.require('child_process');
var execFile 		= process.execFile;
var spawn			= process.spawn;

// --------------------------------------------------------------------------------------------------------------------
// PATHS
// --------------------------------------------------------------------------------------------------------------------

var phantomBinPath 	= Meteor.require('phantomjs').path;
var serverPath 		= path.resolve('.');
var projectPath 	= path.resolve('.').split('.meteor')[0];
var privatePath		= serverPath + '/assets/app/phantomjs/';

/** /
console.log('phantomBinPath: ', phantomBinPath);
console.log('    serverPath: ', serverPath);
console.log('   projectPath: ', projectPath);
console.log('   privatePath: ', privatePath);
/**/

// --------------------------------------------------------------------------------------------------------------------
// PUBLIC FUNCTIONS
// --------------------------------------------------------------------------------------------------------------------

_phantomSpawnTest = function(id) {

	var nodes = [];

	try {
		var nodes = _getNodes(id);
	} catch (e) {
		console.log(e);
		console.error('ERROR: _phantomSpawnTest: ' + e.message);
	}

	if (nodes.length <= 0) {
		console.log('ERROR: _phantomSpawnTest: nodes.lenght <= 0');
		return;
	}

	// ----------------------------------------------------------------------------------------------------------------

	console.log('============================================================');
	console.log('_phantomSpawnTest: START');

	var filepath	= privatePath + 'test.js';
	var args 		= [ filepath ];

	var res = Async.runSync(function(done) {

		var result = '';
		var child = spawn(phantomBinPath, args);

		child.stdout.on('data', function (data) {
			result += data;
		});

		child.stderr.on('data', function (data) {	
			console.log('stderr: ' + data);
			done(data,'error');
		});

		child.on('close', function (code) {
			//console.log('child process exited with code ' + code);
			done(null, result);
		});

		child.stdin.write( JSON.stringify(nodes) + '\n');

	});//Async.runSync

	console.log('_phantomSpawnTest: END');
	console.log('res.error: ', res.error);
	console.log('res.result: ', res.result );
	console.log('============================================================');

	// ----------------------------------------------------------------------------------------------------------------

}//_phantomSpawnTest

// --------------------------------------------------------------------------------------------------------------------
// PRIVATE FUNCTIONS
// --------------------------------------------------------------------------------------------------------------------

function _getDocument(id) {
	var doc = Documents.findOne(id);

	if (!doc)
		throw 'ERROR: _getDoc | Unable to find document for id:' + id;

	return doc;
}

// --------------------------------------------------------------------------------------------------------------------

function _getSnapshots(id) {
	
	var doc = _getDocument(id);

	if (!doc.snapshots)
		throw 'ERROR: _getSnapshots | Unable to find snapshots for doc with id:' + id;

	return doc.snapshots;
}

// --------------------------------------------------------------------------------------------------------------------

function _getNodes(id) {

	var nodes = [];
	var snapshots = _getSnapshots(id);

	snapshots.forEach(function(snapshot) {       //FOR-EACH SNAPSHOT

		var stack = snapshot.stack;

		stack.forEach(function(frame) {          //FOR-EACH FRAME-NODE-OBJ

			var nodeObj = {
				uid: frame.draw.uid,
				html: frame.html
			}

			nodes.push(nodeObj);

		});//forEach-frame

		// ------------------------------------------

		var heap = snapshot.heap;

		heap.forEach(function(heapObj) {		 //FOR-EACH HEAP-OBJ
			if (heapObj.id > 0) {                //ToDo: #HACK the first heap object is a "dummy/fill-in" this is because the trace object id starts from 1!

				var nodeObj = {
					uid: heapObj.uid,
					html: heapObj.html
				}

				nodes.push(nodeObj);
			}
		});//forEach-heapObj

		// ------------------------------------------

	});//snapshots.forEach

	return nodes.slice(0,1);

}//_getNodes


// --------------------------------------------------------------------------------------------------------------------
// END
// --------------------------------------------------------------------------------------------------------------------
