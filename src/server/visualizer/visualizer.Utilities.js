
// --------------------------------------------------------------------------------------------------------------------
// FUNCTIONS | HELPERS
// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.newUID = function() {
  var me = Visualizer.prototype;
  var self = this;

  if (self._uid == undefined)
      self._uid = 0;

  return 'UID' + self._uid++;
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getRefID = function(obj) {
  var me = Visualizer.prototype;
  var self = this;

  if ( !me.isRefObj(obj) ) {
    console.error("ERROR: getRefID => expected obj of type 'RefObj'");
    return '';
  }

  if ( !(obj.length == 3) ) {
    console.error("ERROR: getRefID => obj does not have appear to be a valid RefObj");
    return '';
  }

  return obj[1];
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.getRefUID = function(obj) {
  var me = Visualizer.prototype;
  var self = this;

  if ( !me.isRefObj(obj) ) {
    console.error("ERROR: getRefUID => expected obj of type 'RefObj'");
    return "";
  }

  if ( !(obj.length == 3) ) {
    console.error("ERROR: getRef => obj does not have a UID");
    return "";
  }

  return obj[2];
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isUID = function(value) {
  var me = Visualizer.prototype;
  var self = this;

  if ( !me.isString(value) )
    return false;

  var re = /UID[0-9]+/;
  return re.test( value );
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isRefObj = function(obj) {
  var me = Visualizer.prototype;
  var self = this;

  var isArr = ( obj instanceof Array && (obj.length == 2 || obj.length == 3) );
  if (!isArr) return false;

  var isStr = typeof (obj[0]) === "string";
  if (!isStr) return false;

  if (NodeTypeEnum.POINTER != "REF")
    console.error("ERROR: expected NodeTypeEnum.POINTER == 'REF'");

  var isRef = ( (obj[0]).toUpperCase() == NodeTypeEnum.POINTER );
  var isVal = me.isNumber( obj[1] );

  if (isRef && !isVal)
    console.error("WARNING: isRefObj => isVal test failed on obj:{"+obj+"}");

  var isUID = (
      obj.length == 2 ||
          (obj.length == 3 && me.isUID( obj[2] ) )
      );

  if (isRef && isVal && !isUID) //just to keep an eye on the UID
    console.error("WARNING: isRefObj => isUID test failed on obj:{"+obj+"}");

  return (isRef && isVal && isUID);
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isArray = function(obj) {
  return (obj instanceof Array);
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isString = function(str) {
  return (typeof str === "string");
};

// --------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isUndefined = function(obj) {
  return (typeof obj == 'undefined' || obj === void 0); // || obj === null ??
};

//http://flippinawesome.org/2013/12/09/exploring-the-abyss-of-null-and-undefined-in-javascript/
//function isUndefined(obj){
//  return obj === void 0;
//}

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// END
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
