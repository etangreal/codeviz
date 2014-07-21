
if(CONSOLE_LOG_ROUTES) 
	console.log('LOADING: src/client/views/application/navbar.button-execute.js');

// ---------------------------------------------------------------------------------------------------------------------
// STARTUP
// ---------------------------------------------------------------------------------------------------------------------

Meteor.startup(function() {

	if(CONSOLE_LOG_ROUTES) 
		console.log('STARTUP: src/client/views/application/navbar.button-execute.js');

	// -----------------------------------------------------------------------------------------------------------------
	// EXPORT | BUTTON-EXECUTE
	// -----------------------------------------------------------------------------------------------------------------

	navbar = this.navbar || {};

	navbar.btnExecute = {

		// -------------------------------
		// initialization
		// -------------------------------

			init: _initExecuteButton,
		
		// -------------------------------
		// context = this(of calling object)
		// -------------------------------

		 context: undefined,

		// -------------------------------
		// events
		// -------------------------------

		 onClick: _onClick,

		// -------------------------------
		// value
		// -------------------------------

			 get: undefined,
			 set: undefined,
		   reset: undefined,

		// -------------------------------
		// ui
		// -------------------------------

		  enable: undefined,
		 disable: undefined

	};//navbar.btnExecute

	// -----------------------------------------------------------------------------------------------------------------
	// FUNCTIONS | BUTTON-EXECUTE
	// -----------------------------------------------------------------------------------------------------------------

	function _initExecuteButton() {
		var button = _getExecuteButton();

		//navbar.btnExecute.context = function() { return this }.bind(this);

		button.on('click', function() {
			if (navbar.btnExecute.onClick)
				navbar.btnExecute.onClick();
		}.bind(this));
	};

	// -----------------------------------------------------------------------------------------------------------------

	function _getExecuteButton() {
		var button = $('#id-btn-execute');

		if ( button == undefined )
			console.error('ERROR: Could not find the "Execute" Button (HTMLButtonElement).');

		return button;
	};

	// -----------------------------------------------------------------------------------------------------------------

	function _getDocumentId() {
		var id = Session.get('ssn_documents._id');

		if(!id)
			console.warn('WARNING | _getDocumentId | Could not find a ssn_documents._id.');

		return id;
	}

	// -----------------------------------------------------------------------------------------------------------------

	function _onClick() { 
		//console.log('navbar.button-execute.js | _onClick');

		var id = _getDocumentId.call(this);

		Meteor.call('executeCode', id);

		//self.waitToVisualizeMode();

		//self.executeCode();
		//self.visualizeMode();
	};

	// -----------------------------------------------------------------------------------------------------------------

	function executeCode (code,backendScript,backendOptions,onSuccess) { 
		var self = Index.prototype;
		var id = _getDocItemId();

		code = code || self.getCode();
		backendScript = backendScript || self.getBackendScript();
		backendOptions = backendOptions || self.getBackendOptions();
		onSuccess = onSuccess || self.onExecuteCodeSuccess;

		if ( code == "" ) {
			alert('Type in some code to visualize.');
			return;
		}

		var data = {
			user_script : code,
			raw_input_json: '',
			options_json: JSON.stringify(backendOptions)
		};

		$.get(backendScript,data,onSuccess,"json");
	};

	// -----------------------------------------------------------------------------------------------------------------

	function onExecuteCodeSuccess(data) {
		// var self = Index.prototype;

		// if ( !self.checkExecutionCodeData(data) ) {
		// 	alert("Invalid data received from the server.");
		// 	return;
		// }

		// var trace = data.trace;
		// var exception = trace[trace.length-1];
		// var isException = ( exception.event == 'uncaught_exception' );

		// if (isException) {
		// 	self.executeCodeFailed(trace, exception);
		// 	return;
		// }

		// self.setVisualizer(data);
		// self.setPythonTutor(data);
		// self.executeCodeSucceeded();
	};

	// -----------------------------------------------------------------------------------------------------------------

	function checkExecutionCodeData(data) {
		// var isData = (data !== undefined);
		// var isTrace = (data.trace !== undefined && data.trace.length > 0);

		// var isOK = (isData && isTrace);
		// if(!isOK)
		// 	console.error("ERROR: executeCode => onSuccess => checkData: invalid data received from server.");

		// return isOK;
	};

	// -----------------------------------------------------------------------------------------------------------------

	function onExecuteCodeSucceeded() { 
		// var self = Index.prototype;
		// $(document).scrollTop(0);
		// self.visualizeMode();
	};

	// -----------------------------------------------------------------------------------------------------------------

	//TODO: Fix this, its not working yet ...
	function onExecuteCodeFailed(trace, exception) {
		// var self = Index.prototype;

		// console.log("code execution failed.\n", trace.code);

		// self.highlightTraceException(trace);
		// $(document).scrollTop(0);
		// self.editMode();

		// if ( exception.hasOwnProperty('exception_msg') ) {
		// 	alert(exception['exception_msg']);
		// 	console.error("Exception message:\n",exception['exception_msg']);
		// } else {
		// 	alert("Unknown Exception.");
		// 	console.error("Unknown Exception.");
		// }
	};

	// -----------------------------------------------------------------------------------------------------------------

	function onShowExecuteButton() {
		//getExecuteButton().style.visibility = 'visible';
	};

	// -----------------------------------------------------------------------------------------------------------------

	function hideExecuteButton() {
		//getExecuteButton().style.visibility = 'hidden';
	};

	// -----------------------------------------------------------------------------------------------------------------

});//Meteor.startup

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
