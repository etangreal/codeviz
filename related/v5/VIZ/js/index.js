
// ---------------------------------------------------------------------------- //
// GLOBAL                                                                       //
// ---------------------------------------------------------------------------- //

function onIndexPageLoad() {
  if (this._index == undefined) {
    this._index = new Index();
  }

  else
    console.error("ERROR: onIndexPageLoad has already been called.");
}

// ---------------------------------------------------------------------------- //
// Index: INITIALIZE                                                            //
// ---------------------------------------------------------------------------- //

function Index() { var self = this;
  self.init();
  self.bindUI();
  self.bindEvents();
  self.initMode();
}

Index.prototype.init = function() { var self = Index.prototype;
  self.initVisualizer();
  self.setPythonTutor();
  self.showPythonTutor( false );

  self._codeMirror = undefined;
  self._prevExecutedLine = undefined;
  self._prevPrevExecutedLine = undefined;
};

// ---------------------------------------------------------------------------- //
// Index: UI                                                                    //
// ---------------------------------------------------------------------------- //

// ----- UI Modes ----- // ----------------------------------------------------

Index.prototype.initMode = function() { var self = this;
  var data = self.getDemoTrace();
  self.setCode( data.code );

  self.visualizeMode();
};

Index.prototype.editMode = function() { var self = this;
  self.clearHighlightedLines();

  //self.hideEditButton();
  //self.showExecuteButton();
  self.disableSlider();

  self.setEditorEditMode();
};

Index.prototype.visualizeMode = function() { var self = this;
  self.clearHighlightedLines();

  //self.showEditButton();
  //self.hideExecuteButton();
  self.enableSlider();

  self.setEditorReadOnlyMode();
};

Index.prototype.waitToVisualizeMode = function() { var self = this;
  console.log("Processing...");

  //visualizeButton.attr('disabled', true);
  //visualizeButton.html("Please wait ... processing your code");
  //self.hideVisualizer();
};

// ----------------------------------------------------------------------------

Index.prototype.setEditorReadOnlyMode = function() { var self = this; var me = Index.prototype;
  var editor = self.getCodeMirror();
  editor.setOption( "readOnly", true );
};

Index.prototype.setEditorEditMode = function() { var self = this; var me = Index.prototype;
  var editor = self.getCodeMirror();
  editor.setOption( "readOnly", false );
};

// ----------------------------------------------------------------------------

Index.prototype.editorHighlightLines = function() { var self = this; var me = Index.prototype;
  var editor = self.getCodeMirror();
  var visualizer = self.getVisualizer();

  var i = visualizer.getCurrentSnapshotNo();
  var curr = visualizer.getSnapshot(i);
  var prev = visualizer.getSnapshot(i-1);     //NOTE: not the "previously displayed snapshot" the snapshot prior to the current

  var currLineNo = (curr == undefined) ? -1 : curr.meta.line - 1;
  var prevLineNo = (prev == undefined) ? -1 : prev.meta.line - 1;

  self.clearPrevHighlightedLines();

  if (prevLineNo >= 0 && prevLineNo != currLineNo) {
    self.setPreviousLineHighlighted(prevLineNo);
    editor.addLineClass(prevLineNo,"background","highlightPrevExecutedLine");
  }

  self.setCurrentLineHighlighted(currLineNo);
  editor.addLineClass(currLineNo,"background","highlightNextLineToExecute");

  //setGutterMarker,clearGutter
  //setSize
  //scrollTo
  //focus
  //Pos
};

Index.prototype.clearPrevHighlightedLines = function() { var self = Index.prototype;
  var editor = self.getCodeMirror();
  var prevLine = self.getPreviousLineHighlighted();
  var curLine = self.getCurrentLineHighlighted();

  editor.removeLineClass(prevLine,"background", "highlightPrevExecutedLine");
  editor.removeLineClass(curLine, "background", "highlightNextLineToExecute");
};

Index.prototype.clearHighlightedLines = function() { var self = Index.prototype;
  var editor = self.getCodeMirror();

//  clear any/all highlights
  for(var i=0; i < editor.lineCount(); i++) {
    editor.removeLineClass(i,"background","highlightPrevExecutedLine");
    editor.removeLineClass(i,"background","highlightNextLineToExecute");
  }
};

// ---------------------------------------------------------------------------- //
// Index: UI:BIND                                                               //
// ---------------------------------------------------------------------------- //

Index.prototype.bindUI = function() { var self = Index.prototype;
  self.bindLayout();
  self.bindExampleSelection();
  self.bindCodeMirror();
  self.bindEditButton();
  self.bindExecuteCodeButton();
  self.bindSlider();
};

