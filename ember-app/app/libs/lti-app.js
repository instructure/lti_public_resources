import ajax from 'appkit/utils/ajax';

var LtiApp = Ember.Object.extend({
  toolId      : null,
  name        : null,
  toolType    : null,
  imageUrl    : null,
  description : null,

  imageSrc: function() {
    return Em.ENV.CONFIG.imagePath + '/' + this.get('imageUrl');
  }.property('imageUrl')
});

LtiApp.reopenClass({
  find: function() {
    var ltiApps = ajax(Em.ENV.CONFIG.host + '/api/lti_apps').then(
      function(result) {
        var ret = Em.A([]);
        for (var name in result.lti_apps) {
          ret.addObject(LtiApp.createFromData(result.lti_apps[name]));
        }
        return ret;
      }
    );
    return ltiApps;
  },

  findOne: function(toolId) {
    var ltiApp = ajax(Em.ENV.CONFIG.host + '/api/lti_apps/' + toolId).then(function(result) {
      return LtiApp.createFromData(result.lti_app);
    });
    return ltiApp;
  },

  createFromData: function(data) {
    return LtiApp.create({
      toolId      : data.tool_id,
      name        : data.name,
      toolType    : data.tool_type,
      imageUrl    : data.image_url,
      description : data.description
    });
  }
});

export default LtiApp;