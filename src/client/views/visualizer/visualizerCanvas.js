
// ---------------------------------------------------------------------------------------------------------------------
// EXPORT
// ---------------------------------------------------------------------------------------------------------------------

    //Inherit
    VisualizerCanvas.prototype = Object.create(famous.surfaces.ContainerSurface.prototype);

    //Constructor-Reference
    VisualizerCanvas.prototype.constructor = VisualizerCanvas;

    //Export
    this.VisualizerCanvas = VisualizerCanvas;

// ---------------------------------------------------------------------------------------------------------------------
// CONSTRUCTOR
// ---------------------------------------------------------------------------------------------------------------------

    function VisualizerCanvas() {

        // Call the super class's constructor
        famous.surfaces.ContainerSurface.apply(this, arguments);

        var background = new famous.core.Surface({
            size: [undefined,undefined],
            properties: { backgroundColor: 'lightblue' }
        });

        this.add(background);

    }//VisualizerCanvas

// ---------------------------------------------------------------------------------------------------------------------
// FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------

VisualizerCanvas.prototype.addHtml = function(html) {

    var surface = new famous.core.Surface({
        content: html,
        size: [100,100],
        properties: { backgroundColor: 'pink' }
    });

    this.add(surface);
}

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
