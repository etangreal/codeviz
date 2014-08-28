
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
	updatePythonTutor: _updatePythonTutor,

	      isCustomizer: _isCustomizer,
	  toggleCustomizer: _toggleCustomizer,

	      isDebugInfo: _isDebugInfo,
	  toggleDebugInfo: _toggleDebugInfo,

});//this.State

// -------------------------------------------------------------------------------------------------
// STARTUP
// -------------------------------------------------------------------------------------------------

Meteor.startup(function (){

});

// -------------------------------------------------------------------------------------------------
// INIT-STATE
// -------------------------------------------------------------------------------------------------

function _initState() {
	Session.set('ssn_isFiles', true);
	Session.set('ssn_isEditor', true);
	Session.set('ssn_isVisualizer', true);
	Session.set('ssn_isCustomizer', false);
	Session.set('ssn_isPythonTutor', false);
	Session.set('ssn_isDebugInfo', true);
}

_initState();

// -------------------------------------------------------------------------------------------------
// RATIOS
// -------------------------------------------------------------------------------------------------

function _ratios() {
	var files = _isFiles() ? true:0;
	var editor = _isEditor() ? 1:0;
	var visualizer = _isVisualizer() ? 2:0;
	var customizer = _isCustomizer() ? 2:0;
	var pythonTuotr = _isPythonTutor() ? 3:0;
	var debugInfo = _isDebugInfo() ? 1:0;

	var spacer = !(editor||visualizer||customizer||pythonTuotr||debugInfo) ? 1 : 0;

	return [
		files,
		editor,
		visualizer,
		customizer,
		pythonTuotr,
		debugInfo,
		spacer
	];
}

// -------------------------------------------------------------------------------------------------
// RAISE EVENT TOGGLE
// -------------------------------------------------------------------------------------------------

function _raiseEventToggle() {
	if (State.onToggle)
		State.onToggle( _ratios() );

	editor.refresh();
}

// -------------------------------------------------------------------------------------------------
// FILES
// -------------------------------------------------------------------------------------------------

function _isFiles() {
	return Session.get('ssn_isFiles');
}

// -------------------------------------------------------------------------------------------------

function _toggleFiles(show) {
	show = (show != undefined) ? show : !Session.get('ssn_isFiles');
    Session.set('ssn_isFiles', show);

    return show;
}

// -------------------------------------------------------------------------------------------------
// EDITOR
// -------------------------------------------------------------------------------------------------

function _isEditor() {
	return Session.get('ssn_isEditor');
}

// -------------------------------------------------------------------------------------------------

function _toggleEditor(show) {
	show = (show != undefined) ? show : !Session.get('ssn_isEditor');
    Session.set('ssn_isEditor', show);

    return show;
}

// -------------------------------------------------------------------------------------------------
// VISUALIZER
// -------------------------------------------------------------------------------------------------

function _isVisualizer() {
	return Session.get('ssn_isVisualizer');
}

// -------------------------------------------------------------------------------------------------

function _toggleVisualizer(show) {
	show = (show != undefined) ? show : !Session.get('ssn_isVisualizer')
    Session.set('ssn_isVisualizer', show);

    return show;
}

// -------------------------------------------------------------------------------------------------
// CUSTOMIZER
// -------------------------------------------------------------------------------------------------

function _isCustomizer() {
	return Session.get('ssn_isCustomizer');
}

// -------------------------------------------------------------------------------------------------

function _toggleCustomizer(show) {
	show = (show != undefined) ? show : !Session.get('ssn_isCustomizer')
	Session.set('ssn_isCustomizer', show);

	return show;
}

// -------------------------------------------------------------------------------------------------
// PYTHON TUTOR
// -------------------------------------------------------------------------------------------------

function _isPythonTutor() {
	return Session.get('ssn_isPythonTutor');
}

// -------------------------------------------------------------------------------------------------

function _togglePythonTutor(show) {
	show = (show != undefined) ? show : !Session.get('ssn_isPythonTutor');
	Session.set('ssn_isPythonTutor', show);

	_updatePythonTutor();

	return show;
}

// -------------------------------------------------------------------------------------------------

function _updatePythonTutor() {
    var id = State.getDocumentId();

    if (id && State.isPythonTutor()) {
        var data = State.getCurrentData();
        var options = State.getPythonTutorFrontendOptions();
        State._pythonTutor = new ExecutionVisualizer( $('#pythonTutor').attr('id') , data, options);
    }
}

// -------------------------------------------------------------------------------------------------
// DEBUG INFO
// -------------------------------------------------------------------------------------------------

function _isDebugInfo() {
	return Session.get('ssn_isDebugInfo');
}

// -------------------------------------------------------------------------------------------------

function _toggleDebugInfo(show) {
	show = (show != undefined) ? show : !Session.get('ssn_isDebugInfo')
	Session.set('ssn_isDebugInfo', show);

	return show;
}

// -------------------------------------------------------------------------------------------------
// END
// -------------------------------------------------------------------------------------------------
