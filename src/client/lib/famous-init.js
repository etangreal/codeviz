
// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE
// ---------------------------------------------------------------------------------------------------------------------

// famous.polyfills;
// famous.core.famous;

require("famous.polyfills");    // Add polyfills.
require("famous/core/famous");  // Add the default CSS file.

// ---------------------------------------------------------------------------------------------------------------------
// STARTUP
// ---------------------------------------------------------------------------------------------------------------------

Meteor.startup(function() {

    // -----------------------------------------------------------------------------------------------------------------
    // Initialize transitions.
    // -----------------------------------------------------------------------------------------------------------------

    famous.transitions.Transitionable.registerMethod('snap', famous.transitions.SnapTransition);
    famous.transitions.Transitionable.registerMethod('spring', famous.transitions.SpringTransition);

    // -----------------------------------------------------------------------------------------------------------------

});//Meteor.Startup

// ---------------------------------------------------------------------------------------------------------------------
// EXPORT
// ---------------------------------------------------------------------------------------------------------------------

// this.Famous = {}; // Add everything to the global namespace 'Famous' to maintain a cleaner global scope.

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | CORE
// ---------------------------------------------------------------------------------------------------------------------

//Famous.Engine             = require('famous/core/Engine');
//Famous.Surface            = require('famous/core/Surface');
//Famous.Modifier           = require('famous/core/Modifier');
//Famous.Transform          = require('famous/core/Transform');
//Famous.View               = require('famous/core/View');
//Famous.OptionsManager     = require("famous/core/OptionsManager");
//Famous.EventHandler       = require("famous/core/EventHandler");
//Famous.RenderNode         = require("famous/core/RenderNode");
//Famous.ViewSequence       = require("famous/core/ViewSequence");

//Famous.ReactiveEntity      = require("library/meteor/core/ReactiveEntity");
//Famous.PageView            = require("library/meteor/core/PageView");
//Famous.MeteorSurface       = require("library/meteor/core/Surface");
//Famous.MeteorSequence      = require("library/meteor/core/ViewSequence");

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | SURFACES
// ---------------------------------------------------------------------------------------------------------------------

//Famous.ImageSurface        = require("famous/surfaces/ImageSurface");
//Famous.ContainerSurface    = require("famous/surfaces/ContainerSurface");

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | MODIFIERS
// ---------------------------------------------------------------------------------------------------------------------

//Famous.StateModifier      = require('famous/modifiers/StateModifier');
//Famous.Draggable          = require('famous/modifiers/Draggable');

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | VIEWS
// ---------------------------------------------------------------------------------------------------------------------

//Famous.ContextualView       = require("famous/views/ContextualView");
//Famous.Deck                 = require('famous/views/Deck');
//Famous.EdgeSwapper          = require("famous/views/EdgeSwapper");
//Famous.FlexibleLayout       = require("famous/views/FlexibleLayout");
//Famous.Flipper              = require("famous/views/Flipper");
//Famous.GridLayout           = require("famous/views/GridLayout");
//Famous.HeaderFooterLayout   = require("famous/views/HeaderFooterLayout");
//Famous.Lightbox             = require("famous/views/Lightbox");
//Famous.RenderController     = require("famous/views/RenderController");
//Famous.ScrollContainer      = require('famous/views/ScrollContainer');
//Famous.Scroller             = require('famous/views/Scroller');
//Famous.Scrollview           = require('famous/views/Scrollview');
//Famous.SequentialLayout     = require('famous/views/SequentialLayout');

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | UTILITIES
// ---------------------------------------------------------------------------------------------------------------------

//Famous.Timer                = require("famous/utilities/Timer");
//Famous.Utility              = require("famous/utilities/Utility");

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | WIDGETS
// ---------------------------------------------------------------------------------------------------------------------

//Famous.TitleBar            = require("famous/widgets/TitleBar");
//Famous.NavigationBar       = require("famous/widgets/NavigationBar");

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | INPUTS
// ---------------------------------------------------------------------------------------------------------------------

//Famous.FastClick           = require("famous/inputs/FastClick");

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | TRANSITIONS
// ---------------------------------------------------------------------------------------------------------------------

//Famous.Transitionable     = require('famous/transitions/Transitionable');
//Famous.Easing             = require('famous/transitions/Easing');
//Famous.SnapTransition     = require('famous/transitions/SnapTransition');
//Famous.SpringTransition   = require('famous/transitions/SpringTransition');
//Famous.TweenTransition  = require("famous/transitions/TweenTransition");

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
