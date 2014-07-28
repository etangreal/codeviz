
//Meteor.startup(function() {

// ---------------------------------------------------------------------------------------------------------------------
// PythonTutorViewFactory
// ---------------------------------------------------------------------------------------------------------------------

    //EXPORT
    this.PythonTutorViewFactory = {

    	//VIEWS
    	pythonTutorView: _pythonTutorView,

    }//PythonTutorViewFactory

// ---------------------------------------------------------------------------------------------------------------------
// FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------

function _pythonTutorView() {

    // var pythonTutor = new Famous.MeteorSurface({
    //     template: Template.pythonTutor,
    //     size: [undefined, undefined],
    //     properties: {
    //         backgroundColor: 'yellow'
    //     }
    // });

    var pythonTutor = new famous.core.Surface({
        size: [undefined,undefined],
        properties: { backgroundColor: 'yellow' }
    });

    return pythonTutor;
}

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------

//});//Meteor.startup
