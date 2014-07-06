
// ------------------------------------------------------------------------------------------------ //
//                                         DrawGL                                                   //
// ------------------------------------------------------------------------------------------------ //

DrawGL.prototype.DEFAULT_CONTAINER_WIDTH = 800;
DrawGL.prototype.DEFAULT_CONTAINER_HEIGHT = 600;

// ------------------------------------------------------------------------------------------------
//                                          INIT
// ------------------------------------------------------------------------------------------------

function DrawGL(container, options) { var self = this;
  if (container instanceof jQuery)                                //Three.js wants a native dom obj - not a jQuery obj
    container = document.getElementById( container.attr("id") );

  self.setContainer(container);
  self.setOptions(options);

  self.initGlScene();
  self.initGlRenderer(container);

  self.initCssScene();
  self.initCssRenderer(container);

  var camera = self.initCamera(container);

  self.initInteraction(camera, container);

  self.initStats(container, options.showStats);
  self.initRegistry();

  self.animate();
}

// ------------------------------------------------------------------------------------------------
//                               SETUP CSS3D RENDERER & SCENE
// ------------------------------------------------------------------------------------------------

DrawGL.prototype.initCssScene = function() { var self = this;
  return self._cssScene = new THREE.Scene();
};

DrawGL.prototype.getCssScene = function() { var self = this;
  if(self._cssScene == undefined)
    console.error("ERROR: getCssScene => cssScene is undefined.");

  return self._cssScene;
};

// ------------------------------------------------------------------------------------------------

DrawGL.prototype.initCssRenderer = function(container) { var self = this;
  self.validateContainer(container);

  var WIDTH = getCssWidth(container) || self.DEFAULT_CONTAINER_WIDTH;
  var HEIGHT = getCssHeight(container) || self.DEFAULT_CONTAINER_HEIGHT;

  var renderer = new THREE.CSS3DRenderer();
      renderer.setSize( WIDTH, HEIGHT );
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top      = 0;
      renderer.domElement.style.margin	 = 0;
      renderer.domElement.style.padding  = 0;

  container.appendChild( renderer.domElement );

  self._cssRenderer = renderer;
  return renderer;
};

DrawGL.prototype.logCssRenderer = function() { var self = this;
  var renderer = self.getCssRenderer();
  console.log("initCssRenderer => # of children: ", renderer.domElement.childNodes.length );
  console.error(renderer.domElement);
};

DrawGL.prototype.getCssRenderer = function() { var self = this;
  if(self._cssRenderer == undefined)
    console.error("ERROR: getCssRenderer => cssRenderer is undefined.");

  return self._cssRenderer;
};

// ------------------------------------------------------------------------------------------------
//                               SETUP GL RENDERER & SCENE
// ------------------------------------------------------------------------------------------------

DrawGL.prototype.initGlRenderer = function(container) { var self = this;
  self.validateContainer(container);

  var WIDTH = getCssWidth(container) || self.DEFAULT_CONTAINER_WIDTH;
  var HEIGHT = getCssHeight(container) || self.DEFAULT_CONTAINER_HEIGHT;

  var renderer = new THREE.WebGLRenderer({
    antialias : true
  });

  renderer.setSize(WIDTH, HEIGHT, true);                   //TODO: 3rd parameter has something to do with perspective?
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top      = 0;
  renderer.domElement.style.margin	 = 0;
  renderer.domElement.style.padding  = 0;
  renderer.setClearColor( 0xFFFFFF, 1 );

  container.appendChild( renderer.domElement );

  this._glRenderer = renderer;
  return renderer;
};

DrawGL.prototype.getGlRenderer = function() { var self = this;
  if(self._glRenderer == undefined)
    console.error("ERROR: getGlRenderer => glRenderer is undefined.");

  return self._glRenderer;
};

// ------------------------------------------------------------------------------------------------

DrawGL.prototype.initGlScene = function() { var self = this;
  return self._glScene = new THREE.Scene();
};

