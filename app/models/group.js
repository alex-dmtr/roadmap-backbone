const config = require('../config');
var Group = Bb.Model.extend({
  // idAtribute: "_id",
  urlRoot: config.urls.group(),
  defaults: {
    name: 'name',
    description: 'desc',
    avatarUrl: 'avatarUrl',
  },

  initialize() {

  }
})

module.exports = Group