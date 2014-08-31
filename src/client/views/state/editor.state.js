
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

	// Deps.autorun(function (c) {
	// });

});//Meteor.startup

// -------------------------------------------------------------------------------------------------
// FUNCTIONS
// -------------------------------------------------------------------------------------------------

function _isDocumentId(id) {
	return !!id && Session.equals('ssn_documents._id', id);
}

// -------------------------------------------------------------------------------------------------

function _getDocumentId() {
	return Session.get('ssn_documents._id');
}

// -------------------------------------------------------------------------------------------------

function _setDocumentId(id) {
	Session.set('ssn_documents._id', id);
	State.setCurrentSnapshots(id);

	navbar.slider.setSliderValue(0);
	app.slide(0); //ToDo: Think about where to put this ... 
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
