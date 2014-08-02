
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

    // var pythonTutor = new library.meteor.core.Surface({
    //     template: Template.pythonTutor,
    //     size: [undefined, undefined],
    //     properties: {
    //         backgroundColor: 'yellow'
    //     }
    // });

    var pythonTutor = new famous.core.Surface({
        content: '<div id="pythonTutor"></div>',
        size: [undefined,undefined],
        properties: {
            overflow: 'scroll',
            borderLeft: '2px solid grey',
            backgroundColor: 'white' 
        }
    });

    return pythonTutor;
}

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------

//});//Meteor.startup
