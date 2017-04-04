var Handlebars = require('handlebars')
var Bb = require('backbone')
var Mn = require('backbone.marionette')
var NavView = require('./nav')
var LoginView = require('./login')
var template = require('../templates/layout.hbs')

var LayoutView = Mn.View.extend({
  regions: {
    navRegion: '#nav-region',
    mainRegion: '#main-region'
  },

  template: template,

  // onShowIndex: function() {
  //   console.log('at index')
    
  //   this.showChildView('layout', new index())
  //   Bb.history.navigate('/')
  // },

  // onShowRegister: function() {
  //   this.showChildView('layout', new register())
  //   Bb.history.navigate('register/')
  // },

  onShowLogin: function() {
    this.showChildView('mainRegion', new LoginView())
  },

  onShowRegister: function() {
    alert('register!')
  },

  onRender: function() {
    this.showChildView('navRegion', this.navView)    
    // this.triggerMethod('show:login')
  },

  initialize: function() {
    this.navView = new NavView()

    this.navView.on("show:login", function(args) {
      alert('login!')
    })

    this.navView.on("show:register", function(args) {
      alert('register!')
    })
  }

})

module.exports = LayoutView