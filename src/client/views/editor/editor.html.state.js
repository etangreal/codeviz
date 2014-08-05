
// -------------------------------------------------------------------------------------------------
// State
// -------------------------------------------------------------------------------------------------

this.State = this.State || {};

_.extend(this.State, {

			   isDocumentId: _isDocumentId,
			  getDocumentId: _getDocumentId,
			  setDocumentId: _setDocumentId,

		 // setCurrentSnapshots: _setCurrentSnapshots,
		 	  CountSnapshots: _countSnapshots,
			  getCurrentData: _getCurrentData,

		   isEditingDocItem: _isEditingDocItem,
		  setEditingDocItem: _setEditingDocItem

});//this.State

// -------------------------------------------------------------------------------------------------
// STARTUP
// -------------------------------------------------------------------------------------------------

Meteor.startup(function () {

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
	var data = (doc) ? doc.data : undefined;

	Session.set('ssn_snapshots', snapshots);
	Session.set('ssn_data', data);
}

// -------------------------------------------------------------------------------------------------

function _countSnapshots() {
	var snapshots = Session.get('ssn_snapshots');

	var len = (snapshots) ? snapshots.length : 0;

	return len;
}

// -------------------------------------------------------------------------------------------------

function _getCurrentData() {
	return Session.get('ssn_data');
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
