const config = require('../config');

var User = Bb.Model.extend({
  urlRoot: config.urls.users()
})

module.exports = User;