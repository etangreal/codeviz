
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

    var editor 		= ace.edit('editor');
    var Range 		= ace.require('ace/range').Range;

	var curSnap 	= State.getCurrentSnapshot();
	var prevSnap	= State.highlight.prevSnap;

	var nextLine 	= undefined;
	var prevLine 	= undefined;

	var curMark 	= State.highlight.currentMarker;
	var prevMark 	= State.highlight.previousMarker;

	if (curSnap)
		nextLine 	= curSnap.meta.line;

	if (prevSnap)
		prevLine 	= prevSnap.meta.line;

	editor.getSession().removeMarker(curMark);
	editor.getSession().removeMarker(prevMark);

	State.highlight.currentMarker = addMarker(nextLine, "highlightNextLineToExecute");
	State.highlight.previousMarker = addMarker(prevLine, "highlightPrevExecutedLine");

	function addMarker(line,css) {
		if (!line || line < 0) return undefined;

		line = line - 1;
		var range = new Range(line, 0, line, 1); // Range(rowStart, columnStart, rowEnd, columnEnd)
		return editor.session.addMarker(range, css, "fullLine");
	}

}//_highlight

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
