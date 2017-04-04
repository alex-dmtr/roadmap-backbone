var Handlebars = require('handlebars')
var Bb = require('backbone')
var Mn = require('backbone.marionette')
var template = require('../templates/register.hbs')

var Register = Mn.View.extend({
  // tagName: 'div',
  template: template()
})

module.exports = Register