window.Bb = Backbone
window.Mn = Marionette = Backbone.Marionette
window.Hbs = Handlebars
if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}

// require('./templates')


var models = require('./models')
var Router = require('./router')
var Auth = require('./auth')
var Groups = require('./collections/groups')

var LayoutView = require('./views/layout')
var App =  Mn.Application.extend({
  region: '#app-hook',
  onStart: function() {
    this.auth = Auth
    this.groups = Groups
    // console.log(this.options.layoutView)

    /** Starts the URL handling framework */

    // this.showView(new RootView())
    // (new NavView()).render()

    var router = new Router(this.options)

    this.showView(this.options.layoutView)
    // (new NavView()).render()

  if (!Bb.history.started)
      Bb.history.start({pushState: true, root: "/"})
  },
})


var myApp = new App({
  layoutView:new LayoutView()
})

module.exports = myApp


// $.ajax({url: "https://localhost:3000/api/users", method: "GET", success: console.log, error: console.log})