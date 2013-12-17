var LtiAppSearchIndexController = Ember.ArrayController.extend({
  showDashboard: function() {
    return Ember.isEmpty(Ember.ENV.TOOL_ID);
  }.property('Ember.ENV.TOOL_ID')
});

export default LtiAppSearchIndexController;
