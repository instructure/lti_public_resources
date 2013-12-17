import ResponseType from 'appkit/libs/response-type';

var Quiz = ResponseType.extend({
  resourceType : 'quiz',
  id           : null,
  title        : null,
  description  : null,
  thumbnailUrl : null,
  url          : null,
  termCount    : null,
  createdDate  : null,
  hasImages    : null,
  subjects     : null,
  isQuiz       : true,

  embedHref: function() {
    var iframe = this.get('returnTypes').findProperty('return_type', 'iframe');
    return '<iframe src="' + iframe.url + '" width="' + iframe.width + '" height="' + iframe.height + '" title="' + iframe.title + '" allowfullscreen="allowfullscreen" frameborder="0"></iframe>';
  }.property('returnTypes.@each'),

  init: function() {
    this._super();
    return this.set('subjects', Em.A([]));
  }
});

Quiz.reopenClass({
  createFromData: function(data) {
    var quiz,
      _this = this;
    quiz = Quiz.create({
      id           : data.id,
      title        : data.title,
      description  : data.description,
      thumbnailUrl : data.thumbnail_url,
      url          : data.url,
      termCount    : data.term_count,
      createdDate  : data.created_date,
      hasImages    : data.has_images
    });
    data.subjects.forEach(function(subject) {
      quiz.get('subjects').pushObject(subject);
    });
    quiz.addReturnTypes(data.return_types);
    return quiz;
  }
});

export default Quiz;
