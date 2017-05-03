var Post = Bb.Model.extend({

  defaults: {
    message: "msg",
    createdAt: new Date(),
    ownerId: null,
    groupId: null
  }
})

module.exports = Post