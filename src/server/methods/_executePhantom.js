
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
var privatePath		= serverPath + '/assets/app/';

/** /
console.log('phantomBinPath: ', phantomPath);
console.log('    serverPath: ', serverPath);
console.log('   projectPath: ', projectPath);
console.log('   privatePath: ', privatePath);
/**/

// --------------------------------------------------------------------------------------------------------------------
// PUBLIC FUNCTIONS
// --------------------------------------------------------------------------------------------------------------------

_phantomExecFileTest = function() {

	console.log('STARTED _phantomExecFileTest');

	var filepath	= privatePath + 'loadspeed.js'
	var args 		= [ filepath, 'http://www.google.com' ];

	var res = Async.runSync(function(done) {
		execFile(phantomBinPath, args, function(err, stdout, stderr) {
			console.log('err: ', err);
			console.log('stdout: ', stdout);
			console.log('stderr: ', stderr);
			done(err,stdout);
		});//execFile
	});//Async.runSync

	console.log('_phantomExecFileTest DONE.');
	console.log('res.error: ', res.error);
	console.log('res.result: ', res.result);
}

// --------------------------------------------------------------------------------------------------------------------

_phantomSpawnTest = function() {

	console.log('START _phantomSpawnTest');

	var filepath	= privatePath + 'loadspeed.js'
	var args 		= [ filepath, 'http://www.google.com' ];

	var res = Async.runSync(function(done) {
		
		var ls = spawn(phantomBinPath, args);
		var result = '';

		ls.stdout.on('data', function (data) {
			console.log('stdout: ' + data);
			result += data;
		});
	
		ls.stderr.on('data', function (data) {	
			console.log('stderr: ' + data);
			done(data,'error');
		});
	
		ls.on('close', function (code) {
			console.log('child process exited with code ' + code);
			done(null, result);
		});

	});//Async.runSync

	console.log('_phantomSpawnTest DONE.');
	console.log('res.error: ', res.error);
	console.log('res.result: ', res.result);

}

// --------------------------------------------------------------------------------------------------------------------
// END
// --------------------------------------------------------------------------------------------------------------------
