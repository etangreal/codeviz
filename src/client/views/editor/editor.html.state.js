
// -------------------------------------------------------------------------------------------------
// State
// -------------------------------------------------------------------------------------------------

this.State = this.State || {};

_.extend(this.State, {

			   isDocumentId: _isDocumentId,
			  getDocumentId: _getDocumentId,
			  setDocumentId: _setDocumentId,

		 getCurrentSnapshot: _getCurrentSnapshot,

		   isEditingDocItem: _isEditingDocItem,
		  setEditingDocItem: _setEditingDocItem

});//this.State

// -------------------------------------------------------------------------------------------------
// STARTUP
// -------------------------------------------------------------------------------------------------

Meteor.startup(function (){
	//init ..
});

// -------------------------------------------------------------------------------------------------
// FUNCTIONS
// -------------------------------------------------------------------------------------------------

function _isDocumentId(id) {
	return Session.equals('ssn_documents._id', id);
}

function _getDocumentId() {
	return Session.get('ssn_documents._id');
}

// -------------------------------------------------------------------------------------------------

function _setDocumentId(id) {
	Session.set('ssn_documents._id', id);
	_setCurrentSnapshot(id)
}

// -------------------------------------------------------------------------------------------------

function _setCurrentSnapshot(id) {

	var doc = Documents.findOne({_id:id});
	var snapshots = (doc) ? doc.snapshots : undefined;

	Session.set('ssn_snapshots', snapshots);
}

// -------------------------------------------------------------------------------------------------

function _getCurrentSnapshot() {
	return Session.get('ssn_snapshots');
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
