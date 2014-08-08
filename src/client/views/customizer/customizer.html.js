
// ---------------------------------------------------------------------------------------------------------------------
// TEMPLATE | CUSTOMIZER | PROPERTIES
// ---------------------------------------------------------------------------------------------------------------------

Template.customizer.renderData = function() {
	return State.getRenderData();
}

// ---------------------------------------------------------------------------------------------------------------------

Template.customizer.renderTmpl = function() {
	return State.getRenderTmpl();
}

// ---------------------------------------------------------------------------------------------------------------------

Template.customizer.renderHtml = function() {
	return State.getRenderHtml();
}

// ---------------------------------------------------------------------------------------------------------------------
// TEMPLATE | CUSTOMIZER | RENDERED
// ---------------------------------------------------------------------------------------------------------------------

	// $('textarea[data-editor]').each(function () {
	// 	var textarea = $(this);

	// 	var mode = textarea.data('editor');

	// 	var editDiv = $('<div>', {
	// 		position: 'absolute',
	// 		width: textarea.width(),
	// 		height: textarea.height(),
	// 		'class': textarea.attr('class')
	// 	}).insertBefore(textarea);

	// 	textarea.css('visibility', 'hidden');

	// 	var editor = ace.edit(editDiv[0]);
	// 	editor.renderer.setShowGutter(false);
	// 	editor.getSession().setValue(textarea.val());
	// 	editor.getSession().setMode("ace/mode/" + mode);
	// 	// editor.setTheme("ace/theme/idle_fingers");

	// 	// // copy back to textarea on form submit...
	// 	// textarea.closest('form').submit(function () {
	// 	// 	textarea.val(editor.getSession().getValue());
	// 	// })
	// });

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------