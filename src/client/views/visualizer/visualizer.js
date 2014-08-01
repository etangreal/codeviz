
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

        var options = {
            inTransition: {duration: 10},
            outTransition: {duration: 10},
            overlap: true
        }

        self._controller = new famous.views.RenderController(options);

        self._controller.inOpacityFrom( function() { return 1; } );
        self._controller.outOpacityFrom( function() { return 1; } );

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

    _initDrawObj(snapshot);
    self._controller.show(snapshot.draw.baseNode);

}//Visualizer.prototype.show

// ---------------------------------------------------------------------------------------------------------------------
// PRIVATE | FUNCTION | INIT-DRAW-OBJ (SNAPSHOT)
// ---------------------------------------------------------------------------------------------------------------------

function _initDrawObj(snapshot) {

    if (snapshot.draw && snapshot.draw.isInit)
        return;

    // --------------------------------------------------------------------------

    _initSnapshotDrawNodesAndMods(snapshot);

    var stackNode   = snapshot.draw.stackNode;
    var heapNode    = snapshot.draw.heapNode;

    // --------------------------------------------------------------------------

    var chain = stackNode;
    var parent = undefined;
    snapshot.stack.forEach( function(frame, i) {
        var node = _newDrawNode(frame);

        chain = chain.add(node.draw.modifier);
                chain.add(node.draw.surface);

        node.parent   = parent;
        node.snapshot = snapshot;
        parent        = node;
    });

    // --------------------------------------------------------------------------

    chain = heapNode;
    parent = undefined;
    snapshot.heap.forEach( function(heapObj, i) {
        if (heapObj.id == 0) return; //ToDo: #HACK the first heap object is a "dummy/fill-in" this is because the trace object id starts from 1!
        var node = _newDrawNode(heapObj);

        chain = chain.add(node.draw.modifier);
                chain.add(node.draw.surface);

        node.parent   = parent;
        node.snapshot = snapshot;
        parent        = node;
    });

    // --------------------------------------------------------------------------

    snapshot.draw.isInit = true;
}

// ---------------------------------------------------------------------------------------------------------------------
// PRIVATE | FUNCTION | INIT-NODES-&-MODIFIERS (base, stack & heap)
// ---------------------------------------------------------------------------------------------------------------------

_initSnapshotDrawNodesAndMods = function(snapshot) {

    if (!snapshot.draw) {
        console.error('ERROR|_initSnapshotDrawNodesAndMods|snapshot.draw does not exist');
        snapshot.draw = {};
    }

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
        //transform: famous.core.Transform.translate(0,0,0)
    });

    // --------------------------------------------------------------------------
    // stack & heap nodes
    // --------------------------------------------------------------------------

    // base modifier + stack modifier => base stack node
    var stackNode = baseNode.add(stackMod);

    // base modifier + heap modifier => base heap render node
    var heapNode = baseNode.add(heapMod);

    // --------------------------------------------------------------------------

    var draw = snapshot.draw;

    //add properties to snapshot
    draw.baseNode   = baseNode;
    draw.baseMod    = baseMod;
    draw.stackNode  = stackNode;
    draw.stackMod   = stackMod;
    draw.heapNode   = heapNode;
    draw.heapMod    = heapMod;

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
        properties: {
            backgroundColor: 'pink'
        }
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

    if (!node.snapshot)
        console.error('ERROR|node.onDeploy| node has no snapshot!');

    var w = node.draw.surface._currTarget.offsetWidth;
    var h = node.draw.surface._currTarget.offsetHeight;
    var x = 0;
    var y = 0;
    var d = 10;

    node.draw.width = w;
    node.draw.height = h;

    node.draw.show();
    //node.draw.log();

    var msw = node.snapshot.draw.maxStackWidth;                 //current maximum stack width
    if (node.draw.location == NodeLocationTypeEnum.STACK) {
        if (w > msw) node.snapshot.draw.maxStackWidth = w;
        if (w > msw && msw != 0)
            node.snapshot.draw.baseMod.transformFrom(famous.core.Transform.translate(w-msw + d, d, 0));
    }

    node.snapshot.draw.heapMod.transformFrom(famous.core.Transform.translate(msw+3*d, 0, 0));

    if (node.parent) {
        var pw  = node.parent.draw.width;               //pw = parent height
        var ph  = node.parent.draw.height;              //ph = parent height

        y = ph + d;

        if (node.draw.location == NodeLocationTypeEnum.STACK) {
            if (w < pw) x = pw-w;
            if (w > pw) x = -(w-pw);
        }//if(node.draw.location)
    }//if(node.parent)

    if (x>0 || y>0) node.draw.move(x,y);
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
