
if(CONSOLE_LOG_ROUTES) console.log('LOADING: src/client/views/application/application.js');

Meteor.startup(function() {
    if(CONSOLE_LOG_ROUTES) console.log('STARTUP: src/client/views/application/application.js');

// =====================================================================================================================
// APPLICATION
// =====================================================================================================================

    var home = Factory.Surface.createMeteorSurface(Template.home).default;
    var about = Factory.Surface.createMeteorSurface(Template.about, {context: 'Example Data'}).default;
    var editor = Factory.EditorCanvas.createEditorCanvasSection();

    var Application = new App();

    Application.addSection(Route.home, home);
    Application.addSection(Route.editor, editor.layout);
    Application.addSection(Route.about, about);

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