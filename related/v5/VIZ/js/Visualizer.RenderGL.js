// ------------------------------------------------------------------------------------------------
//                          Visualizer.RenderGL <-(related code)-> DrawGL
// ------------------------------------------------------------------------------------------------

Visualizer.prototype.initGlRenderer = function(container, options) { var self = this;
  if (self._glRenderer != undefined) {
    console.error(("ERROR: initGlRenderer -> glRenderer exists."));
    return;
  }

  container = container || self.getVisualizerCanvas();
  options = options || self.getGlOptionsDefault();

  self._glRenderer = new DrawGL(container, options);
};

Visualizer.prototype.getGlRenderer = function() { var self = this;
  if (self._glRenderer == undefined)
    console.error("ERROR: Visualizer::getGlRenderer => glRenderer undefined.");

  return self._glRenderer;
};

// ------------------------------------------------------------------------------------------------

Visualizer.prototype.clearScene = function() { var self = this;
  self.getGlRenderer().clearScene();
};

// ------------------------------------------------------------------------------------------------

Visualizer.prototype.getGlOptionsDefault = function() {
  return {
    showStats: false
  };
};

// ------------------------------------------------------------------------------------------------
// END
// ------------------------------------------------------------------------------------------------