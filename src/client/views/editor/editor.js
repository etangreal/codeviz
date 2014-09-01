
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

});//_.extend(Editor.prototype

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

	if (!State.highlight)
		State.highlight = {};

    var editor 		= ace.edit("editor");
    var Range 		= ace.require('ace/range').Range;

	var docId 		= State.getDocumentId();
	var snapshot 	= State.getCurrentSnapshot();
	var line 		= snapshot.meta.line -1;
	var current 	= State.highlight.current;
	var previous 	= State.highlight.previous;

	if (previous) {
		editor.getSession().removeMarker(previous);
	}

	if (current) {
		editor.getSession().removeMarker(current);
		previous = current;
	}

	function addMarker(line,css) {
		// Range(rowStart, columnStart, rowEnd, columnEnd)
		var range = new Range(line, 0, line, 1);
		return editor.session.addMarker(range, css, "fullLine");
	}

	State.highlight.current = addMarker(line, "highlightNextLineToExecute");
	State.highlight.previous = addMarker(previous, "ace_active-line");
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
