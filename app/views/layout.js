var NavView = require('./nav')
var LoginView = require('./login')
var RegisterView = require('./register')
var FlashView = require('./flash')
var HomeView = require('./home')
var User = require('../models/user')
var template = require('../templates/layout.hbs')

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
    'do:login': 'onDoLogin'
  },


  onRender: function() {
    this.showChildView('navRegion', this.navView)    
    // this.triggerMethod('show:login')
  },

  initialize: function() {
    this.navView = new NavView()
    this.user = new User()
  },

  onShowHome: function(args) {
    this.homeView = new HomeView()
  
    this.showChildView('mainRegion', this.homeView)
    Bb.history.navigate('')
},

  onShowLogin: function(args) {
    this.loginView = new LoginView({model: this.user})

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

  onDoLogin: function(args) {
    $.post({
      url: `https://localhost:3000/api/auth`,
      data: { username: this.user.get('username'), password: this.user.get('password')},
      success: (data) =>  {
        alert(JSON.stringify(data))
      },
      error: (err) => {
        this.triggerMethod('show:error', 'Username and password combination not recognised.')
      }
    })
  }

})

module.exports = LayoutView