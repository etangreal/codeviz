
if(CONSOLE_LOG_ROUTES) console.log('LOADING: src/client/views/application/app.js');

// ---------------------------------------------------------------------------------------------------------------------
// STARTUP
// ---------------------------------------------------------------------------------------------------------------------

Meteor.startup(function(){
    if(CONSOLE_LOG_ROUTES) console.log('STARTUP: src/client/views/application/app.js');

// =====================================================================================================================
// CLASS : App
// =====================================================================================================================

    //Inherits from: Famous.View
    App.prototype = Object.create(Famous.View.prototype);
    //constructor
    App.prototype.constructor = App;

    // -----------------------------------------------------------------------------------------------------------------
    // CONSTRUCTOR
    // -----------------------------------------------------------------------------------------------------------------

    function App() {
        // extend from view
        Famous.View.apply(this, arguments);

        var layout = new Famous.HeaderFooterLayout({
            header: 0,
            footer: 50
        });

        var contentArea = new Famous.EdgeSwapper();
        layout.content.add(contentArea);

        layout.footer.add(new Famous.MeteorSurface({
            template: Template.footer,
            size: [undefined, 50],
            properties: {
                backgroundColor: '#b7af4c'
            }
        }));

        this.layout = layout;
        this.contentArea = contentArea;
        this._currentSection = undefined;
        this._sections = {};

        this.add(layout);
    }

    // -----------------------------------------------------------------------------------------------------------------
    // FUNCTIONS
    // -----------------------------------------------------------------------------------------------------------------

    App.prototype.addSection = function (name, template, data) {
        //console.log('App.addSection: ', name);

        if ( (name in this._sections) ) {
            console.log('ERROR: App.addSection: ', name, ' already exists.');
            return this._sections[name];
        }

//        this._sections[name] = new Famous.ContainerSurface({
//            size: [undefined, undefined],
//            //template: template,
//            properties: {
//                overflow: 'hidden',
//                backgroundColor: 'white'
//            }
//        });

        //Test
        this._sections[name] = new Famous.MeteorSurface({
            size: [600, 300],
            template: template,
            data: data,
            properties: {
                backgroundColor: '#b7af4c'
            }
        });

        return this._sections[name];
    };

    // -----------------------------------------------------------------------------------------------------------------

    App.prototype.getSection = function (name) {
        if ( !(name in this._sections) ) {
            console.log('ERROR: App.prototype.section: unknown section name: ', name);
            return undefined;
        }

        return this._sections[name];
    };

    // -----------------------------------------------------------------------------------------------------------------

    App.prototype.showSection = function (name) {
        if ( !(name in this._sections) ) {
            console.log('ERROR: App.prototype.show: unknown section name: ', name);
            return;
        }

        var surface = this._sections[name];
        this._currentSection = surface;
        this.contentArea.show(surface);
    };

    // -----------------------------------------------------------------------------------------------------------------

    App.prototype.currentSection = function () {
        return this._currentSection;
    };

// =====================================================================================================================
// APPLICATION
// =====================================================================================================================

    var Application = new App();
    var mainContext = Famous.Engine.createContext();

    mainContext.add(Application);
    Famous.Engine.pipe(Application);

    // -----------------------------------------------------------------------------------------------------------------
    // GLOBALS
    // -----------------------------------------------------------------------------------------------------------------

    this.Application = Application;
    this.mainContext = mainContext;

});//Meteor.startup

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------