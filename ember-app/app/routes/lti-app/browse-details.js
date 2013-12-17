var LtiAppBrowseDetailsRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', model);
  },

  serialize: function(model) {
    return { folderChain: model.folderChain, item: model.id };
  }
});

export default LtiAppBrowseDetailsRoute;
