
if(CONSOLE_LOG_ROUTES) console.log('LOADING: src/client/views/application/slider.navbar.main.html.js');

// ---------------------------------------------------------------------------------------------------------------------
// STARTUP
// ---------------------------------------------------------------------------------------------------------------------

Meteor.startup(function() {

	if(CONSOLE_LOG_ROUTES) console.log('STARTUP: src/client/views/application/slider.navbar.main.html.js');

	// -----------------------------------------------------------------------------------------------------------------
	// EXPORT
	// -----------------------------------------------------------------------------------------------------------------

	navbar = this.navbar || {};

	navbar.slider = {
		init: initSlider,
		//event
		onSlide: undefined,
		//value		
		get: getSliderValue,
		set: setSliderValue,
		reset: resetSlider,
		//ui
		enable: enableSlider,
		disable: disableSlider
	};

	// -----------------------------------------------------------------------------------------------------------------
	// SLIDER
	// -----------------------------------------------------------------------------------------------------------------

	function getSlider() {
		var slider = $('#slider');
		//var slider = $('#slider').slider( "instance" );

		if ( slider == undefined || !(slider.is("div")) )
			console.error('ERROR: Could not find Progress Slider (HTMLDivElement).');

		return slider;
	};

	// -----------------------------------------------------------------------------------------------------------------

	function initSlider(size) { 
		size = size || 50;

	  	var slider = getSlider();

	  	if ( slider.data('uiSlider') ) {
	  		// If the data attribute for the slider is set, the slider has already been created
	  		// If the slider is still around, we don't want to initialize it again
	  		console.error("ERROR: slider.navbar.main.html.js: bindSlider: slider is already initilized.");
	  		return;
	  	}

	  	slider.slider({
	  		min: 0, 
	  		max: size-1, 
	  		step: 1,
	  		animate: 'fast',
			slide: function( evt, ui ) { 
				if (navbar.onSlide) 
					navbar.onSlide(evt,ui); 
			}
	  	});

	  	tweekUI();
	};

	// -----------------------------------------------------------------------------------------------------------------

	function tweekUI() {
		var slider = getSlider();

	  	//disable keyboard actions on the slider itself (to prevent double-firing of events)
	  	slider.find(".ui-slider-handle").unbind('keydown');

	  	// make skinnier and taller
	  	slider.find(".ui-slider-handle").css('width', '0.8em');
	  	slider.find(".ui-slider-handle").css('height', '1.4em');
	  	$(".ui-widget-content").css('font-size', '0.9em');
	}

	// -----------------------------------------------------------------------------------------------------------------

	function onSlide(evt, ui) { 
		// var i = ui.value;

		if (onProgress)
			onProgress(evt,ui);

		if (evt.originalEvent) {
			// if this value was changed pragmatically, then evt.originalEvent will be undefined
			// however, if this value was changed by a user-initiated event then this code should be executed ...
		}
	};

	// -----------------------------------------------------------------------------------------------------------------

	function resetSlider() { 
	  	var slider = getSlider();

	  	//ToDo: reset the slider
	};

	// -----------------------------------------------------------------------------------------------------------------

	function setSliderValue(value) {
		//ToDo: check that 'value' parameter is valid

		getSlider().slider( "value", value );
	}

	// -----------------------------------------------------------------------------------------------------------------

	function getSliderValue() {
		return getSlider().slider( "value" );
	}

	// -----------------------------------------------------------------------------------------------------------------

	function enableSlider() {
		//getSlider().attr('enabled', true);
		//getSlider().slider({ disabled: false });
		getSlider().slider( 'disable' );
	};

	// -----------------------------------------------------------------------------------------------------------------

	function disableSlider() {
		//getSlider().attr('enabled', false);
		//getSlider().slider({ disabled: true });
		getSlider().slider( 'enable' );
	};

	// -----------------------------------------------------------------------------------------------------------------

});//Meteor.startup

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
