
// http://stackoverflow.com/questions/23319496/how-can-we-get-the-size-of-a-surface-within-famo-us
/** /
function Surface(options) {
    famous.core.Surface.apply(this, arguments);
    this._superDeploy = famous.core.Surface.prototype.deploy;
}

Surface.prototype = Object.create(famous.core.Surface.prototype);
Surface.prototype.constructor = Surface;

Surface.prototype.deploy = function deploy(target) {
  this._superDeploy(target);
  this.eventHandler.trigger('surface-has-rendered', this);
};

var size = surface.getSize();
var width = (size[0] == true) ? surface._currTarget.offsetWidth : size[0] ;
var height = (size[1] == true) ? surface._currTarget.offsetHeight : size[1] ;

  surface.setSize([width,height]);

  console.log(surface.getSize());

})

var surface = new MySurface({
  size: [true,true],
  content: "Hello",
  properties: {
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'green'
  }
})

surface.pipe(event_handler);

context.add(new StateModifier({origin:[0.5,0.5]})).add(surface);
/**/