DrawGL.prototype.getGlScene = function() { var self = this;
  if(self._glScene == undefined)
    console.error("ERROR: getGlScene => glScene is undefined.");

  return self._glScene;
};

// ------------------------------------------------------------------------------------------------
//                               CAMERA & INTERACTION SETUP
// ------------------------------------------------------------------------------------------------

DrawGL.prototype.initCamera = function(container) { var self = this;
  self.validateContainer(container);

  var WIDTH = getCssWidth(container) || self.DEFAULT_CONTAINER_WIDTH;
  var HEIGHT = getCssHeight(container) || self.DEFAULT_CONTAINER_HEIGHT;

  var FOV = 100;
  var ASPECT = WIDTH / HEIGHT;
  var NEAR = 1;
  var FAR = 1000;

  var camera = new THREE.PerspectiveCamera( FOV, ASPECT, NEAR, FAR );
  //var camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, -2000, 1000 );

  camera.position.x = WIDTH/3;
  camera.position.y = - HEIGHT/3 ;
  camera.position.z = 350;
  //camera.useTarget = false;

  return self._camera = camera;
};

DrawGL.prototype.getCamera = function() { var self = this;
  if (self._camera == undefined)
    console.error("ERROR: getCamera => undefined.");

  return self._camera;
};

// ------------------------------------------------------------------------------------------------

DrawGL.prototype.initInteraction = function(camera, container) { var self = this;
  if (camera == undefined || container == undefined)
    console.error("ERROR: initInteraction => camera/container undefined.");

  container = container || self.getDefaultContainer();

  self._interaction = new THREEJS.Interaction( camera, container );

  return self._interaction;
};

DrawGL.prototype.getInteraction = function() { var self = this;
  if(self._interaction == undefined)
    console.error("ERROR: getInteraction => interaction undefined.");

  return self._interaction;
};

// ------------------------------------------------------------------------------------------------
//                                    MORE SETUP
// ------------------------------------------------------------------------------------------------

DrawGL.prototype.setContainer = function(container) { var self = this;
  self.validateContainer(container);
  self._container = container;
};

DrawGL.prototype.getContainer = function() { var self = this;
  self.validateContainer(self._container);
  return self._container;
};

//helpers

DrawGL.prototype.validateContainer = function(container) { var self = this;
  if (container == undefined) {
    console.error("ERROR: validateContainer => container is undefined. Setting default.");
    container = self.getDefaultContainer();
  }
};

DrawGL.prototype.getDefaultContainer = function() {
  return document.body;
};

// ------------------------------------------------------------------------------------------------

DrawGL.prototype.initStats = function(container,show) { var self = this;
  self.validateContainer(container);

  // Stats.js
  var stats = new Stats();
  stats.domElement.style.visibility = show;
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.right = '0px';

  container.appendChild( stats.domElement );

  this._stats = stats;
};

DrawGL.prototype.getStats = function() { var self = this;
  if (self._stats == undefined)
    console.error("ERROR: getStats => stats undefined.");

  return self._stats;
};

// ------------------------------------------------------------------------------------------------

DrawGL.prototype.setOptions = function(options) { var self = this;
  if (options == undefined)
    console.warn("WARNING: setOptions =>  options undefined.");

  options = options || {};
  options.showStats = options.showStats || false;

  self._options = options;
};

DrawGL.prototype.getOptions = function() { var self = this;
  if (self._options == undefined)
    console.error("ERROR: getOptions => undefined.");

  return self._options;
};

// ------------------------------------------------------------------------------------------------

DrawGL.prototype.isValidSceneIndex = function(i) { var self = this;
  var isNum = Visualizer.prototype.isNumber;
  var isValid = ( isNum(i) && i >= 0 && i < self.getSceneCount() );

  if (!isValid) {
    console.error("ERROR: isValidSceneIndex => invalid sceneIndex("+i+") of sceneCount: "+self.getSceneCount() );
    return false;
  }

  return true;
};

// ------------------------------------------------------------------------------------------------

