var Group = Bb.Model.extend({
  // idAtribute: "_id",
  urlRoot: "https://localhost:3000/api/group/",
  defaults: {
    name: 'name',
    description: 'desc',
    avatarUrl: 'avatarUrl',
  },

  initialize() {

  }
})

module.exports = Group