var LtiAppSearchDetailsIndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', this.modelFor('ltiApp.search.details'));
  }
});

export default LtiAppSearchDetailsIndexRoute;
