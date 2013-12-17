var LtiAppSearchController = Ember.ObjectController.extend({
  searchText: '',
  searchResults: null,

  init: function() {
    this._super();
    this.set('searchResults', Em.A([]));
  }
});

export default LtiAppSearchController;
