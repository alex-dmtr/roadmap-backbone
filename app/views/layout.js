var NavView = require('./nav')
var LoginView = require('./login')
var RegisterView = require('./register')
var FlashView = require('./flash')
var HomeView = require('./home')
var ProfileView = require('./profile')
var LocalUser = require('../models/local.user')
var GroupView = require('./group')
var template = Handlebars.templates.layout
var auth = require('../auth')
var Groups = require('../collections/groups')
var Group = require('../models/group')

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
    'do:register': 'onDoRegister',
    'show:profile': 'onShowProfile',
    'do:joingroup': 'onDoJoinGroup',
  },



  onRender() {
    this.showChildView('navRegion', this.navView)
    // this.triggerMethod('show:login')
  },

  initialize() {

    this.navView = new NavView()
  },

  onShowHome(args) {
    if (auth.isAuthenticated()) {
      let groups = new Groups()
      groups.fetch().then(() => {

        this.homeView = new HomeView({collection: groups})


        this.showChildView('mainRegion', this.homeView)
        Bb.history.navigate('')
      })

    }
    else {
      this.homeView = new HomeView()
      this.showChildView('mainRegion', this.homeView)
      Bb.history.navigate('')
    }

  },

  onShowLogin(args) {
    this.loginView = new LoginView()

    this.showChildView('mainRegion', this.loginView)
    Bb.history.navigate('login')
  },

  onShowRegister(args) {
    this.registerView = new RegisterView()
    this.showChildView('mainRegion', this.registerView)
    Bb.history.navigate('register')
  },

  onShowError(args) {
    this.flashView = new FlashView({error: args})

    // console.log(this.flashView.model.toJSON())

    this.showChildView('flashRegion', this.flashView)
  },

  onShowInfo(args) {
    this.flashView = new FlashView({info: args})
    this.showChildView('flashRegion', this.flashView)

  },

  onDoLogin(user) {
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

  onShowProfile() {
    if (!auth.isAuthenticated()) {
      return this.onShowHome()
    }

    this.profileView = new ProfileView({model:auth.user})
    this.showChildView('mainRegion', this.profileView)
    Bb.history.navigate('profile')
  },
  onDoLogout() {
    auth.doLogout()
    this.onShowHome()
    this.navView.render()
  },

  onDoRegister(user) {
    auth.doRegister(user)
      .then(() => {
        return auth.doLogin(user)
      })
      .then(() => {
        this.onShowHome()
        this.triggerMethod('show:info', `Welcome, ${user.get('username')}!`)
        this.navView.render()
      })
      .catch((error) => {
        this.triggerMethod('show:error', error)
      })
  },

  onShowGroup(group) {
    if (!auth.isAuthenticated()) {
      return this.showHome()
    }

    let g = new Group({id: group})

    g.fetch()
    .then(() => {
      this.showChildView('mainRegion', new GroupView({model: g}))
      Bb.history.navigate(`groups/${group}`)
    })
    .catch((err) => {
      this.triggerMethod('show:error', JSON.stringify(err))
      this.onShowHome()
    })
  },

  onDoJoinGroup(group) {
    if (!auth.isAuthenticated()) {
      return this.showHome()
    };

    $.ajax({
      url: `https://localhost:3000/api/group/${group}/add/${auth.user.get('id')}`,
      method: 'PUT',
      success: (data) => {
        console.log(data);

        this.triggerMethod('show:info', "Join successful!");
        this.onShowHome();
      },
      error: (err) => {
        console.log(err);
      }
    })
    // console.log($(args).data("group"))
  }

})

module.exports = LayoutView
