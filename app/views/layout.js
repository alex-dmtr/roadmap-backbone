var Handlebars = require('handlebars')
var Bb = require('backbone')
var Mn = require('backbone.marionette')
var NavView = require('./nav')
var LoginView = require('./login')
var RegisterView = require('./register')
var template = require('../templates/layout.hbs')

var LayoutView = Mn.View.extend({
  regions: {
    navRegion: '#nav-region',
    mainRegion: '#main-region'
  },

  template: template,

  childViewEvents: {
    'show:login': 'onShowLogin',
    'show:register': 'onShowRegister'
  },


  onRender: function() {
    this.showChildView('navRegion', this.navView)    
    // this.triggerMethod('show:login')
  },

  initialize: function() {
    this.navView = new NavView()
  },

  onShowLogin: function(args) {
    this.loginView = new LoginView()

    this.showChildView('mainRegion', this.loginView)
    Bb.history.navigate('login')
  },

  onShowRegister: function(args) {
    this.registerView = new RegisterView()
    this.showChildView('mainRegion', this.registerView)
    Bb.history.navigate('register')
  }

})

module.exports = LayoutView