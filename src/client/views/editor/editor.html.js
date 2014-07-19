
// ---------------------------------------------------------------------------------------------------------------------
// TEMPLATE: DOC-LIST
// ---------------------------------------------------------------------------------------------------------------------

Template.docList.documents = function() {
	return Documents.find();
};

// ---------------------------------------------------------------------------------------------------------------------
// TEMPLATE: DOC-LIST: EVENTS
// ---------------------------------------------------------------------------------------------------------------------

Template.docListAdd.events({

    'keydown #id-txt-add-docItem': function (e,t) {
        if (e.keyCode !== 13) return;
        //console.log('keydown #id-txt-add-docItem'); return;
        e.preventDefault();

        var title = $(e.target).val();
        $(e.target).val('');

        _docListAddItem(title);

    },//keydown #id-txt-add-docItem

    // -----------------------------------------------------------------------------------------------------------------

    'click #id-btn-add-docItem': function (e,t) {
		//console.log('click button #id-btn-add-docItem'); return;
		e.preventDefault();

		var txtAddDocItem = $('#id-txt-add-docItem');
		var title = txtAddDocItem.val();
		txtAddDocItem.val('');

		_docListAddItem(title);

    },//'click button #id-btn-add-docItem'

});//Template.docListAdd.events

// ---------------------------------------------------------------------------------------------------------------------
// TEMPATE: DOC-ITEM
// ---------------------------------------------------------------------------------------------------------------------

Template.docItem.rendered = function() {

	$('[rel=tooltip]').tooltip();

}

// ---------------------------------------------------------------------------------------------------------------------

Template.docItem.isEditingDocItem = function() {
	//console.log('docItem.isEditingDocItem: this._id => ', this._id)
	return Session.equals('ssn_isEditingDocItem', this._id);
}

// ---------------------------------------------------------------------------------------------------------------------
// TEMPLATE: DOC-ITEM: EVENTS
// ---------------------------------------------------------------------------------------------------------------------

Template.docItem.events({

	'click .edit-docItem': function(e,t) {
		//console.log('docItem.events: click .edit-docItem');
		Session.set('ssn_isEditingDocItem', this._id);
		var id = 'id-docItem-edit-' + this._id;
		//Helpers.focusText( t.find('#'+id) );
	},

	// -----------------------------------------------------------------------------------------------------------------

	'click .accept-docItem': function(e,t) {
		//console.log('docItem.events: click .accept-docItem');
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
		Session.set('ssn_isEditingDocItem', false);
	},

	// -----------------------------------------------------------------------------------------------------------------

	'click .cancel-docItem': function() {
		//console.log('docItem.events: click .cancel-docItem');
		Meteor.flush();
		Session.set('ssn_isEditingDocItem', false);
	},

	// -----------------------------------------------------------------------------------------------------------------

	'click .remove-docItem': function() {
		//console.log('docItem.events: click .remove-docItem');
		if (confirm('Are you sure you want to delete?')) {
			Documents.remove(this._id);
		}
	},

});//Template.docItem.events

// ---------------------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS: DOC-LIST
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
			Session.set('ssn_documentId', id);
		}
	);//Documents.insert

 }//_docListAddItem

// ---------------------------------------------------------------------------------------------------------------------
// TEMPLATE: DOC-ITEM
// ---------------------------------------------------------------------------------------------------------------------

Template.docItem.current = function() {
	// console.log('Template.docItem.current', this._id);
	return Session.equals('ssn_documentId', this._id);
};

// ---------------------------------------------------------------------------------------------------------------------
// TEMPLATE: DOC-ITEM: EVENTS
// ---------------------------------------------------------------------------------------------------------------------

Template.docItem.events({

	'click a': function(e) {
		e.preventDefault();
		Session.set('ssn_documentId', this._id);
	}

});

// ---------------------------------------------------------------------------------------------------------------------
// TEMPLATE: EDITOR
// ---------------------------------------------------------------------------------------------------------------------

Template.editor.docid = function() {
	var id = Session.get('ssn_documentId');
	//console.log('editor.docid: ' + id);
	return id;
};

// ---------------------------------------------------------------------------------------------------------------------
// TEMPLATE: EDITOR: EVENTS
// ---------------------------------------------------------------------------------------------------------------------

Template.editor.events({

	'keydown input': function(e) {
		if (e.keyCode !== 13) return;
		e.preventDefault();

		$(e.target).blur();

		var id = Session.get('ssn_documentId');
		var title = e.target.value;
		Documents.update(id, {title: title});
	},

    // -----------------------------------------------------------------------------------------------------------------

	'click button': function(e) {
		e.preventDefault();
		var id = Session.get('ssn_documentId');
		Session.set('ssn_documentId', null)
		Meteor.call('deleteDocument', id);
	}

});//Template.editor.events

// ---------------------------------------------------------------------------------------------------------------------
// TEMPLATE: EDITOR
// ---------------------------------------------------------------------------------------------------------------------

Template.editor.config = function() {
	return function(ace) {
		// Set some options on the editor
		//ace.setTheme('ace/theme/monokai');
		ace.setShowPrintMargin(false);
		ace.getSession().setUseWrapMode(true);
	}
};

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
