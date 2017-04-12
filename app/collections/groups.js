var Group = require('../models/group')
var Groups = Bb.Collection.extend({
  url: "https://localhost:3000/api/groups",
  model: Group
})

module.exports = Groups
