import Browsable from 'appkit/libs/browsable';

var LtiAppBrowseController = Ember.ObjectController.extend({
  isLoaded : true,
  targetRoute: 'ltiApp.browseDetails',

  showDashboard: function() {
    return Ember.isEmpty(Ember.ENV.TOOL_ID);
  }.property('Ember.ENV.TOOL_ID'),

  parentFolderChain: function() {
    if (this.get('folderChain') === 'root') {
      return null;
    } else {
      return this.get('folderChain').split('.').slice(0, -1).join('.');
    }
  }.property('folderChain'),

  parentFolder: function() {
    if (this.get('folderChain') === 'root') {
      return null;
    } else {
      return this.get('folderChain').split('.').pop();
    }
  }.property('folderChain'),

  currentFolder: function() {
    return this.get('folderChain').split('.').pop();
  }.property('folderChain'),

  loadData: function() {
    this.set('isLoaded', false);
    var browsable = Browsable.findFolder(
      this.get('ltiApp.toolId'),
      this.get('currentFolder'),
      this.get('parentFolderChain')
    );
    this.set('isLoaded', true);
    this.set('folders', browsable.get('folders'));
    this.set('items', browsable.get('items'));
  }.observes('folderChain'),

  isEmptyResults: function() {
    return (Em.isEmpty(this.get('items')) && Em.isEmpty(this.get('folders')));
  }.property('items.@each', 'folders.@each'),

  actions: {
    goToFolder: function(folder) {
      var newFolderChain = this.get('folderChain') + '.' + folder.id;
      this.transitionToRoute('ltiApp.browse', { folderChain: newFolderChain });
    },

    goUpFolder: function() {
      var newFolderChain = this.get('parentFolderChain');
      this.transitionToRoute('ltiApp.browse', { folderChain: newFolderChain });
    },

    goToItem: function(item) {
      this.transitionToRoute('ltiApp.browseDetails', { folderChain: this.get('folderChain'), item: item });
    }
  }
});

export default LtiAppBrowseController;
