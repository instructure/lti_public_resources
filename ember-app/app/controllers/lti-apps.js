var LtiAppsController = Ember.ArrayController.extend({
  searchText: '',

  filteredApps: function() {
    var searchText = this.get('searchText');
    if (Em.isEmpty(searchText)) {
      return this.get('content');
    } else {
      var apps = this.get('content').filter(function(item) {
        var name = item.get('name').toLowerCase();
        return name.match(searchText.toLowerCase());
      });
      return apps;
    }
  }.property('searchText')
});

export default LtiAppsController;