// ----------------------------------------------------------------------------

Index.prototype.bindLayout = function() { var self = Index.prototype;
  var layout = self.getLayoutContainer();
  var options = self.getLayoutOptions();

  layout.layout(options);
};

// ----------------------------------------------------------------------------

Index.prototype.bindCodeMirror = function() { var self = Index.prototype;
  var editorContainer = self.getEditorContainer();

  var codeMirrorProperties = {
    mode: 'python',
    lineNumbers: true,
    tabSize: 4,
    indentUnit: 4,
    // convert tab into four spaces:
    extraKeys: { Tab: function(cm) { cm.replaceSelection("    ", "end"); } }
  };

  var codeMirror = new CodeMirror(editorContainer, codeMirrorProperties);
  codeMirror.setSize(null, '420px');

  self._codeMirror = codeMirror;
};

// ----------------------------------------------------------------------------

Index.prototype.bindExecuteCodeButton = function() { var self = Index.prototype;
  var button = self.getExecuteButton();
  button.onclick = self.onExecuteButtonClicked;
};

Index.prototype.onExecuteButtonClicked = function() { var self = Index.prototype;
  //self.waitToVisualizeMode();

  self.executeCode();
  self.visualizeMode();
};

// ----------------------------------------------------------------------------

Index.prototype.bindEditButton = function() { var self = this;
  var editButton = self.getEditButton();
  editButton.onclick = self.onEditButtonClicked;
};

Index.prototype.onEditButtonClicked = function() { var self = Index.prototype;
  self.editMode();
};

// ----------------------------------------------------------------------------

Index.prototype.bindExampleSelection = function() { var self = Index.prototype;
  var examples = self.getExamples();
  var selectExample = self.getExampleSelection();
  var onExampleSelected = self.onExampleSelected;

  self.bindSelection(examples, selectExample, onExampleSelected);
};

