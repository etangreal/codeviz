
// ---------------------------------------------------------------------------------------------------------------------
// DOC-LIST-ADD	| EVENTS
// ---------------------------------------------------------------------------------------------------------------------

Template.docListAdd.events({

	// -----------------------------------------------------------------------------------------------------------------
	// ADD
	// -----------------------------------------------------------------------------------------------------------------

    'keydown #id-txt-add-docItem': function (e,t) {
        if (e.keyCode !== 13) return;
        e.preventDefault();

        var title = $(e.target).val();
        $(e.target).val('');

        _docListAddItem(title);

    },//keydown #id-txt-add-docItem

    // -----------------------------------------------------------------------------------------------------------------

    'click #id-btn-add-docItem': function (e,t) {
		e.preventDefault();

		var txtAddDocItem = $('#id-txt-add-docItem');
		var title = txtAddDocItem.val();
		txtAddDocItem.val('');

		_docListAddItem(title);

    },//'click #id-btn-add-docItem'

});//Template.docListAdd.events

// ---------------------------------------------------------------------------------------------------------------------
// DOC-LIST-ADD | DATABASE-FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------

function _docListAddItem(title) {
	title = title.trim();

	if (title == '') {
        console.log('Template.docList.events: _docListAddItem: Enter a title...');
        return;
    }

	Documents.insert({
		title: title
	}, function(err, id) {
			if(!id) return;
			State.setDocumentId(id);
		}
	);//Documents.insert

 }//_docListAddItem

 // ---------------------------------------------------------------------------------------------------------------------
// DOC-LIST | PROPERTIES
// ---------------------------------------------------------------------------------------------------------------------

Template.docList.documents = function() {
	return Documents.find( {}, { 
		sort: { title : 1 }
	});
};

// ---------------------------------------------------------------------------------------------------------------------
// DOC-ITEM | PROPERTIES
// ---------------------------------------------------------------------------------------------------------------------

Template.docItem.current = function() {
	return State.isDocumentId(this._id);
};

// ---------------------------------------------------------------------------------------------------------------------

Template.docItem.isEditingDocItem = function() {
	return State.isEditingDocItem(this._id);
}

// ---------------------------------------------------------------------------------------------------------------------
// DOC-ITEM | RENDERED
// ---------------------------------------------------------------------------------------------------------------------

Template.docItem.rendered = function() {
	//$('[rel=tooltip]').tooltip();			//ToDo: tooltips not working...
}

// ---------------------------------------------------------------------------------------------------------------------
// DOC-ITEM | EVENTS
// ---------------------------------------------------------------------------------------------------------------------

Template.docItem.events({

	// -----------------------------------------------------------------------------------------------------------------
	// SELECT
	// -----------------------------------------------------------------------------------------------------------------

	'click a.docItem': function(e,t) {
		e.preventDefault();

		Meteor.flush();
		State.setDocumentId(this._id);
	},

	// -----------------------------------------------------------------------------------------------------------------
	// EDIT
	// -----------------------------------------------------------------------------------------------------------------

	'click .edit-docItem': function(e,t) {
		e.preventDefault();
		State.setEditingDocItem(this._id);

		//var id = 'id-docItem-edit-' + this._id;
		//Helpers.focusText( t.find('#'+id) );
	},

	// -----------------------------------------------------------------------------------------------------------------

	'click .accept-docItem': function(e,t) {
		e.preventDefault();

		var id = 'id-docItem-edit-' + this._id;
		var title = $('#'+id).val().trim();

		if (title == '') {
			console.log('Please enter a valid filename.');
			return;
		}

		Documents.update({
			_id: this._id
		},{
			$set: {title: title}
		});

		Meteor.flush();
		State.setEditingDocItem(false);
	},

	// -----------------------------------------------------------------------------------------------------------------

	'click .cancel-docItem': function(e,t) {
		e.preventDefault();

		Meteor.flush();
		State.setEditingDocItem(false);
	},

	// -----------------------------------------------------------------------------------------------------------------
	// REMOVE
	// -----------------------------------------------------------------------------------------------------------------

	'click .remove-docItem': function(e,t) {
		e.preventDefault();

		if (confirm('Are you sure you want to delete?')) {
			Documents.remove(this._id);
			State.setDocumentId(false);
		}
	},

});//Template.docItem.events

// ---------------------------------------------------------------------------------------------------------------------
// EDITOR
// ---------------------------------------------------------------------------------------------------------------------

Template.editor.docid = function() {
	var id = State.getDocumentId();

	navbar.slider.resize();

	if (id && State.isPythonTutor()) {
		var data = State.getCurrentData();
		var options = State.getPythonTutorFrontendOptions();
		State._pythonTutor = new ExecutionVisualizer( $('#pythonTutor').attr('id') , data, options);
	}

	return  id || 'start';
};

// ---------------------------------------------------------------------------------------------------------------------
// EDITOR | EVENTS
// ---------------------------------------------------------------------------------------------------------------------

// Template.editor.events({

// });//Template.editor.events

// ---------------------------------------------------------------------------------------------------------------------
// EDITOR | CONFIG
// ---------------------------------------------------------------------------------------------------------------------

Template.editor.config = function() {
	return editor.config();
};

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
