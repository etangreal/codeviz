
if(CONSOLE_LOG_ROUTES) console.log('LOADING: src/client/views/application/application.js');

Meteor.startup(function() {
    if(CONSOLE_LOG_ROUTES) console.log('STARTUP: src/client/views/application/application.js');

// =====================================================================================================================
// APPLICATION
// =====================================================================================================================

    var Application = new App();
    var mainContext = Famous.Engine.createContext();

    mainContext.add(Application);
    Famous.Engine.pipe(Application);

// ---------------------------------------------------------------------------------------------------------------------
// EXPORT GLOBALS
// ---------------------------------------------------------------------------------------------------------------------

    this.Application = Application;
    this.mainContext = mainContext;

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------

});//Meteor.startup