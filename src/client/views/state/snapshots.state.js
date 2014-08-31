
// -------------------------------------------------------------------------------------------------
// EXPORT | STATE
// -------------------------------------------------------------------------------------------------

this.State = this.State || {};

_.extend(this.State, {

		setCurrentSnapshots: _setCurrentSnapshots,
		getCurrentSnapshots: _getCurrentSnapshots,

 setCurrentSnapshotsSession: _setCurrentSnapshotsSession,

		 getCurrentSnapshot: _getCurrentSnapshot,
			 CountSnapshots: _countSnapshots,

	 		 getCurrentData: _getCurrentData,
});//this.State

// -------------------------------------------------------------------------------------------------
// FUNCTIONS
// -------------------------------------------------------------------------------------------------

function _getCurrentSliderIndex() {
	return Session.get('ssn_sliderValue') || 0;
}

// -------------------------------------------------------------------------------------------------

function _setCurrentSnapshots(id) {
	var snapshots 	= _getSnapshots(id);
	var data 		= _getData(id);

	Session.set('ssn_snapshots', snapshots);
	//State.snapshots = snapshots;

	Session.set('ssn_data', data);
	//State.data = data;
}

	// --------------------------------------------------------------------------------------------

	function _getSnapshots(id) {
		var doc 		= Documents.findOne({_id:id});
		var snapshots 	= (doc) ? doc.snapshots : undefined;

		if (!snapshots)
			console.error('ERROR | snapshots.state.js | _getSnapshots | could not load snapshots from Documents with id: ', id);

		return snapshots;
	}

	// --------------------------------------------------------------------------------------------

	function _getData(id) {
		var doc 		= Documents.findOne({_id:id});
		var data 		= (doc) ? doc.data : undefined;

		if (!data)
			console.error('ERROR | snapshots.state.js | _getData | could not load data from Document with id: ', id);

		return data;
	}

// -------------------------------------------------------------------------------------------------

function _setCurrentSnapshotsSession(snapshots) {
	Session.set('ssn_snapshots', snapshots);
}

// -------------------------------------------------------------------------------------------------

function _getCurrentSnapshots() {

	return Session.get('ssn_snapshots');

	// return (State && State.snapshots) ? 
	// 	State.snapshots :
	// 	_getSnapshots( State.getDocumentId() );
}

// -------------------------------------------------------------------------------------------------

// Data object that PythonTutor uses...
function _getCurrentData() {
	return Session.get('ssn_data');
}

// -------------------------------------------------------------------------------------------------

function _getCurrentSnapshot() {
	var idx = _getCurrentSliderIndex();
	var snapshots = State.getCurrentSnapshots();

	if (!snapshots)
		console.error('ERROR | snapshots.state.js | _getCurrentSnapshot | could not load current snapshot.');

	return (snapshots && idx < snapshots.length) ? snapshots[idx] : undefined;
}

// -------------------------------------------------------------------------------------------------

function _countSnapshots() {
	var snapshots = State.getCurrentSnapshots();
	var len = (snapshots) ? snapshots.length : 0;

	return len;
}

// -------------------------------------------------------------------------------------------------
// END
// -------------------------------------------------------------------------------------------------
