
Meteor.startup(function() {

// ---------------------------------------------------------------------------------------------------------------------
// BUTTON-EXECUTE | EXPORT
// ---------------------------------------------------------------------------------------------------------------------

	navbar = this.navbar || {};

	navbar.btnExecute = {

		// -------------------------------
		// initialization
		// -------------------------------

			init: _initExecuteButton,

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
		// UI
		// -------------------------------

		  enable: undefined,
		 disable: undefined

	};//navbar.btnExecute

// ---------------------------------------------------------------------------------------------------------------------
// FUNCTIONS | BUTTON-EXECUTE
// ---------------------------------------------------------------------------------------------------------------------

function _initExecuteButton() {
	// console.log('_initExecuteButton');
	var button = _getExecuteButton();

	button.on('click', function() {
		if (navbar.btnExecute.onClick)
			navbar.btnExecute.onClick();
	}.bind(this));
};

// ---------------------------------------------------------------------------------------------------------------------

function _getExecuteButton() {
	var button = $('#id-btn-execute');

	if ( button == undefined )
		console.error('ERROR: Could not find the "Execute" Button (HTMLButtonElement).');

	return button;
};

// ---------------------------------------------------------------------------------------------------------------------

function _getDocumentId() {
	var id = Session.get('ssn_documents._id');

	if(!id)
		console.warn('WARNING | _getDocumentId | Could not find a ssn_documents._id.');

	return id;
}

// ---------------------------------------------------------------------------------------------------------------------

function _onClick() { 
	//console.log('navbar.button-execute.js | _onClick');

	var id = _getDocumentId.call(this);
	Meteor.call('executeCode', id);

	//self.waitToVisualizeMode();

	//self.executeCode();
	//self.visualizeMode();
};

// ---------------------------------------------------------------------------------------------------------------------

function _executeCode (code,backendScript,backendOptions,onSuccess) { 
	Meteor.call('executeCode', id);

	// if (!data) {
	// 	_onExecutecodeFailed()
	// }
};

// ---------------------------------------------------------------------------------------------------------------------

function onExecuteCodeSucceeded() { 
	// var self = Index.prototype;
	// $(document).scrollTop(0);
	// self.visualizeMode();
};

// ---------------------------------------------------------------------------------------------------------------------

function onShowExecuteButton() {
	//getExecuteButton().style.visibility = 'visible';
};

// ---------------------------------------------------------------------------------------------------------------------

function hideExecuteButton() {
	//getExecuteButton().style.visibility = 'hidden';
};

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------

});//Meteor.startup

