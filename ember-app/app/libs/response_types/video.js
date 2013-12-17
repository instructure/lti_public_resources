/* global moment */
import ResponseType from 'appkit/libs/response-type';

var Video = ResponseType.extend({
  resourceType : 'video',
  id           : null,
  title        : null,
  description  : null,
  thumbnailUrl : null,
  url          : null,
  embedUrl     : null,
  duration     : null,
  numViews     : null,
  width        : null,
  height       : null,
  username     : null,
  numLikes     : null,
  numComments  : null,
  createdDate  : null,
  isVideo      : true,

  shortDescription: function() {
    var desc = this.get('description');
    var len = 150;
    if (desc.length < len) {
      return desc;
    } else {
      return desc.substring(0, len - 4) + ' ...';
    }
  }.property('description'),

  addedTimeAgo: function() {
    return moment(this.get('createdDate')).fromNow();
  }.property('createdDate'),

  embedHtml: function() {
    var src;
    src = '<iframe src="' + this.get('embedUrl') + '" width="' + this.get('width') + '" height="' + this.get('height') + '" title="' + this.get('title') + '" frameborder="0" allowfullscreen></iframe>';
    return src;
  }.property('title', 'url', 'width', 'height')
});

Video.reopenClass({
  createFromData: function(data) {
    var video = Video.create({
      id           : data.id,
      title        : data.title,
      description  : data.description,
      thumbnailUrl : data.thumbnail_url,
      url          : data.url,
      embedUrl     : data.embed_url,
      duration     : data.duration,
      numViews     : data.num_views,
      width        : data.width,
      height       : data.height,
      username     : data.username,
      numLikes     : data.num_likes,
      numComments  : data.num_comments,
      createdDate  : data.created_date
    });
    video.addReturnTypes(data.return_types);
    return video;
  }
});

export default Video;
