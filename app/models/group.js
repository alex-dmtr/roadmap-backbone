var Group = Bb.Model.extend({
  // idAtribute: "_id",
  urlRoot: "https://localhost:3000/api/group/",
  defaults: {
    name: 'name',
    owner: null,
    members: null,
    description: 'desc',
    avatarUrl: 'avatarUrl',
  },

  initialize() {

  }
})

module.exports = Group