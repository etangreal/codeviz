
if(CONSOLE_LOG_ROUTES) console.log('LOADING: src/client/views/application/factory/createLayouts.js');

Meteor.startup(function() {
    if (CONSOLE_LOG_ROUTES) console.log('STARTUP: src/client/views/factory/createLayouts.js');

// =====================================================================================================================
// FACTORY: CREATE LAYOUT FUNCTIONS
// =====================================================================================================================

    this.Factory = {

        Surface: {
            createMeteorSurface: _createMeteorSurface
        },

        HeaderFooter: {
            createHeaderFooterLayout: _createHeaderFooterLayout
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
            size: [undefined, undefined],
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

    function _createEditorCanvasSection() {

        var surfaces = [];

        var OPEN = '->';
        var CLOSED = '<-';
        var TRANSITION = {curve: 'easeOut', duration: 300};
        var INITIAL_RATIOS = [1, true, 3];
        var FINAL_RATIOS = [0, true, 1];

        var divBtnTxt = CLOSED;
        var toggle = false;

        // -------------------------------------------------------------------------------------------------------------

        var layout = new Famous.FlexibleLayout({
            ratios : INITIAL_RATIOS
        });

        var editor = new Famous.Surface({
            size: [undefined, undefined],
            properties: {
                backgroundColor: 'white'
            }
        });

        // -------------------------------------------------------------------------------------------------------------

        //divider-container: serves as a container for the divider & divider-button
        var divCon = new Famous.ContainerSurface({
            size: [20, undefined]
//            properties: {
//                overflow: 'hidden'
//            }
        });

        //divider: placed in the divider-container to serve as a background
        var div = new Famous.Surface({
            size: [20, undefined],
            properties: {
                backgroundColor: 'grey'
            }
        });

        //divider-button-modifier: used to modify the divider-button's position
        var divBtnMod = new Famous.Modifier({
            transform: Famous.Transform.translate(0, 350, 0)
        });

        //divider button: used to open/close the editor panel
        var divBtn = new Famous.Surface({
            size: [20, 20],
            content: divBtnTxt,
            properties: {
                textAlign: "center",
                backgroundColor: 'lightgrey'
            }
        });

        divCon.add(div);
        divCon.add(divBtnMod).add(divBtn);

        // -------------------------------------------------------------------------------------------------------------

        // Toggle state between 0 and 1
        function toggleState() {
            var ratios = toggle ? INITIAL_RATIOS : FINAL_RATIOS;
            divBtn.setContent(toggle ? CLOSED : OPEN);
            layout.setRatios(ratios, TRANSITION);
            toggle = !toggle;
        }

        div.on('click', toggleState);
        divBtn.on('click', toggleState);

        // -------------------------------------------------------------------------------------------------------------

        var canvas = new Famous.Surface({
            size: [undefined, undefined],
            properties: {
                backgroundColor: 'lightgrey'
            }
        });

        // -------------------------------------------------------------------------------------------------------------

        surfaces.push(editor);
        surfaces.push(divCon);
        surfaces.push(canvas);

        layout.sequenceFrom(surfaces);

        // -------------------------------------------------------------------------------------------------------------

        return {
            default: layout,
            layout: layout,
            surfaces: surfaces
        }

    }//_createEditorCanvasSection

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------

});//Meteor.startup
