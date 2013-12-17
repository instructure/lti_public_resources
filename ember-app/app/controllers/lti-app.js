var LtiAppController = Ember.ObjectController.extend({
  returnType: null,

  triggerModal: function(returnType) {
    this.set('returnType', returnType);
    Em.$('#embed-modal').modal('show'); // Code Stink!
  }
});

export default LtiAppController;
