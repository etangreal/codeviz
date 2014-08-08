
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
    var visualizer  = VisualizerViewFactory.visualizer();
    var customizer  = CustomizerViewFactory.customizerView();
    var pythonTutor = PythonTutorViewFactory.pythonTutorView();
    var debugInfo   = DebugInfoViewFactory.debugInfoView();

    var spacer      = new famous.core.Surface({
                        size: [undefined,undefined],
                        properties: { backgroundColor: 'BLACK' }
                    });

    // -------------------------------------------------------------------------------------------------------------

    var surfaces = [];
    surfaces.push(docList);
    surfaces.push(editor);
    surfaces.push(visualizer);
    surfaces.push(customizer);
    surfaces.push(pythonTutor);
    surfaces.push(debugInfo);
    surfaces.push(spacer);

    flexLayout.sequenceFrom(surfaces);

    // -------------------------------------------------------------------------------------------------------------

    return {
        flexLayout: flexLayout,
           docList: docList, 
            editor: editor, 
        visualizer: visualizer, 
        customizer: customizer,
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

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
