var AEmbedItemView = Ember.View.extend({
  tagName: 'a',
  classNames: ['btn btn-xs btn-default'],
  classNameBindings: ['returnType.returnType'],
  attributeBindings: ['title', 'toggle:data-toggle'],
  toggle: 'tooltip',
  templateName: 'views/a-embed-item',
  
  title: function() {
    return this.get('returnType.text');
  }.property('returnType.returnType'),

  iconClass: function() {
    switch (this.get('returnType.returnType')) {
      case 'file':
        return 'fa fa-file-text';
      case 'iframe':
        return 'fa fa-arrow-circle-o-down';
      case 'imageUrl':
        return 'fa fa-picture-o';
      case 'oembed':
        return 'fa fa-dot-circle-o';
      case 'url':
        return 'fa fa-link';
      default:
        return 'fa fa-caret-square-o-right';
    }
  }.property('returnType.returnType'),

  applyTooltip: function() {
    if (!!this.get('showTooltip')) {
      this.$().tooltip();
    }
  }.on('didInsertElement'),

  click: function(evt) {
    this.get('controller').send('embedItem', this.get('returnType'), this.get('item'));
  }
});

export default AEmbedItemView;
