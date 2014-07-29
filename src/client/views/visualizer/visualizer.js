
// ---------------------------------------------------------------------------------------------------------------------
// EXPORT
// ---------------------------------------------------------------------------------------------------------------------

    //Inherit
    Visualizer.prototype = Object.create(famous.surfaces.ContainerSurface.prototype);

    //Constructor-Reference
    Visualizer.prototype.constructor = Visualizer;

    //Export
    this.Visualizer = Visualizer;

// ---------------------------------------------------------------------------------------------------------------------
// CONSTRUCTOR
// ---------------------------------------------------------------------------------------------------------------------

    function Visualizer() {
        var self = this;

        // Call the super class constructor
        famous.surfaces.ContainerSurface.apply(self, arguments);

        // --------------------------------------------------------------------------
        // background
        // --------------------------------------------------------------------------

        var background = new famous.core.Surface({
            size: [undefined,undefined],
            properties: { backgroundColor: 'lightblue' }
        });

        self.add(background);

        // --------------------------------------------------------------------------
        // init nodes tracked
        // --------------------------------------------------------------------------

        self._nodes = [];

        self._initNodesAndMods();

    }//Visualizer

// ---------------------------------------------------------------------------------------------------------------------
// PRIVATE | METHOD | INIT-NODES-&-MODIFIERS
// ---------------------------------------------------------------------------------------------------------------------

Visualizer.prototype._initNodesAndMods = function() {
    var self = this;

    // --------------------------------------------------------------------------
    // base modifier & node
    // --------------------------------------------------------------------------

    // base modifier
    self._baseMod = new famous.core.Modifier({
        //transform: famous.core.Transform.translate(0,0,0),
        //opacity: 1
    });

    // add base modifier to the container => returns the base render node
    self._baseNode = self.add(self._baseMod); 

    // --------------------------------------------------------------------------
    // stack & heap modifiers
    // --------------------------------------------------------------------------

    // stack modifier
    self._stackMod = new famous.core.Modifier({
        //transform: famous.core.Transform.translate(0,0,0)
    });
 
    // heap modifer
    self._heapMod = new famous.core.Modifier({
        transform: famous.core.Transform.translate(200,30,0)
    });

    // --------------------------------------------------------------------------
    // stack & heap nodes
    // --------------------------------------------------------------------------

    // base modifier + stack modifier => base stack node
    self._stackNode = self._baseNode.add(self._heapMod);

    // base modifier + heap modifier => base heap render node
    self._heapNode = self._baseNode.add(self._heapMod);

    // --------------------------------------------------------------------------

}//Visualizer.prototype.initModifiers

// ---------------------------------------------------------------------------------------------------------------------
// PUBLIC | METHOD | CLEAR (canvas|nodes)
// ---------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.clear = function() {
    var self = this;

    self._stackNode.set({});
    self._heapNode.set({});
}

// ---------------------------------------------------------------------------------------------------------------------
// PUBLIC | METHOD | SHOW
// ---------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.show = function(snapshot) {
    var self = this;

    self.clear();

    if (!snapshot) {
        console.log('Visualizer.show | no current snapshot..');
        return;
    }

    // --------------------------------------------------------------------------

    var y = 0;
    snapshot.stack.forEach( function(frame, i) {
        var node = self._newDrawNode(frame);

        self._stackNode.add(node.draw.modifier).add(node.draw.surface);
        node.draw.move(0, y);
        y += 100;
    });

    // --------------------------------------------------------------------------

    y = 0;
    snapshot.heap.forEach( function(heapObj, i) {
        if (heapObj.id == 0) return; //ToDo: #HACK the first heap object is a "dummy/fill-in" this is because the trace object id starts from 1!
        var node = self._newDrawNode(heapObj);

        self._heapNode.add(node.draw.modifier).add(node.draw.surface);
        node.draw.move(0, y);
        y += 100;
    });

  // --------------------------------------------------------------------------

}//Visualizer.prototype.show

// ---------------------------------------------------------------------------------------------------------------------
// PRIVATE | METHOD | NEW-DRAW-NODE
// ---------------------------------------------------------------------------------------------------------------------

Visualizer.prototype._newDrawNode = function(node) {

    // --------------------------------------------------------------------------

    var modifier = new famous.core.Modifier({
        opacity: 0
    });

    var surface = new famous.core.Surface({
        content: node.html,
        size: [true,true],
        properties: { backgroundColor: 'pink' }
    });

    // --------------------------------------------------------------------------
    // add modifer & surface to draw object
    // --------------------------------------------------------------------------

    node.draw.modifier = modifier;
    node.draw.surface  = surface;

    // --------------------------------------------------------------------------
    // add functions to draw object
    // --------------------------------------------------------------------------

    node.draw.show    = _show.bind(node);
    node.draw.move    = _move.bind(node);
    node.draw.log     = _log.bind(node);
    node.draw.cleanup = _cleanup.bind(node);

    // --------------------------------------------------------------------------
    // add events to draw object
    // --------------------------------------------------------------------------

    node.draw.onDeploy                  = _onDeploy.bind(node);
    node.draw.subsribeToOnDeploy        = _subscribeToOnDeploy.bind(node);
    node.draw.unsubscribeFromOnDeploy   = _unsubscribeFromOnDeploy.bind(node);

    node.draw.subsribeToOnDeploy();

    // --------------------------------------------------------------------------

    return node;
}

// ---------------------------------------------------------------------------------------------------------------------
// PRIVATE | FUNCTIONS | NEW-DRAW-NODE
// ---------------------------------------------------------------------------------------------------------------------

function _show() {
    var node = this;
    node.draw.modifier.opacityFrom(1);
}

// ---------------------------------------------------------------------------------------------------------------------

function _move(x,y) {
    var node = this;

    node.draw.position.x = x;
    node.draw.position.y = y;

    node.draw.modifier.transformFrom( famous.core.Transform.translate(x,y,0) );
}

// ---------------------------------------------------------------------------------------------------------------------

function _onDeploy() {
    var node = this;

    node.draw.width = node.draw.surface._currTarget.offsetWidth;
    node.draw.height = node.draw.surface._currTarget.offsetHeight;

    node.draw.show();
    node.draw.log();

    //node.draw.unsubscribeFromOnDeploy();
}

// ---------------------------------------------------------------------------------------------------------------------

function _subscribeToOnDeploy() {
    var node = this;
    node.draw.surface.on('deploy', node.draw.onDeploy);
}

// ---------------------------------------------------------------------------------------------------------------------

function _unsubscribeFromOnDeploy() {
    var node = this;
    node.draw.surface.removeListener('deploy', node.draw.onDeploy);
}

// ---------------------------------------------------------------------------------------------------------------------

function _cleanup() {
    var node = this;

    node.draw.modifier = null;
    node.draw.surface = null;

    node.draw.unsubscribeFromOnDeploy();
}

// ---------------------------------------------------------------------------------------------------------------------

function _log() {
    var node = this;
    var Br = "\n";

    console.log('node.draw.onDeploy\n\t', (node.location) ? 'node' : 'frame', 
        '|sid:', node.sid, 
         '|id:', node.id, 
        '|uid:', node.uid, 
       '|duid:', node.draw.uid,
          Br+Br,
"     width: " + node.draw.width + Br +
"    height: " + node.draw.height + Br +
"position.x: " + node.draw.position.x + Br +
"position.y: " + node.draw.position.y + Br +
"position.z: " + node.draw.position.z + Br +
"  offset.x: " + node.draw.offset.x + Br +
"  offset.y: " + node.draw.offset.y + Br);

};//log

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
