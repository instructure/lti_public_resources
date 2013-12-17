import Search    from 'appkit/libs/search';
import Video     from 'appkit/libs/response_types/video';
import Folder    from 'appkit/libs/response_types/folder';
import Image     from 'appkit/libs/response_types/image';
import Quiz      from 'appkit/libs/response_types/quiz';
import Exercise  from 'appkit/libs/response_types/exercise';

var LtiAppSearchResultsController = Ember.ArrayController.extend({
  isLoaded     : true,
  nextCriteria : null,
  loadingMore  : false,
  targetRoute: 'ltiApp.search.details',

  showDashboard: function() {
    return Ember.isEmpty(Ember.ENV.TOOL_ID);
  }.property('Ember.ENV.TOOL_ID'),

  performSearch: function() {
    Ember.debug('performSearch: ' + this.get('searchText'));

    var _this = this;

    if (!Ember.isEmpty(this.get('searchText'))) {
      this.set('isLoaded', false);
      this.clear();

      var search = Search.create({
        toolId: this.get('ltiApp.toolId'),
        searchText: this.get('searchText')
      });

      search.performRequest().then(
        function(result) { // Success
          var results = Em.Object.create(result.driver_response);
          if (!Em.isEmpty(results.get('next_criteria'))) {
            results.set('next_criteria.tool_id', search.get('toolId'));
          }
          _this.parseResults(results);
          return _this.set('isLoaded', true);
        },
        function(e) { // Error
          Ember.debug('ERROR: ' + e);
          return _this.set('isLoaded', true);
        }
      );
    }
  },

  searchForText: function(txt) {
    this.set('searchText', txt);
    this.performSearch();
  },

  parseResults: function(results) {
    var _this = this;
    this.set('nextCriteria', results.get('next_criteria'));
    this.set('performedSearch', true);

    results.get('items').forEach(function(item) {
      var obj = null;
      switch (item.kind) {
        case 'video':
          obj = Video.createFromData(item);
          break;
        case 'folder':
          obj = Folder.createFromData(item);
          break;
        case 'image':
          obj = Image.createFromData(item);
          break;
        case 'quiz':
          obj = Quiz.createFromData(item);
          break;
        case 'exercise':
          obj = Exercise.createFromData(item);
          break;
      }
      if (obj) {
        _this.pushObject(obj);
      }
    });
  },

  actions: {
    showDetails: function(item) {
      this.transitionToRoute('ltiApp.search.details.index', item);
    },

    getMore: function() {
      if (!Ember.isEmpty(this.get('nextCriteria'))) {
        this.set('loadingMore', true);
        var url = Ember.ENV.CONFIG.host + '/api/search';
        var sc = this.get('nextCriteria');

        // REFACTOR!!!
        var _this = this;
        Em.$.post(url, sc).done(function(data) {
          var results;
          results = Ember.Object.create(data.driver_response);
          if (!Em.isEmpty(results.get('next_criteria'))) {
            results.set('next_criteria.tool_id', sc.tool_id);
          }
          _this.parseResults(results);
          _this.set('loadingMore', false);
        }).fail(function(e) {
          Ember.debug('Error: ' + e);
          return _this.set('loadingMore', false);
        });
      }
    }
  }
});

export default LtiAppSearchResultsController;
