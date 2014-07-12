
if(CONSOLE_LOG_ROUTES) console.log('LOADING: src/client/lib/famous-init.js');

// ---------------------------------------------------------------------------------------------------------------------
// STARTUP
// ---------------------------------------------------------------------------------------------------------------------

Meteor.startup(function() {
    if(CONSOLE_LOG_ROUTES) console.log('STARTUP: src/client/lib/famous-init.js');

    // -----------------------------------------------------------------------------------------------------------------
    // GLOBALS
    // -----------------------------------------------------------------------------------------------------------------

    // Add everything to the global namespace 'Famous' to maintain a cleaner global scope.
    this.Famous = {};

    // -----------------------------------------------------------------------------------------------------------------
    // PRE-REQUISITES
    // -----------------------------------------------------------------------------------------------------------------

    require("famous.polyfills");    // Add polyfills.
    require("famous/core/famous");  // Add the default CSS file.

    // -----------------------------------------------------------------------------------------------------------------
    // CORE
    // -----------------------------------------------------------------------------------------------------------------

    Famous.Engine             = require('famous/core/Engine');
    Famous.Surface            = require('famous/core/Surface');
    Famous.Modifier           = require('famous/core/Modifier');
    Famous.Transform          = require('famous/core/Transform');
    Famous.View               = require('famous/core/View');
    //Famous.OptionsManager     = require("famous/core/OptionsManager");
    Famous.EventHandler       = require("famous/core/EventHandler");
    Famous.RenderNode         = require("famous/core/RenderNode");
    //Famous.ViewSequence       = require("famous/core/ViewSequence");

    Famous.ReactiveEntity      = require("library/meteor/core/ReactiveEntity");
    Famous.PageView            = require("library/meteor/core/PageView");
    Famous.MeteorSurface       = require("library/meteor/core/Surface");
    Famous.MeteorSequence      = require("library/meteor/core/ViewSequence");

    // -----------------------------------------------------------------------------------------------------------------
    // SURFACES
    // -----------------------------------------------------------------------------------------------------------------

    //Famous.ImageSurface        = require("famous/surfaces/ImageSurface");
    Famous.ContainerSurface    = require("famous/surfaces/ContainerSurface");

    // -----------------------------------------------------------------------------------------------------------------
    // MODIFIERS
    // -----------------------------------------------------------------------------------------------------------------

    //Famous.StateModifier      = require('famous/modifiers/StateModifier');
    //Famous.Draggable          = require('famous/modifiers/Draggable');

    // -----------------------------------------------------------------------------------------------------------------
    // VIEWS
    // -----------------------------------------------------------------------------------------------------------------

    //Famous.Scrollview         = require('famous/views/Scrollview');
    //Famous.GridLayout           = require("famous/views/GridLayout");
    //Famous.Lightbox             = require("famous/views/Lightbox");
    Famous.RenderController     = require("famous/views/RenderController");
    Famous.HeaderFooterLayout   = require("famous/views/HeaderFooterLayout");
    //Famous.Deck               = require('famous/views/Deck');
    //Famous.EdgeSwapper          = require("famous/views/EdgeSwapper");
    Famous.FlexibleLayout       = require("famous/views/FlexibleLayout");


    // -----------------------------------------------------------------------------------------------------------------
    // UTILITIES
    // -----------------------------------------------------------------------------------------------------------------

    //Famous.Timer               = require("famous/utilities/Timer");
    //Famous.Utility             = require("famous/utilities/Utility");

    // -----------------------------------------------------------------------------------------------------------------
    // WIDGETS
    // -----------------------------------------------------------------------------------------------------------------

    //Famous.TitleBar            = require("famous/widgets/TitleBar");
    //Famous.NavigationBar       = require("famous/widgets/NavigationBar");

    // -----------------------------------------------------------------------------------------------------------------
    // INPUTS
    // -----------------------------------------------------------------------------------------------------------------

    //Famous.FastClick           = require("famous/inputs/FastClick");

    // -----------------------------------------------------------------------------------------------------------------
    // TRANSITIONS
    // -----------------------------------------------------------------------------------------------------------------

    Famous.Transitionable     = require('famous/transitions/Transitionable');
    Famous.Easing             = require('famous/transitions/Easing');
    Famous.SnapTransition     = require('famous/transitions/SnapTransition');
    Famous.SpringTransition   = require('famous/transitions/SpringTransition');
    //Famous.TweenTransition     = require("famous/transitions/TweenTransition");

    // -----------------------------------------------------------------------------------------------------------------
    // Initialize transitions.
    // -----------------------------------------------------------------------------------------------------------------

    Famous.Transitionable.registerMethod('snap', Famous.SnapTransition);
    Famous.Transitionable.registerMethod('spring', Famous.SpringTransition);

});//Meteor.Startup

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
