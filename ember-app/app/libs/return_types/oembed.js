import ReturnType from 'appkit/libs/return-type';

export default ReturnType.extend({
  returnType : 'oembed',
  url        : null,
  endpoint   : null,

  embedCode: function() {
    return this.get('url');
  }.property('url')
});
