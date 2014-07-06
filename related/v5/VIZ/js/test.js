
// ---------------------------------------------------------------------------- //
// GLOBAL                                                                       //
// ---------------------------------------------------------------------------- //

function onTestPageLoad() {
  if (this._test == undefined)
    this._test = new Test();

  else
    console.error("ERROR: onTestPageLoad has already been called.");
}

// ---------------------------------------------------------------------------- //
// Test: INITIALIZE                                                             //
// ---------------------------------------------------------------------------- //

function Test() { var self = this;
  self.initVisualizer();
  self.bindSlider();
}

// ----------------------------------------------------------------------------

Test.prototype.bindSlider = function() { var self = this; var me = Test.prototype;
  var size = self.getVisualizer().getSnapshotsCount();
  var slider = self.getSlider();

  slider.slider({min: 0, max: size-1, step: 1});

  //disable keyboard actions on the slider itself (to prevent double-firing of events)
  slider.find(".ui-slider-handle").unbind('keydown');

  // make skinnier and taller
  slider.find(".ui-slider-handle").css('width', '0.8em');
  slider.find(".ui-slider-handle").css('height', '1.4em');
  $(".ui-widget-content").css('font-size', '0.9em');

  slider.bind('slide', self.onSliderProgress);
};

Test.prototype.onSliderProgress = function(evt, ui) { var self = this; var me = Test.prototype;
  var i = ui.value;

  if (evt.originalEvent) {
    // if this value was changed pragmatically, then evt.originalEvent will be undefined
    // however, if this value was changed by a user-initiated event then this code should be executed ...

    _test.getVisualizer().updateUI(i);
  }
};

// ---------------------------------------------------------------------------- //
// ACTIONS                                                                      //
// ---------------------------------------------------------------------------- //

Test.prototype.getVisualizerContainer = function() { var self = this; var me = Test.prototype;
  if (self._visualizerContainer == undefined)
    self._visualizerContainer = $("#_visualizerContainer");

  if ( self._visualizerContainer.is("div") )
    return self._visualizerContainer;

  console.error("ERROR: getVisualizerContainer => Could not find _visualizerContainer (HTMLDivElement).");
  return undefined;
};

// ----- Slider ----- // ------------------------------------------------------

Test.prototype.getSlider = function() {
  var slider = $("#_slider");

  if ( slider == undefined || !(slider.is("div")) ) {
    console.error("Could not find Progress Slider (HTMLDivElement).");
    return undefined;
  }

  return slider;
};

Test.prototype.resetSlider = function() { var self = this; var me = Test.prototype;
  var slider = self.getSlider();
};

Test.prototype.enableSlider = function() {
  Test.prototype.getSlider().attr('enabled', true);
};

Test.prototype.disableSlider = function() {
  Test.prototype.getSlider().attr('enabled', false);
};

// ----- Visualizer ------------------ // -------------------------------------

Test.prototype.initVisualizer = function(data,container,options) { var self = this; var me = Test.prototype;
  if (self._visualizer != undefined) {
    container.error("ERROR: initVisualizer => already defined.");
    return false;
  }

  data = data || self.getDemoTrace();
  container = container || self.getVisualizerContainer();
  options = options || {};

  self._visualizer = new Visualizer(container, data, options);
  self.bindSlider();

  return true;
};

Test.prototype.getVisualizer = function() { var self = this; var me = Test.prototype;
  if(self._visualizer == undefined)
    console.error("ERROR: getVisualizer => Visualizer is undefined.");

  return self._visualizer;
};

Test.prototype.setVisualizer = function(data,container,options) { var self = this;
  var visualizer = self.getVisualizer();

  visualizer.setVisualizer(data,container,options);
  self.bindSlider();
};

// ----------------------------------------------------------------------------

Test.prototype.getDemoTrace = function() { var self = this; var me = Test.prototype;

  if (self._demoTrace == undefined || self._demoTrace == "") {

    self._demoTrace = {
      "code": "def listSum(numbers):\n  if not numbers:\n    return 0\n  else:\n    (f, rest) = numbers\n    return f + listSum(rest)\n\nmyList = (1, (2, (3, None)))\ntotal = listSum(myList)\n",
      "trace": [{"ordered_globals": [], "stdout": "", "func_name": "<module>", "stack_to_render": [], "globals": {}, "heap": {}, "line": 1, "event": "step_line"}, {"ordered_globals": ["listSum"], "stdout": "", "func_name": "<module>", "stack_to_render": [], "globals": {"listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null]}, "line": 8, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "<module>", "stack_to_render": [], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 9, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 1, "event": "call"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 2, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 5, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 6, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 1, "event": "call"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 2, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 5, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 6, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"numbers": ["REF", 4]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 1, "event": "call"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"numbers": ["REF", 4]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 2, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"numbers": ["REF", 4]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 5, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"numbers": ["REF", 4], "rest": null, "f": 3}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers", "f", "rest"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 6, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"numbers": ["REF", 4], "rest": null, "f": 3}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 4, "encoded_locals": {"numbers": null}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f4", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 1, "event": "call"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"numbers": ["REF", 4], "rest": null, "f": 3}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 4, "encoded_locals": {"numbers": null}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f4", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 2, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"numbers": ["REF", 4], "rest": null, "f": 3}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 4, "encoded_locals": {"numbers": null}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f4", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 3, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"numbers": ["REF", 4], "rest": null, "f": 3}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 4, "encoded_locals": {"__return__": 0, "numbers": null}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f4", "ordered_varnames": ["numbers", "__return__"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 3, "event": "return"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"__return__": 3, "numbers": ["REF", 4], "rest": null, "f": 3}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers", "f", "rest", "__return__"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 6, "event": "return"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"__return__": 5, "numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest", "__return__"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 6, "event": "return"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"__return__": 6, "numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest", "__return__"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 6, "event": "return"}, {"ordered_globals": ["listSum", "myList", "total"], "stdout": "", "func_name": "<module>", "stack_to_render": [], "globals": {"total": 6, "myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 9, "event": "return"}]
    };
  }

  return self._demoTrace;
};

// ---------------------------------------------------------------------------- //
// END-OF-FILE                                                                  //
// ---------------------------------------------------------------------------- //