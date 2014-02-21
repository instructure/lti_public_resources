import ReturnTypeUrl from 'appkit/libs/return-type';

export default ReturnTypeUrl.extend({

  init: function() {
    this._super();
    this.set('return_type', 'lti_launch_url');
  },

  returnType: 'ltiLaunchUrl',
  displayReturnType: 'LTI Launch'
});
