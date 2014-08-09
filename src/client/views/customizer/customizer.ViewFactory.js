

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

        // var tabBar = new famous.widgets.TabBar({
        //     size: [undefined, undefined],
        //     properties: {
        //         backgroundColor: 'RED'
        //     }
        // });

        var surface = new famous.core.Surface({
            size: [undefined, undefined],
            properties: {
                backgroundColor: 'red'
            }
        });

        // ------------------------------------------------------------------------------------------------------------

        var flex = _flex();

        var fs = []
        flex.sequenceFrom(fs);
        fs.push(grid);
        fs.push(surface);

        flex._grid = grid;
        flex._tabBar = surface;

        // ------------------------------------------------------------------------------------------------------------

        return _tmplEditor();
	}

    // -----------------------------------------------------------------------------------------------------------------
    // FLEX-LAYOUT
    // -----------------------------------------------------------------------------------------------------------------

    function _flex() {
        ratios = [2,1];

        var flex = new famous.views.FlexibleLayout({
            direction: 1,
            ratios : ratios
        });

        return flex;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // GRID-LAYOUT
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
    // TEMPLATE-EDITOR
    // -----------------------------------------------------------------------------------------------------------------

    // jsfiddle.net/deepumohanp/tGF6y
    // gist.github.com/duncansmart/5267653

    function _tmplEditor() {

        var view = new famous.core.View();

        var modifier = new famous.core.Modifier({
            size: [600, undefined]
        });

        var tmplEditor = new famous.surfaces.TextareaSurface({
            size: [undefined, undefined],
            properties: {
                id: 'tmplEditor',
                jsEditor: "html",
                backgroundColor: 'SEASHELL'
            }
        });

        view.add(modifier).add(tmplEditor);

        tmplEditor.on('deploy', function(t/*=target*/){
            var s = this.getSize();
            var w = s[0] == true ? t.offsetWidth  : s[0] ;
            var h = s[1] == true ? t.offsetHeight : s[1] ;

            console.log('w: ', w, "|h: ", h);
        });


        // tmplEditor.on('deploy', function(t/*=target*/) {
        //     console.log('tmplEditor | textarea onDeploy');

        //     var s = this.getSize();
        //     var w = s[0] == true ? t.offsetWidth  : s[0] ;
        //     var h = s[1] == true ? t.offsetHeight : s[1] ;

        //     console.log('w: ', w, "|h: ", h);
        // });

        // var content = 
        //     '<div id="tmplEditor"</div>'+
        //     '<textarea id="tmplTextarea" name="tmplTextarea" class="textarea"></textarea>';

        // var surface = new famous.core.Surface({
        //     content: content,
        //     size: [true, undefined],
        //     properties: {
        //         backgroundColor: 'blue'
        //     }
        // });

        // surface.on('deploy', function(target) {
        //     console.log('tmplTextarea | surface onDeploy');

        //     // var size    = this.getSize();
        //     // var width   = size[0] == true ? target.offsetWidth  : size[0] ;
        //     // var height  = size[1] == true ? target.offsetHeight : size[1] ;

        //     var n = $('#tmplEditor').parent();
        //     var w   = n.width();
        //     var h   = n.height();

        //     console.log('w: ', w, "|h: ", h);

        //     var textarea = $('#tmplTextarea');

        //     var div = $('#tmplEditor');
        //         div.width( w*2 );
        //         div.height( h );

        //     var editor = ace.edit('tmplEditor');
        //     // editor.setTheme('ace/theme/twilight');
        //     editor.getSession().setMode('ace/mode/html');

        //     editor.getSession().on('change', function () {
        //         textarea.val(editor.getSession().getValue());
        //     });

        //     textarea.val(editor.getSession().getValue());
        // });

        return view;
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