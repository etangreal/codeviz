

// -------------------------------------------------------------------------------------------------
// State
// -------------------------------------------------------------------------------------------------

this.State = this.State || {};

_.extend(this.State, {

    _pythonTutor: undefined,
	getPythonTutorFrontendOptions: _getPythonTutorFrontendOptions

});//this.State

// -------------------------------------------------------------------------------------------------
// FUNCTIONS
// -------------------------------------------------------------------------------------------------

function _getPythonTutorFrontendOptions() {
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

// -------------------------------------------------------------------------------------------------
// END
// -------------------------------------------------------------------------------------------------
