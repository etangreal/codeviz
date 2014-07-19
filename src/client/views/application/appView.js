
if(CONSOLE_LOG_ROUTES) console.log('LOADING: src/client/views/application/appView.js');

Meteor.startup(function() {
    if(CONSOLE_LOG_ROUTES) console.log('STARTUP: src/client/views/application/appView.js');

// =====================================================================================================================
// CLASS : AppView
// =====================================================================================================================

this.AppView = AppView;

// ---------------------------------------------------------------------------------------------------------------------
// INHERITS
// ---------------------------------------------------------------------------------------------------------------------

    //Inherit from Famous.View
    AppView.prototype = Object.create(Famous.View.prototype);
    //Constructor
    AppView.prototype.constructor = AppView;

// ---------------------------------------------------------------------------------------------------------------------
// CONSTRUCTOR
// ---------------------------------------------------------------------------------------------------------------------

    function AppView() {

        // Call the super class's constructor
        Famous.View.apply(this, arguments);

        // -------------------------------------------------------------------------------------------------------------
        // CREATE LAYOUT
        // -------------------------------------------------------------------------------------------------------------

        var headerFooter = Factory.Layouts.HeaderFooter();

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

    }//AppView

// ---------------------------------------------------------------------------------------------------------------------
// MEMBER FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------

    AppView.prototype.addSection = function (name, section) {
        if (!section)
            console.log('ERROR: AppView.addSection: parameter section is undefined.');

        if ( (name in this._sections) )
            console.log('WARNING: AppView.addSection: ', name, ' already exists. It is being overridden.');

        this._sections[name] = section;

        return section;
    };

// ---------------------------------------------------------------------------------------------------------------------

    AppView.prototype.getSection = function (name) {
        if ( !(name in this._sections) ) {
            console.log('ERROR: AppView.prototype.section: unknown section name: ', name);
            return undefined;
        }

        return this._sections[name];
    };

// ---------------------------------------------------------------------------------------------------------------------

    AppView.prototype.currentSection = function () {
        return this._currentSection;
    };

// ---------------------------------------------------------------------------------------------------------------------

    AppView.prototype.showSection = function (name) {
        if ( !(name in this._sections) ) {
            console.log('ERROR: AppView.prototype.show: unknown section name: ', name);
            return;
        }

        var surface = this._sections[name];
        this._currentSection = surface;
        this.contentArea.show(surface);
    };

// ---------------------------------------------------------------------------------------------------------------------

    AppView.prototype.hideCurrentSection = function() {
        this.contentArea.hide();
    };

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------

});//Meteor.startup
