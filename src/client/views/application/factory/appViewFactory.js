
// -----------------------------------------------------------------------------------------------------------------
// AppFactory
// -----------------------------------------------------------------------------------------------------------------

this.AppViewFactory = {

    configureAppView: function(appView) {

        var home = Factory.Surfaces.createMeteorSurface(Template.home).default;
        var about = Factory.Surfaces.createMeteorSurface(Template.about, {context: 'Example Data'}).default;
        var editor = Factory.LayoutParts.editorCanvas();

        appView.addSection(Route.home, home);
        appView.addSection(Route.editor, editor.layout);
        appView.addSection(Route.about, about);
    }

}//AppViewFactory

// -----------------------------------------------------------------------------------------------------------------
// AppFactory
// -----------------------------------------------------------------------------------------------------------------
