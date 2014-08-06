
// ---------------------------------------------------------------------------------------------------------------------
// REQUIRE
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// EXPORT
// ---------------------------------------------------------------------------------------------------------------------

    //Inherit
    JointVisualizer.prototype = Object.create(famous.core.View.prototype);

    //Constructor-Reference
    JointVisualizer.prototype.constructor = JointVisualizer;

    //Export
    this.JointVisualizer = JointVisualizer;

// ---------------------------------------------------------------------------------------------------------------------
// CONSTRUCTOR
// ---------------------------------------------------------------------------------------------------------------------

    function JointVisualizer() {
        var self = this;

        // Call the super class constructor
        famous.core.View.apply(self, arguments);

        // --------------------------------------------------------------------------
        // Components
        // --------------------------------------------------------------------------

        var modifier = new famous.core.Modifier({ 
            transform: famous.core.Transform.translate(0,0,0)
        });

        var surface = new famous.core.Surface({
            content: '<div id="paper"></div>',
            size: [undefined,undefined],
            properties: {
                // overflow: 'scroll',
                // borderLeft: '2px solid grey',
                backgroundColor: 'lightblue' 
            }
        });

        // --------------------------------------------------------------------------
        // Add Properties
        // --------------------------------------------------------------------------

        self._modifier = modifier;
        self._surface = surface;

        // --------------------------------------------------------------------------
        // Add Components to JointVisualizer
        // --------------------------------------------------------------------------

        self.add(modifier).add(surface);

        _helloWorld.call(this);

    }//JointVisualizer

// ---------------------------------------------------------------------------------------------------------------------
// PUBLIC | METHODS
// ---------------------------------------------------------------------------------------------------------------------

JointVisualizer.prototype.show = function(snapshot, i) {
    console.log('JointVisualizer.show');
}

// ---------------------------------------------------------------------------------------------------------------------

function _helloWorld() {

  // var graph = new joint.dia.Graph;

  // var paper = new joint.dia.Paper({
  //   el: this.$('#paper'),
  //   width: 600,
  //   height: 200,
  //   model: graph,
  //   gridSize: 1
  // });

  // var rect = new joint.shapes.basic.Rect({
  //   position: { x: 100, y: 30 },
  //   size: { width: 100, height: 30 },
  //   attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
  // });

  // var rect2 = rect.clone();
  // rect2.translate(300);

  // var link = new joint.dia.Link({
  //   source: { id: rect.id },
  //   target: { id: rect2.id }
  // });

  // graph.addCells([rect, rect2, link]);

}

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
