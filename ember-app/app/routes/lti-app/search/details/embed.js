var LtiAppSearchDetailsEmbedRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', this.modelFor('ltiApp.search.details'));
  }
});

export default LtiAppSearchDetailsEmbedRoute;

