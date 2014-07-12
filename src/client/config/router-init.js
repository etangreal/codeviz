
// ---------------------------------------------------------------------------------------------------------------------
// GLOBAL ROUTE DEFINITIONS
// ---------------------------------------------------------------------------------------------------------------------

Route  = {
    home    : 'home',
    about   : 'about'
};

if(CONSOLE_LOG_ROUTES) console.log('LOADING: src/client/config/router-init.js');

// ---------------------------------------------------------------------------------------------------------------------
// STARTUP
// ---------------------------------------------------------------------------------------------------------------------

Meteor.startup(function() {
    if (CONSOLE_LOG_ROUTES) console.log('STARTUP: src/client/config/router-init.js');

    var home = Factory.Surface.createMeteorSurface(Template.home).default;
    var about = Factory.Surface.createMeteorSurface(Template.about, {context: 'Example Data'}).default;

    Application.addSection(Route.home, home);
    Application.addSection(Route.about, about);

});//Meteor.startup

// ---------------------------------------------------------------------------------------------------------------------
// ROUTER MAP
// ---------------------------------------------------------------------------------------------------------------------

Router.map(function() {
    if(CONSOLE_LOG_ROUTES) console.log('LOADING: src/client/config/router-init.js : Router.map');

    // -----------------------------------------------------------------------------------------------------------------

    this.route(Route.home, {
        path: '/',
        template: 'blank',
        onBeforeAction: function () {
            Application.showSection(Route.home);
        }
    });

    // -----------------------------------------------------------------------------------------------------------------

    this.route(Route.about, {
        path: '/' + Route.about,
        template: 'blank',
        onBeforeAction: function () {
            Application.showSection(Route.about);
        }
    });

    // -----------------------------------------------------------------------------------------------------------------

});//Router.map

// ---------------------------------------------------------------------------------------------------------------------
// ROUTER HOOKS
// ---------------------------------------------------------------------------------------------------------------------

Router.onRun(function() {
    if(CONSOLE_LOG_ROUTES) console.log('LOADING: src/client/config/router-init.js : Router.onRun');
});

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
