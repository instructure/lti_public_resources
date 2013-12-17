var LtiAppSearchResultsRoute = Ember.Route.extend({
  model: function(params) {
    this.transitionTo('ltiApp.search.results', { searchText: params.searchText });
  },

  setupController: function(controller, model) {
    controller.set('ltiApp', this.modelFor('ltiApp'));
    controller.searchForText(model.searchText);
  }
});

export default LtiAppSearchResultsRoute;