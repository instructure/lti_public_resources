import ajax      from 'appkit/utils/ajax';
import Video     from 'appkit/libs/response_types/video';
import Folder    from 'appkit/libs/response_types/folder';
import Image     from 'appkit/libs/response_types/image';
import Quiz      from 'appkit/libs/response_types/quiz';
import Exercise  from 'appkit/libs/response_types/exercise';

var Browsable = Ember.Object.extend({
  folders : null,
  items   : null,

  init: function() {
    this._super();
    this.set('folders', Em.A([]));
    this.set('items', Em.A([]));
  }
});

Browsable.reopenClass({
  findFolder: function(toolId, folder, parentFolderChain) {
    var browsable, folderChain, url;
    url = Ember.ENV.CONFIG.host + '/api/browse';
    browsable = Browsable.create({});
    folderChain = parentFolderChain + '.' + folder;

    return ajax({
      type: 'POST',
      url: url,
      dataType: 'json',
      data: {
        folder: folder,
        tool_id: toolId
      }
    }).then(function(data) {
      var items = data.driver_response.items;

      items.forEach(function(item) {
        var obj;
        obj = null;
        switch (item.kind) {
          case 'folder':
            obj = Folder.createFromData(item);
            browsable.get('folders').pushObject(obj);
            break;
          case 'video':
            obj = Video.createFromData(item);
            obj.set('folderChain', folderChain);
            browsable.get('items').pushObject(obj);
            break;
          case 'image':
            obj = Image.createFromData(item);
            obj.set('folderChain', folderChain);
            browsable.get('items').pushObject(obj);
            break;
          case 'quiz':
            obj = Quiz.createFromData(item);
            obj.set('folderChain', folderChain);
            browsable.get('items').pushObject(obj);
            break;
          default:
            Em.debug('UNKNOWN KIND: ' + item.kind);
        }
      });

      return new Ember.RSVP.Promise(function(resolve, reject) {
        resolve(browsable);
        reject(browsable);
      });

    }, function(err) {
      Ember.debug('Error: ' + err);
      return new Ember.RSVP.Promise(function(resolve, reject) {
        resolve(browsable);
        reject(err);
      });
    });
  }
});

export default Browsable;
