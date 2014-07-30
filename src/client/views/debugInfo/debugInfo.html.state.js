
// -------------------------------------------------------------------------------------------------
// EXPORT | STATE
// -------------------------------------------------------------------------------------------------

this.State = this.State || {};

_.extend(this.State, {

	getCurrentSnapshots: _getCurrentSnapshots,
	 getCurrentSnapshot: _getCurrentSnapshot,

		   getTraceInfo: _getTraceInfo,
		   getStackInfo: _getStackInfo,
		   getStackHtml: _getStackHtml,
		    getHeapInfo: _getHeapInfo,
		    getHeapHtml: _getHeapHtml,
		  getLayoutInfo: _getLayoutInfo,
	  getReferencesInfo: _getReferencesInfo,

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

function _getCurrentSliderIndex() {
	return Session.get('ssn_sliderValue') || 0;
}

// -------------------------------------------------------------------------------------------------

function _getCurrentSnapshots() {
	return Session.get('ssn_snapshots');
}

// -------------------------------------------------------------------------------------------------

function _getCurrentSnapshot() {
	var idx = _getCurrentSliderIndex();
	var snapshots = _getCurrentSnapshots();

	return (snapshots && idx < snapshots.length) ? snapshots[idx] : undefined;
}

// -------------------------------------------------------------------------------------------------

function _getTraceInfo() {
	var self = this;
	if (!self.isDebugInfo()) return '';

	var idx = _getCurrentSliderIndex();
	var snapshot = _getCurrentSnapshot();

	return (snapshot && snapshot.traceInfo) ? snapshot.traceInfo : 'no-traceInfo. idx: ' + idx;
}

// -------------------------------------------------------------------------------------------------

function _getStackInfo() {
	var self = this;
	if (!self.isDebugInfo()) return '';

	var idx = _getCurrentSliderIndex();
	var snapshot = _getCurrentSnapshot();

	return (snapshot && snapshot.stackInfo) ? snapshot.stackInfo : 'no-stackInfo. idx: ' + idx;
}

// -------------------------------------------------------------------------------------------------

function _getStackHtml() {
	var self = this;
	if (!self.isDebugInfo()) return '';

	var idx = _getCurrentSliderIndex();
	var snapshot = _getCurrentSnapshot();

	return (snapshot && snapshot.stackHtml) ? snapshot.stackHtml : 'no-stackHtml. idx: ' + idx;
}

// -------------------------------------------------------------------------------------------------

function _getHeapInfo() {
	var self = this;
	if (!self.isDebugInfo()) return '';

	var idx = _getCurrentSliderIndex();
	var snapshot = _getCurrentSnapshot();

	return (snapshot && snapshot.heapInfo) ? snapshot.heapInfo : 'no-heapInfo. idx: ' + idx;
}

// -------------------------------------------------------------------------------------------------

function _getHeapHtml() {
	var self = this;
	if (!self.isDebugInfo()) return '';

	var idx = _getCurrentSliderIndex();
	var snapshot = _getCurrentSnapshot();

	return (snapshot && snapshot.heapHtml) ? snapshot.heapHtml : 'no-heapInfo. idx: ' + idx;
}

// -------------------------------------------------------------------------------------------------

function _getLayoutInfo() {
	var self = this;
	if (!self.isDebugInfo()) return '';

	var idx = _getCurrentSliderIndex();
	var snapshot = _getCurrentSnapshot();

	return (snapshot && snapshot.layoutInfo) ? snapshot.layoutInfo : 'no-layoutInfo. idx: ' + idx;
}

// -------------------------------------------------------------------------------------------------

function _getReferencesInfo() {
	var self = this;
	if (!self.isDebugInfo()) return '';

	var idx = _getCurrentSliderIndex();
	var snapshot = _getCurrentSnapshot();

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

	return (snapshot) ? refInfo : 'no-referencesInfo. idx: ' + idx;
}

// -------------------------------------------------------------------------------------------------
// END
// -------------------------------------------------------------------------------------------------
