
// ---------------------------------------------------------------------------------------------------------------------
// DOC-LIST | PROPERTIES
// ---------------------------------------------------------------------------------------------------------------------

Template.debugInfo.traceInfo = function() {

	var idx = Session.get('ssn_sliderValue') || 0;
	var snapshots = Session.get('ssn_snapshots');
	var snapshot = (snapshots && idx < snapshots.length) ? snapshots[idx]  : undefined ;

	var traceInfo = (snapshot) ? snapshot.traceInfo : 'no-traceInfo. idx: ' + idx;
	return traceInfo;
};

// ---------------------------------------------------------------------------------------------------------------------

Template.debugInfo.stackInfo = function() {
	
	var idx = Session.get('ssn_sliderValue') || 0;
	var snapshots = Session.get('ssn_snapshots');
	var snapshot = (snapshots && idx < snapshots.length) ? snapshots[idx]  : undefined ;

	var stackInfo = (snapshot) ? snapshot.stackInfo : 'no-stackInfo. idx: ' + idx;
	return stackInfo;
};

// ---------------------------------------------------------------------------------------------------------------------

Template.debugInfo.stackHtml = function() {

	var idx = Session.get('ssn_sliderValue') || 0;
	var snapshots = Session.get('ssn_snapshots');
	var snapshot = (snapshots && idx < snapshots.length) ? snapshots[idx]  : undefined ;

	var stackHtml = (snapshot) ? snapshot.stackHtml : 'no-stackHtml. idx: ' + idx;
	return stackHtml;
};

// ---------------------------------------------------------------------------------------------------------------------

Template.debugInfo.heapInfo = function() {
	
	var idx = Session.get('ssn_sliderValue') || 0;
	var snapshots = Session.get('ssn_snapshots');
	var snapshot = (snapshots && idx < snapshots.length) ? snapshots[idx]  : undefined ;

	var heapInfo = (snapshot) ? snapshot.heapInfo : 'no-heapInfo. idx: ' + idx;
	return heapInfo;
};

// ---------------------------------------------------------------------------------------------------------------------

Template.debugInfo.heapHtml = function() {

	var idx = Session.get('ssn_sliderValue') || 0;
	var snapshots = Session.get('ssn_snapshots');
	var snapshot = (snapshots && idx < snapshots.length) ? snapshots[idx]  : undefined ;

	var heapHtml = (snapshot) ? snapshot.heapHtml : 'no-heapHtml. idx: ' + idx;
	return heapHtml;
};

// ---------------------------------------------------------------------------------------------------------------------

Template.debugInfo.layoutInfo = function() {

	var idx = Session.get('ssn_sliderValue') || 0;
	var snapshots = Session.get('ssn_snapshots');
	var snapshot = (snapshots && idx < snapshots.length) ? snapshots[idx]  : undefined ;

	var layoutInfo = (snapshot) ? snapshot.layoutInfo : 'no-layoutInfo. idx: ' + idx;
	return layoutInfo;
};

// ---------------------------------------------------------------------------------------------------------------------

Template.debugInfo.referencesInfo = function() {

	var idx = Session.get('ssn_sliderValue') || 0;
	var snapshots = Session.get('ssn_snapshots');
	var snapshot = (snapshots && idx < snapshots.length) ? snapshots[idx]  : undefined ;

	if (snapshot)
	  var refInfo =
	      "-----------------------------------------------------\n" +
	      "REFERENCES INFO"                                  + "\n" +
	      "-----------------------------------------------------\n" +
	      snapshot.referencesInfo                            + "\n" +
	      "-----------------------------------------------------\n" +
	      "PLUMBING INFO"                                    + "\n" +
	      "-----------------------------------------------------\n" +
	      snapshot.plumbingInfo                              + "\n" +
	      "-----------------------------------------------------\n" +
	      "COORDINATE INFO"                                  + "\n" +
	      "-----------------------------------------------------\n" +
	      snapshot.coordinateInfo                            + "\n";

	var referencesInfo = (snapshot) ? refInfo : 'no-referencesInfo. idx: ' + idx;
	return referencesInfo;
};

// ---------------------------------------------------------------------------------------------------------------------
// DEBUG-INFO | EVENTS
// ---------------------------------------------------------------------------------------------------------------------

// Template.debugInfo.events({

// )}

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
