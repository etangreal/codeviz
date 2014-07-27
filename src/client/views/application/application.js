
Meteor.startup(function() {

// --------------------------------------------------------------------------------------------------------------------
// CLASS | Application
// --------------------------------------------------------------------------------------------------------------------

    //Export | Singelton
    this.application = this.application || new Application();

    //Constructor Reference
    Application.prototype.constructor = Application;

// ---------------------------------------------------------------------------------------------------------------------
// CONSTRUCTOR
// --------------------------------------------------------------------------------------------------------------------

    function Application() {

        this.mainContext = Famous.Engine.createContext();
        this.controller = new Famous.RenderController();

        this.mainContext.add(this.controller);
        //Famous.Engine.pipe(this.controller);

        this.appView = new AppView();
        this.docListTestView = EditorViewFactory.docListTestView();

        this.controller.add(this.appView);
        this.controller.add(this.docListTestView);
    }

// ---------------------------------------------------------------------------------------------------------------------
// FUNCTIONS
// --------------------------------------------------------------------------------------------------------------------

Application.prototype.hide = function() {
    this.controller.show(null);
}

Application.prototype.showAppView = function() {
    this.controller.show(this.appView);
}

// --------------------------------------------------------------------------------------------------------------------

Application.prototype.showDocListTestView = function() {
    this.controller.show(this.docListTestView);
}

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------

});//Meteor.startup
