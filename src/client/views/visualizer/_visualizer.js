
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
        // RenderController
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
        // Background
        // --------------------------------------------------------------------------

        // var background = new famous.core.Surface({
        //     size: [undefined,undefined],
        //     properties: { 
        //         backgroundColor: 'lightblue' 
        //     }
        // });

        // --------------------------------------------------------------------------
        // Canvas
        // --------------------------------------------------------------------------

        self._canvas = new famous.surfaces.CanvasSurface({
            size: [undefined,undefined],
            properties: {
                backgroundColor: 'lightblue'
            }
        });

        // --------------------------------------------------------------------------
        // Add Components to Visualizer
        // --------------------------------------------------------------------------

        self.add(self._canvas);
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

Visualizer.prototype.show = function(snapshot, i) {
    var self = this;

    if (!snapshot) {
        self.clear();
        console.log('Visualizer.show | no current snapshot..');
        return;
    }

    _initSnapshot.call(self, snapshot);
    self._controller.show(snapshot.draw.baseNode);

}//Visualizer.prototype.show

// ---------------------------------------------------------------------------------------------------------------------
// PRIVATE | FUNCTION | INIT-SNAPSHOT
// ---------------------------------------------------------------------------------------------------------------------

_initSnapshot = function(snapshot) {
    var self = this;

    if (snapshot.draw && snapshot.draw.isInit)
        return;

    snapshot.draw.onDeployCompleted     = _onDeployCompleted.bind(snapshot);
    snapshot.draw.extractCoordinateInfo = Visualizer.prototype.extractCoordinateInfo.bind(self);
    snapshot.draw.extractLayoutInfo     = Visualizer.prototype.extractLayoutInfo.bind(self);

    // --------------------------------------------------------------------------
    // Init the snapshot's (base, stack & heap) Modifers & RenderNodes
    // --------------------------------------------------------------------------

    _initModifierAndRenderNode.call(self,snapshot);

    // --------------------------------------------------------------------------
    // Init the Draw Object
    // --------------------------------------------------------------------------

    _initDrawObj.call(self,snapshot);

}//Visualizer.prototype.initModifiers

// ---------------------------------------------------------------------------------------------------------------------
// PRIVATE | FUNCTION | INIT-NODES-&-MODIFIERS (base, stack & heap)
// ---------------------------------------------------------------------------------------------------------------------

function _initModifierAndRenderNode(snapshot) {

    // --------------------------------------------------------------------------
    // Add base modifier & renderNode
    // --------------------------------------------------------------------------

    // base modifier
    var baseMod = new famous.core.Modifier({
        transform: famous.core.Transform.translate(10,10,0),
        //opacity: 1
    });

    // add base modifier to the container => returns the base render node
    var baseNode = new famous.core.RenderNode(baseMod);

    // --------------------------------------------------------------------------
    // Add stack & heap modifiers
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
    // Add stack & heap renderNodes
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

    // --------------------------------------------------------------------------

}//_initModifierAndRenderNode

// ---------------------------------------------------------------------------------------------------------------------
// PRIVATE | FUNCTION | INIT-DRAW-OBJ (SNAPSHOT)
// ---------------------------------------------------------------------------------------------------------------------

