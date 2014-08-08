
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

    'click #id-btn-customizer': function(e,t) {
        if ( State.toggleCustomizer() ) {
            State.toggleFiles(false);
            State.toggleEditor(false);
            State.toggleVisualizer(true);
            State.togglePythonTutor(false);
            State.toggleDebugInfo(false);
        }

        State.triggerToggle();
    },


    // -----------------------------------------------------------------------------------------------------------------

    'click #id-btn-pythonTutor': function(e,t) {

        if ( State.togglePythonTutor() ) {
            State.toggleFiles(false);
            State.toggleEditor(false);
            State.toggleVisualizer(true);
            State.toggleCustomizer(false);
            State.toggleDebugInfo(false);
        }

        State.triggerToggle();
    },

    // -----------------------------------------------------------------------------------------------------------------

    'click #id-btn-debugInfo': function(e,t) {

        if ( State.toggleDebugInfo() ) {
            State.toggleFiles(false);
            State.toggleEditor(false);
            State.toggleVisualizer(true);
            State.toggleCustomizer(false);
            State.togglePythonTutor(false);
        }
        
        State.triggerToggle();
    },

    // -----------------------------------------------------------------------------------------------------------------

    'click #id-btn-test': function(e,t) {
        app.draw();
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

    isFilesActive: function() {
        return State.isFiles() && 'active';
    },

    // -----------------------------------------------------------------------------------------------------------------

    isEditorActive: function() {
        return State.isEditor() && 'active';
    },

    // -----------------------------------------------------------------------------------------------------------------

    isVisualizerActive: function() {
        return State.isVisualizer() && 'active';
    },

    // -----------------------------------------------------------------------------------------------------------------

    isCustomizerActive: function() {
        return State.isCustomizer() && 'active';
    },

    // -----------------------------------------------------------------------------------------------------------------

    isPythonTutorActive: function() {
        return State.isPythonTutor() && 'active';
    },

    // -----------------------------------------------------------------------------------------------------------------

    isDebugInfoActive: function() {
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
