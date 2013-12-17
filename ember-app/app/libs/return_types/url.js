import ReturnType from 'appkit/libs/return-type';

export default ReturnType.extend({
  returnType : 'url',
  url        : null,
  text       : null,
  title      : null,
  target     : null,

  embedCode: function() {
    return this.get('url');
  }.property('url')
});
