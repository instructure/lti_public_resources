import LtiApp from 'appkit/libs/lti-app';

var LtiAppsRoute = Ember.Route.extend({
  beforeModel: function(transition, params) {
    if (!Em.isEmpty(Em.ENV.TOOL_ID)) {
      var ltiApp = LtiApp.findOne(Em.ENV.TOOL_ID);
      this.transitionTo('ltiApp', ltiApp);
    }
  },

  model: function(params) {
    return LtiApp.find();
  }
});

export default LtiAppsRoute;

