
if(CONSOLE_LOG_ROUTES) console.log('LOADING: src/client/views/application/main.html.js');


// ---------------------------------------------------------------------------------------------------------------------
// TEMPLATE: UI.BODY
// ---------------------------------------------------------------------------------------------------------------------

//UI.body.rendered = function() {
//
//}

// ---------------------------------------------------------------------------------------------------------------------
// TEMPLATE: HOME
// ---------------------------------------------------------------------------------------------------------------------

//Template.home.rendered = function () {
//    if(CONSOLE_LOG_ROUTES) console.log('LOADING: src/client/views/application/main.html.js : Template.main.rendered');
//};

// ---------------------------------------------------------------------------------------------------------------------
// TEMPLATE: HOME: EVENTS
// ---------------------------------------------------------------------------------------------------------------------

Template.home.events({
    click: function() {
        Router.go(Route.about);
    }
});

// ---------------------------------------------------------------------------------------------------------------------
// TEMPLATE: ABOUT
// ---------------------------------------------------------------------------------------------------------------------

//Template.about.rendered = function () {
//    if (CONSOLE_LOG_ROUTES) console.log('LOADING: src/client/views/application/main.html.js : Template.about.rendered');
//
//    var about = Application.section('about');
//
//    if (!about) {
//        console.log('ERROR:Template.about.rendered -> "about" section was undefined.');
//        about = Application.addSection('about');
//    }
//
//    var modifier = new Famous.Modifier({
//        origin: [.5, .5]
//    });
//
//    var surface = new Famous.MeteorSurface({
//        size: [300, 300],
//        template: Template.about,
//        //content: "<h1>About page</h1>",
//        properties: {
//            backgroundColor: '#b7af4c'
//        }
//    });
//
//    about.add(modifier).add(surface);
//};


// ---------------------------------------------------------------------------------------------------------------------
// TEMPLATE: FOOTER: EVENTS
// ---------------------------------------------------------------------------------------------------------------------

Template.footer.events({

    'click #btnHome': function(e,t) {
        Router.go(Route.home);
    },

    'click #btnAbout': function(e,t) {
        Router.go(Route.about);
    }

});//Template.about.events

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------