var Group = Bb.Model.extend({
  // idAtribute: "_id",
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