function _initDrawObj(snapshot) {

    var stackNode   = snapshot.draw.stackNode;
    var heapNode    = snapshot.draw.heapNode;

    // --------------------------------------------------------------------------

    var chain = stackNode;
    var parent = undefined;
    snapshot.stack.forEach( function(frame, i) {
        var node = _newDrawNode(frame);

        chain = chain.add(node.draw.modifier);
                chain.add(node.draw.surface);

        node.parent          = parent;
        node.snapshot        = snapshot;
        parent               = node;
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
// PRIVATE | FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------

function _show() {
    var node = this;
    node.draw.modifier.opacityFrom(1);
}

// ---------------------------------------------------------------------------------------------------------------------

function _move(x,y) {
    var node = this;
    _moveNode(node,x,y);
}

// ---------------------------------------------------------------------------------------------------------------------

function _moveNode(node,x,y) {

    node.draw.position.x = x;
    node.draw.position.y = y;

    node.draw.modifier.transformFrom( famous.core.Transform.translate(x,y,0) );
}

// ---------------------------------------------------------------------------------------------------------------------

function _moveModifier(modifier,x,y) {
    modifier.transformFrom( famous.core.Transform.translate(x,y,0) );
}


// ---------------------------------------------------------------------------------------------------------------------

function _onDeploy() {
    var node = this;

    if (!node.snapshot)
        console.error('ERROR|node.onDeploy| node has no snapshot!');

    var msw = node.snapshot.draw.maxStackWidth;                 //current maximum stack width
    var w   = node.draw.surface._currTarget.offsetWidth;
    var h   = node.draw.surface._currTarget.offsetHeight;
    var x   = 0;
    var y   = 0;
    var d   = 20;                       //distance (between nodes)
    var dt  = w - msw;                  //delta (width - maxStackWidth)

    var ox  = 0;                        // offset-x (from the root node)
    var oy  = 0;                        // offset-y (form the root node)

    node.draw.width = w;
    node.draw.height = h;

    if (node.draw.location == NodeLocationTypeEnum.STACK) {
        if (dt > 0 && msw > 0)
            _moveModifier(node.snapshot.draw.stackMod, dt, 0);

        if (w > msw)
            node.snapshot.draw.maxStackWidth = msw = w;
    }

    _moveModifier(node.snapshot.draw.heapMod, msw + d, 0);

    if (node.parent) {
        var pw  = node.parent.draw.width;               //pw = parent height
        var ph  = node.parent.draw.height;              //ph = parent height

        y = ph + d;

        if (node.draw.location == NodeLocationTypeEnum.STACK) {
            if (w < pw) x = pw-w;
            if (w > pw) x = -(w-pw);
        }//if(node.draw.location)
    }//if(node.parent)

    node.draw.position.x = x;
    node.draw.position.y = y;

    node.draw.move(x,y);

    _getOffset(node);
    _getCoordinates(node);

    node.draw.show();
    //node.draw.log();

    node.snapshot.draw.onDeployCompleted();
}

// ---------------------------------------------------------------------------------------------------------------------

function _onDeployCompleted() {
    var snapshot = this;

    snapshot.draw.deployedCount += 1;
    //console.log('deployedCount: ', snapshot.draw.deployedCount);

    var count = snapshot.stack.length + snapshot.heap.length -1; // -1 because the first item in the heap is a dummy #HACK

    if (snapshot.draw.deployedCount == count) {
        //console.log('DeployCompleted');



        // ToDo: update the current snapshot ... 
        //      snapshot.draw.extractCoordinateInfo(snapshot);
        //      snapshot.draw.extractLayoutInfo(snapshot);
        //      State.updateSnapshot(snapshot);

    }

    if(snapshot.draw.deployedCount > count)
        console.warn('WARNING | _onDeployCompleted | deployedCount > count');
}

// ---------------------------------------------------------------------------------------------------------------------

function _getOffset(node) {

    var mods = [];

    var baseMod = node.snapshot.draw.baseMod;
    var modSH = (node.draw.location == NodeLocationTypeEnum.STACK) ?
        node.snapshot.draw.stackMod : 
        node.snapshot.draw.heapMod ;

    mods.push(baseMod);
    mods.push(modSH);

    var n = node; 
    while(n) {
        mods.push(n.draw.modifier);
        n = n.parent;
    }

    var p = [ 0, 0, 0 ];
    mods.forEach( function(m) {
        p = _addPos(p, _getPos(m));
    });

    node.draw.offset.x = p[0];
    node.draw.offset.y = p[1];
}

// ---------------------------------------------------------------------------------------------------------------------

function _getPos(mod) {
    return famous.core.Transform.getTranslate(mod.getFinalTransform());
}

// ---------------------------------------------------------------------------------------------------------------------

function _addPos(a, b) {
    return [ a[0] + b[0], a[1] + b[1], 0 ];
}

// ---------------------------------------------------------------------------------------------------------------------

function _updateDrawProperties(node) {
    var uid = node.draw.uid;

    var node = document.getElementById(uid);
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
// "position.z: " + node.draw.position.z + Br +
"  offset.x: " + node.draw.offset.x + Br +
"  offset.y: " + node.draw.offset.y + Br);

};//log

// --------------------------------------------------------------------------------------------------------------------
// GET-COORDINATES
// --------------------------------------------------------------------------------------------------------------------

function _getCoordinates(node) {
    if (node.draw.location == NodeLocationTypeEnum.STACK)
        _getFrameCoordinates(node);

    else if (node.draw.location == NodeLocationTypeEnum.HEAP)
        _getHeapObjCoordinates(node);

    else
        console.error('ERROR | _getCoordinates | unknown node location.');
}

// --------------------------------------------------------------------------------------------------------------------

function _getFrameCoordinates(frame) {

  var coordinates = frame.snapshot.coordinates;

  coordinates[frame.draw.uid] = _calcCoordinates(frame.draw.uid, frame);

  // console.log(
  //   'frame 1) uid: ', frame.draw.uid, ' | coordinates[frame.draw.uid]\n\t ', 
  //   coordinates[frame.draw.uid],
  //   '\n');

  frame.locals.forEach( function(local) {
    local.pointerUID.forEach( function(uid) {
      coordinates[uid] = _calcCoordinates(uid, frame);

      // console.log(
      //   'locals 2) uid: ', uid, ' | coordinates[uid] \n\t', 
      //   coordinates[uid],
      //   '\n');

    });//forEach pointerUID
  });//forEach Local

}//getFrameCoordinates

// --------------------------------------------------------------------------------------------------------------------
// GET-HEAP-OBJ-COORDINATES
// --------------------------------------------------------------------------------------------------------------------

function _getHeapObjCoordinates(heapObj) {

  var coordinates = heapObj.snapshot.coordinates;

  coordinates[heapObj.uid] = _calcCoordinates(heapObj.uid, heapObj);
  coordinates[heapObj.draw.uid] = _calcCoordinates(heapObj.draw.uid, heapObj);

  heapObj.pointerUID.forEach( function(uid) {
    coordinates[uid] = _calcCoordinates(uid, heapObj);
  });

}//getHeapObjCoordinates

// --------------------------------------------------------------------------------------------------------------------
// GET-COORDINATES
// --------------------------------------------------------------------------------------------------------------------

function _calcCoordinates(uid, parent) { 

  //child
  // var c = $("#" + uid);
  // var cw = c.width();
  // var ch = c.height();

  //relative
  var element = document.getElementById(uid);
  var wrapper = document.getElementById(parent.draw.uid).offsetParent;
  var r = _getRelativePosition( element , wrapper );

  //parent
  var p = parent.draw.offset;
  var w = parent.draw.width;
  var h = parent.draw.height;

  var x = p.x ;
  var y = p.y ;

  // console.log(
  //   '_gc) uid: ', uid,
  //   '\n\t |cw: ', cw, ' |ch: ', ch,
  //   '\n\t |r: ', r,
  //   '\n\t |p: ', p,
  //   '\n\t |w: ', w, ' |h ', h,
  //   '\n');

  return {
      x: x + r.x
    , y: y + r.y
    , z: 0
  };

};//getCoordinates

// --------------------------------------------------------------------------------------------------------------------
// HELPER | GET-RELATIVE-POSITION
// --------------------------------------------------------------------------------------------------------------------

function _getRelativePosition(element, parent) {
  // www.kirupa.com/html5/get_element_position_using_javascript.htm

  var x = 0;
  var y = 0;

  while(element) {
    x += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    y += (element.offsetTop - element.scrollTop + element.clientTop);
    element = (element == parent) ? undefined : element.offsetParent;
  }

  return { x: x, y: y, z: 0 };

};//getRelativePosition

// ---------------------------------------------------------------------------------------------------------------------
// HELPER-FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------

Visualizer.prototype.isUndefined = function(obj) {
  return (typeof obj == 'undefined' || obj === void 0); // || obj === null ??
};

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
