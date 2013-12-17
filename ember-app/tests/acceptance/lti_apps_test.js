/* global ic */

var App;

module('Acceptances - LtiApps', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

ic.ajax.defineFixture('/api/lti_apps', {
  response: {
    'lti_apps': {
      'youtube': {
        'name': 'YouTube',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'tool_id': 'youtube',
        'tool_type': 'search',
        'icon_path': '/assets/images/youtube_icon.png',
        'image_url': '/assets/images/youtube_banner.png',
        'id': 1
      },
      'vimeo': {
        'name': 'Vimeo',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'tool_id': 'vimeo',
        'tool_type': 'search',
        'icon_path': '/assets/images/vimeo_icon.png',
        'image_url': '/assets/images/vimeo_banner.png',
        'id': 2
      },
      'schooltube': {
        'name': 'SchoolTube',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'tool_id': 'schooltube',
        'tool_type': 'search',
        'icon_path': '/assets/images/schooltube_icon.png',
        'image_url': '/assets/images/schooltube_banner.png',
        'id': 3
      },
      'khan_academy': {
        'name': 'Khan Academy',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'tool_id': 'khan_academy',
        'tool_type': 'browse',
        'icon_path': '/assets/images/khan_academy_icon.png',
        'image_url': '/assets/images/khan_academy_banner.png',
        'id': 4
      },
      'quizlet': {
        'name': 'Quizlet',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'tool_id': 'quizlet',
        'tool_type': 'search',
        'icon_path': '/assets/images/quizlet_icon.png',
        'image_url': '/assets/images/quizlet_banner.png',
        'id': 5
      }
    }
  },
  jqXHR: {},
  textStatus: 'success'
});

test('ltiApps renders', function(){
  expect(2);
  visit('/').then(function(){
    var list = find('ul li h4 a');
    equal(list.length, 5);
    equal(list.text(), 'YouTubeVimeoSchoolTubeKhan AcademyQuizlet');
  });
});

test('ltiApps filters results', function(){
  expect(1);
  visit('/').then(function(){
    fillIn('.search', 'tube');
    var list = find('ul li h4 a');
    equal(list.length, 2);
  });
});