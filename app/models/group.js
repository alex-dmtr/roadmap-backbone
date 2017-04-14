var Group = Bb.Model.extend({
  // idAtribute: "_id",
  urlRoot: "https://localhost:3000/api/group/",
  defaults: {
    name: 'name',
    owner: null,
    description: 'desc',
    avatarUrl: 'avatarUrl',
    memberIds: []
  },

  initialize: function() {

  }
})

module.exports = Group