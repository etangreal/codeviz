

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

        var tmpl    = _tmplEditor();
        var s1      = _surface('orange');
        var s2      = _surface('green');
        var flex    = _flexLayout();

        // ----------------------------------------------------------------------------------------

        fs = [];
        flex.sequenceFrom(fs);
        fs.push(tmpl);
        fs.push(s2);

        // ----------------------------------------------------------------------------------------

        return tmpl;
	}

    // -----------------------------------------------------------------------------------------------------------------
    // SURFACE (test)
    // -----------------------------------------------------------------------------------------------------------------

    function _surface(color) {
        color = color || 'yellow';

        var surface = new famous.core.Surface({
            size: [undefined, undefined],
            properties: {
                backgroundColor: color
            }
        });

        return surface;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // FLEX-LAYOUT
    // -----------------------------------------------------------------------------------------------------------------

    function _flexLayout() {
        var ratios = [2,1];

        var flex = new famous.views.FlexibleLayout({
            direction: famous.utilities.Utility.Direction.Y,
            ratios: ratios
        });

        return flex;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // TAB-VIEW
    // -----------------------------------------------------------------------------------------------------------------

    function _tabView() {

        var view    = new famous.core.View();

        var s1      = _surface();
        var s2      = _surface('blue');
        var tabs    = _tabBar();
        var grid    = _grid();

        // ----------------------------------------------------------------------------------------

        var gs = [];
        grid.sequenceFrom(gs);
        gs.push(s1);
        gs.push(s2);

        // ----------------------------------------------------------------------------------------

        view.add(grid);

        return view;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // TAB-BAR
    // -----------------------------------------------------------------------------------------------------------------

    function _tabBar() {

        var tabBar = new famous.widgets.TabBar({
            size: [undefined, 50],
            direction: famous.utilities.Utility.Direction.X,
            properties: {
                backgroundColor: 'RED'
            }
        });

        // ----------------------------------------------------------------------------------------

        return tabBar;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // GRID-LAYOUT
    // -----------------------------------------------------------------------------------------------------------------

    function _grid() {

        var grid = new famous.views.GridLayout({
            dimensions: [2, 1]
        });

        return grid;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // TEMPLATE EDITOR
    // -----------------------------------------------------------------------------------------------------------------

    function _tmplEditor() {

        var content = 
            '<div id="id-div-tmpl">div</div>' +
            '<textarea id="id-textarea-tmpl" name="name-textarea-tmpl" class="textarea">textarea</textarea>';

        // ----------------------------------------------------------------------------------------

        var modPos = new famous.core.Modifier({
            size: [320,320],
            origin: [0, 0.5]
        });

        var modBox = new famous.core.Modifier({
            size: [300,300],
            origin: [0.5, 0.5]
        });

        var surface = new famous.core.Surface({
            content: content,
            size: [undefined, undefined],
            properties: {
                backgroundColor: 'blue'
            }
        });

        var con = new famous.surfaces.ContainerSurface({
            size: [undefined, undefined],
            properties: {
                overflow: 'hidden'
            }
        });

        // ----------------------------------------------------------------------------------------

        var pos = con.add(modPos);
        var box = pos.add(modBox);
            box.add(surface);

        // ----------------------------------------------------------------------------------------

        surface.on( 'deploy', _onDeploy.bind(surface) );

        return con;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // ON-DEPLOY
    // -----------------------------------------------------------------------------------------------------------------

    // Examples of how to use ACE EDITOR
    //  jsfiddle.net/deepumohanp/tGF6y
    //  gist.github.com/duncansmart/5267653

    function _onDeploy(t/*=target*/) {
        // var me = this;

        var $textarea = $('#id-textarea-tmpl');
        var $editor   = $('#id-div-tmpl');

        var s = this.getSize();
        var w = s[0] == true ? t.offsetWidth  : s[0] ;
        var h = s[1] == true ? t.offsetHeight : s[1] ;

        // console.log('w: ', w, "|h: ", h);

        $editor.width( w );
        $editor.height( h );
        $editor.attr( 'overflow', 'scroll' );
        $editor.attr( 'class', $textarea.attr('class') );
        $textarea.css('visibility', 'hidden');

        var editor = ace.edit('id-div-tmpl');
            editor.renderer.setShowGutter(false);
            editor.getSession().setValue($textarea.val());
            editor.getSession().setMode("ace/mode/html");
            editor.setTheme("ace/theme/idle_fingers");

        editor.getSession().on('change', function () {
            $textarea.val( editor.getSession().getValue() );
        });

        Deps.autorun(function (c) {
          var tmpl = State.getRenderTmpl();
          editor.getSession().setValue(tmpl);
        });

        // textarea.on('input propertychange', function() {
        //     editor.getSession.setValue( textarea.val() );
        // });

    }//_onDeploy

// -----------------------------------------------------------------------------------------------------------------
// END
// -----------------------------------------------------------------------------------------------------------------