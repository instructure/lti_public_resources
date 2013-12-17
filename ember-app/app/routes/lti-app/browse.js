var LtiAppBrowseRoute = Ember.Route.extend({
  model: function(params) {
    return { folderChain: params.folderChain || 'root' };
  },

  setupController: function(controller, model) {
    var m = Ember.Object.create({
      ltiApp      : this.modelFor('ltiApp'),
      folderChain : (model.folderChain || 'root'),
      folders     : Em.A([]),
      items       : Em.A([])
    });
    controller.set('model', m);
  }
});

export default LtiAppBrowseRoute;
