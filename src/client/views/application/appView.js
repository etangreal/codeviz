
Meteor.startup(function() {

// ---------------------------------------------------------------------------------------------------------------------
// CLASS : AppView
// ---------------------------------------------------------------------------------------------------------------------

    //Export
    this.AppView = AppView;

    //Inherit from Famous.View
    AppView.prototype = Object.create(Famous.View.prototype);

    //Constructor Reference
    AppView.prototype.constructor = AppView;

// ---------------------------------------------------------------------------------------------------------------------
// CONSTRUCTOR
// ---------------------------------------------------------------------------------------------------------------------

    function AppView() {

        // Call the super class's constructor
        Famous.View.apply(this, arguments);

        // { layout, header,
        //      content{ flexLayout, docList, editor, visualizer, pythonTutor, debugInfo },
        //  footer }
        var headerFooter = AppViewFactory.HeaderFooter();
        var flexLayout = headerFooter.content.flexLayout;
        State.onToggle = toggleViews.bind(flexLayout);

        this.add(headerFooter.layout);

    }//AppView

// ---------------------------------------------------------------------------------------------------------------------
// FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------

function toggleViews(ratios) {
    var flexLayout = this;
    var transition = {curve: 'easeOut', duration: 300};

    flexLayout.setRatios(ratios, transition);
}

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------

});//Meteor.startup
