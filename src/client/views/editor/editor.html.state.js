
// -------------------------------------------------------------------------------------------------
// State
// -------------------------------------------------------------------------------------------------

this.State = this.State || {};

_.extend(this.State, {

			   isDocumentId: _isDocumentId,
			  getDocumentId: _getDocumentId,
			  setDocumentId: _setDocumentId,

		   isEditingDocItem: _isEditingDocItem,
		  setEditingDocItem: _setEditingDocItem

});//this.State

// -------------------------------------------------------------------------------------------------
// STARTUP
// -------------------------------------------------------------------------------------------------

Meteor.startup(function () {

	Documents.find().observe({

		// ----------------------------------------------------------------------------------------

		added: function(doc,id) {
			// console.log('added. id: ', id);
			// console.log('isSelectedDoc: ', _isDocumentId(id) );

			// if ( _isDocumentId(id) )
			// 	Session.set('ssn_snapshots', doc.snapshots);
		},

		// ----------------------------------------------------------------------------------------

		changed: function(doc,id) {
			// console.log('changed. id: ', id);
			// console.log('isSelectedDoc: ', _isDocumentId(id) );
			// console.log(doc);

			// if ( _isDocumentId(id) )
			// 	Session.set('ssn_snapshots', doc.snapshots);
		},

		// ----------------------------------------------------------------------------------------

		removed: function(doc,id) {
			// console.log('removed. id: ', id);
			// console.log('isSelectedDoc: ', _isDocumentId(id) );

			// if ( _isDocumentId(id) )
			// 	Session.set('ssn_snapshots', undefined);
		}

		// ----------------------------------------------------------------------------------------

	});//Documents.find().observe

});//Meteor.startup

// -------------------------------------------------------------------------------------------------
// FUNCTIONS
// -------------------------------------------------------------------------------------------------

function _isDocumentId(id) {
	return !!id && Session.equals('ssn_documents._id', id);
}

function _getDocumentId() {
	return Session.get('ssn_documents._id');
}

// -------------------------------------------------------------------------------------------------

function _setDocumentId(id) {
	Session.set('ssn_documents._id', id);
	_setCurrentSnapshots(id);
}

// -------------------------------------------------------------------------------------------------

function _setCurrentSnapshots(id) {
	var doc = Documents.findOne({_id:id});	
	var snapshots = (doc) ? doc.snapshots : undefined;

	Session.set('ssn_snapshots', snapshots);
}

// -------------------------------------------------------------------------------------------------

function _isEditingDocItem(id) {
	return Session.equals('ssn_isEditingDocItem', id);
}

// -------------------------------------------------------------------------------------------------

function _setEditingDocItem(id) {
	Session.set('ssn_isEditingDocItem', id);
	State.setDocumentId(id);
}

// -------------------------------------------------------------------------------------------------
// END
// -------------------------------------------------------------------------------------------------
