
if(CONSOLE_LOG_ROUTES) console.log('LOADING: src/client/views/application/app.js');

Meteor.startup(function() {
    if(CONSOLE_LOG_ROUTES) console.log('STARTUP: src/client/views/application/app.js');

// =====================================================================================================================
// CLASS : App
// =====================================================================================================================

    //Inherit from Famous.View
    App.prototype = Object.create(Famous.View.prototype);
    //Constructor
    App.prototype.constructor = App;

// ---------------------------------------------------------------------------------------------------------------------
// CONSTRUCTOR
// ---------------------------------------------------------------------------------------------------------------------

    function App() {

        // Call the super class's constructor
        Famous.View.apply(this, arguments);

        // -------------------------------------------------------------------------------------------------------------
        // CREATE LAYOUT
        // -------------------------------------------------------------------------------------------------------------

        var headerFooter = Factory.HeaderFooter.createHeaderFooterLayout();

        this.add(headerFooter.layout);

        // -------------------------------------------------------------------------------------------------------------
        // PUBLIC MEMBERS
        // -------------------------------------------------------------------------------------------------------------

        this.layout = headerFooter.layout;
        this.contentArea = headerFooter.content.default;

        // -------------------------------------------------------------------------------------------------------------
        // PRIVATE MEMBERS
        // -------------------------------------------------------------------------------------------------------------

        this._currentSection = undefined;
        this._sections = {};

    }//App

// ---------------------------------------------------------------------------------------------------------------------
// MEMBER FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------

    App.prototype.addSection = function (name, section) {
        if (!section)
            console.log('ERROR: App.addSection: parameter section is undefined.');

        if ( (name in this._sections) )
            console.log('WARNING: App.addSection: ', name, ' already exists. It is being overridden.');

        this._sections[name] = section;

        return section;
    };

// ---------------------------------------------------------------------------------------------------------------------

    App.prototype.getSection = function (name) {
        if ( !(name in this._sections) ) {
            console.log('ERROR: App.prototype.section: unknown section name: ', name);
            return undefined;
        }

        return this._sections[name];
    };

// ---------------------------------------------------------------------------------------------------------------------

    App.prototype.showSection = function (name) {
        if ( !(name in this._sections) ) {
            console.log('ERROR: App.prototype.show: unknown section name: ', name);
            return;
        }

        var surface = this._sections[name];
        this._currentSection = surface;
        this.contentArea.show(surface);
    };

// ---------------------------------------------------------------------------------------------------------------------

    App.prototype.currentSection = function () {
        return this._currentSection;
    };

// ---------------------------------------------------------------------------------------------------------------------
// EXPORT
// ---------------------------------------------------------------------------------------------------------------------

    this.App = App;

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------

});//Meteor.startup
