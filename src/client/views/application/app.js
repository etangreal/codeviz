
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

        this.mainContext = famous.core.Engine.createContext();
        this.controller = new famous.views.RenderController();
        this.mainContext.add(this.controller);

        //Views
        this.appView = new AppView();
        this.docListTestView = EditorViewFactory.docListTestView();

        //add to container
        this.controller.add(this.appView);
        this.controller.add(this.docListTestView);
    }

// ---------------------------------------------------------------------------------------------------------------------
// FUNCTIONS
// --------------------------------------------------------------------------------------------------------------------

App.prototype.hide = function() {
    this.controller.show(null);
}

App.prototype.showAppView = function() {
    this.controller.show(this.appView);
}

// --------------------------------------------------------------------------------------------------------------------

App.prototype.showDocListTestView = function() {
    this.controller.show(this.docListTestView);
}

// ---------------------------------------------------------------------------------------------------------------------

App.prototype.showSnapshot = function() {
    this.appView.visualizer.show( State.getCurrentSnapshot() );
}

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
