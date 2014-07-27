
Meteor.startup(function() {

// ---------------------------------------------------------------------------------------------------------------------
// FACTORY | Provides general View creation functions
// ---------------------------------------------------------------------------------------------------------------------

this.Factory = {

    Surfaces: {
        createMeteorSurface: _createMeteorSurface
    }

};//Factory

// ---------------------------------------------------------------------------------------------------------------------
// CREATE METEOR SURFACE
// ---------------------------------------------------------------------------------------------------------------------

function _createMeteorSurface(template, data, properties) {

    properties = properties || {
        backgroundColor: 'lightblue'
    };

    var surface = new Famous.MeteorSurface({
        size: [undefined, undefined],
        template: template,
        data: data,
        properties: properties
    });

    // -----------------------------------------------------------------------------------------------------------------

    return {
        default: surface,
        modifier: undefined,
        surface: surface
    };

}//_createMeteorSurface

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------

});//Meteor.startup
