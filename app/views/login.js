var Hbs = require('handlebars')
var Bb = require('backbone')
var Mn = require('backbone.marionette')
var template = require('../templates/login.hbs') 

var LoginView = Mn.View.extend({
  template: template(),


})

module.exports = LoginView