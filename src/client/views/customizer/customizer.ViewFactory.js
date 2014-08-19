

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

        // --------------------------------------------------------------------------
        // Background
        // --------------------------------------------------------------------------

        var background = new famous.core.Surface({
            size: [undefined,undefined],
            properties: { 
                backgroundColor: 'lightblue' 
            }
        });

        // ----------------------------------------------------------------------------------------
        // Javascript TabView
        // ----------------------------------------------------------------------------------------

        var jsTabView  = _tabView( _javascriptTabBarContent(), _javascript() );

        jsTabView._tabBar.on('deploy', _onDeployJSTabView);

        var jsW = 650;
        var jsH = 400;

        var jsModPos = new famous.core.Modifier({
            size: [jsW+20, jsH+20],
            align: [0, 0]
        });

        var jsModBox = new famous.core.Modifier({
            size: [jsW, jsH],
            origin: [0.5, 0.5]
        });

        var jsPos = container.add(jsModPos);
        var jsBox = jsPos.add(jsModBox);
            jsBox.add(jsTabView);

        // ----------------------------------------------------------------------------------------
        // Template Tabview
        // ----------------------------------------------------------------------------------------

        var tmplTabView = _tabView( _templateTabBarContent(), _template() );

        tmplTabView._tabBar.on('deploy', _onDeployTmplTabView);

        var tmplW = 650;
        var tmplH = 320;

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

        container.add(background);

        return container;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // ON-DEPLOY JAVASCRIPT TABVIEW
    // -----------------------------------------------------------------------------------------------------------------

    function _onDeployJSTabView() {

        $('#id-btn-compile').click(function() {
            
            var obj  = State.getSelectedObj();
            var cmpl = Visualizer.prototype.compile;
            var tmpl = ace.edit('id-div-tmpl');
            var js   = ace.edit('id-div-js');

            var data = obj.render.data;
            var code = js.getSession().getValue();
            var tmpl = tmpl.getSession().getValue();

            var html = cmpl(data, code, tmpl);
            
            obj.render.code = code;
            obj.render.tmpl = tmpl;
            obj.render.html = html;

            State.setSelectedObj(obj);

            // console.log('\n------------------------------------------------------------------------------');
            // console.log(code);
            // console.log('------------------------------------------------------------------------------');
            // console.log(data);
            // console.log('------------------------------------------------------------------------------');
            // console.log(tmpl);
            // console.log('------------------------------------------------------------------------------');
            // console.log(html);
            // console.log('------------------------------------------------------------------------------');
        });

    }

    // -----------------------------------------------------------------------------------------------------------------
    // ON-DEPLOY TEMPLATE TABVIEW
    // -----------------------------------------------------------------------------------------------------------------

    function _onDeployTmplTabView() {

        $('#id-btn-apply').click(function() {
            console.log('apply button clicked ...');
        });

    }

    // -----------------------------------------------------------------------------------------------------------------
    // JAVASCRIPT TAB-BAR
    // -----------------------------------------------------------------------------------------------------------------

    function _javascriptTabBarContent() {
        return multiline(function(){/*
            <nav class="navbar navbar-inverse" role="navigation">
                <div class="container">

                    <div class="navbar-header">
                        <ul class="nav">
                            <li class="active">
                                <a href="#id-div-js" data-toggle="tab">Javascript</a>
                            </li>
                            <li>
                                <a href="#id-div-data" data-toggle="tab">Inspector</a>
                            </li>
                        </ul>

                        <ul id="ul-nav-js-btns" class="nav pull-right">
                            <li>
                                <button type="button" id="id-btn-compile" class="btn btn-default navbar-btn">compile</button>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav> 
        */});
    }

    // -----------------------------------------------------------------------------------------------------------------
    // JAVASCRIPT EDITOR
    // -----------------------------------------------------------------------------------------------------------------

    function _javascript() {

        var content = multiline(function(){/*
            <div class="tab-content">

                <div id="id-div-js" class="tab-pane">js</div>
                <div id="id-div-data" class="tab-pane">Inspector</div>

                <textarea id="id-textarea-js"></textarea>
                <textarea id="id-textarea-data"></textarea>

            <div>
        */});

        // ----------------------------------------------------------------------------------------

        var js = _surface(content);

        js.on( 'deploy', _onDeployJavaScript );

        // ----------------------------------------------------------------------------------------

        return js;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // ON-DEPLOY-JAVASCRIPT
    // -----------------------------------------------------------------------------------------------------------------

    function _onDeployJavaScript(t/*=target*/) {

        var s = this.getSize();
        var w = s[0] == true ? t.offsetWidth  : s[0] ;
        var h = s[1] == true ? t.offsetHeight : s[1] ;

        var codeValueFn = function() { return State.getRenderCode(); };
        _applyAce('id-div-js', 'id-textarea-js', 'javascript', w, h, codeValueFn);

        var dataValueFn = function() { return State.getRenderData(); };
        _applyAce('id-div-data', 'id-textarea-data', 'javascript', w, h, dataValueFn);

    }//_onDeploy

    // -----------------------------------------------------------------------------------------------------------------
    // TEMPLATE TAB-BAR
    // -----------------------------------------------------------------------------------------------------------------

    // ToDo: see jquery tabs
    //  URL: jqueryui.com/tabs

    function _templateTabBarContent() {
        return multiline(function(){/*
            <nav class="navbar navbar-inverse" role="navigation">
                <div class="container">

                    <div class="navbar-header">
                        <ul class="nav">
                            <li class="active">
                                <a href="#id-div-tmpl" data-toggle="tab">Template</a>
                            </li>
                            <li>
                                <a href="#id-div-html" data-toggle="tab">HTML</a>
                            </li>
                            <li>
                                <a href="#id-div-result" data-toggle="tab">Result</a>
                            </li>
                        </ul>

                        <ul id="ul-nav-tmpl-btns" class="nav pull-right">
                            <li>
                                <button type="button" id="id-btn-apply" class="btn btn-default navbar-btn">apply</button>
                            </li>
                        </ul>
                   </div>

                </div>
            </nav> 
        */});
    }

    // -----------------------------------------------------------------------------------------------------------------
    // TEMPLATE EDITOR
    // -----------------------------------------------------------------------------------------------------------------

    function _template() {

        var content = multiline(function(){/*
            <div class="tab-content">
                <div id="id-div-tmpl" class="tab-pane">template</div>
                <div id="id-div-html" class="tab-pane">html</div>
                <div id="id-div-result" class="tab-pane">result</div>

                <textarea id="id-textarea-tmpl"></textarea>
                <textarea id="id-textarea-html"></textarea>
            <div>
        */});

        // ----------------------------------------------------------------------------------------

        var tmpl = _surface(content);
        tmpl.on( 'deploy', _onDeployTemplate );

        // ----------------------------------------------------------------------------------------

        return tmpl;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // TEMPLATE EDITOR ON-DEPLOY
    // -----------------------------------------------------------------------------------------------------------------

    function _onDeployTemplate(t/*=target*/) {

        var s = this.getSize();
        var w = s[0] == true ? t.offsetWidth  : s[0] ;
        var h = s[1] == true ? t.offsetHeight : s[1] ;

        var tmplValueFn = function() { return State.getRenderTmpl() };
        _applyAce('id-div-tmpl', 'id-textarea-tmpl', 'html', w, h, tmplValueFn);

        var htmlValueFn = function() { return State.getRenderHtml() };
        _applyAce('id-div-html', 'id-textarea-html', 'html', w, h, htmlValueFn);

        var $result = $('#id-div-result');
        Deps.autorun(function (c) {
            $result.html( State.getRenderHtml() );
        });

    }//_onDeployTemplate

// -----------------------------------------------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------------------------------------------

    // -----------------------------------------------------------------------------------------------------------------
    // TABVIEW
    // -----------------------------------------------------------------------------------------------------------------

    function _tabView(htmlAsStr, content) {

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

        var tabBar = _tabBar(htmlAsStr)

        tabview.header.add( tabBar );
        tabview.content.add( content );

        tabview._tabBar = tabBar;
        tabview._content = content;

        // ----------------------------------------------------------------------------------------
        // Export
        // ----------------------------------------------------------------------------------------

        return tabview;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // TAB-BAR
    // -----------------------------------------------------------------------------------------------------------------

    function _tabBar(htmlAsStr) {

        // ----------------------------------------------------------------------------------------

        var navbar = new famous.core.Surface({
            content: htmlAsStr,
            size: [undefined, undefined],
            properties: {
                backgroundColor: 'lightgrey'
            }
        });

        // ----------------------------------------------------------------------------------------

        return navbar;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // ACE-EDITOR
    // -----------------------------------------------------------------------------------------------------------------
        
        // Examples of how to use ACE EDITOR
        //  jsfiddle.net/deepumohanp/tGF6y
        //  gist.github.com/duncansmart/5267653

    function _applyAce(divId, textAreaId, mode, width, height, getValueFn) {

        var $editor   = $('#' + divId);
        var $textarea = $('#' + textAreaId);

        $editor.width( width );
        $editor.height( height );

        $editor.attr( 'overflow', 'scroll' );
        $editor.attr( 'class', $textarea.attr('class') );
        $textarea.css('visibility', 'hidden');

        var editor = ace.edit( divId );

        editor.renderer.setShowGutter(false);
        // editor.getSession().setUseWrapMode(false);
        editor.getSession().setValue( $textarea.val() );
        editor.getSession().setMode("ace/mode/" + mode);
        editor.setTheme("ace/theme/monokai");

        editor.getSession().on('change', function () {
            $textarea.val( editor.getSession().getValue() );
        });

        Deps.autorun(function (c) {
          editor.getSession().setValue( getValueFn() );
        });

        return editor;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // SURFACE
    // -----------------------------------------------------------------------------------------------------------------

    function _surface(content) {
        return new famous.core.Surface({
            content: content,
            size: [undefined, undefined],
            properties: {
                backgroundColor: 'lightblue'
            }
        });
    }

// -----------------------------------------------------------------------------------------------------------------
// END
// -----------------------------------------------------------------------------------------------------------------