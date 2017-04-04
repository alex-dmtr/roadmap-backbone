var Bb = require('backbone')

var Flash = Bb.Model.extend({
  defaults: {
    error: ''
  }
})

module.exports = Flash