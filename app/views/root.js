var Bb = require('backbone')
var Mn = require('backbone.marionette')

var RootView = Mn.View.extend({
  template: _.template('<h1>Hello world! Salut Sergiu</h1>')
})

module.exports = RootView