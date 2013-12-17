import ReturnTypeUrl      from 'appkit/libs/return_types/url';
import ReturnTypeIframe   from 'appkit/libs/return_types/iframe';
import ReturnTypeImageUrl from 'appkit/libs/return_types/image-url';
import ReturnTypeOembed   from 'appkit/libs/return_types/oembed';
import ReturnTypeFile     from 'appkit/libs/return_types/file';
import Jsonable           from 'appkit/mixins/jsonable';

export default Ember.Object.extend(Jsonable, {
  returnTypes : null,
  isFolder    : false,
  isExercise  : false,
  isImage     : false,
  isQuiz      : false,
  isVideo     : false,

  isUnknownResourceType: function() {
    return (( this.get('isFolder') &&
      this.get('isExercise') &&
      this.get('isImage') &&
      this.get('isQuiz') &&
      this.get('isVideo') ) === false);
  }.property('returnType'),

  init: function () {
    this._super();
    this.set('returnTypes', Em.A([]));
  },

  addReturnTypes: function(rts) {
    var _this = this;
    rts.forEach(function(rt) {
      switch (rt.return_type) {
        case 'url':
          return _this.get('returnTypes').pushObject(ReturnTypeUrl.create(rt));
        case 'iframe':
          return _this.get('returnTypes').pushObject(ReturnTypeIframe.create(rt));
        case 'image_url':
          return _this.get('returnTypes').pushObject(ReturnTypeImageUrl.create(rt));
        case 'oembed':
          return _this.get('returnTypes').pushObject(ReturnTypeOembed.create(rt));
        case 'file':
          return _this.get('returnTypes').pushObject(ReturnTypeFile.create(rt));
      }
    });
  }
});
