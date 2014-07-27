
// ---------------------------------------------------------------------------------------------------------------------
// TEMPLATE: DOC-LIST
// ---------------------------------------------------------------------------------------------------------------------

Template.docList.documents = function() {
	return Documents.find();
};

// ---------------------------------------------------------------------------------------------------------------------
// DOC-LIST-ADD	| EVENTS
// ---------------------------------------------------------------------------------------------------------------------

Template.docListAdd.events({

	// -----------------------------------------------------------------------------------------------------------------
	// ADD
	// -----------------------------------------------------------------------------------------------------------------

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
			Session.set('ssn_documents._id', id);
		}
	);//Documents.insert

 }//_docListAddItem

// ---------------------------------------------------------------------------------------------------------------------
// DOC-ITEM | FUNCTIONS / 'PROPERTIES'
// ---------------------------------------------------------------------------------------------------------------------

Template.docItem.current = function() {
	// console.log('Template.docItem.current', this._id);
	return Session.equals('ssn_documents._id', this._id);
};

// ---------------------------------------------------------------------------------------------------------------------

Template.docItem.isEditingDocItem = function() {
	//console.log('docItem.isEditingDocItem: this._id => ', this._id)
	return Session.equals('ssn_isEditingDocItem', this._id);
}

// ---------------------------------------------------------------------------------------------------------------------
// DOC-ITEM | RENDERED (EVENT HOOK)
// ---------------------------------------------------------------------------------------------------------------------

Template.docItem.rendered = function() {
	$('[rel=tooltip]').tooltip();
}

// ---------------------------------------------------------------------------------------------------------------------
// DOC-ITEM | EVENTS
// ---------------------------------------------------------------------------------------------------------------------

Template.docItem.events({

	// -----------------------------------------------------------------------------------------------------------------
	// SELECT
	// -----------------------------------------------------------------------------------------------------------------

	'click a.docItem': function(e,t) {
		//console.log('docItem.events | click a.docItem | ssn_documents._id: ', this._id);
		e.preventDefault();
		Session.set('ssn_documents._id', this._id);
	},

	// -----------------------------------------------------------------------------------------------------------------
	// EDIT
	// -----------------------------------------------------------------------------------------------------------------

	'click .edit-docItem': function(e,t) {
		//console.log('docItem.events: click .edit-docItem');
		Session.set('ssn_isEditingDocItem', this._id);
		Session.set('ssn_documents._id', false);

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
	// REMOVE
	// -----------------------------------------------------------------------------------------------------------------

	'click .remove-docItem': function() {
		//console.log('docItem.events: click .remove-docItem');
		if (confirm('Are you sure you want to delete?')) {
			Documents.remove(this._id);
			Session.set('ssn_documents._id', false);
		}
	},

});//Template.docItem.events

// ---------------------------------------------------------------------------------------------------------------------
// EDITOR
// ---------------------------------------------------------------------------------------------------------------------

Template.editor.docid = function() {

	var id = Session.get('ssn_documents._id');

	// -----------------------------------------------------------------------------------------------------------------
	// *** SET CURRENT SNAPSHOT ***
	// -----------------------------------------------------------------------------------------------------------------
	var doc = Documents.findOne({_id:id});
	var snapshots = (doc) ? doc.snapshots : undefined;
	Session.set('ssn_snapshots', snapshots);
	// -----------------------------------------------------------------------------------------------------------------

	return id;
};

// ---------------------------------------------------------------------------------------------------------------------
// EDITOR | EVENTS
// ---------------------------------------------------------------------------------------------------------------------

Template.editor.events({

});//Template.editor.events

// ---------------------------------------------------------------------------------------------------------------------
// EDITOR | CONFIG
// ---------------------------------------------------------------------------------------------------------------------

Template.editor.config = function() {
	return function(ace) {
		// Set some options on the editor
		ace.setTheme('ace/theme/monokai');
		ace.getSession().setMode('ace/mode/python');
		ace.setShowPrintMargin(false);
		ace.getSession().setUseWrapMode(true);
	}
};

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
