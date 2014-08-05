
// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE FAMOUS-POLYFILLS
// ---------------------------------------------------------------------------------------------------------------------

// famous.polyfills;
// famous.core.famous;

require('famous.polyfills');    // Add polyfills.
require('famous/core/famous');  // Add the default CSS file.

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | FAMOUS-CORE
// ---------------------------------------------------------------------------------------------------------------------

// famous.core.Engine;
// famous.core.Surface;
// famous.core.Modifier;
// famous.core.Transform;
// famous.core.View;
// famous.core.OptionsManager;
// famous.core.EventHandler;
// famous.core.RenderNode;
// famous.core.ViewSequence;

// require('famous/core/Engine');
require('famous/core/Surface');
// require('famous/core/Modifier');
// require('famous/core/Transform');
// require('famous/core/View');
// require('famous/core/OptionsManager');
// require('famous/core/EventHandler');
// require('famous/core/RenderNode');
// require('famous/core/ViewSequence');

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | FAMOUS-METEOR
// ---------------------------------------------------------------------------------------------------------------------

// library.meteor.core.ReactiveEntity;
// library.meteor.core.PageView;
// library.meteor.core.Surface;
// library.meteor.core.ViewSequence;

// require('library/meteor/core/ReactiveEntity');
// require('library/meteor/core/PageView');
// require('library/meteor/core/Surface');
// require('library/meteor/core/ViewSequence');

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | FAMOUS-SURFACES
// ---------------------------------------------------------------------------------------------------------------------

// famous.surfaces.ImageSurface;
// famous.surfaces.ContainerSurface;

// require('famous/surfaces/ImageSurface');
// require('famous/surfaces/ContainerSurface');

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | FAMOUS-MODIFIERS
// ---------------------------------------------------------------------------------------------------------------------

// famous.modifiers.StateModifier;
// famous.modifiers.Draggable;

// require('famous/modifiers/StateModifier');
// require('famous/modifiers/Draggable');

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | FAMOUS-VIEWS
// ---------------------------------------------------------------------------------------------------------------------

// famous.views.ContextualView;
// famous.views.Deck;
// famous.views.EdgeSwapper;
// famous.views.FlexibleLayout;
// famous.views.Flipper;
// famous.views.GridLayout;
// famous.views.HeaderFooterLayout;
// famous.views.Lightbox;
// famous.views.RenderController;
// famous.views.ScrollContainer;
// famous.views.Scroller;
// famous.views.Scrollview;
// famous.views.SequentialLayout;

// require('famous/views/ContextualView');
// require('famous/views/Deck');
// require('famous/views/EdgeSwapper');
// require('famous/views/FlexibleLayout');
// require('famous/views/Flipper');
// require('famous/views/GridLayout');
// require('famous/views/HeaderFooterLayout');
// require('famous/views/Lightbox');
// require('famous/views/RenderController');
// require('famous/views/ScrollContainer');
// require('famous/views/Scroller');
// require('famous/views/Scrollview');
// require('famous/views/SequentialLayout');

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | FAMOUS-UTILITIES
// ---------------------------------------------------------------------------------------------------------------------

// famous.utilities.Timer;
// famous.utilities.Utility;

// require('famous/utilities/Timer');
// require('famous/utilities/Utility');

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | FAMOUS-WIDGETS
// ---------------------------------------------------------------------------------------------------------------------

// famous.widgets.NavigationBar;
// famous.widgets.Slider;
// famous.widgets.TabBar;
// famous.widgets.ToggleButton;

// require('famous/widgets/NavigationBar');
// require('famous/widgets/Slider');
// require('famous/widgets/TabBar');
// require('famous/widgets/ToggleButton');

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | FAMOUS-INPUTS
// ---------------------------------------------------------------------------------------------------------------------

// famous.inputs.FastClick;

// require('famous/inputs/FastClick');

// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE | FAMOUS-TRANSITIONS
// ---------------------------------------------------------------------------------------------------------------------

// famous.transitions.Transitionable;
// famous.transitions.Easing;
// famous.transitions.SnapTransition;
// famous.transitions.SpringTransition;
// famous.transitions.TweenTransition;

// require('famous/transitions/Transitionable');
// require('famous/transitions/Easing');
// require('famous/transitions/SnapTransition');
// require('famous/transitions/SpringTransition');
// require('famous/transitions/TweenTransition');

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
// END
// ---------------------------------------------------------------------------------------------------------------------
