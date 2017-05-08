var template = Hbs.templates.group;
var auth = require('../auth');
var Post = require('../models/post');
var Group = require('../models/group');
var flash = require('../flash');
var config = require('../config');

var GroupView = Mn.View.extend({
  template,

  initialize() {
    // selectedPost ID
    this.selectedPost = null;
  },
  serializeData() {
    var data = this.model.toJSON();

    data["canEdit"] = (auth.user.get('id') === data.owner.id);
    // console.log(auth.user.get('id'), group.owner);

    // alert("fuck");

    data.posts = data.posts.map(post => {
      post["canEdit"] = (auth.user.get('id') === post.owner.id);
      post["message"] = post["message"].trim();

      return post;
    });
    return data;
  },

  /**
   * Sets a post "Edit Mode" visibility.
   *
   * @param {Number} postID The post's ID.
   * @param {Boolean} visible If the post should be in edit mode.
   */
  setPostEditVisible(postID, visible) {
    let $post = $(`#post${postID}`);

    let $postView = $post.children(".post-view");
    let $postEdit = $post.children(".post-edit");

    if (visible) {
      $postView.hide();
      $postEdit.show();
    } else {
      $postView.show();
      $postEdit.hide();
    }
  },



  events: {
    'click .edit-post' (dom) {
      let link = dom.target;
      let $post = $(link).parent().parent();
      let postID = $post.data("post");

      if (this.selectedPost) {
        this.setPostEditVisible(this.selectedPost, false);
      }

      if (postID !== this.selectedPost) {

        this.selectedPost = postID;
        this.setPostEditVisible(postID, true);
      } else {
        this.selectedPost = null;
      }

    },
    'click .save-post' (dom) {
      let button = dom.target;
      let $post = $(button).parent().parent();
      let postID = $post.data("post");
      let $messageBox = $post.find(".post-message");

      var newPost = new Post();

      var postData = {
        message: $messageBox.val(),
        ownerId: auth.user.get('id'),
        groupId: this.model.get('id'),
        id: postID
      };

      newPost.set('id', postID);

      newPost.save(postData, {
          url: config.urls.groupPost(postData.groupId, postID)
        }).then(() => {
          return this.model.fetch();
        }).then(() => {
          return this.render();
        })
        .then(() => {
          this.setPostEditVisible(postID, false);
          this.selectedPost = null;
        })
        .catch(err => {
          flash.pushError("Error saving post");
        })
    },
    'click .cancel-post' (dom) {
      let button = dom.target;
      let $post = $(button).parent().parent();
      let postID = $post.data("post");

      this.setPostEditVisible(postID, false);
      if (this.selectedPost === postID)
        this.selectedPost = null;
    },
    'click .delete-post' (dom) {
      let button = dom.target;
      let $post = $(button).parent().parent();
      let postID = $post.data("post");

      let newPost = new Post();
      newPost.set('id', postID);
      let groupID = this.model.get('id');

      newPost.destroy({
          url: config.urls.groupPost(groupID, postID)
        })
        // for some reason, this errors out. ?!?
        .catch(err => {
          // flash.pushError("Error deleting post");
          console.error(err);
        })
        .then(() => {
          this.selectedPost = null;
          this.setPostEditVisible(postID, false);
          return this.model.fetch();
        })
        .then(() => {
          return this.render();
        })
    },
    'click #add-post' () {
      var post = {
        message: $("#post-message").val(),
        ownerId: auth.user.get('id'),
        groupId: this.model.get('id')
      }

      var newPost = new Post();

      newPost.save(post, {
          url: config.urls.groupPosts(post.groupId)
        }).then(() => {
          return this.model.fetch();
        })
        .then(() => {
          this.render();
        })
        .catch(err => {
          flash.pushError("Error adding post");
        })
    },
    'click #groupSubmit' () {
      const data = {
        id: this.model.get('id'),
        name: $("#groupName").val(),
        description: $("#groupDescription").val(),
        avatarUrl: $("#groupAvatarUrl").val()
      };

      let newGroup = new Group();
      newGroup.set('id', data.id);

      newGroup.save(data, {
          url: config.urls.groupById(this.model.id)
        }).then(() => {
          return this.model.fetch();
        })
        .then(() => {
          flash.pushInfo("Group saved succesfully");
          return this.render();
        })
        .catch(err => {
          console.error(err);
          flash.pushError("Error saving group");
        });
    },
    'click #groupDelete' () {
      let newGroup = new Group();
      newGroup.set('id', this.model.id);

      newGroup.destroy({
        url: config.urls.groupById(this.model.id)
      }).then(() => {
        this.triggerMethod('show:home');
        flash.pushInfo('Delete succesful');
      }).catch(err => {
        flash.pushError('Error deleting group');
      })
    },
    'click #leave-group' () {
      let userID = auth.user.get('id');
      let groupID = this.model.get('id');


      let model = new Bb.Model();
      model.set('id', userID);

      model.destroy({
          url: config.urls.groupRemoveMember(groupID, userID)
        })
        .then(() => {
          this.triggerMethod('show:home');
          flash.pushInfo("You've left the group");
        })
        .catch(err => {
          flash.pushError("Error leaving group");
        })
    }
  }
})

module.exports = GroupView