DrawGL.prototype.setSceneCount = function(i) { var self = this;
  if (i<0)
    console.error("ERROR: setSceneCount => invalid sceneCount.");

  self._sceneCount = i;
  return true;
};

DrawGL.prototype.getSceneCount = function() { var self = this;
  if (self._sceneCount == undefined) {
    console.error("ERROR: getSceneCount => sceneCount was undefined.");
    self._sceneCount = 0;
  }

  return self._sceneCount;
};

// ------------------------------------------------------------------------------------------------
//                                    REGISTRY FUNCTIONS
// ------------------------------------------------------------------------------------------------

DrawGL.prototype.initRegistry = function() { var self = this;
  if (self._sceneElements != undefined || self._sceneObjects != undefined) {
    console.error("ERROR: initRegistry => _sceneElements/_sceneObjects already defined.");
    return;
  }

  self._sceneElements = [];
  self._sceneObjects = [];
};

DrawGL.prototype.register = function(element,objs) { var self = this;
  if ( !self.checkRegistry() )
    return;

  var isDef = (element != undefined && objs != undefined);
  var isArr = objs instanceof Array;

  if (!isDef || !isArr) {
    console.error("ERROR: register => invalid elements/objs");
    return;
  }

  self._sceneElements.push(element);
  self._sceneObjects = self._sceneObjects.concat(objs);
};

DrawGL.prototype.disposeAll = function() { var self = this;
  if ( !self.checkRegistry() )
    return;

  var cssScene = self.getCssScene();
  var glScene = self.getGlScene();

  self._sceneElements.forEach(function(obj) {
//    if (obj instanceof THREE.CSS3DObject)
      cssScene.remove(obj);
      glScene.remove(obj);
  });

  self._sceneObjects.forEach(function(obj) {
    obj.dispose();
  });

  //"empty" the arrays
  //http://davidwalsh.name/empty-array
  //http://stackoverflow.com/questions/1232040/how-to-empty-an-array-in-javascript
  self._sceneElements.length = 0;
  self._sceneObjects.length = 0;
};

DrawGL.prototype.clearScene = function() { var self = this;
  self.disposeAll();
  self.setSceneCount(0);
  self.getCssRenderer().domElement.firstChild.innerHTML = "";
};

DrawGL.prototype.checkRegistry = function() { var self = this;
  if (self._sceneElements == undefined || self._sceneObjects == undefined) {
    console.error("ERROR: checkRegistry => _sceneElements/_sceneObjects undefined.");
    return false;
  }

  return true;
};

// ------------------------------------------------------------------------------------------------
//                                          RENDER
// ------------------------------------------------------------------------------------------------

DrawGL.prototype.prerenderGL = function( snapshots ) { var self = this, me = Visualizer.prototype;
  if (snapshots == undefined || !(snapshots instanceof Array)) {
    console.error("ERROR: prerenderGL => undefined/invalid snapshots.");
    return false;
  }

  self.clearScene();

  // --------------------------------------------------------------------------

  snapshots.forEach(function(snapshot) {     //SNAPSHOT
    var sid = snapshot.id;

    // ------------------------------------------
    var stack = snapshot.stack;

    stack.forEach(function(frame) {          //FRAME
      self.draw(frame);
    });//forEach-frame

    // ------------------------------------------
    var heap = snapshot.heap;

    heap.forEach(function(node) {            //HEAP
      if (node.id > 0)                       //ToDo: #HACK the first heap object is a "dummy/fill-in" this is because the trace object id starts from 1!
        self.draw(node);
    });//forEach-node

    // ------------------------------------------

    me.calcLayout( snapshot );
    me.extractCoordinateInfo( snapshot );

    // ------------------------------------------
    var plumbing = snapshot.plumbing;
    var coordinates = snapshot.coordinates;

    for(var key in plumbing)
      if ( plumbing.hasOwnProperty(key) ) {
        var fromUID = key;
        var toUIDs = plumbing[key];

        var from = coordinates[fromUID];
        if( me.isUndefined(from))
          console.error("ERROR: prerenderGL => from is undefined.",fromUID);

        toUIDs.forEach( function(toUID) {
          var to = coordinates[toUID];
          if( me.isUndefined(to))
            console.error("ERROR: prerenderGL => to is undefined.",toUID);
          else
            self.drawEdge(from,to,sid);
            //self.drawArrow(from,to,sid);
        })
      }

    // ------------------------------------------

    snapshot.render.layoutInfo();
    snapshot.render.stackInfo();
    snapshot.render.heapInfo();

  });//forEach-Snapshot

  // --------------------------------------------------------------------------

  self.setSceneCount(snapshots.length);
  self.showScene(0);
  return true;
};

