
// ---------------------------------------------------------------------------------------------------------------------
// NAVBAR SLIDER | EXPORT
// ---------------------------------------------------------------------------------------------------------------------

	navbar = this.navbar || {};

	navbar.slider = {

		// -------------------------------
		// initialization
		// -------------------------------

		init: _initSlider,
	
		// -------------------------------
		// events
		// -------------------------------

		onSlide: [_onSlide],

		// -------------------------------
		// value
		// -------------------------------

		  getSize: _getSliderSize,
		  setSize: _setSliderSize,
		   resize: _resize,

		// -------------------------------
		// UI
		// -------------------------------

		 enable: _enableSlider,
		disable: _disableSlider
	};

// ---------------------------------------------------------------------------------------------------------------------
// FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------

function _getSlider() {
	var slider = $('#slider');
	//var slider = $('#slider').slider( "instance" );

	if ( slider == undefined || !(slider.is("div")) )
		console.error('ERROR: Could not find Progress Slider (HTMLDivElement).');

	return slider;
};

// ---------------------------------------------------------------------------------------------------------------------

function _initSlider(size) {
	// console.log('_initSlider');
	size = size || 100;

  	var slider = _getSlider();

  	if ( slider.data('uiSlider') ) {
  		// If the data attribute for the slider is set, the slider has already been created
  		// If the slider is still around, we don't want to initialize it again
  		console.error("ERROR | slider.navbar.main.html.js | bindSlider | slider is already initilized.");
  		return;
  	}

  	slider.slider({
  		min: 0, 
  		max: size-1, 
  		step: 1,
  		// animate: 'fast',
		slide: function( evt, ui ) { 
			navbar.slider.onSlide.forEach( function(func) {
				func( evt, ui );
			});
		}
  	});

  	_tweekUI();
};

// ---------------------------------------------------------------------------------------------------------------------

function _tweekUI() {
	var slider = _getSlider();

  	//disable keyboard actions on the slider itself (to prevent double-firing of events)
  	slider.find(".ui-slider-handle").unbind('keydown');

  	// make skinnier and taller
  	slider.find(".ui-slider-handle").css('width', '0.8em');
  	slider.find(".ui-slider-handle").css('height', '1.4em');
  	$(".ui-widget-content").css('font-size', '0.9em');
}

// ---------------------------------------------------------------------------------------------------------------------

function _onSlide(evt, ui) { 
	if (evt.originalEvent) {
		// if this value was changed pragmatically, then evt.originalEvent will be undefined
		// however, if this value was changed by a user-initiated event then this code should be executed ...
		var i = ui.value;
		Session.set('ssn_sliderValue', i);
	}
};

// ---------------------------------------------------------------------------------------------------------------------

function _resetSlider() { 
  	//var slider = _getSlider();

  	//ToDo: reset the slider
};

// ---------------------------------------------------------------------------------------------------------------------

function _setSliderValue(value) {
	//ToDo: check that 'value' parameter is valid

	_getSlider().slider({ value: value});
}

// ---------------------------------------------------------------------------------------------------------------------

function _getSliderValue() {
	return _getSlider().slider('option', 'value');
}

// ---------------------------------------------------------------------------------------------------------------------
// SLIDER | SIZE
// ---------------------------------------------------------------------------------------------------------------------

function _getSliderSize() {
	var size = undefined;

	try {
		size = _getSlider().slider('option', 'max');

	} catch (e) {}

	return size;
}

// ---------------------------------------------------------------------------------------------------------------------

function _setSliderSize(value) {
	//ToDo: check that 'value' parameter is valid
	_getSlider().slider({ max: value});
}

// ---------------------------------------------------------------------------------------------------------------------

function _resize() {
	if (!_getSlider()) return;

    var count = State.CountSnapshots();
    var size = navbar.slider.getSize();

    if ( size && size !=  count-1)
        navbar.slider.setSize(count-1);
}

// ---------------------------------------------------------------------------------------------------------------------

function _enableSlider() {
	//_getSlider().attr('enabled', true);
	//_getSlider().slider({ disabled: false });
	_getSlider().slider('disable');
};

// ---------------------------------------------------------------------------------------------------------------------

function _disableSlider() {
	//_getSlider().attr('enabled', false);
	//_getSlider().slider({ disabled: true });
	_getSlider().slider( 'enable' );
};

// -------------------------------------------------------------------------------------------------------------------------
// END
// -------------------------------------------------------------------------------------------------------------------------
