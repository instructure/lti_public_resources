import ResponseType from 'appkit/libs/response-type';

var Folder = ResponseType.extend({
  resourceType : 'folder',
  isFolder     : true,
  id           : null,
  title        : null,
  description  : null,
  parentId     : null
});

Folder.reopenClass({
  createFromData: function(data) {
    var folder = Folder.create({
      id          : data.id,
      title       : data.title,
      description : data.description,
      parentId    : data.parent_id
    });
    return folder;
  }
});

export default Folder;