// ------------------------------------------------------------------------------------------------

DrawGL.prototype.animate = function () { var self = this;
  requestAnimationFrame( self.animate.bind(self) );

  self.render();
  //TWEEN.update();
};

// ------------------------------------------------------------------------------------------------

DrawGL.prototype.render = function() { var self = this;
  self.getInteraction().update();

  self.renderGL();
  self.renderCss();

  self.getStats().update();
};

DrawGL.prototype.renderCss = function() { var self = this;
  var camera = self.getCamera();
  var renderer = self.getCssRenderer();
  var scene = self.getCssScene();

  renderer.render( scene, camera );
};

DrawGL.prototype.renderGL = function() { var self = this;
  var camera = self.getCamera();
  var renderer = self.getGlRenderer();
  var scene = self.getGlScene();

  renderer.render( scene, camera );
};

// ------------------------------------------------------------------------------------------------

DrawGL.prototype.showScene = function(i) { var self = this;
  if ( !self.isValidSceneIndex(i) )
    return;

  self.showCssScene(i);
  self.showGlScene(i);
};

// ------------------------------------------------------------------------------------------------

DrawGL.prototype.showCssScene = function(i) { var self = this;
  if ( !self.isValidSceneIndex(i) )
    return;

  var cssScene = self.getCssScene();
  cssScene.traverse(function (obj) {
    if (obj instanceof THREE.CSS3DObject)
      if (obj.sid != i) {
      obj.element.style.display = "none";
      obj.visible = false;
    }
  });

  cssScene.traverse(function (obj) {
    if (obj instanceof THREE.CSS3DObject)
      if ( obj.sid == i ) {
        obj.element.style.display = "block";
        obj.visible = true;
      }
  });
};

// ------------------------------------------------------------------------------------------------

DrawGL.prototype.showGlScene = function(i) { var self = this;
  if ( !self.isValidSceneIndex(i) )
    return;

  var glScene = self.getGlScene();
  glScene.traverse(function (obj) {
   obj.visible = ( obj.sid == i );
  });
};

// ------------------------------------------------------------------------------------------------
//                                      DRAW FUNCTIONS
// ------------------------------------------------------------------------------------------------

DrawGL.prototype.draw = function(obj) { var self = this;

  var cssObject = this.newCssObject(obj);
  var glObject = this.newGlObject(obj);

  //synchronize cssObject, planeMesh & obj
  cssObject.position = glObject.position;
  cssObject.rotation = glObject.rotation;
  obj.draw.position = glObject.position;

  self.getGlScene().add( glObject );
  self.getCssScene().add( cssObject );

};

// ------------------------------------------------------------------------------------------------

DrawGL.prototype.newCssObject = function(obj) { var self = this;

  //var canvas = self.getContainer();
  var canvas = self.getCssRenderer().domElement.firstChild;

  var element = obj.html.toDomElement();

  canvas.appendChild(element);
  obj.draw.updateProperties();

  var cssElement = new THREE.CSS3DObject( element );
      cssElement.sid = obj.sid;

  self.register( cssElement, [] );
  return cssElement;
};

// ------------------------------------------------------------------------------------------------

