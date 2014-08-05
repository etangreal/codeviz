

_.extend(Visualizer.prototype, {

    // ----------------------------------------------------------------------------------------------------------------

    clearCanvas: _clearCanvas,
    drawArrow: canvas_arrow

    // ----------------------------------------------------------------------------------------------------------------

}); //_.extend(Visualizer.prototype

// --------------------------------------------------------------------------------------------------------------------
// PRIVATE | FUNCTIONS
// --------------------------------------------------------------------------------------------------------------------

function _clearCanvas() {
	var self = this;
	var canvas = self._canvas;

	//clears the canvas
	var c = canvas.getContext('2d');
	c.clearRect ( 0 , 0 , 1200, 1200 );
}

// --------------------------------------------------------------------------------------------------------------------


// stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
function canvas_arrow(f,t){
	var self = this;

	var context = self._canvas.getContext('2d');
    
    var fromx = f.x, 
    	fromy = f.y, 
    	tox = t.x, 
    	toy = t.y;

    var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(toy-fromy,tox-fromx);

    context.beginPath();

    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));

    context.stroke();
    context.closePath();
}

// --------------------------------------------------------------------------------------------------------------------

function _drawArrow(f,t) {
	var self = this;
	var canvas = self._canvas;

	//clears the canvas
	canvas.width = canvas.width;

	var c = canvas.getContext('2d');

	c.beginPath();
	// c.strokeStyle = 'black';
	// c.fillStyle = 'black';

	c.moveTo(f.x,f.y);
	c.lineTo(t.x,t.y);    
	c.stroke();

	c.closePath();
}

// --------------------------------------------------------------------------------------------------------------------
// END
// --------------------------------------------------------------------------------------------------------------------
