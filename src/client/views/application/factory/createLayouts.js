
if(CONSOLE_LOG_ROUTES) console.log('LOADING: src/client/views/application/factory/createLayouts.js');

// =====================================================================================================================
// FACTORY: CREATE LAYOUT FUNCTIONS
// =====================================================================================================================

Factory = {

    Surface: {
        createMeteorSurface: _createMeteorSurface
    },

    HeaderFooter: {
        createHeaderFooterLayout: _createHeaderFooterLayout,
        createHeaderSection: _createHeaderSection,
        createContentSection: _createContentSection,
        createFooterSection: _createFooterSection
    },

    EditorCanvas: {
        createEditorCanvasSection: _createEditorCanvasSection
    }

};//Factory

// ---------------------------------------------------------------------------------------------------------------------
// CREATE METEOR SURFACE
// ---------------------------------------------------------------------------------------------------------------------

function _createMeteorSurface(template, data, properties) {

    properties = properties || {
            backgroundColor: '#b7af4c'
        };

    var surface = new Famous.MeteorSurface({
        size: [600, 300],
        template: template,
        data: data,
        properties: properties
    });

    // -------------------------------------------------------------------------------------------------------------

    return {
        default: surface,
        modifier: undefined,
        surface: surface
    };

}//_createMeteorSurface

// ---------------------------------------------------------------------------------------------------------------------
// CREATE HEADER FOOTER LAYOUT
// ---------------------------------------------------------------------------------------------------------------------

function _createHeaderFooterLayout() {

    var layout = new Famous.HeaderFooterLayout({
        header: 50,
        footer: 10
    });

    return {
        layout: layout,
        header: _createHeaderSection(layout),
        content: _createContentSection(layout),
        footer: _createFooterSection(layout)
    }

}//_createHeaderFooterLayout

// ---------------------------------------------------------------------------------------------------------------------

function _createHeaderSection(layout) {

    var surface = new Famous.MeteorSurface({
        template: Template.header,
        size: [undefined, 50],
        properties: {
            backgroundColor: 'lightblue'
        }
    });

    // -------------------------------------------------------------------------------------------------------------

    layout.header.add(surface);

    return {
        default: surface,
        modifier: undefined,
        surface: surface
    };

}//_createHeaderSection

// ---------------------------------------------------------------------------------------------------------------------

function _createContentSection(layout) {

    var controller = new Famous.RenderController();

    // -------------------------------------------------------------------------------------------------------------

    layout.content.add(controller);

    return {
        //default handle
        default: controller,
        controller: controller,
        modifier: undefined,
        surface: undefined
    };

}//_createContent

// ---------------------------------------------------------------------------------------------------------------------

function _createFooterSection(layout) {

    var surface = new Famous.MeteorSurface({
        template: Template.footer,
        size: [undefined, 20],
        properties: {
            backgroundColor: 'lightblue'
        }
    });

    // -------------------------------------------------------------------------------------------------------------

    layout.footer.add(surface);

    return {
        default: surface,
        modifier: undefined,
        surface: surface
    };

}//_createFooterSection

// ---------------------------------------------------------------------------------------------------------------------
// EDITOR & CANVAS
// ---------------------------------------------------------------------------------------------------------------------

function _createEditorCanvasSection(container) {

    var layout = new Famous.FlexibleLayout();

    var initialRatios = [1, true, 1, true];

    var colors = [
        'rgba(256, 0, 0, .7)',
        'rgba(0, 256, 0, .7)',
        'rgba(0, 0, 256, .7)',
        'rgba(256, 0, 0, .7)',
        'rgba(0, 256, 0, .7)',
        'rgba(0, 0, 256, .7)',
        'rgba(256, 0, 0, .7)',
        'rgba(0, 256, 0, .7)',
        'rgba(0, 0, 256, .7)'
    ];

    var surfaces = [];
    for (var i = 1; i <= 4; i++) {
        size = (i % 2 === 0) ? [10, undefined] : [undefined, undefined]
        surfaces.push(new Famous.Surface({
            size: size,
            properties: {
                backgroundColor: colors[i-1]
            }
        }));
    }

    layout.sequenceFrom(surfaces);

    var finalRatios = [4, true, 1, true];
    var toggle = false;

    Famous.Engine.on('click', function(){
        var ratios = toggle ? initialRatios : finalRatios;
        layout.setRatios(ratios, {curve : 'easeOut', duration : 500});
        toggle = !toggle;
    });

    // -------------------------------------------------------------------------------------------------------------

    container.add(layout);

    return {
        default: layout,
        layout: layout
    }

}//_createEditorCanvasSection

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------