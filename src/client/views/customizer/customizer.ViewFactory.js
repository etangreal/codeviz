

// ToDo: get the customizer too look similar to this:
//  URL: leonidas.github.io/transparency

// -----------------------------------------------------------------------------------------------------------------
// CustomizerViewFactory
// -----------------------------------------------------------------------------------------------------------------

this.CustomizerViewFactory = {

	customizerView: _customizerView

};

// -----------------------------------------------------------------------------------------------------------------
// FUNCTIONS
// -----------------------------------------------------------------------------------------------------------------

	function _customizerView() {

        // ------------------------------------------------------------------------------------------------------------

        var grid = _grid();

        // ------------------------------------------------------------------------------------------------------------

        var tabBar = new famous.widgets.TabBar({
            size: [undefined, undefined],
            properties: {
                backgroundColor: 'RED'
            }
        });

        // ------------------------------------------------------------------------------------------------------------

        var flex = _flex();

        var fs = []
        flex.sequenceFrom(fs);
        fs.push(grid);
        fs.push(tabBar);

        flex._grid = grid;
        flex._tabBar = tabBar;

        // ------------------------------------------------------------------------------------------------------------

        return flex;
	}

    // -----------------------------------------------------------------------------------------------------------------

    function _flex() {
        ratios = [2,1];

        var flex = new famous.views.FlexibleLayout({
            direction: 1,
            ratios : ratios
        });

        // var surface = new famous.core.Surface({
        //     size: [undefined, undefined],
        //     properties: {
        //         backgroundColor: 'WHITESMOKE'
        //     }
        // });

        return flex;
    }

    // -----------------------------------------------------------------------------------------------------------------

    function _grid() {
        var grid = new famous.views.GridLayout({
            dimensions: [2, 1]
        });

        grid._jsEditor = _jsEditor();
        grid._tmplEditor = _tmplEditor();
        
        var gs = [];
        grid.sequenceFrom(gs);
        gs.push( grid._jsEditor );
        gs.push( grid._tmplEditor );

        return grid;
    }

    // -----------------------------------------------------------------------------------------------------------------

    function _tmplEditor() {

        var tmplEditor = new famous.surfaces.TextareaSurface({
            size: [undefined, undefined],
            properties: {
                id: 'template-editor',
                jsEditor: "html",
                backgroundColor: 'SEASHELL'
            }
        });

        return tmplEditor;
    }

    // -----------------------------------------------------------------------------------------------------------------

    function _jsEditor() {

        var jsEditor = new famous.surfaces.TextareaSurface({
            size: [undefined, undefined],
            properties: {
                jsEditor: "javascript",
                backgroundColor: 'SNOW'
            }
        });

        return jsEditor;
    }

// -----------------------------------------------------------------------------------------------------------------
// END
// -----------------------------------------------------------------------------------------------------------------