
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

        this.controller.add(this.appView);
        this.controller.show(this.appView);

        // this.docListViewTest = EditorViewFactory.docListViewTest();
        // this.controller.add(this.docListViewTest);
    }

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------

});//Meteor.startup
