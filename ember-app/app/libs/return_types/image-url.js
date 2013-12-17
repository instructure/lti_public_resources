import ReturnType from 'appkit/libs/return-type';

export default ReturnType.extend({
  returnType : 'imageUrl',
  url        : null,
  title      : null,
  width      : null,
  height     : null,

  embedCode: function() {
    return this.get('url');
  }.property('url')
});
