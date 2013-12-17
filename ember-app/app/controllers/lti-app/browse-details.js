var LtiAppBrowseDetailsController = Ember.ObjectController.extend({

  actions: {
    performSearch: function() {
      this.transitionToRoute('ltiApp.browse', { folderChain: this.get('folderChain') });
    }
  }
});

export default LtiAppBrowseDetailsController;
