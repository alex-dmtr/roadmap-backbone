var template = Hbs.templates.group;
var auth = require('../auth');
var Post = require('../models/post');
var flash = require('../flash');

var GroupView = Mn.View.extend({
  template,

  events: {
    'click #add-post' () {
      var post = {
        message: $("#post-message").val(),
        ownerId: auth.user.get('id'),
        groupId: this.model.get('id')
      }

      var newPost = new Post();

      newPost.save(post, {
          url: `https://localhost:3000/api/group/${post.groupId}/post`
        }).then(() => {
          return this.model.fetch();
        })
        .then(() => {
          this.render();
        })
        .catch(err => {
          flash.pushError("Error adding post");
        })
    }
  }
})

module.exports = GroupView