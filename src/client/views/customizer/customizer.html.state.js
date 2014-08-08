
// -------------------------------------------------------------------------------------------------
// EXPORT | STATE
// -------------------------------------------------------------------------------------------------

this.State = this.State || {};

_.extend(this.State, {

	getSelectedObj: _getSelectedObj,
	setSelectedObj: _setSelectedObj,

	getRenderData: _getRenderData,
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

function _getRenderTmpl() {
	var self = this;
	if (!self.isCustomizer()) return '';

	var obj = _getSelectedObj();
	// var snapshot = _getCurrentSnapshot();

	return (obj && obj.render && obj.render.tmpl) ? obj.render.tmpl : '';
}

// -------------------------------------------------------------------------------------------------

function _getRenderHtml() {
	var self = this;
	if (!self.isCustomizer()) return '';

	var obj = _getSelectedObj();
	// var snapshot = _getCurrentSnapshot();

	return (obj && obj.render && obj.render.html) ? obj.render.Html : '';
}

// -------------------------------------------------------------------------------------------------
// END
// -------------------------------------------------------------------------------------------------
