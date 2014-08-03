
// --------------------------------------------------------------------------------------------------------------------
// STARTUP
// --------------------------------------------------------------------------------------------------------------------

Meteor.startup(function() {

    //Export | Singelton
    app = this.app || new App();

});//Meteor.startup

// --------------------------------------------------------------------------------------------------------------------
// CLASS | App
// --------------------------------------------------------------------------------------------------------------------

    //Constructor Reference
    App.prototype.constructor = App;

// ---------------------------------------------------------------------------------------------------------------------
// CONSTRUCTOR
// --------------------------------------------------------------------------------------------------------------------

    function App() {
        var self = this;

        self.mainContext = famous.core.Engine.createContext();
        self.controller = new famous.views.RenderController();
        self.mainContext.add(self.controller);

        //Views
        self.appView = new AppView();
        self.docListTestView = EditorViewFactory.docListTestView();

        //register with the slider's 
        navbar.slider.onSlide.push( self.onSlider.bind(self) );
    }

// ---------------------------------------------------------------------------------------------------------------------
// METHODS | NAVIGATION
// --------------------------------------------------------------------------------------------------------------------

App.prototype.hide = function() {
    this.controller.show( null );
}

// --------------------------------------------------------------------------------------------------------------------

App.prototype.showAppView = function() {
    var self = this;

    self.controller.show( self.appView );

    if (!self.appView._isInitShow) { //on the first time the appView is shown...
        self.appView._isInitShow = true;
        State.toggleDebugInfo();
    }
}

// --------------------------------------------------------------------------------------------------------------------

App.prototype.showDocListTestView = function() {
    this.controller.show( this.docListTestView );
}

// --------------------------------------------------------------------------------------------------------------------
// METHODS | UI | SNAPSHOTS
// --------------------------------------------------------------------------------------------------------------------

App.prototype.showSnapshot = function() {
    this.appView.visualizer.show( State.getCurrentSnapshot() );
}

// ---------------------------------------------------------------------------------------------------------------------

App.prototype.onSlider = function(evt, ui) {
    var i = ui.value;

    this.appView.visualizer.show( State.getCurrentSnapshot(), i );

    if (State.getDocumentId() && State.isPythonTutor() && State._pythonTutor) {
        State._pythonTutor.curInstr = i;
        State._pythonTutor.updateOutput();
    }
}

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
