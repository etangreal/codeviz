
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

    Application.addSection(Route.home, Template.home);
    Application.addSection(Route.about, Template.about, {context: 'Example Data'});

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
            //console.log('onBeforeAction home');
            Application.showSection(Route.home);
        }
    });

    // -----------------------------------------------------------------------------------------------------------------

    this.route(Route.about, {
        path: '/' + Route.about,
        template: 'blank',
        onBeforeAction: function () {
            //console.log('onBeforeAction about');
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