Index.prototype.getExamples = function() {
  var examples = [];

  //Unselected Example
  examples.push (["<clear>", undefined]);

  //Basic: hello | happy | intro | filter | tokenize | insertion sort | list comprehension
  examples.push (["Basic: hello", "aliasing.txt"]);
  examples.push (["Basic: happy", "happy.txt"]);
  examples.push (["Basic: intro", "py_tutorial.txt"]);
  examples.push (["Basic: filter", "filter.txt"]);
  examples.push (["Basic: tokenize", "strtok.txt"]);
  examples.push (["Basic: insertion sort", "ins_sort.txt"]);
  examples.push (["Basic: list comprehension", "list-comp.txt"]);

  //Math: factorial | fibonacci | memoized fibonacci | square root | gcd | towers of hanoi
  examples.push (["Math: factorial", "fact.txt"]);
  examples.push (["Math: fibonacci", "fib.txt"]);
  //examples.push (["Math: memoized fibonacci", "memo_fib.txt"]);  //PROBLEM: this one does not load in the visualizer...
  examples.push (["Math: square root", "sqrt.txt"]);
  examples.push (["Math: gcd", "wentworth_gcd.txt"]);
  examples.push (["Math: towers of hanoi", "towers_of_hanoi.txt"]);

  //User Input: raw input
  //examples.push (["User Input: raw input", "raw_input.txt"]);

  //Objects: OOP 1 | OOP 2 | OOP 3 | inheritance
  examples.push (["Objects: OOP 1", "oop_1.txt"]);
  examples.push (["Objects: OOP 2", "oop_2.txt"]);
  examples.push (["Objects: OOP 3", "oop_small.txt"]);
  examples.push (["Objects: inheritance", "oop_inherit.txt"]);

  //Linked Lists: LL 1 | LL 2 | LL sum
  examples.push (["Linked Lists: LL 1", "linked-lists/ll1.txt"]);
  examples.push (["Linked Lists: LL 2", "linked-lists/ll2.txt"]);
  examples.push (["Linked Lists: LL sum", "sum-list.txt"]);

  //Pointer Aliasing:
  // aliasing 1 | aliasing 2 | aliasing 3 | aliasing 4 |
  // aliasing 5 | aliasing 6 | aliasing 7 | aliasing 8 | sumList
  examples.push (["Pointer Aliasing: aliasing 1", "aliasing/aliasing1.txt"]);
  examples.push (["Pointer Aliasing: aliasing 2", "aliasing/aliasing2.txt"]);
  examples.push (["Pointer Aliasing: aliasing 3", "aliasing/aliasing3.txt"]);
  examples.push (["Pointer Aliasing: aliasing 4", "aliasing/aliasing4.txt"]);
  examples.push (["Pointer Aliasing: aliasing 5", "aliasing/aliasing5.txt"]);
  examples.push (["Pointer Aliasing: aliasing 6", "aliasing/aliasing6.txt"]);
  examples.push (["Pointer Aliasing: aliasing 7", "aliasing/aliasing7.txt"]);
  examples.push (["Pointer Aliasing: aliasing 8", "aliasing/aliasing8.txt"]);
  examples.push (["Pointer Aliasing: sumList", "wentworth_sumList.txt"]);

  //Higher-Order Functions:
  //closure 1 | closure 2 | closure 3 | closure 4 | closure 5
  //list map | summation | lambda param | student torture
  examples.push (["Higher-Order Functions: closure 1", "closures/closure1.txt"]);
  examples.push (["Higher-Order Functions: closure 2", "closures/closure2.txt"]);
  examples.push (["Higher-Order Functions: closure 3", "closures/closure3.txt"]);
  examples.push (["Higher-Order Functions: closure 4", "closures/closure4.txt"]);
  examples.push (["Higher-Order Functions: closure 5", "closures/closure5.txt"]);

  //examples.push (["Higher-Order Functions: sum cubes", "sum-cubes.txt"]);
  examples.push (["Higher-Order Functions: list map", "map.txt"]);
  examples.push (["Higher-Order Functions: summation", "sum.txt"]);
  examples.push (["Higher-Order Functions: lambda param", "closures/lambda-param.txt"]);
  examples.push (["Higher-Order Functions: student torture", "closures/student-torture.txt"]);

  //Python Tricks:
  //decorators | generators | gen expr | varargs | exceptions | for-else | non-local
  examples.push (["Python Tricks: decorators", "decorators.txt"]);
  examples.push (["Python Tricks: generators", "gen_primes.txt"]);
  examples.push (["Python Tricks: gen expr", "genexpr.txt"]);
  examples.push (["Python Tricks: varargs", "varargs.txt"]);
  examples.push (["Python Tricks: exceptions", "wentworth_try_finally.txt"]);
  examples.push (["Python Tricks: for-else", "for-else.txt"]);
  examples.push (["Python Tricks: non-local", "nonlocal.txt"])

  //experimental code by Chris Meyers: minPath | knapsack | sieve | fib
  //examples.push (["Chris Meyers: minPath", "chris-meyers/optMinpath.txt"])
  //examples.push (["Chris Meyers: knapsack", "chris-meyers/optKnapsack.txt"])
  //examples.push (["Chris Meyers: sieve", "chris-meyers/optSieve.txt"])
  //examples.push (["Chris Meyers: fib", "chris-meyers/optFib.txt"])

  var folder = "OPT/example-code/";
  examples.forEach( function(item) {
    if(item[1] !== undefined)
      item[1] = folder + item[1];
  });

  return examples;
};

Index.prototype.onExampleSelected = function() { var self = Index.prototype;
  var file = $(this).val();

  self.clearHighlightedLines();
  self.resetSlider();

  if (file !== "undefined")
    $.get(file, self.onGetExampleSucceeded);
  else
    self.setCode("");

  return false;
};

Index.prototype.onGetExampleSucceeded = function(code) {  var self = Index.prototype;
  self.setCode(code);
  self.executeCode(code);
};

// ----------------------------------------------------------------------------

