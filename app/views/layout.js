var NavView = require('./nav')
var LoginView = require('./login')
var RegisterView = require('./register')
var FlashView = require('./flash')
var HomeView = require('./home')
var ProfileView = require('./profile')
var ProfileEditView = require('./profile.edit');
var LocalUser = require('../models/local.user')
var GroupView = require('./group')
var template = Handlebars.templates.layout
var User = require('../models/user');
var auth = require('../auth')
var Groups = require('../collections/groups')
var Group = require('../models/group')
var Flash = require('../flash');
var config = require('../config');

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
    this.showChildView('navRegion', this.navView);
    this.showChildView('flashRegion', new FlashView());
    // this.triggerMethod('show:login')
  },

  initialize() {

    this.navView = new NavView()
  },

  onShowHome(args) {
    if (auth.isAuthenticated()) {
      let groups = new Groups()
      groups.fetch().then(() => {

        this.homeView = new HomeView({
          collection: groups
        })


        this.showChildView('mainRegion', this.homeView)
        Bb.history.navigate('')
      })

    } else {
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

  // onShowError(args) {
  //   console.log("show error");
  //   this.flashView = new FlashView({
  //     error: args
  //   })

  //   // console.log(this.flashView.model.toJSON())

  //   this.showChildView('flashRegion', this.flashView)
  // },

  // onShowInfo(args) {
  //   console.log("show info");
  //   this.flashView = new FlashView({
  //     info: args
  //   })
  //   this.showChildView('flashRegion', this.flashView)

  // },

  onDoLogin(user) {
    auth.doLogin(user)
      .then(() => {
        this.onShowHome()
        this.navView.render()
      })
      .catch((err) => {

        var status = err.status


        if (status == 401)
          Flash.pushError("Username and password combination not recognised");
        else
          Flash.pushError("Server error");
      })
  },

  onShowProfile() {
    if (!auth.isAuthenticated()) {
      return this.onShowHome()
    }

    let user = new User();
    user.set('id', auth.user.get('id'));
    user.fetch()
      .then(() => {

        this.profileView = new ProfileView({
          model: user
        })
        this.showChildView('mainRegion', this.profileView)
        Bb.history.navigate('profile')
      })
  },

  onShowProfileEdit() {
    if (!auth.isAuthenticated())
      return this.onShowHome();

    let user = new User();
    user.set('id', auth.user.get('id'));
    user.fetch()
      .then(() => {
        this.showChildView('mainRegion', new ProfileEditView({
          model: user
        }));
        Bb.history.navigate('profile/edit');
      })

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
        this.onShowProfile();
        Flash.pushInfo(`Welcome, ${user.get('username')}!`);
        this.triggerMethod('show:profileEdit');
        this.navView.render();
      })
      .catch((error) => {
        Flash.pushError(error);
      })
  },

  onShowGroup(group) {
    if (!auth.isAuthenticated()) {
      return this.showHome()
    }

    let g = new Group({
      id: group
    })

    g.fetch()
      .then(() => {
        this.showChildView('mainRegion', new GroupView({
          model: g
        }))
        Bb.history.navigate(`groups/${group}`)
      })
      .catch((err) => {
        Flash.pushError(JSON.stringify(err));
        this.onShowHome()
      })
  },

  onDoJoinGroup(groupID) {
    if (!auth.isAuthenticated()) {
      return this.showHome()
    };

    $.ajax({
      url: config.urls.joinGroup(groupID, auth.user.get('id')),
      method: 'PUT',
      success: (data) => {
        console.log(data);

        Flash.pushInfo("Join successful!");
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