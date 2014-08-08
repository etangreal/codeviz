// ---------------------------------------------------------------------------------------------------------------------
// EXPORT
// ---------------------------------------------------------------------------------------------------------------------

    //Inherit
    Customizer.prototype = Object.create(famous.core.View.prototype);

    //Constructor-Reference
    Customizer.prototype.constructor = Customizer;

    //Export
    this.Customizer = Customizer;

// ---------------------------------------------------------------------------------------------------------------------
// CONSTRUCTOR
// ---------------------------------------------------------------------------------------------------------------------

    function Customizer() {
        var self = this;

        // Call the super class constructor
        famous.core.View.apply(self, arguments);

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

        var background = new famous.core.Surface({
            size: [undefined,undefined],
            properties: { 
                backgroundColor: 'green' 
            }
        });

        // --------------------------------------------------------------------------
        // Canvas
        // --------------------------------------------------------------------------

        var mod = new famous.core.Modifier({ 
            transform: famous.core.Transform.translate(0,0,1)
        });

        self._canvas = new famous.surfaces.CanvasSurface({
            // size: [undefined,undefined],
            size: [935,1000],
            properties: {
                // backgroundColor: 'lightyellow'
            }
        });

        self._render = false;
        self._canvas.render = _render.bind(this);

        // --------------------------------------------------------------------------
        // Add Components to Customizer
        // --------------------------------------------------------------------------

        self.add(background);
        self.add(mod).add(self._canvas);
        self.add(this._controller);

    }//Customizer

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