DrawGL.prototype.newGlObject = function(obj) { var self = this;

  var width = obj.draw.width;
  var height = obj.draw.height;

//  var material  = new THREE.MeshBasicMaterial({
//      opacity : 0
//    , color : new THREE.Color('teal')
//    , blending: THREE.NoBlending
//    , side  : THREE.DoubleSide
//  });

  var geometry  = new THREE.PlaneGeometry( width, height );
  var material  = new THREE.MeshBasicMaterial({
      wireframe: true
    , transparent: true
  });

  var mesh = new THREE.Mesh( geometry, material );
      mesh.sid = obj.sid;

  self.register( mesh, [geometry,material] );
  return mesh;
};

// ------------------------------------------------------------------------------------------------

DrawGL.prototype.drawEdge = function(from, to, sid) { var self = this, me = DrawGL.prototype;

  var geometry = new THREE.Geometry();
      geometry.vertices.push (from, to);

  var material = new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 1, linewidth: 5 } );
  var line = new THREE.Line( geometry, material );
      line.sid = sid;

  self.register( line, [geometry,material] );
  self.getGlScene().add( line );

};

DrawGL.prototype.drawArrow = function(from, to, sid) { var self = this, me = DrawGL.prototype;

  //see: THREE.ArrowHelper

  var color = 0xff0000;

  var obj3d = new THREE.Object3D();
      obj3d.position = from;
      obj3d.sid = sid;

  var lineMaterial = new THREE.LineBasicMaterial( { color: color, opacity: 1, linewidth: 5 } );
  var lineGeometry = new THREE.Geometry();
      lineGeometry.vertices.push ( new THREE.Vector3( 0, 0, 0 ) );
      lineGeometry.vertices.push ( new THREE.Vector3( 0, 1, 0 ) );
      //lineGeometry.vertices.push (from, to);

/*
  obj3d.line = new THREE.Line( lineGeometry, lineMaterial );
  obj3d.line.sid = sid;
  //obj3d.sid = sid;
  obj3d.add( obj3d.line );
  self.getGlScene().add( obj3d );
*/

  obj3d.line = new THREE.Line( lineGeometry, lineMaterial );
  obj3d.line.sid = sid;
  obj3d.line.matrixAutoUpdate = false;
  obj3d.add( obj3d.line );

  self.register( obj3d.line, [lineGeometry,lineMaterial] );

  var coneMaterial = new THREE.MeshBasicMaterial( { color: color } );
  var coneGeometry = new THREE.CylinderGeometry( 0, 0.05, 0.25, 5, 1 );
      coneGeometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.875, 0 ) );

  obj3d.cone = new THREE.Mesh( coneGeometry, coneMaterial );
  obj3d.cone.sid = sid;
  //obj3d.cone.matrixAutoUpdate = false;
  obj3d.add( obj3d.cone );

  self.register( obj3d.cone, [coneGeometry,coneMaterial] );

  self.register( obj3d, [] );
  self.getGlScene().add( obj3d );

};


// ------------------------------------------------------------------------------------------------

function createLabel(text, x, y, z, size, color, backGroundColor, backgroundMargin) {
//http://jsfiddle.net/sSD65/28/
//https://gist.github.com/ekeneijeoma/1186920

  if(!backgroundMargin)
    backgroundMargin = 50;

  var canvas = document.createElement("canvas");

  var context = canvas.getContext("2d");
  context.font = size + "pt Arial";

  var textWidth = context.measureText(text).width;

  canvas.width = textWidth + backgroundMargin;
  canvas.height = size + backgroundMargin;
  context = canvas.getContext("2d");
  context.font = size + "pt Arial";

  if(backGroundColor) {
    context.fillStyle = backGroundColor;
    context.fillRect(canvas.width / 2 - textWidth / 2 - backgroundMargin / 2, canvas.height / 2 - size / 2 - +backgroundMargin / 2, textWidth + backgroundMargin, size + backgroundMargin);
  }

  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = color;
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  context.strokeStyle = "black";
  context.strokeRect(0, 0, canvas.width, canvas.height);

  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  var material = new THREE.MeshBasicMaterial({
    map : texture
  });

  var mesh = new THREE.Mesh(new THREE.PlaneGeometry(canvas.width, canvas.height), material);
  // mesh.overdraw = true;
  mesh.doubleSided = true;
  mesh.position.x = x - canvas.width;
  mesh.position.y = y - canvas.height;
  mesh.position.z = z;

  return mesh;
}

