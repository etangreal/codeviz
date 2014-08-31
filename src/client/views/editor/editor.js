
// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// EXPORT
// ---------------------------------------------------------------------------------------------------------------------

    //Inherit
    // Editor.prototype = Object.create();

    //Constructor-Reference
    Editor.prototype.constructor = Editor;

    //Export
    // this.Editor = Editor;
    this.editor = this.editor || new Editor();

// ---------------------------------------------------------------------------------------------------------------------
// CONSTRUCTOR
// ---------------------------------------------------------------------------------------------------------------------

    function Editor() {
        var self = this;

    }//Editor

// ---------------------------------------------------------------------------------------------------------------------
// PUBLIC | PROPERTIES / METHODS
// ---------------------------------------------------------------------------------------------------------------------

_.extend(Editor.prototype, {

	  refresh: _refresh,
	highlight: _highlight,
	   config: _configure,

})//_.extend(Editor.prototype

// ---------------------------------------------------------------------------------------------------------------------
// PRIVATE | PROPERTIES / METHODS
// ---------------------------------------------------------------------------------------------------------------------

function _getEditor() {
	// return $('#editor');
	// return document.getElementById('editor');

	return ace.edit("editor");
}

// ---------------------------------------------------------------------------------------------------------------------

function _refresh() {
	var editor = _getEditor();

	editor.resize();
}

// ---------------------------------------------------------------------------------------------------------------------

//  ANSWER: stackoverflow.com/questions/16024721/how-can-i-highlight-multiple-lines-with-ace
// EXAMPLE: jsbin.com/acotuv/163/edit

function _highlight() {

    var editor 		= ace.edit("editor");
    var Range 		= ace.require('ace/range').Range;

	var docId 		= State.getDocumentId();
	var snapshot 	= State.getCurrentSnapshot();
	var line 		= snapshot.meta.line -1;
	var marker 		= State.marker;

	if (marker) 
		editor.getSession().removeMarker(marker);

	// Range(rowStart, columnStart, rowEnd, columnEnd)
	var range 		= new Range(line, 0, line, 1);

	var marker 		= editor.session.addMarker(range, "highlightNextLineToExecute", "fullLine");
	// var marker 		= editor.session.addMarker(range, "ace_active-line", "fullLine");

	State.marker 	= marker;
}

// ---------------------------------------------------------------------------------------------------------------------

function _configure(ace) {
	return function(ace) {
		// Set some options on the editor
		ace.setTheme('ace/theme/monokai');
		ace.getSession().setMode('ace/mode/python');
		// ace.setShowPrintMargin(false);
		// ace.getSession().setUseWrapMode(true);
	}
}

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
