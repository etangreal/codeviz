
// -------------------------------------------------------------------------------------------------
// EXPORT | STATE
// -------------------------------------------------------------------------------------------------

this.State = this.State || {};

_.extend(this.State, {

	getSelectedObj: _getSelectedObj,
	setSelectedObj: _setSelectedObj,
   saveSelectedObj: _saveSelectedObj,

	getRenderData: _getRenderData,
	getRenderCode: _getRenderCode,
	getRenderTmpl: _getRenderTmpl,
	getRenderHtml: _getRenderHtml

});//this.State

// -------------------------------------------------------------------------------------------------

function _getSelectedObj() {
	return Session.get('ssn_selectedObj');
}

// -------------------------------------------------------------------------------------------------

function _setSelectedObj(obj) {
	Session.set('ssn_selectedObj', obj);
}

// -------------------------------------------------------------------------------------------------

function _saveSelectedObj() {
	var docId 		= State.getDocumentId();
	var obj   	  	= State.getSelectedObj();
	var snapshots 	= State.getCurrentSnapshots();

    var cmpl 		= Visualizer.prototype.compile;
    var code 		= obj.render.code;
    var tmpl 		= obj.render.tmpl;

    function update(o,obj) {
		if (o.id == obj.id) {
			var data = o.render.data;
			var html = cmpl(data, code, tmpl);

			o.render.code = code;
			o.render.tmpl = tmpl;
			o.render.html = html;
			o.html = html;
		}
    }

    // --------------------------------------------------------------------------------------------

	snapshots.forEach(function(snapshot) {

		if (obj.draw.location == NodeLocationTypeEnum.STACK) {
			snapshot.stack.forEach(function(o) {
				update(o,obj);
			});

		} else if (obj.draw.location == NodeLocationTypeEnum.HEAP) {
			snapshot.heap.forEach(function(o) {
				update(o,obj);
			});

		} else {
			console.error('ERROR | customizer.html.state.js | _saveSelectedObj | unknown obj.');
			return;
		}

	});//snapshots.forEach

	// --------------------------------------------------------------------------------------------

	State.setCurrentSnapshotsSession(snapshots);

	Documents.update(docId, { 
		$set: { 
			snapshots: snapshots
		}
	});

	var snapshot  = (snapshots && obj.sid < snapshots.length) ? snapshots[obj.sid] : undefined;

	app.appView.visualizer.show( snapshot );
}

// -------------------------------------------------------------------------------------------------

function _updateSnapshots(snapshots) {
	return Session.set('ssn_snapshots', snapshots);
}

// -------------------------------------------------------------------------------------------------

function _getRenderData() {
	var self = this;
	if (!self.isCustomizer()) return '';

	var obj = _getSelectedObj();
	// var snapshot = _getCurrentSnapshot();

	var data = (obj && obj.render && obj.render.data) ? obj.render.data : '';

	data = JSON.stringify(data, undefined, 2);

	var eat = data;
	eat = eat.replace(/^{\n/g, '');
	// eat = eat.replace(/[ \t]*{\n/g, '');
	// eat = eat.replace(/: \[\n/g, ':\n');
	// eat = eat.replace(/[ \t]*\[\n/g,'\n');
	eat = eat.replace(/[ \t]*}\n/g, '');
	eat = eat.replace(/[ \t]*]\n/g, '');
	eat = eat.replace(/[ \t]*],\n/g, '');
	eat = eat.replace(/[ \t]*},\n/g, '');
	eat = eat.replace(/}$/g, '');
	eat = eat.replace(/^[ \t\r\n]*$/g, '');

	return eat;
}

// -------------------------------------------------------------------------------------------------

function _getRenderCode() {
	var self = this;
	if (!self.isCustomizer()) return '';

	var obj = _getSelectedObj();
	return (obj && obj.render && obj.render.code) ? obj.render.code : '';
}

// -------------------------------------------------------------------------------------------------

function _getRenderTmpl() {
	var self = this;
	if (!self.isCustomizer()) return '';

	var obj = _getSelectedObj();
	return (obj && obj.render && obj.render.tmpl) ? obj.render.tmpl : '';
}

// -------------------------------------------------------------------------------------------------

function _getRenderHtml() {
	var self = this;
	if (!self.isCustomizer()) return '';

	var obj = _getSelectedObj();
	return (obj && obj.render && obj.render.html) ? obj.render.html : '';
}

// -------------------------------------------------------------------------------------------------
// END
// -------------------------------------------------------------------------------------------------
