var Group = require('../models/group')
var config = require('../config');

var Groups = Bb.Collection.extend({
  url: config.urls.groups,
  model: Group
})

module.exports = Groups