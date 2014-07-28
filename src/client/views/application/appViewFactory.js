
// -----------------------------------------------------------------------------------------------------------------
// AppFactory
// -----------------------------------------------------------------------------------------------------------------

    //EXPORT
    this.AppViewFactory = {

        //VIEWS
        HeaderFooter: _createHeaderFooterLayout

    }//AppViewFactory

// ---------------------------------------------------------------------------------------------------------------------
// VIEW | HeaderFooterLayout
// ---------------------------------------------------------------------------------------------------------------------

function _createHeaderFooterLayout() {

    var layout = new famous.views.HeaderFooterLayout({
        header: 50,
        footer: 10
    });

    // -------------------------------------------------------------------------------------------------------------

    var header 	= _createHeaderSection();
    var content = _createContentSection(); //{ flexLayout, docList, editor, visualizer, pythonTutor, debugInfo }
    var footer  = _createFooterSection();

    layout.header.add(header);
    layout.content.add(content.flexLayout);
    layout.footer.add(footer);

    // -------------------------------------------------------------------------------------------------------------

    return { 
         layout: layout, 
         header: header,
        content: content,
         footer: footer
     };

}//_createHeaderFooterLayout

// -----------------------------------------------------------------------------------------------------------------
// VIEW | Header Section
// -----------------------------------------------------------------------------------------------------------------

function _createHeaderSection(layout) {

	var header = new library.meteor.core.Surface({
	    template: Template.header,
	    size: [undefined, 41],
	    properties: {
	        backgroundColor: 'black'
	    }
	});

    // -------------------------------------------------------------------------------------------------------------

    return header;

}//_createHeaderSection

// -----------------------------------------------------------------------------------------------------------------
// VIEW | Content Section
// -----------------------------------------------------------------------------------------------------------------

function _createContentSection() {

    var flexLayout = new famous.views.FlexibleLayout({
        ratios : State.ratios()
    });

    // -------------------------------------------------------------------------------------------------------------

    var docList     = EditorViewFactory.docListView();
    var editor      = EditorViewFactory.editorView();
    var visualizer  = VisualizerViewFactory.visualizerView();
    var pythonTutor = PythonTutorViewFactory.pythonTutorView();
    // var divider     = _divider(flexLayout);
    var debugInfo   = DebugInfoViewFactory.debugInfoView();

    var spacer      = new famous.core.Surface({
                        size: [undefined,undefined],
                        properties: { backgroundColor: 'red' }
                    });

    // -------------------------------------------------------------------------------------------------------------

    var surfaces = [];
    surfaces.push(docList);
    surfaces.push(editor);
    surfaces.push(visualizer);
    surfaces.push(pythonTutor);
    //surfaces.push(divider);
    surfaces.push(debugInfo);
    surfaces.push(spacer);

    flexLayout.sequenceFrom(surfaces);

    // -------------------------------------------------------------------------------------------------------------

    return {
        flexLayout: flexLayout,
           docList: docList, 
            editor: editor, 
        visualizer: visualizer, 
       pythonTutor: pythonTutor, 
         debugInfo: debugInfo 
    };

}//_createContentSection

// -----------------------------------------------------------------------------------------------------------------
// VIEW | Footer Section
// -----------------------------------------------------------------------------------------------------------------

function _createFooterSection(layout) {

    var footer = new library.meteor.core.Surface({
        template: Template.footer,
        size: [undefined, 20],
        properties: {
            backgroundColor: 'black'
        }
    });

    // -------------------------------------------------------------------------------------------------------------

    return footer;

}//_createFooterSection

// -----------------------------------------------------------------------------------------------------------------
// VIEW | Divider
// -----------------------------------------------------------------------------------------------------------------

function _divider(flexLayout) {
	// divider: serves as a divider-container (for the divider & divider-button) 
	// between the editor and canvas

    var open = '->';
    var closed = '<-';
    var transition = {curve: 'easeOut', duration: 300};
    var divBtnTxt = closed;
    var toggle = false;

    // -----------------------------------------------------------------------------------------------------------------

    var divider = new famous.surfaces.ContainerSurface({
        size: [20, undefined]
           // properties: {
           //     overflow: 'hidden'
           // }
    });

    // -----------------------------------------------------------------------------------------------------------------

    //divider: placed in the divider-container to serve as a background
    var div = new famous.core.Surface({
        size: [20, undefined],
        properties: {
            backgroundColor: 'grey'
        }
    });

    // -----------------------------------------------------------------------------------------------------------------

    //divider-button-modifier: used to modify the divider-button's position
    var divBtnMod = new famous.core.Modifier({
        transform: famous.core.Transform.translate(0, 350, 0)
    });

    // -----------------------------------------------------------------------------------------------------------------

    //divider button: used to open/close the editor panel
    var divBtn = new famous.core.Surface({
        size: [20, 20],
        content: divBtnTxt,
        properties: {
            textAlign: "center",
            backgroundColor: 'lightgrey'
        }
    });

    divider.add(div);
    divider.add(divBtnMod).add(divBtn);

    // -----------------------------------------------------------------------------------------------------------------

    // Toggle state between 0 and 1
    function toggleState() {
        var ratios = State.ratios;
        divBtn.setContent(toggle ? closed : open);
        flexLayout.setRatios(ratios, transition);
        toggle = !toggle;
    }

    // -----------------------------------------------------------------------------------------------------------------

    // div.on('click', toggleState);
    // divBtn.on('click', toggleState);

    // -----------------------------------------------------------------------------------------------------------------

    return divider;

} //_divider

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
