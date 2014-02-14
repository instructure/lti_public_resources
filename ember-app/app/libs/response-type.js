import ReturnTypeUrl      from 'appkit/libs/return_types/url';
import ReturnTypeIframe   from 'appkit/libs/return_types/iframe';
import ReturnTypeImageUrl from 'appkit/libs/return_types/image-url';
import ReturnTypeOembed   from 'appkit/libs/return_types/oembed';
import ReturnTypeFile     from 'appkit/libs/return_types/file';
import ReturnTypeLtiLaunchUrl from 'appkit/libs/return_types/lti-launch-url';
import Jsonable           from 'appkit/mixins/jsonable';

export default Ember.Object.extend(Jsonable, {
  returnTypes : null,
  isFolder    : false,
  isExercise  : false,
  isImage     : false,
  isQuiz      : false,
  isVideo     : false,
  isLtiLaunchUrl : false,

  isUnknownResourceType: function() {
    return (( this.get('isFolder') &&
      this.get('isLtiLaunchUrl') &&
      this.get('isExercise') &&
      this.get('isImage') &&
      this.get('isQuiz') &&
      this.get('isVideo') ) === false);
  }.property('returnType'),

  init: function () {
    this._super();
    this.set('returnTypes', Em.A([]));
  },

  returnableReturnTypes: function() {
    var returnables = this.get('returnTypes').filterBy('returnable', true);
    if (returnables.length > 0) {
      return returnables;
    } else {
      return this.get('returnTypes');
    }
  }.property('returnTypes'),

  addReturnTypes: function(rts) {
    var _this = this,
        ret = null,
        acceptLtiLaunchUrl = Em.ENV.RETURN_TYPES.contains('lti_launch_url');

    rts.forEach(function(rt) {
      switch (rt.return_type) {
        case 'url':
          ret = ReturnTypeUrl.create(rt);
          if (Em.ENV.RETURN_TYPES.contains('url')) {
            ret.set('returnable', true);
          } else if (acceptLtiLaunchUrl) {
            ret = ReturnTypeLtiLaunchUrl.create(rt);
            ret.set('returnable', true);
          }
          _this.get('returnTypes').pushObject(ret);
          break;
        case 'iframe':
          ret = ReturnTypeIframe.create(rt);
          if (Em.ENV.RETURN_TYPES.contains('iframe')) {
            ret.set('returnable', true);
          }
          _this.get('returnTypes').pushObject(ret);
          break;
        case 'image_url':
          ret = ReturnTypeImageUrl.create(rt);
          if (Em.ENV.RETURN_TYPES.contains('image_url')) {
            ret.set('returnable', true);
          }
          _this.get('returnTypes').pushObject(ret);
          break;
        case 'oembed':
          ret = ReturnTypeOembed.create(rt);
          if (Em.ENV.RETURN_TYPES.contains('oembed')) {
            ret.set('returnable', true);
          }
          _this.get('returnTypes').pushObject(ret);
          break;
        case 'file':
          ret = ReturnTypeFile.create(rt);
          if (Em.ENV.RETURN_TYPES.contains('file')) {
            ret.set('returnable', true);
          }
          _this.get('returnTypes').pushObject(ret);
          break;
      }
    });
  }
});
