import ReturnType from 'appkit/libs/return-type';

export default ReturnType.extend({
  returnType   : 'file',
  url          : null,
  text         : null,
  content_type : null,

  embedCode: function() {
    this.get('url');
  }.property('url')
});
