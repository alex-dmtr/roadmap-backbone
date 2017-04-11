var NavView = require('./nav')
var LoginView = require('./login')
var RegisterView = require('./register')
var FlashView = require('./flash')
var HomeView = require('./home')
var ProfileView = require('./profile')
var LocalUser = require('../models/local.user')
var template = Handlebars.templates.layout
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
    this.user = new LocalUser()
    this.user.fetch()
    
    this.navView = new NavView({user: this.user})

    this.user.on('change', this.navView.render)
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
    $.post({
      url: `https://localhost:3000/api/auth`,
      data: { username: user.get('username'), password: user.get('password')},
      success: (data) =>  {

        this.user.set('id', data.user.id)
        this.user.set('username', data.user.username)
        this.user.set('jwt', data.jwt)

        this.user.save()

        this.onShowHome()
      },
      error: (err) => {
        this.triggerMethod('show:error', 'Username and password combination not recognised.')
      }
    })
  },

  onShowProfile: function() {
    if (this.user.get('jwt') == null) {
      return this.onShowHome()
    }

    this.profileView = new ProfileView({model:this.user})
    this.showChildView('mainRegion', this.profileView)
    Bb.history.navigate('profile')
  },
  onDoLogout: function() {
    this.user.destroy()
    this.user.unset('username')
    this.user.unset('jwt')
    this.user.unset('id')
    this.onShowHome()
    this.navView.render()
  }

})

module.exports = LayoutView