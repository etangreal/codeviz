
// ---------------------------------------------------------------------------------------------------------------------
// COLLECTIONS
// ---------------------------------------------------------------------------------------------------------------------

var Docs = new Meteor.Collection('docs');

// ---------------------------------------------------------------------------------------------------------------------
// ZERO-RPC
//
//	ARTICLE: Communicating between node.js and Python
//		URL: 	ianhinsdale.com/code/2013/12/08/communicating-between-nodejs-and-python
//		URL: zerorpc.dotcloud.com
//
//	ARTICLE: Complete NPM integration for Meteor	
//		URL: 	meteorhacks.com/complete-npm-integration-for-meteor.html
//
//	(OTHER OPTION)
//	  TITLE: Child Process
//		URL: 	nodejs.org/api/child_process.html
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// METEOR METHODS
// ---------------------------------------------------------------------------------------------------------------------

Meteor.methods({

	executeCode: _executeCode

});//Meteor.methods

// -----------------------------------------------------------------------------------------------------------------
// DECLARATIONS
// -----------------------------------------------------------------------------------------------------------------

function _executeCode(id) {} //dummy declaration - just to satisfy meteor

// -----------------------------------------------------------------------------------------------------------------
// METEOR.IS-SERVER
// -----------------------------------------------------------------------------------------------------------------

if (Meteor.isServer) {

	// -----------------------------------------------------------------------------------------------------------------
	// DECLARATIONS
	// -----------------------------------------------------------------------------------------------------------------

	var zerorpc = Meteor.require('zerorpc');
	var zrpcClient;

	// -----------------------------------------------------------------------------------------------------------------
	// STARTUP
	// -----------------------------------------------------------------------------------------------------------------

	Meteor.startup(function() {

		zrpcClient = new zerorpc.Client({ timeout: 30 });
		zrpcClient.connect("tcp://127.0.0.1:4242");

	});

	// -----------------------------------------------------------------------------------------------------------------
	// FUNCTIONS
	// -----------------------------------------------------------------------------------------------------------------

	function _executeCode(id) {
		try {
			_checkIsValidId(id);

			var doc = _getDoc(id);

			var user_script = _getCode(doc);
			var raw_input_json = '';
			var options_json = JSON.stringify( _getBackendOptions() );

			var res = _rpcExecuteCode(user_script, raw_input_json, options_json);
			var data = _getData(res);

			var snapshots = _processTrace(data);

			_saveSnapshot(id, snapshots);

		} catch(e) {
			console.log('ERROR: methods.js | Meteor.methods | executeCode\n\t' + e.message);
			console.log('STACK-TRACE:', e.stack);
		}

	}//executeCode

	// -----------------------------------------------------------------------------------------------------------------

	function _saveSnapshot(id, snapshots) {

		Documents.update(id, { 
			$set: { snapshots: snapshots }
		});

		// Posts.update({
		// 	_id: postId,
		// 	upvoters: {$ne: user._id}
		// },{
		// 	$addToSet: {upvoters: user._id},
		// 	$inc: {votes: 1}
		// });

		// Documents.update({
		// 	_id: this._id
		// },{
		// 	$set: {title: title}
		// });

		// Posts.update(comment.postId, {$inc: {commentsCount: 1}});
	}

	// -----------------------------------------------------------------------------------------------------------------

	function _processTrace(data) {

		var trace = _getTrace(data);
		var code = data.code;

		if ( _checkIsTraceException(trace) ); //ToDo: Handle the exception...

		visualizer = new Visualizer();
		visualizer.processTrace(trace,code);

		return visualizer.getSnapshots();
	};

	// -----------------------------------------------------------------------------------------------------------------

	function _checkIsTraceException(trace) {

		var exception = trace[trace.length-1];

		if (exception.event != 'uncaught_exception')
			return false;

		console.log('INFO: _traceException | Code execution returned an exception.');
		console.log('INFO: _traceException | exception: ', exception);
		console.log('INFO: _traceException | code: ', trace.code);

		// ToDo: highlightTraceException(trace);

		if ( exception.hasOwnProperty('exception_msg') ) {
			// ToDo: push exception message to UI
			console.error('INFO: _traceException | Exception message:\n', exception['exception_msg']);
		} else {
			// ToDo: push exeption message to UI "Unknown Exception."
			console.error('INFO: _traceException | Unknown Exception.');
		}

		return true;
	};

	// -----------------------------------------------------------------------------------------------------------------

	function _getTrace(data) {
		var isTrace = (data && data.trace && data.trace.length > 0);

		if(!isTrace)
			throw ' _checkData | invalid Trace. data: ' + data;

		return data.trace;
	}

	// -----------------------------------------------------------------------------------------------------------------

	function _getData(res) {
		var data = undefined;

		try {
			data = JSON.parse(res.result);
		} catch(e) {
			throw 'ERROR: _getData | JSON.parse(res) failed. error.message: ' + e.message;
		}

		return data;
	};

	// -----------------------------------------------------------------------------------------------------------------
	// ZeroRPC Client Call => to ZeroRPC Server (zrpc-opt-srv.py) => to OPT Backend (pg_logger.py)
	// -----------------------------------------------------------------------------------------------------------------

	function _rpcExecuteCode(user_script, raw_input_json, options_json) {

		var response = Async.runSync(function(done) {
			zrpcClient.invoke("execute_code",
				user_script,
				raw_input_json,
				options_json,
				//callback
				function(error, res, more) {
					// console.log('---------------------------------------------');
					// console.log('ERROR: ', error);
					// console.log('  RES: ', res);
					// console.log(' MORE: ', more);
			    	done(error,res);
				}
			);//zrpcClient.invoke
		});//Async.runSync

		//ToDo: Consider the 'more' ??

		_checkIsValidRes(response);

		return response;

	}//_rpc_execute_code

	// -----------------------------------------------------------------------------------------------------------------

	function _checkIsValidRes(res) {
		if (!res)
			throw 'ERROR: _rpcExecuteCode: _checkIsValidRes | invalid response. res: ' + res;

		if(res.error)
			throw 'ERROR: _rpcExecuteCode: _checkIsValidRes | Response.error: ' + res.error;
	}

	// -----------------------------------------------------------------------------------------------------------------

	function _checkIsValidId(id) {
		if (!id || id.trim() == '')
			throw 'ERROR: _checkIsValidId | invalid id: ' + id;
	}

	// -----------------------------------------------------------------------------------------------------------------

	function _getDoc(id) {
		var doc = Docs.findOne(id);

		if (!doc)
			throw 'ERROR: _getDoc | Unable to find document for id:' + id;

		return doc;
	}

	// -----------------------------------------------------------------------------------------------------------------

	function _getCode(doc) {
		var code = doc.data.snapshot;

		code = code.trim();

		if (code == '')
			throw 'ERROR: _getCode | Code snippet is "" empty.';

		return code;
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Online Python Tutor (OPT) Backend Options
	// -----------------------------------------------------------------------------------------------------------------

	function _getBackendOptions() {
		return {
			py_crazy_mode: false,		//pythonVersion

			cumulative_mode: false,		//hide frames of exited functions: false
			                            //show frames of exited functions: true

			heap_primitives: false,		//inline primitives and nested objects: false
		                                //render all objects on the heap: true

			show_only_outputs: false,	//show everything: false
			                            //show only outputs: true

			origin: 'index.js'			//return destination ... used by the OPT webserver
										//we don't use it however OPT expects(maybe-not?) it ...
		};
	};

	// -----------------------------------------------------------------------------------------------------------------

}//if (Meteor.isServer)

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------

