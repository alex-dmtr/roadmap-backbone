var models = require('./models')
var Router = require('./router')

var App = new Marionette.Application({
  onStart: function(options) {

    var router = new Router(options)

    /** Starts the URL handling framework */
    Backbone.history.start()
  }
})

App.start()