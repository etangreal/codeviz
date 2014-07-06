
// ----------------------------------------------------------------------------

Template.index.rendered = function() {

  var context = Engine.createContext();

  var content = new Surface({
    size: [undefined, true],
    content: UI.render(Template.index).render().toHTML()
  });

  context.add(content);

};//Template.index.rendered

// ----------------------------------------------------------------------------
