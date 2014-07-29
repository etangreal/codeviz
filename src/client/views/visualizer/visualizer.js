
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

        self._controller = new famous.views.RenderController();

        // --------------------------------------------------------------------------
        // background
        // --------------------------------------------------------------------------

        var background = new famous.core.Surface({
            size: [undefined,undefined],
            properties: { backgroundColor: 'lightblue' }
        });

        self.add(background);
        self.add(this._controller);

    }//Visualizer

// ---------------------------------------------------------------------------------------------------------------------
// PUBLIC | METHOD | CLEAR (canvas|nodes)
// ---------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.clear = function() {
    var self = this;

    self._controller.show(null);
}

// ---------------------------------------------------------------------------------------------------------------------
// PUBLIC | METHOD | SHOW
// ---------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.show = function(snapshot) {
    var self = this;

    if (!snapshot) {
        self.clear();
        console.log('Visualizer.show | no current snapshot..');
        return;
    }

    _update(snapshot);
    self._controller.show(snapshot.render.baseNode);

}//Visualizer.prototype.show

// ---------------------------------------------------------------------------------------------------------------------
// PRIVATE | FUNCTION | UPDATE (SNAPSHOT)
// ---------------------------------------------------------------------------------------------------------------------

function _update(snapshot) {

    if (snapshot.render)
        return;

    // --------------------------------------------------------------------------

    snapshot.render = _initNodesAndMods();
    var stackNode   = snapshot.render.stackNode;
    var heapNode    = snapshot.render.heapNode;

    // --------------------------------------------------------------------------

    var y = 0;
    snapshot.stack.forEach( function(frame, i) {
        var node = _newDrawNode(frame);

        stackNode.add(node.draw.modifier).add(node.draw.surface);
        node.draw.move(0, y);
        y += 100;
    });

    // --------------------------------------------------------------------------

    y = 0;
    snapshot.heap.forEach( function(heapObj, i) {
        if (heapObj.id == 0) return; //ToDo: #HACK the first heap object is a "dummy/fill-in" this is because the trace object id starts from 1!
        var node = _newDrawNode(heapObj);

        heapNode.add(node.draw.modifier).add(node.draw.surface);
        node.draw.move(0, y);
        y += 100;
    });

    // --------------------------------------------------------------------------
}

// ---------------------------------------------------------------------------------------------------------------------
// PRIVATE | FUNCTION | INIT-NODES-&-MODIFIERS (base, stack & heap)
// ---------------------------------------------------------------------------------------------------------------------

_initNodesAndMods = function() {

    // --------------------------------------------------------------------------
    // base modifier & node
    // --------------------------------------------------------------------------

    // base modifier
    var baseMod = new famous.core.Modifier({
        transform: famous.core.Transform.translate(10,10,0),
        //opacity: 1
    });

    // add base modifier to the container => returns the base render node
    var baseNode = new famous.core.RenderNode(baseMod);

    // --------------------------------------------------------------------------
    // stack & heap modifiers
    // --------------------------------------------------------------------------

    // stack modifier
    var stackMod = new famous.core.Modifier({
        //transform: famous.core.Transform.translate(0,0,0)
    });
 
    // heap modifer
    var heapMod = new famous.core.Modifier({
        transform: famous.core.Transform.translate(200,30,0)
    });

    // --------------------------------------------------------------------------
    // stack & heap nodes
    // --------------------------------------------------------------------------

    // base modifier + stack modifier => base stack node
    var stackNode = baseNode.add(stackMod);

    // base modifier + heap modifier => base heap render node
    var heapNode = baseNode.add(heapMod);

    // --------------------------------------------------------------------------

    return {
        baseNode: baseNode,
         baseMod: baseMod,
       stackNode: stackNode,
        stackMod: stackMod,
        heapNode: heapNode,
         heapMod: heapMod,
    }

}//Visualizer.prototype.initModifiers

// ---------------------------------------------------------------------------------------------------------------------
// PRIVATE | FUNCTION | NEW-DRAW-NODE
// ---------------------------------------------------------------------------------------------------------------------

function _newDrawNode(node) {

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
