export default Ember.Handlebars.registerHelper(function(val1, val2, options) {
  if (options.data.view.content.get(val1) === val2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
