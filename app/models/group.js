var Bb = require('backbone')

var Group = Bb.Model.extend({
  idAtribute: "_id",
  defaults: {
    name: 'name',
    ownerId: null,
    description: 'desc',
    avatarUrl: 'avatarUrl',
    memberIds: []
  },

  initialize: function() {

  }
})

module.exports = Group