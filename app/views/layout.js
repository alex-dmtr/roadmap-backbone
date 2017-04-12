var NavView = require('./nav')
var LoginView = require('./login')
var RegisterView = require('./register')
var FlashView = require('./flash')
var HomeView = require('./home')
var ProfileView = require('./profile')
var LocalUser = require('../models/local.user')
var template = Handlebars.templates.layout
var auth = require('../auth')

// var LocalStorage = require('backbone.localstorage')

var LayoutView = Mn.View.extend({
  regions: {
    navRegion: '#nav-region',
    mainRegion: '#main-region',
    flashRegion: '#flash-region'
  },

  template: template,

  childViewEvents: {
    'show:login': 'onShowLogin',
    'show:register': 'onShowRegister',
    'show:home': 'onShowHome',
    'do:login': 'onDoLogin',
    'do:logout': 'onDoLogout',
    'show:profile': 'onShowProfile'
  },



  onRender: function() {
    this.showChildView('navRegion', this.navView)    
    // this.triggerMethod('show:login')
  },

  initialize: function() {
    
    this.navView = new NavView()
  },

  onShowHome: function(args) {
    this.homeView = new HomeView()
  
    this.showChildView('mainRegion', this.homeView)
    Bb.history.navigate('')
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
  },

  onShowError: function(args) {
    this.flashView = new FlashView({error: args})

    // console.log(this.flashView.model.toJSON())

    this.showChildView('flashRegion', this.flashView)
    console.log(args)
  },

  onDoLogin: function(user) {
    auth.doLogin(user)
      .then(() => {
        this.onShowHome()
        this.navView.render()
      })
      .catch((err) => {

        var status = err.status

        if (status == 401)
          this.triggerMethod('show:error', "Username and password combination not recognised")
        else
          this.triggerMethod('show:error', "Server error")
      })
  },

  onShowProfile: function() {
    if (!auth.isAuthenticated()) {
      return this.onShowHome()
    }

    this.profileView = new ProfileView({model:auth.user})
    this.showChildView('mainRegion', this.profileView)
    Bb.history.navigate('profile')
  },
  onDoLogout: function() {
    auth.doLogout()
    this.onShowHome()
    this.navView.render()
  }

})

module.exports = LayoutView