var _ = require('underscore')
window._ = _
var Bb = require('backbone')
var Mn = require('backbone.marionette')

if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}




var models = require('./models')
var Router = require('./router')

// var RootView = require('./views/root')
// var NavView = require('./views/nav')

var LayoutView = require('./views/layout')
var App =  Mn.Application.extend({
  region: '#app-hook',
  onStart: function(options) {

    // var router = new Router(options)

    /** Starts the URL handling framework */
    Bb.history.start()

    // this.showView(new RootView())
    // (new NavView()).render()
    this.showView(new LayoutView())

    // (new NavView()).render()
  }
})


var myApp = new App()
myApp.start()


// $.ajax({url: "https://localhost:3000/api/users", method: "GET", success: console.log, error: console.log})