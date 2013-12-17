var LtiAppSearchView = Ember.View.extend({
  willDestroyElement: function() {
    this.get('controller').get('searchResults').clear();
    this.get('controller').set('searchText', null);
  }
});

export default LtiAppSearchView;
