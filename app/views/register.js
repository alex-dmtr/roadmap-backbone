var Handlebars = require('handlebars')
var Bb = require('backbone')
var Mn = require('backbone.marionette')

var Register = Mn.View.extend({
  // tagName: 'div',
  template: Handlebars.compile("Hello register!")
})

module.exports = Register