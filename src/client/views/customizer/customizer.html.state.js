
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
	var obj   	  = State.getSelectedObj();
	var objPtr 	  = undefined;
	var snapshots = State.getCurrentSnapshots();

	var snapshot  = (snapshots && obj.sid < snapshots.length) ? snapshots[obj.sid] : undefined;

	if (!snapshot) {
		console.error('ERROR | customizer.html.state.js | _saveSelectedObj | snapshot undefined.');
		return;
	}

	if (obj.draw.location == NodeLocationTypeEnum.STACK) {
		snapshot.stack.forEach(function(o) {
			if (o.uid == obj.uid) {
				objPtr = o;
				return;
			}
		});

	} else if (obj.draw.location == NodeLocationTypeEnum.HEAP) {
		snapshot.heap.forEach(function(o) {
			if (o.uid == obj.uid) {
				objPtr = o;
				return;
			}
		});

	} else {
		console.error('ERROR | customizer.html.state.js | _saveSelectedObj | unknown obj.');
		return;
	}

	console.log('----------------------------------------------------------------');
	console.log(obj);
	console.log('----------------------------------------------------------------');
	console.log(objPtr);	
	console.log('----------------------------------------------------------------');
	console.log(snapshot);

	if (!objPtr) {
		console.error('ERROR | customizer.html.state.js | _saveSelectedObj | undefined objPtr.');
		return;
	}

	objPtr.render = obj.render;
	objPtr.html = obj.render.html;

	console.log('----------------------------------------------------------------');
	console.log(objPtr);

	snapshot.draw.isInit = false;
	app.appView.visualizer.show( snapshot );
}

// -------------------------------------------------------------------------------------------------

function _getUpdateSnapshots() {
	return Session.get('ssn_snapshots');
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
