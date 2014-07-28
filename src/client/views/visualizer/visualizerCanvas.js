
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

VisualizerCanvas.prototype.show = function(snapshot) {

    console.log(snapshot);

    // --------------------------------------------------------------------------

    var stack = snapshot.stack;

    // stack.forEach( function(frame) {

    //     //frame.html
    //     //frame.draw.updateProperties();

    // });

    // --------------------------------------------------------------------------

    //var heap = snapshot.heap[1];
    //var node = this.addNode(heapObj.html);

    // heap.forEach( function(heapObj) {
    //     if (heapObj.id == 0) return; //ToDo: #HACK the first heap object is a "dummy/fill-in" this is because the trace object id starts from 1!

    //     var node = this.addNode(heapObj.html)

    //     //heapObj.draw.updateProperties();

    // });

  // --------------------------------------------------------------------------

  this.addNode('<h1>Hello World</h1>', 10, 10);

}

VisualizerCanvas.prototype.addNode = function(html, x, y) {

    var position = famous.core.Transform.translate(x,y,0);

    var modifier = new famous.core.Modifier({
        transform : position
    });

    var surface = new famous.core.Surface({
        content: html,
        size: [100,100],
        properties: { backgroundColor: 'pink' }
    });

    this.add(modifier).add(surface);

    return {
        modifier: modifier,
        surface: surface
    }
}

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
