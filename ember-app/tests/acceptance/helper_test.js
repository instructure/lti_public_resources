var App;

module('Acceptances - Helper', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('helper output is rendered', function(){
  expect(5);

  visit('/helper-test').then(function(){
    ok(find("ul#seconds-to-time li.test-1 span.actual:contains('02:30')").length, "150 should become 02:30");
    ok(find("ul#seconds-to-time li.test-2 span.actual:contains('00:00')").length, "0 should become 00:00");
    ok(find("ul#seconds-to-time li.test-3 span.actual:contains('27:46:39')").length, "99999 should become 27:46:39");
    ok(find("ul#truncate-text li.test-1 span.actual:contains('abcdefg…')").length, "abcdefghijklmnopqrstuvwxyz should become abcdefg…");
    ok(find("ul#truncate-text li.test-2 span.actual:contains('abcdefghijklmnopqrstuvwxyz')").length, "abcdefghijklmnopqrstuvwxyz should become abcdefghijklmnopqrstuvwxyz");
  });
});