
// ---------------------------------------------------------------------------------------------------------------------
// COLLECTIONS
// ---------------------------------------------------------------------------------------------------------------------

var Docs = new Meteor.Collection('docs');

// ---------------------------------------------------------------------------------------------------------------------
// METEOR METHODS (a.k.a RPC)
// ---------------------------------------------------------------------------------------------------------------------

Meteor.methods({

	executeCode: function(id) {

		if (!id) {
			console.log('Meteor.methods | executeCode | invalid id: ', id);
			return;
		}

		console.log('Meteor.methods | executeCode | id: ', id);

		var doc = Docs.findOne(id);

		if (!doc) {
			console.error('ERROR: Meteor.methods | executeCode | Docs.find({_id:id}) | Unable to find document.');
			return;			
		}

		var code = doc.data.snapshot;
		console.log('Meteor.methods | executeCode | code: ', code);

	}//executeCode

});//Meteor.methods

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------