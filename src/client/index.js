
// ----------------------------------------------------------------------------

Template.index.rendered = function() {

  var mainContext = Engine.createContext();

  var contentView = new Scrollview();

  var content = new Surface({
    size: [undefined, true],
    content: UI.render(Template.index).render().toHTML()
  });

  content.pipe(contentView);
  contentView.sequenceFrom([content]);

  mainContext.add(contentView);

};//Template.index.rendered

// ----------------------------------------------------------------------------
