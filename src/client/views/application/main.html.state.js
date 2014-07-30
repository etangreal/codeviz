
// -------------------------------------------------------------------------------------------------
// State
// -------------------------------------------------------------------------------------------------

this.State = this.State || {};

_.extend(this.State, {

	    	initState: _initState,

	       	   ratios: _ratios,
	     	 onToggle: undefined,
		triggerToggle: _raiseEventToggle,

	    	  isFiles: _isFiles,
		  toggleFiles: _toggleFiles,

	    	 isEditor: _isEditor,
		 toggleEditor: _toggleEditor,

	     isVisualizer: _isVisualizer,
	 toggleVisualizer: _toggleVisualizer,

	    isPythonTutor: _isPythonTutor,
	togglePythonTutor: _togglePythonTutor,

	      isDebugInfo: _isDebugInfo,
	  toggleDebugInfo: _toggleDebugInfo,

});//this.State

// -------------------------------------------------------------------------------------------------
// STARTUP
// -------------------------------------------------------------------------------------------------

Meteor.startup(function (){

});

// -------------------------------------------------------------------------------------------------
// FUNCTIONS
// -------------------------------------------------------------------------------------------------

function _initState() {
	Session.set('ssn_isFiles', true);
	Session.set('ssn_isEditor', true);
	Session.set('ssn_isVisualizer', true);
	Session.set('ssn_isPythonTutor', false);
	Session.set('ssn_isDebugInfo', true);
}

_initState();

// -------------------------------------------------------------------------------------------------

function _ratios() {
	var files = _isFiles() ? true:0;
	var editor = _isEditor() ? 1:0;
	var visualizer = _isVisualizer() ? 2:0;
	var pythonTuotr = _isPythonTutor() ? 1:0;
	var debugInfo = _isDebugInfo() ? 1:0;

	var spacer = !(editor||visualizer||pythonTuotr||debugInfo) ? 1 : 0;

	return [
		files,
		editor,
		visualizer,
		pythonTuotr,
		debugInfo,
		spacer
	];
}

function _raiseEventToggle() {
	if (State.onToggle)
		State.onToggle( _ratios() );
}

// -------------------------------------------------------------------------------------------------

function _isFiles() {
	return Session.get('ssn_isFiles');
}

// -------------------------------------------------------------------------------------------------

function _toggleFiles() {
    Session.set('ssn_isFiles', !Session.get('ssn_isFiles'));
    _raiseEventToggle();
}

// -------------------------------------------------------------------------------------------------

function _isEditor() {
	return Session.get('ssn_isEditor');
}

// -------------------------------------------------------------------------------------------------

function _toggleEditor() {
    Session.set('ssn_isEditor', !Session.get('ssn_isEditor'));
    _raiseEventToggle();
}

// -------------------------------------------------------------------------------------------------

function _isVisualizer() {
	return Session.get('ssn_isVisualizer');
}

// -------------------------------------------------------------------------------------------------

function _toggleVisualizer() {
    Session.set('ssn_isVisualizer', !Session.get('ssn_isVisualizer'));
    _raiseEventToggle();
}

// -------------------------------------------------------------------------------------------------

function _isPythonTutor() {
	return Session.get('ssn_isPythonTutor');
}

// -------------------------------------------------------------------------------------------------

function _togglePythonTutor() {
    Session.set('ssn_isPythonTutor', !Session.get('ssn_isPythonTutor'));
    _raiseEventToggle();
}

// -------------------------------------------------------------------------------------------------

function _isDebugInfo() {
	return Session.get('ssn_isDebugInfo');
}

// -------------------------------------------------------------------------------------------------

function _toggleDebugInfo() {
    Session.set('ssn_isDebugInfo', !Session.get('ssn_isDebugInfo'));
    _raiseEventToggle();
}

// -------------------------------------------------------------------------------------------------
// END
// -------------------------------------------------------------------------------------------------
