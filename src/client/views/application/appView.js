
// ---------------------------------------------------------------------------------------------------------------------
// CLASS : AppView
// ---------------------------------------------------------------------------------------------------------------------

    //Export
    this.AppView = AppView;

    //Inherit
    AppView.prototype = Object.create(famous.core.View.prototype);

    //Constructor-Reference
    AppView.prototype.constructor = AppView;

// ---------------------------------------------------------------------------------------------------------------------
// CONSTRUCTOR
// ---------------------------------------------------------------------------------------------------------------------

    function AppView() {
        var self = this;

        // Call the super class's constructor
        famous.core.View.apply(self, arguments);

        // -------------------------------------------------------------------------------------------------------------

        self._isInitShow = false;

        // { layout, header,
        //      content{ flexLayout, docList, editor, visualizer, pythonTutor, debugInfo },
        //  footer }
        var headerFooter = AppViewFactory.HeaderFooter();
        var flexLayout   = headerFooter.content.flexLayout;
        self.visualizer   = headerFooter.content.visualizer;

        State.onToggle = toggleViews.bind(flexLayout);

        self.add(headerFooter.layout);

        // -------------------------------------------------------------------------------------------------------------

    }//AppView

// ---------------------------------------------------------------------------------------------------------------------
// FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------

function toggleViews(ratios) {
    var flexLayout = this;

    flexLayout.setRatios(ratios, {curve: 'easeOut', duration: 500});
}

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------
