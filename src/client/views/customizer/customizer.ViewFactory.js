

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

        return _layout();
 
	}

    // -----------------------------------------------------------------------------------------------------------------
    // Layout
    // -----------------------------------------------------------------------------------------------------------------

    function _layout() {

        // ----------------------------------------------------------------------------------------
        // Container
        // ----------------------------------------------------------------------------------------

        var container = new famous.surfaces.ContainerSurface({
            size: [undefined, undefined],
            properties: {
                overflow: 'hidden'
            }
        });

        // ----------------------------------------------------------------------------------------
        // Javascript TabView
        // ----------------------------------------------------------------------------------------

        var jsw = 400;
        var jsh = 460;

        var javascript  = _javascriptTabView(jsw, jsh);

        var modPosJS = new famous.core.Modifier({
            size: [jsw+20,jsh+20],
            align: [0, 0]
        });

        var modBoxJS = new famous.core.Modifier({
            size: [jsw,jsh],
            origin: [0.5, 0.5]
        });

        // var posJS = container.add(modPosJS);
        // var boxJS = posJS.add(modBoxJS);
        //     boxJS.add(javascript);

        // ----------------------------------------------------------------------------------------
        // Template Tabview
        // ----------------------------------------------------------------------------------------

        var tmplTabView = _templateTabView();

        var tmplW = tmplTabView._tmpl._width;
        var tmplH = tmplTabView._tmpl._height + 40;

        var tmplModPos = new famous.core.Modifier({
            size: [tmplW + 20, tmplH + 20],
            origin: [0, 1]
        });

        var tmplModBox = new famous.core.Modifier({
            size: [tmplW, tmplH],
            origin: [0.5, 0.5]
        });

        var tmplPos = container.add(tmplModPos);
        var tmplBox = tmplPos.add(tmplModBox);
            tmplBox.add(tmplTabView);

        // ----------------------------------------------------------------------------------------

        return container;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // TAB-VIEW
    // -----------------------------------------------------------------------------------------------------------------

    function _templateTabView() {

        // ----------------------------------------------------------------------------------------
        // Imports
        // ----------------------------------------------------------------------------------------

        var tabs = _templateTabBar();
        var tmpl = _template();

        // ----------------------------------------------------------------------------------------        
        // Declarations
        // ----------------------------------------------------------------------------------------

        var tabview = new famous.views.HeaderFooterLayout({
            headerSize: 40,
            footerSize: 0
        });

        // ----------------------------------------------------------------------------------------
        // Composition
        // ----------------------------------------------------------------------------------------

        tabview.header.add(tabs);
        tabview.content.add(tmpl);

        tabview._tabs = tabs;
        tabview._tmpl = tmpl;

        // ----------------------------------------------------------------------------------------
        // Export
        // ----------------------------------------------------------------------------------------

        return tabview;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // TAB-BAR
    // -----------------------------------------------------------------------------------------------------------------

    function _templateTabBar() {

        var content =
'<nav class="navbar navbar-inverse" role="navigation">\n' +
'<div class="container"> \n\n' +

'   <div class="navbar-header"> \n' +
'       <ul class="nav"> \n' +
'           <li class="active"> \n' +
'               <a href="#id-div-nav-tmpl" data-toggle="tab">Template</a> \n' +
'           </li> \n' +
'           <li ><a href="#id-div-html" data-toggle="tab">HTML</a></li> \n' +
'           <li> \n' +
'               <a href="#id-div-result" data-toggle="tab">Result</a> \n' +
'           </li> \n' +
'       </ul> \n' +
'   </div> \n\n' +

' </div> \n'
'</nav>';

        // ----------------------------------------------------------------------------------------

        var navbar = new famous.core.Surface({
            content: content,
            size: [undefined, undefined],
            properties: {
                backgroundColor: 'lightgrey'
            }
        });

        // ----------------------------------------------------------------------------------------

        return navbar;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // TEMPLATE EDITOR
    // -----------------------------------------------------------------------------------------------------------------

    function _template() {

        var content = '\n\
<div class="tab-content"> \n\
\n\
    <div id="id-div-result" class="tab-pane">result</div> \n\
    <div id="id-div-html" class="tab-pane">html</div> \n\
 \n\
    <div id="id-div-nav-tmpl" class="tab-pane"> \n\
        <div id="id-div-tmpl"></div> \n\
        <textarea id="id-textarea-tmpl"></textarea> \n\
    </div> \n\
\n\
<div>';

        // ----------------------------------------------------------------------------------------

        var width = 600;
        var height = 220

        var surface = new famous.core.Surface({
            content: content,
            size: [width, height],
            properties: {
                backgroundColor: 'teal'
            }
        });

        surface.on( 'deploy', _onDeployTemplate );

        surface._width = width;
        surface._height = height

        // ----------------------------------------------------------------------------------------

        return surface;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // TEMPLATE EDITOR ON-DEPLOY
    // -----------------------------------------------------------------------------------------------------------------

    function _onDeployTemplate(t/*=target*/) {
        // Examples of how to use ACE EDITOR
        //  jsfiddle.net/deepumohanp/tGF6y
        //  gist.github.com/duncansmart/5267653

        var $editor   = $('#id-div-tmpl');
        var $textarea = $('#id-textarea-tmpl');
        
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
            editor.setTheme("ace/theme/monokai");

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

    }//_onDeployTemplate

    // -----------------------------------------------------------------------------------------------------------------
    // JAVASCRIPT TABVIEW
    // -----------------------------------------------------------------------------------------------------------------

    function _javascriptTabView(width, height) {

        // ----------------------------------------------------------------------------------------
        // Imports
        // ----------------------------------------------------------------------------------------

        var tabs = _javascriptTabBar();
        var tmpl = _javascript(width, height);

        // ----------------------------------------------------------------------------------------        
        // Declarations
        // ----------------------------------------------------------------------------------------

        var tabview = new famous.views.HeaderFooterLayout({
            headerSize: 40,
            footerSize: 0
        });

        // ----------------------------------------------------------------------------------------
        // Composition
        // ----------------------------------------------------------------------------------------

        tabview.header.add(tabs);
        tabview.content.add(tmpl);

        // ----------------------------------------------------------------------------------------
        // Export
        // ----------------------------------------------------------------------------------------

        return tabview;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // JAVASCRIPT TAB-BAR
    // -----------------------------------------------------------------------------------------------------------------

    function _javascriptTabBar() {
        return undefined;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // JAVASCRIPT EDITOR
    // -----------------------------------------------------------------------------------------------------------------

    function _javascript(width, height) {

        var content = '\n\
<div class="tab-content"> \n\
\n\
    <div id="id-div-js" class="tab-pane">div</div> \n\
    <textarea id="id-textarea-js" class="textarea"></textarea> \n\
\n\
    <div id="id-div-inspector" class="tab-pane">Inspector</div> \n\
\n\
<div>';

        // ----------------------------------------------------------------------------------------

        var surface = new famous.core.Surface({
            content: content,
            size: [undefined, undefined],
            properties: {
                backgroundColor: 'blue'
            }
        });

        // ----------------------------------------------------------------------------------------

        surface.on( 'deploy', _onDeployJavaScript );

        return surface;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // ON-DEPLOY-JAVASCRIPT
    // -----------------------------------------------------------------------------------------------------------------

    // Examples of how to use ACE EDITOR
    //  jsfiddle.net/deepumohanp/tGF6y
    //  gist.github.com/duncansmart/5267653

    function _onDeployJavaScript(t/*=target*/) {
        // var me = this;

        var $textarea = $('#id-textarea-js');
        var $editor   = $('#id-div-js');

        var s = this.getSize();
        var w = s[0] == true ? t.offsetWidth  : s[0] ;
        var h = s[1] == true ? t.offsetHeight : s[1] ;

        // console.log('w: ', w, "|h: ", h);

        $editor.width( w );
        $editor.height( h );
        $editor.attr( 'overflow', 'scroll' );
        $editor.attr( 'class', $textarea.attr('class') );
        $textarea.css('visibility', 'hidden');

        var editor = ace.edit('id-div-js');
            editor.renderer.setShowGutter(false);
            editor.getSession().setValue($textarea.val());
            editor.getSession().setMode("ace/mode/javascript");
            editor.setTheme("ace/theme/monokai");

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
    // INSPECTOR
    // -----------------------------------------------------------------------------------------------------------------

    function _inspector() {

        var surface = new famous.core.Surface({
            size: [undefined, undefined],
            properties: {
                backgroundColor: 'red'
            }
        });

        return surface;
    }

// -----------------------------------------------------------------------------------------------------------------
// END
// -----------------------------------------------------------------------------------------------------------------