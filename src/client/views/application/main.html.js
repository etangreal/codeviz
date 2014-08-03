
// ---------------------------------------------------------------------------------------------------------------------
// HEADER | EVENTS
// ---------------------------------------------------------------------------------------------------------------------

Template.header.events({

    // -----------------------------------------------------------------------------------------------------------------

    'click #id-btn-codeviz': function(e,t) {
        Router.go(Route.home);
    },

    // -----------------------------------------------------------------------------------------------------------------

    'click #id-btn-files': function(e,t) {
        State.toggleFiles();
        State.triggerToggle();
    },

    // -----------------------------------------------------------------------------------------------------------------

    'click #id-btn-editor': function(e,t) {
        State.toggleEditor();
        State.triggerToggle();
    },

    // -----------------------------------------------------------------------------------------------------------------

    'click #id-btn-visualizer': function(e,t) {
        State.toggleVisualizer();
        State.triggerToggle();
    },

    // -----------------------------------------------------------------------------------------------------------------

    'click #id-btn-pythonTutor': function(e,t) {

        if ( State.togglePythonTutor() ) {
            State.toggleFiles(false);
            State.toggleEditor(false);
            State.toggleVisualizer(true);
            State.toggleDebugInfo(false);

            var id = State.getDocumentId();

            if (id && State.isPythonTutor()) {
                var data = State.getCurrentData();
                var options = State.getPythonTutorFrontendOptions();
                State._pythonTutor = new ExecutionVisualizer( $('#pythonTutor').attr('id') , data, options);
            }
        }

        State.triggerToggle();
    },

    // -----------------------------------------------------------------------------------------------------------------

    'click #id-btn-debugInfo': function(e,t) {

        if ( State.toggleDebugInfo() ) {
            State.toggleFiles(false);
            State.toggleEditor(false);
            State.togglePythonTutor(false);
        }
        
        State.triggerToggle();
    },

    // -----------------------------------------------------------------------------------------------------------------

    'click #id-btn-test': function(e,t) {
    },

    // -----------------------------------------------------------------------------------------------------------------

    'click #id-btn-execute': function(e,t) {
        //SEE: main.navbar.btnExecute.js | _onClick();
    }

    // -----------------------------------------------------------------------------------------------------------------

});//Template.header.events

// ---------------------------------------------------------------------------------------------------------------------
// NAVBAR | HELPERS
// ---------------------------------------------------------------------------------------------------------------------

Template.navbar.helpers({

    isFiles: function() {
        return State.isFiles() && 'active';
    },

    // -----------------------------------------------------------------------------------------------------------------

    isEditor: function() {
        return State.isEditor() && 'active';
    },

    // -----------------------------------------------------------------------------------------------------------------

    isVisualizer: function() {
        return State.isVisualizer() && 'active';
    },

    // -----------------------------------------------------------------------------------------------------------------

    isPythonTutor: function() {
        return State.isPythonTutor() && 'active';
    },

    // -----------------------------------------------------------------------------------------------------------------

    isDebugInfo: function() {
        return State.isDebugInfo() && 'active';
    }

}); //Template.navbar.helpers

// ---------------------------------------------------------------------------------------------------------------------
// NAVBAR | RENDERED
// ---------------------------------------------------------------------------------------------------------------------

Template.navbar.rendered = function() {
    navbar.slider.init.call(this,20);
    navbar.btnExecute.init.call(this);
}

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
