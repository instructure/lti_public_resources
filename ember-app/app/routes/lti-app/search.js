var LtiAppSearchRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('ltiApp');
  },

  actions: {
    performSearch: function() {
      var searchText = this.controllerFor('ltiApp.search').get('searchText');
      this.transitionTo('ltiApp.search.results', { searchText: searchText });
    }
  }
});

export default LtiAppSearchRoute;