Index.prototype.bindSlider = function() { var self = this; var me = Index.prototype;
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

Index.prototype.onSliderProgress = function(evt, ui) { var self = this; var me = Index.prototype;
  var i = ui.value;

  if (evt.originalEvent) {
    // if this value was changed pragmatically, then evt.originalEvent will be undefined
    // however, if this value was changed by a user-initiated event then this code should be executed ...

    me.getVisualizer().updateUI(i);
    me.editorHighlightLines();
    me.updatePythonTutorUI(i);
  }
};

// ------- UI:BIND HELPER-FUNCTIONS -------------------------------------------

Index.prototype.bindSelection = function(array, select, callback) {
  if ( !this.checkBindSelection(array, select, callback) )
    return;

  select.html('');
  select.change(callback);

  array.forEach( function(item) {
    var option = document.createElement("option");

    if (item instanceof Array && item.length >= 2) {
      option.text = item[0];
      option.value = item[1];
    }
    else
      option.text = item;

    select.append(option);
  });
};

Index.prototype.checkBindSelection = function (array,select,callback) {
  var isArray = ( array !== undefined && array instanceof Array );
  var isSelect = ( select !== undefined && ( select instanceof HTMLSelectElement || select.is("select") ) );
  var isCallback = ( callback !== undefined && callback instanceof Function );

  if (isArray && isSelect && isCallback)
    return true;

  console.error("checkBindSelect failed.");
  return false;
};

// ---------------------------------------------------------------------------- //
// ACTIONS                                                                      //
// ---------------------------------------------------------------------------- //

Index.prototype.executeCode = function(code,backendScript,backendOptions,onSuccess) { var self = Index.prototype;
  code = code || self.getCode();
  backendScript = backendScript || self.getBackendScript();
  backendOptions = backendOptions || self.getBackendOptions();
  onSuccess = onSuccess || self.onExecuteCodeSuccess;

  if ( code == "" ) {
    alert('Type in some code to visualize.');
    return;
  }

  var data = {
    user_script : code,
    raw_input_json: '',
    options_json: JSON.stringify(backendOptions)
  };

  $.get(backendScript,data,onSuccess,"json");
};

// ----------------------------------------------------------------------------

Index.prototype.onExecuteCodeSuccess = function(data) { var self = Index.prototype;
  if ( !self.checkExecutionCodeData(data) ) {
    alert("Invalid data received from the server.");
    return;
  }

  var trace = data.trace;
  var exception = trace[trace.length-1];
  var isException = ( exception.event == 'uncaught_exception' );

  if (isException) {
    self.executeCodeFailed(trace, exception);
    return;
  }

  self.setVisualizer(data);
  self.setPythonTutor(data);
  self.executeCodeSucceeded();
};

Index.prototype.checkExecutionCodeData = function(data) {
  var isData = (data !== undefined);
  var isTrace = (data.trace !== undefined && data.trace.length > 0);

  var isOK = (isData && isTrace);
  if(!isOK)
    console.error("ERROR: executeCode => onSuccess => checkData: invalid data received from server.");

  return isOK;
};

// ----------------------------------------------------------------------------

Index.prototype.executeCodeSucceeded = function() { var self = Index.prototype;
  $(document).scrollTop(0);
  self.visualizeMode();
};

//TODO: Fix this, its not working yet ...
Index.prototype.executeCodeFailed = function(trace, exception) { var self = Index.prototype;

  console.log("code execution failed.\n", trace.code);

  self.highlightTraceException(trace);
  $(document).scrollTop(0);
  self.editMode();

  if ( exception.hasOwnProperty('exception_msg') ) {
    alert(exception['exception_msg']);
    console.error("Exception message:\n",exception['exception_msg']);
  }
  else {
    alert("Unknown Exception.");
    console.error("Unknown Exception.");
  }
};

// ----------------------------------------------------------------------------

//TODO: See that this works ...
Index.prototype.highlightTraceException = function(trace) { var self = Index.prototype;
  if (!self.checkTraceException(trace))
    return;

  var exception = trace[trace.length - 1];
  var errorLineNo = exception.line - 1;
  var codeMirror = self.getCodeMirror();

  codeMirror.focus();
  codeMirror.setCursor(errorLineNo,0);
  codeMirror.setLineClass(errorLineNo, null, 'errorLine');

  var onErrorChange = function() {
    codeMirror.setLineClass(errorLineNo, null, null); // reset line back to normal
    codeMirror.setOption('onChange', null); // cancel onChange
  };

  codeMirror.setOption('onChange', onErrorChange);
};

Index.prototype.checkTraceException = function(trace) {
  if (trace == undefined || trace.length == 0) {
    console.log("ERROR: invalid trace.");
    return false;
  }

  var exception = trace[trace.length - 1];
  var errorLineNo = exception.line - 1;
  var isErrorLine = ( errorLineNo !== undefined && !isNaN(parseInt(errorLineNo)) );

  if (!isErrorLine)
    console.log("ERROR: invalid error line.");

  return isErrorLine;
};

// ---------------------------------------------------------------------------- //
// EVENTS                                                                       //
// ---------------------------------------------------------------------------- //

Index.prototype.bindEvents = function() { var self = Index.prototype;
  //$( window ).resize( self.onWindowResize );
  $( document ).ajaxError( self.onAjaxError );
};

// ----------------------------------------------------------------------------

Index.prototype.onWindowResize = function() { var self = Index.prototype;
  var visualizer = self.getVisualizer();
  alert("onWindowResize");

  visualizer.redrawConnectors();
};

Index.prototype.onAjaxError = function(event, jqxhr, settings, exception) {
  //alert("onAjaxError");
  console.error(exception.message);
};

// ---------------------------------------------------------------------------- //
// PROPERTIES                                                                   //
// ---------------------------------------------------------------------------- //

// ----- Editor Containers ----- // -------------------------------------------

Index.prototype.getEditorHeader = function() {
  var container = document.getElementById('_editorHeader');

  if ( !(container instanceof HTMLDivElement) ) {
    console.error("Could not find Visualizer Container (HTMLDivElement).");
    return undefined;
  }

  return container;
};

Index.prototype.getEditorContainer = function() {
  var container = document.getElementById('_editorContainer');

  if ( !(container instanceof HTMLDivElement) ) {
    console.error("Could not find Editor Container (HTMLDivElement).");
    return undefined;
  }

  return container;
};

// ----- Visualizer Containers ----- // ---------------------------------------

Index.prototype.getVisualizerHeader = function() {
  var container = document.getElementById('_visualizerHeader');

  if ( !(container instanceof HTMLDivElement) ) {
    console.error("Could not find Visualizer Container (HTMLDivElement).");
    return undefined;
  }

  return container;
};

Index.prototype.getVisualizerContainer = function() { var self = this; var me = Index.prototype;
  if (self._visualizerContainer == undefined)
    self._visualizerContainer = $("#_visualizerContainer");

  if ( self._visualizerContainer.is("div") )
    return self._visualizerContainer;

  console.error("ERROR: getVisualizerContainer => Could not find _visualizerContainer (HTMLDivElement).");
  return undefined;
};

Index.prototype.getPythonTutorContainer = function() { var self = this; var me = Index.prototype;
  if (self._pythonTutorContainer == undefined)
    self._pythonTutorContainer = $("#_pythonTutorContainer");

  if ( self._pythonTutorContainer.is("div") )
    return self._pythonTutorContainer;

  console.error("ERROR: getPythonTutorContainer => Could not find _pythonTutorContainer (HTMLDivElement).");
  return undefined;
};

// ----- DebugInfo Container ----- // ------------------------------------------

Index.prototype.getDebugInfoContainer = function() {
  var container = document.getElementById('_debugInfoContainer');

  if ( !(container instanceof HTMLDivElement) ) {
    console.error("Could not find DebugInfo Container (HTMLDivElement).");
    return undefined;
  }

  return container;
};

// ----- Layout Container ----- // -----------------------------------------

Index.prototype.getLayoutContainer = function() {
  var container = $('#_layoutContainer');

  if ( container == undefined || !(container.is("div")) ) {
    console.error("Could not find Layout Container (HTMLDivElement).");
    return undefined;
  }

  return container;
};

// ----- Code Editor ----- // -------------------------------------------------

Index.prototype.getCodeMirror = function() { var self = this; var me = Index.prototype;
  if (self._codeMirror == undefined) {
    self.bindCodeMirror();
    console.log("WARNING: Index.prototype.getCodeMirror => this._codeMirror property was not initialized.");
  }

  return self._codeMirror;
};

// ----------------------------------------------------------------------------

Index.prototype.getCode = function() {
  return $.trim( Index.prototype.getCodeMirror().getValue() );
};

Index.prototype.setCode = function(code) { var self = this; var me = Index.prototype;
  me.getCodeMirror().setValue( code.rtrim() );
};

Index.prototype.isCode = function() {
  var code = Index.prototype.getCode();
  return ( code !== '' );
};

Index.prototype.clearCode = function() {
  Index.prototype.getCodeMirror().setValue('');
};

// ----- Highlight Editor ------------------ // -------------------------------

Index.prototype.getCurrentLineHighlighted = function() { var self = this; var me = Index.prototype;
  if(self._currentLineHighlighted == undefined)
    self._currentLineHighlighted = 0;

  return self._currentLineHighlighted;
};

Index.prototype.setCurrentLineHighlighted = function(lineNo) { var self = this; var me = Index.prototype;
  if ( isNaN(parseInt(lineNo)) )
    lineNo = 0;

  self._currentLineHighlighted = lineNo;
};

Index.prototype.getPreviousLineHighlighted = function() { var self = this; var me = Index.prototype;
  if(self._previousLineHighlighted == undefined)
    self._previousLineHighlighted = 0;

  return self._previousLineHighlighted;
};

Index.prototype.setPreviousLineHighlighted = function(lineNo) { var self = this; var me = Index.prototype;
  if ( isNaN(parseInt(lineNo)) )
    lineNo = 0;

  self._previousLineHighlighted = lineNo;
};

// ----- NAVIGATION BAR ----- // ----------------------------------------------

// ----- Examples ----- // ----------------------------------------------------

Index.prototype.getExampleSelection = function() {
  var element = $("#_exampleSelection");

  if ( element == undefined || !(element.is("select")) ) {
    console.error("ERROR => getExampleSelection: Could not find Example Selection (HTMLSelectElement).");
    return undefined;
  }

  return element;
};

// ----- Execute Button ----- // ----------------------------------------------

Index.prototype.getExecuteButton = function() {
  var button = document.getElementById("_executeCodeButton");

  if ( !(button instanceof HTMLButtonElement) ) {
    console.error("Could not find Example Selection (HTMLButtonElement).");
    return undefined;
  }

  return button;
};

Index.prototype.showExecuteButton = function() {
  Index.prototype.getExecuteButton().style.visibility = 'visible';
};

Index.prototype.hideExecuteButton = function() {
  Index.prototype.getExecuteButton().style.visibility = 'hidden';
};

// ----- Edit Button ----- // -------------------------------------------------

Index.prototype.getEditButton = function() {
  var button = document.getElementById("_editButton");

  if ( !(button instanceof HTMLButtonElement) ) {
    console.error("Could not find Edit Button (HTMLButtonElement).");
    return undefined;
  }

  return button;
};

Index.prototype.showEditButton = function() {
  Index.prototype.getEditButton().style.visibility = 'visible';
};

Index.prototype.hideEditButton = function() {
  Index.prototype.getEditButton().style.visibility = 'hidden';
};

// ----- Slider ----- // ------------------------------------------------------

Index.prototype.getSlider = function() {
  var slider = $("#_slider");

  if ( slider == undefined || !(slider.is("div")) ) {
    console.error("Could not find Progress Slider (HTMLDivElement).");
    return undefined;
  }

  return slider;
};

Index.prototype.resetSlider = function() { var self = this; var me = Index.prototype;
  var slider = self.getSlider();
};

Index.prototype.enableSlider = function() {
  Index.prototype.getSlider().attr('enabled', true);
};

Index.prototype.disableSlider = function() {
  Index.prototype.getSlider().attr('enabled', false);
};

// ----- Visualizer ------------------ // -------------------------------------

Index.prototype.initVisualizer = function(data,container,options) { var self = this; var me = Index.prototype;
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

Index.prototype.getVisualizer = function() { var self = this; var me = Index.prototype;
  if(self._visualizer == undefined)
    console.error("ERROR: getVisualizer => Visualizer is undefined.");

  return self._visualizer;
};

Index.prototype.setVisualizer = function(data,container,options) { var self = this;
  var visualizer = self.getVisualizer();

  visualizer.setVisualizer(data,container,options);
  self.bindSlider();
};

// ----- Python Tutor ------------------ // -----------------------------------

Index.prototype.getPythonTutor = function() { var self = this; var me = Index.prototype;
  if(self._pythonTutor == undefined)
    console.ERROR("ERROR: getPythonTutor => PythonTutor is undefined.");

  return self._pythonTutor;
};

Index.prototype.setPythonTutor = function(data, container, options) { var self = this; var me = Index.prototype;
  data = data || self.getDemoTrace();
  container = container || self.getPythonTutorContainer();
  options = options || self.getFrontendOptions();

  self._pythonTutor = new ExecutionVisualizer(container.attr('id'), data, options);
//  self.rebindKeysToPythonTutor();
};

//Index.prototype.rebindKeysToPythonTutor = function() { var self = this; var me = Index.prototype;
//  if ( !self.isPythonTutor() )
//    return;
//
//  var pythonTutor = self.getPythonTutor();
//
//  $(document).unbind('keydown');
//  $(document).keydown( function(k) {
//    if (k.keyCode == 37) // left arrow
//      if (pythonTutor.stepBack())
//        k.preventDefault(); // don't horizontally scroll the display
//
//      else if (k.keyCode == 39) // right arrow
//        if (pythonTutor.stepForward())
//          k.preventDefault(); // don't horizontally scroll the display
//  });
//};

// ----------------------------------------------------------------------------

Index.prototype.updatePythonTutorUI = function(i) { var self = this; var me = Index.prototype;
  if ( !self.isPythonTutor() )
    return;

  var pythonTutor = self.getPythonTutor();

  pythonTutor.curInstr = i;
  pythonTutor.updateOutput();
};

// ----------------------------------------------------------------------------

Index.prototype.showPythonTutor = function(show) { var self = this; var me = Index.prototype;
  self._isPythonTutor = show || false;
};

Index.prototype.isPythonTutor = function() { var self = this; var me = Index.prototype;
  return (
    self._pythonTutor != undefined &&
    self._isPythonTutor == true
  );
};

// ----------------------------------------------------------------------------

Index.prototype.getDemoTrace = function() { var self = this; var me = Index.prototype;

  if (self._demoTrace == undefined || self._demoTrace == "") {

    self._demoTrace = {
      "code": "def listSum(numbers):\n  if not numbers:\n    return 0\n  else:\n    (f, rest) = numbers\n    return f + listSum(rest)\n\nmyList = (1, (2, (3, None)))\ntotal = listSum(myList)\n",
      "trace": [{"ordered_globals": [], "stdout": "", "func_name": "<module>", "stack_to_render": [], "globals": {}, "heap": {}, "line": 1, "event": "step_line"}, {"ordered_globals": ["listSum"], "stdout": "", "func_name": "<module>", "stack_to_render": [], "globals": {"listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null]}, "line": 8, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "<module>", "stack_to_render": [], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 9, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 1, "event": "call"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 2, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 5, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 6, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 1, "event": "call"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 2, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 5, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 6, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"numbers": ["REF", 4]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 1, "event": "call"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"numbers": ["REF", 4]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 2, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"numbers": ["REF", 4]}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 5, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"numbers": ["REF", 4], "rest": null, "f": 3}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers", "f", "rest"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 6, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"numbers": ["REF", 4], "rest": null, "f": 3}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 4, "encoded_locals": {"numbers": null}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f4", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 1, "event": "call"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"numbers": ["REF", 4], "rest": null, "f": 3}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 4, "encoded_locals": {"numbers": null}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f4", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 2, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"numbers": ["REF", 4], "rest": null, "f": 3}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 4, "encoded_locals": {"numbers": null}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f4", "ordered_varnames": ["numbers"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 3, "event": "step_line"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"numbers": ["REF", 4], "rest": null, "f": 3}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 4, "encoded_locals": {"__return__": 0, "numbers": null}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f4", "ordered_varnames": ["numbers", "__return__"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 3, "event": "return"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 3, "encoded_locals": {"__return__": 3, "numbers": ["REF", 4], "rest": null, "f": 3}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f3", "ordered_varnames": ["numbers", "f", "rest", "__return__"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 6, "event": "return"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": false, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest"]}, {"frame_id": 2, "encoded_locals": {"__return__": 5, "numbers": ["REF", 3], "rest": ["REF", 4], "f": 2}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f2", "ordered_varnames": ["numbers", "f", "rest", "__return__"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 6, "event": "return"}, {"ordered_globals": ["listSum", "myList"], "stdout": "", "func_name": "listSum", "stack_to_render": [{"frame_id": 1, "encoded_locals": {"__return__": 6, "numbers": ["REF", 2], "rest": ["REF", 3], "f": 1}, "is_highlighted": true, "is_parent": false, "func_name": "listSum", "is_zombie": false, "parent_frame_id_list": [], "unique_hash": "listSum_f1", "ordered_varnames": ["numbers", "f", "rest", "__return__"]}], "globals": {"myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 6, "event": "return"}, {"ordered_globals": ["listSum", "myList", "total"], "stdout": "", "func_name": "<module>", "stack_to_render": [], "globals": {"total": 6, "myList": ["REF", 2], "listSum": ["REF", 1]}, "heap": {"1": ["FUNCTION", "listSum(numbers)", null], "2": ["TUPLE", 1, ["REF", 3]], "3": ["TUPLE", 2, ["REF", 4]], "4": ["TUPLE", 3, null]}, "line": 9, "event": "return"}]
    };
  }

  return self._demoTrace;
};

// ----- Options ----- // -----------------------------------------------------

Index.prototype.getPythonVersion = function() {

  var version =
      "2.7";
      //"3.3";
      //"2crazy";

  return version;
};

Index.prototype.getBackendScript = function() {
  var python2_backend_script = 'exec';                            //Python 2.7
//  var python3_backend_script = null;                            //Python 3.3
//  var python2crazy_backend_script = 'web_exec_py2-crazy.py';    //Py 2.crazy | 2crazy

  return python2_backend_script;
};

Index.prototype.getBackendOptions = function() {
  return {
    py_crazy_mode: false,                 //pythonVersion

    cumulative_mode: false,               //hide frames of exited functions: false
                                          //show frames of exited functions: true

    heap_primitives: false,               //inline primitives and nested objects: false
                                          //render all objects on the heap: true

    show_only_outputs: false,             //show everything: false
                                          //show only outputs: true
    origin: 'index.js'
  };
};

Index.prototype.getFrontendOptions = function() {
  return {
    startingInstruction:            0           //indicates which instruction to start executing from

    , embeddedMode:                 true        //
    , editCodeBaseURL:              ''          //

    , hideOutput:                   false       //hide "Program output" display

                                                //render all objects on the heap: true
    , disableHeapNesting:           false       //inline primitives and nested objects: false

                                                //show environment parent pointers: true
    , drawParentPointers:           false       //hide environment parent pointers: false

                                                //use text labels for references: true
    , textualMemoryLabels:          false       //draw references using arrows: false

                                                //show only outputs: true
    , showOnlyOutputs:              false       //show everything: false

    , executeCodeWithRawInputFunc:  undefined   //

    , updateOutputCallback: function() { }      //

    , pyCrazyMode: false                        // undocumented experimental modes:

    , allowEditAnnotations: false               //
  }
};

Index.prototype.getLayoutOptions = function() {
  return {

      //reference purposes only - these options are NOT required because 'true' is the default
        closable:					            true	// pane can open & close
      ,	resizable:					          true	// when open, pane can be resized
      ,	slidable:					            true  // when closed, pane can 'slide' open over other panes - closes on mouse-out
      ,	livePaneResizing:			        true

      //------RESIZE/TOGGLING SETTINGS------//

      //NORTH
      ,	north__resizable:			        false	// OVERRIDE the pane-default of 'resizable=true'
      ,	north__slidable:			        false	// OVERRIDE the pane-default of 'slidable=true'
      ,	north__togglerLength_open:    0     // toggle-button is full-width of resizer-bar
      ,	north__togglerLength_closed:  0     // toggle-button is full-width of resizer-bar
      ,	north__spacing_open:		      0		  // no resizer-bar when open (zero height)
      ,	north__spacing_closed:		    0	  // big resizer-bar when closed (zero width)

      //WEST
      ,	west__resizable:			        true	// OVERRIDE the pane-default of 'resizable=true'
      ,	west__slidable:			          true	// OVERRIDE the pane-default of 'slidable=true'
      ,	west__togglerLength_open:    "100%" // toggle-button is full-width of resizer-bar
      ,	west__togglerLength_closed:  "100%" // toggle-button is full-width of resizer-bar
      ,	west__spacing_open:		        1		  // no resizer-bar when open (zero height)
      ,	west__spacing_closed:		      20		// big resizer-bar when closed (zero width)

      //EAST
      ,	east__resizable:			        true	// OVERRIDE the pane-default of 'resizable=true'
      ,	east__slidable:			          true	// OVERRIDE the pane-default of 'slidable=true'
      ,	east__togglerLength_open:    "100%" // toggle-button is full-width of resizer-bar
      ,	east__togglerLength_closed:  "100%" // toggle-button is full-width of resizer-bar
      ,	east__spacing_open:		        5		  // no resizer-bar when open (zero height)
      ,	east__spacing_closed:		      20		// big resizer-bar when closed (zero width)

      //SOUTH
      , south__spacing_open:          5

      //------- PANE-SIZE SETTINGS ---------//

      ,	center__minWidth:			        300

      //NORTH-SIZE
      ,	north__size:					        58
      ,	north__minSize:				        58
      ,	north__maxSize:				        58

      //EAST-SIZE
      ,	west__size:					         "auto"
      ,	west__minSize:				        240
      ,	west__maxSize:				        .5    // 50% of layout width

      //EAST-SIZE
      ,	east__size:					         "auto"
      ,	east__minSize:				        240
      ,	east__maxSize:				        .5    // 50% of layout width

      //SOUTH-SIZE
      , south__minSize:               400

      //--------- OTHER SETTINGS -----------//

      //enable showOverflow on west-pane so CSS popups will overlap north pane
      ,	center__showOverflowOnHover:	false
      ,	east__showOverflowOnHover:	  true

      //enable state management
      ,	stateManagement__enabled:	    true  // automatic cookie load & save enabled by default

      //debugging
      ,	showDebugMessages:			      true  // log and/or display messages from debugging & testing code
  };
};

Index.prototype.getInitLayoutStateSettings = function() {
  return {
        north__size:		    "auto"
      ,	north__initClosed:	false
      ,	north__initHidden:	false
      ,	south__size:		    "auto"
      ,	south__initClosed:	false
      ,	south__initHidden:	false
      ,	west__size:			    200
      ,	west__initClosed:	  false
      ,	west__initHidden:	  false
      ,	east__size:			    300
      ,	east__initClosed:	  false
      ,	east__initHidden:	  false
  }
};

// ---------------------------------------------------------------------------- //
// END-OF-FILE                                                                  //
// ---------------------------------------------------------------------------- //