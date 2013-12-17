import ajax from 'appkit/utils/ajax';

var Search = Ember.Object.extend({
  toolId: null,
  searchText: null,
  searchResults: null,

  ajaxData: function () {
    return {
      tool_id: this.get('toolId'),
      query: this.get('searchText')
    };
  }.property('toolId', 'searchText'),

  performRequest: function() {
    return ajax({
      type: 'POST',
      url: Em.ENV.CONFIG.host + '/api/search',
      data: this.get('ajaxData')
    });
  }
});

export default Search;