// ------------------------------------------------------------------------------------------------
//                                          EVENTS/ACTIONS
// ------------------------------------------------------------------------------------------------

DrawGL.prototype.onWindowResize = function(container) { var self = this;
  var WIDTH = getCssWidth( container ) || self.DEFAULT_CONTAINER_WIDTH;
  var HEIGHT = getCssHeight( container ) || self.DEFAULT_CONTAINER_HEIGHT;

  var camera = self.getCamera();
  camera.aspect = WIDTH/HEIGHT;
  camera.updateProjectionMatrix();

  self.getCssRenderer().setSize( WIDTH, HEIGHT );
  self.getGlRenderer().setSize( WIDTH, HEIGHT );

  self.render();
};

// ------------------------------------------------------------------------------------------------
//                                          HELPERS
// ------------------------------------------------------------------------------------------------

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

// ------------------------------------------------------------------------------------------------

//Returns true if it is a DOM node
function isNode(o){
  return (
      typeof Node === "object" ? o instanceof Node :
          o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
      );
}

//Returns true if it is a DOM element
function isElement(o){
  return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
          o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
      );
}

// ------------------------------------------------------------------------------------------------
//
// ------------------------------------------------------------------------------------------------

function getCssWidthById(id) {
  return pixel2Number( getMatchedStyleById(id, "width") );
}

// ------------------------------------------------------------------------------------------------

function getCssWidth(element) {
  return pixel2Number( getMatchedStyle(element, "width") );
}

// ------------------------------------------------------------------------------------------------

function getCssHeightById(id) {
  return pixel2Number( getMatchedStyleById(id, "height") );
}

// ------------------------------------------------------------------------------------------------

function getCssHeight(element) {
  return pixel2Number( getMatchedStyle(element, "height") );
}

// ------------------------------------------------------------------------------------------------

function getCssLeftMarginById(id) {
  return pixel2Number( getMatchedStyleById(id, "margin-left") );
}

// ------------------------------------------------------------------------------------------------

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions
function pixel2Number(str) {
  var re = new RegExp("[0-9]*");
  var result = re.exec(str);

  return (result.length >= 1) ?
      result[0] :
      function () {
        console.error("ERROR: pixel2Number => invalid.");
        return 0;
      };
}

// ------------------------------------------------------------------------------------------------

function getMatchedStyleById(id,property) {
  var elem = document.getElementById( id );
  if (!elem || !property) {
    console.warn("WARNING: getMatchedStyle => invalid id: " + id);
    return "";
  }

  return getMatchedStyle(elem,property);
}

// ------------------------------------------------------------------------------------------------

// http://stackoverflow.com/questions/9730612/get-element-css-property-width-height-value-as-it-was-set-in-percent-em-px-et
function getMatchedStyle(elem, property) {

  if (!elem || !property) {
    console.warn("WARNING: getMatchedStyle => undefined elem/prop.");
    return "";
  }

  // element property has highest priority
  var val = elem.style.getPropertyValue(property);

  // if it's important, we are done
  if(elem.style.getPropertyPriority(property))
    return val;

  // get matched rules
  var rules = window.getMatchedCSSRules(elem);

  // iterate the rules backwards
  // rules are ordered by priority, highest last
  for(var i = rules.length; i --> 0;){
    var r = rules[i];

    var important = r.style.getPropertyPriority(property);

    // if set, only reset if important
    if(val == null || important) {
      val = r.style.getPropertyValue(property);

      // done if important
      if(important)
        break;
    }
  }

  return val;
}

// ------------------------------------------------------------------------------------------------
//                                                    END
// ------------------------------------------------------------------------------------------------