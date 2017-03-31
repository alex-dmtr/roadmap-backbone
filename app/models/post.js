var Post = Backbone.Model.extend({
  idAttribute: "_id",
  defaults: {
    message: "msg",
    createdAt: new Date(),
    ownerId: null,
    groupId: null
  }
})

module.exports = Post