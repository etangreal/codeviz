
// ---------------------------------------------------------------------------------------------------------------------
// DECLARATIONS
// ---------------------------------------------------------------------------------------------------------------------

    //Export
    this.VisualizerViewFactory = {

        //Views
        visualizerView: _visualizerView,

    }//VisualizerViewFactory

// ---------------------------------------------------------------------------------------------------------------------
// FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------

function _visualizerView() {

    // var visualizer = new Famous.MeteorSurface({
    //     template: Template.visualizer,
    //     size: [undefined, undefined],
    //     properties: {
    //         backgroundColor: 'lightblue'
    //     }
    // });

    // var visualizer = new Famous.Surface({
    //     size: [undefined,undefined],
    //     properties: { backgroundColor: 'lightblue' }
    // });

    var canvas = new VisualizerCanvas();

    return canvas;
}

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
