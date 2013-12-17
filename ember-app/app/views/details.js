var DetailsView = Ember.View.extend({
  templateNameBinding: 'hbsName',

  hbsName: function() {
    var resourceType = this.get('content.resourceType');
    return 'views/details-' + resourceType;
  }.property('content.resourceType')
});

export default DetailsView;
