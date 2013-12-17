var LiItemView = Ember.View.extend({
  tagName: 'li',
  classNames: 'list-item media',
  templateNameBinding: 'hbsName',

  hbsName: function() {
    var resourceType = this.get('item.resourceType');
    return 'views/li-' + resourceType;
  }.property('content.resourceType')
});

export default LiItemView;
