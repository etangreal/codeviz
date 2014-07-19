
if(CONSOLE_LOG_ROUTES) console.log('LOADING: src/client/views/application/application.js');

Meteor.startup(function() {
    if(CONSOLE_LOG_ROUTES) console.log('STARTUP: src/client/views/application/application.js');


// =====================================================================================================================
// APPLICATION
// =====================================================================================================================

this.appContext = this.appContext || new AppContext();
this.application = appContext.appView;

// ---------------------------------------------------------------------------------------------------------------------
// CONSTRUCTOR
// --------------------------------------------------------------------------------------------------------------------

    function AppContext() {
        //console.log('AppContext');

        this.mainContext = Famous.Engine.createContext();
        this.controller = new Famous.RenderController();

        this.mainContext.add(this.controller);
        //Famous.Engine.pipe(this.controller);

        this.appView = new AppView();
        AppViewFactory.configureAppView(this.appView);

        this.controller.add(this.appView);
        this.controller.show(this.appView);

        this.docListViewTest = EditorViewFactory.docListViewTest();
        this.controller.add(this.docListViewTest);
    }

    //Constructor
    AppContext.prototype.constructor = AppContext;

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------

});//Meteor.startup
