
// ---------------------------------------------------------------------------------------------------------------------
// METEOR METHODS
// ---------------------------------------------------------------------------------------------------------------------

Meteor.methods({

	// Meteor.call('phantomTest', Session.get('ssn_documents._id'));
	phantomTest: function(id) {
		if (Meteor.isClient) { console.log('client: phantomTest. id:', id); }

		// if (Meteor.isServer) {
		// 	console.log('server: CALLING => _phantomTest. id: ', id);
		// 	_phantomSpawnTest(id);
		// }
	}

});//Meteor.methods

// -----------------------------------------------------------------------------------------------------------------
// END
// -----------------------------------------------------------------------------------------------------------------
