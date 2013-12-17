import ReturnType from 'appkit/libs/return-type';

export default ReturnType.extend({
  returnType : 'iframe',
  url        : null,
  title      : null,
  width      : null,
  height     : null,

  embedCode: function() {
    return '<iframe src="' + this.get('url') + '" width="' + this.get('width') + '" height="' + this.get('height') + '" title="' + this.get('title') + '" frameborder="0" allowfullscreen></iframe>';
  }.property('url', 'title', 'width', 'height')
});
