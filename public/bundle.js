(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"D:\\home\\coding\\roadmap-backbone\\app\\app.js":[function(require,module,exports){
'use strict';

window.Bb = Backbone;
window.Mn = Marionette = Backbone.Marionette;
window.Hbs = Handlebars;
if (window.__agent) {
    window.__agent.start(Backbone, Marionette);
}

// require('./templates')


var models = require('./models');
var Router = require('./router');
var Auth = require('./auth');
var Groups = require('./collections/groups');

var LayoutView = require('./views/layout');
var App = Mn.Application.extend({
    region: '#app-hook',
    onStart: function onStart() {
        this.auth = Auth;
        this.groups = Groups;
        // console.log(this.options.layoutView)

        /** Starts the URL handling framework */

        // this.showView(new RootView())
        // (new NavView()).render()

        var router = new Router(this.options);

        this.showView(this.options.layoutView);
        // (new NavView()).render()

        if (!Bb.history.started) Bb.history.start({ pushState: true, root: "/" });
    }
});

var myApp = new App({
    layoutView: new LayoutView()
});

module.exports = myApp;

// $.ajax({url: "https://localhost:3000/api/users", method: "GET", success: console.log, error: console.log})

},{"./auth":"D:\\home\\coding\\roadmap-backbone\\app\\auth.js","./collections/groups":"D:\\home\\coding\\roadmap-backbone\\app\\collections\\groups.js","./models":"D:\\home\\coding\\roadmap-backbone\\app\\models\\index.js","./router":"D:\\home\\coding\\roadmap-backbone\\app\\router.js","./views/layout":"D:\\home\\coding\\roadmap-backbone\\app\\views\\layout.js"}],"D:\\home\\coding\\roadmap-backbone\\app\\auth.js":[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalUser = require('./models/local.user');

var AuthClass = function () {
  function AuthClass() {
    _classCallCheck(this, AuthClass);

    this.user = new LocalUser();
    this.user.fetch();
  }

  _createClass(AuthClass, [{
    key: 'getToken',
    value: function getToken() {
      if (!this.isAuthenticated()) return null;

      return this.user.get('jwt');
    }
  }, {
    key: 'isAuthenticated',
    value: function isAuthenticated() {
      return this.user && this.user.get('is_auth');
    }
  }, {
    key: 'doLogin',
    value: function doLogin(user) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        console.log(user.toJSON());
        $.post({
          url: 'https://localhost:3000/api/auth',
          data: { username: user.get('username'), password: user.get('password') },
          success: function success(data) {

            _this.user.set('id', data.user.id);
            _this.user.set('username', data.user.username);
            _this.user.set('jwt', data.jwt);
            _this.user.set('is_auth', true);

            _this.user.save();

            resolve(_this.user);
          },
          error: function error(err) {

            reject(err);
          }
        });
      });
    }
  }, {
    key: 'doLogout',
    value: function doLogout() {
      this.user.destroy();
      this.user.unset('username');
      this.user.unset('jwt');
      this.user.unset('id');
    }
  }, {
    key: 'doRegister',
    value: function doRegister(user) {
      return new Promise(function (resolve, reject) {
        $.post({
          url: 'https://localhost:3000/api/users',
          data: {
            username: user.get('username'),
            password: user.get('password'),
            email: user.get('email')
          },
          success: function success() {
            resolve();
          },
          error: function error(err) {
            reject(err);
          }
        });
      });
    }
  }]);

  return AuthClass;
}();

var Auth = new AuthClass();

module.exports = Auth;

},{"./models/local.user":"D:\\home\\coding\\roadmap-backbone\\app\\models\\local.user.js"}],"D:\\home\\coding\\roadmap-backbone\\app\\collections\\groups.js":[function(require,module,exports){
"use strict";

var Group = require('../models/group');
var Groups = Bb.Collection.extend({
  url: "https://localhost:3000/api/groups",
  model: Group
});

module.exports = Groups;

},{"../models/group":"D:\\home\\coding\\roadmap-backbone\\app\\models\\group.js"}],"D:\\home\\coding\\roadmap-backbone\\app\\main.js":[function(require,module,exports){
'use strict';

var App = require('./app');
var auth = require('./auth');

window.App = App;
$(document).on("click", "a:not([data-bypass])", function (evt) {
  var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
  var root = location.protocol + "//" + location.host + Backbone.history.options.root;

  if (href.prop && href.prop.slice(0, root.length) === root) {
    evt.preventDefault();
    Bb.history.navigate(href.attr, true);
  }
});

// https://laracasts.com/discuss/channels/requests/tutorial-for-using-json-web-tokens
$.ajaxPrefilter(function (options) {
  if (auth.isAuthenticated()) options.beforeSend = function (xhr) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + auth.getToken());
  };
});

(function () {
  var spinner_threshold = 500;
  var isAJAX = false;
  // add loading spinner
  // https://api.jquery.com/ajaxStart/
  $(document).ajaxStart(function () {
    isAJAX = true;
    setTimeout(showLoader, spinner_threshold);
    // $("#main-region").hide()
  });

  function showLoader() {
    if (isAJAX) $("#loader").show();
  }

  // https://api.jquery.com/ajaxStop/
  $(document).ajaxStop(function () {
    isAJAX = false;
    $("#loader").hide();
    // $("#main-region").show()
  });
})();

// $.ajax({
//   url:"https://localhost:3000/api/groups", 
//   success: (data) => {
//     console.log(data)
//   },
//   error: (err) => {
//     console.log(err)
//   }

// })

$(function () {
  App.start();
});

},{"./app":"D:\\home\\coding\\roadmap-backbone\\app\\app.js","./auth":"D:\\home\\coding\\roadmap-backbone\\app\\auth.js"}],"D:\\home\\coding\\roadmap-backbone\\app\\models\\flash.js":[function(require,module,exports){
'use strict';

var Flash = Bb.Model.extend({
  defaults: {
    error: ''
  }
});

module.exports = Flash;

},{}],"D:\\home\\coding\\roadmap-backbone\\app\\models\\group.js":[function(require,module,exports){
'use strict';

var Group = Bb.Model.extend({
  // idAtribute: "_id",
  urlRoot: "https://localhost:3000/api/group/",
  defaults: {
    name: 'name',
    owner: null,
    members: null,
    description: 'desc',
    avatarUrl: 'avatarUrl'
  },

  initialize: function initialize() {}
});

module.exports = Group;

},{}],"D:\\home\\coding\\roadmap-backbone\\app\\models\\index.js":[function(require,module,exports){
'use strict';

module.exports = {
  LocalUser: require('./local.user'),
  LoginUser: require('./login.user'),
  Group: require('./group'),
  Post: require('./post'),
  User: require('./user')
};

},{"./group":"D:\\home\\coding\\roadmap-backbone\\app\\models\\group.js","./local.user":"D:\\home\\coding\\roadmap-backbone\\app\\models\\local.user.js","./login.user":"D:\\home\\coding\\roadmap-backbone\\app\\models\\login.user.js","./post":"D:\\home\\coding\\roadmap-backbone\\app\\models\\post.js"}],"D:\\home\\coding\\roadmap-backbone\\app\\models\\local.user.js":[function(require,module,exports){
'use strict';

// import {LocalStorage} from 'backbone.localstorage'

var UID = 'local.user.roadmap';
var LocalUser = Bb.Model.extend({
    // localStorage: new LocalStorage('local.user'),

    defaults: {
        username: '',
        id: null,
        jwt: null,
        is_auth: false
    },

    fetch: function fetch() {
        this.set(JSON.parse(localStorage.getItem(UID)));
    },

    destroy: function destroy() {
        localStorage.removeItem(UID);
        this.unset('username');
        this.unset('id');
        this.unset('jwt');
        this.set('is_auth', false);
    },

    save: function save() {
        localStorage.setItem(UID, JSON.stringify(this.toJSON()));
    }
});

module.exports = LocalUser;

},{}],"D:\\home\\coding\\roadmap-backbone\\app\\models\\login.user.js":[function(require,module,exports){
'use strict';

var LoginUser = Bb.Model.extend({

  defaults: {
    username: '',
    password: ''
  },

  validate: function validate(attrs, options) {
    if (attrs.username == "") return "Username can't be null.";
    if (attrs.password == "") return "Password can't be null.";
  },

  initialize: function initialize() {
    // this.on('change', function(model) {
    //   if (!model.isValid())
    //     console.log(model.validationError)
    // })
  }

});

module.exports = LoginUser;

},{}],"D:\\home\\coding\\roadmap-backbone\\app\\models\\post.js":[function(require,module,exports){
"use strict";

var Post = Bb.Model.extend({
  // idAttribute: "_id",
  defaults: {
    message: "msg",
    createdAt: new Date(),
    ownerId: null,
    groupId: null
  }
});

module.exports = Post;

},{}],"D:\\home\\coding\\roadmap-backbone\\app\\models\\register.user.js":[function(require,module,exports){
"use strict";

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePassword(password) {
  if (password.length == 0) return "Password can't be empty";

  if (!(password.length >= 3 && password.length <= 12)) return "Password must be between 3 and 12 characters";

  return null;
}
var RegisterUser = Bb.Model.extend({
  validate: function validate(attrs, options) {
    if (attrs.username == "") return "Username can't be empty.";
    if (!validateEmail(attrs.email)) return "Email not valid.";

    var passError = validatePassword(attrs.password);
    if (passError) return passError;
    if (attrs.password !== attrs.password2) return "Passwords don't match";
  }
});

module.exports = RegisterUser;

},{}],"D:\\home\\coding\\roadmap-backbone\\app\\router.js":[function(require,module,exports){
'use strict';

var LayoutView = require('./views/layout');
// var Controller = Marionette.Object.extend({
//   tagName: '#app-hook',
//   initialize: function() {
//     // this.options.regionManager = new Marionette.RegionManager({
//     //   regions: {
//     //     main: '#app-hook'
//     //   }
//     // })

//     var initialData = this.getOption('initialData')

//     var layout = new LayoutView()

//     this.options.layout = layout 
//   },

//   index: function() {

//     alert(this.$el)
//     var layout = this.getOption('layout')
//     layout.triggerMethod('show:index')
//   },
//   register: function() {
//     var layout = this.getOption('layout')
//     layout.triggerMethod('show:register')
//   }
// })

var Controller = {};
var Router = Mn.AppRouter.extend({
  // controller: Controller,
  routes: {
    '': 'home',
    'login': 'login',
    'register': 'register',
    'profile': 'profile',
    'groups/:group': 'showGroup'
  },

  initialize: function initialize(options) {
    this.options = options;
    // this.controller = new Controller ({
    //   initialData: this.getOption('initialData')
    // })
  },

  home: function home() {
    var layout = this.options.layoutView;
    layout.triggerMethod('show:home');
  },

  login: function login() {
    var layout = this.options.layoutView;
    layout.triggerMethod('show:login');
  },

  register: function register() {
    var layout = this.options.layoutView;

    layout.triggerMethod('show:register');
  },

  profile: function profile() {
    var layout = this.options.layoutView;

    layout.triggerMethod('show:profile');
  },

  showGroup: function showGroup(group) {
    var layout = this.options.layoutView;

    // console.log(group)
    layout.triggerMethod('show:group', group);
  }
});

module.exports = Router;

},{"./views/layout":"D:\\home\\coding\\roadmap-backbone\\app\\views\\layout.js"}],"D:\\home\\coding\\roadmap-backbone\\app\\views\\flash.js":[function(require,module,exports){
'use strict';

var template = Handlebars.templates.flash;
var Flash = require('../models/flash');

var FlashView = Mn.View.extend({
  // modelEvents: {
  //   'change': 'render'
  // },

  template: template,

  model: new Flash(),

  initialize: function initialize(_ref) {
    var error = _ref.error,
        info = _ref.info;

    this.model.set('error', error);
    this.model.set('info', info);
  }

});

module.exports = FlashView;

},{"../models/flash":"D:\\home\\coding\\roadmap-backbone\\app\\models\\flash.js"}],"D:\\home\\coding\\roadmap-backbone\\app\\views\\group.js":[function(require,module,exports){
"use strict";

var template = Hbs.templates.group;

var GroupView = Mn.View.extend({
  template: template
});

module.exports = GroupView;

},{}],"D:\\home\\coding\\roadmap-backbone\\app\\views\\home.js":[function(require,module,exports){
'use strict';

var home = Handlebars.templates.home;
var groupsTemplate = Handlebars.templates.groups;

var auth = require('../auth');
var Home = Mn.View.extend({
  getTemplate: function getTemplate() {

    if (!auth.isAuthenticated()) return home;else {

      return groupsTemplate;
    }
  },

  triggers: {
    'click #register-button': 'show:register',
    'click .join-button': 'do:joingroup'
  }

});

module.exports = Home;

},{"../auth":"D:\\home\\coding\\roadmap-backbone\\app\\auth.js"}],"D:\\home\\coding\\roadmap-backbone\\app\\views\\layout.js":[function(require,module,exports){
'use strict';

var NavView = require('./nav');
var LoginView = require('./login');
var RegisterView = require('./register');
var FlashView = require('./flash');
var HomeView = require('./home');
var ProfileView = require('./profile');
var LocalUser = require('../models/local.user');
var GroupView = require('./group');
var template = Handlebars.templates.layout;
var User = require('../models/user');
var auth = require('../auth');
var Groups = require('../collections/groups');
var Group = require('../models/group');

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
    'do:joingroup': 'onDoJoinGroup'
  },

  onRender: function onRender() {
    this.showChildView('navRegion', this.navView);
    // this.triggerMethod('show:login')
  },
  initialize: function initialize() {

    this.navView = new NavView();
  },
  onShowHome: function onShowHome(args) {
    var _this = this;

    if (auth.isAuthenticated()) {
      var groups = new Groups();
      groups.fetch().then(function () {

        _this.homeView = new HomeView({ collection: groups });

        _this.showChildView('mainRegion', _this.homeView);
        Bb.history.navigate('');
      });
    } else {
      this.homeView = new HomeView();
      this.showChildView('mainRegion', this.homeView);
      Bb.history.navigate('');
    }
  },
  onShowLogin: function onShowLogin(args) {
    this.loginView = new LoginView();

    this.showChildView('mainRegion', this.loginView);
    Bb.history.navigate('login');
  },
  onShowRegister: function onShowRegister(args) {
    this.registerView = new RegisterView();
    this.showChildView('mainRegion', this.registerView);
    Bb.history.navigate('register');
  },
  onShowError: function onShowError(args) {
    this.flashView = new FlashView({ error: args });

    // console.log(this.flashView.model.toJSON())

    this.showChildView('flashRegion', this.flashView);
  },
  onShowInfo: function onShowInfo(args) {
    this.flashView = new FlashView({ info: args });
    this.showChildView('flashRegion', this.flashView);
  },
  onDoLogin: function onDoLogin(user) {
    var _this2 = this;

    auth.doLogin(user).then(function () {
      _this2.onShowHome();
      _this2.navView.render();
    }).catch(function (err) {

      var status = err.status;

      if (status == 401) _this2.triggerMethod('show:error', "Username and password combination not recognised");else _this2.triggerMethod('show:error', "Server error");
    });
  },
  onShowProfile: function onShowProfile() {
    var _this3 = this;

    if (!auth.isAuthenticated()) {
      return this.onShowHome();
    }

    var user = new User();
    user.set('id', auth.user.get('id'));
    user.fetch().then(function () {

      _this3.profileView = new ProfileView({ model: user });
      _this3.showChildView('mainRegion', _this3.profileView);
      Bb.history.navigate('profile');
    });
  },
  onDoLogout: function onDoLogout() {
    auth.doLogout();
    this.onShowHome();
    this.navView.render();
  },
  onDoRegister: function onDoRegister(user) {
    var _this4 = this;

    auth.doRegister(user).then(function () {
      return auth.doLogin(user);
    }).then(function () {
      _this4.onShowProfile();
      _this4.triggerMethod('show:info', 'Welcome, ' + user.get('username') + '!');
      _this4.navView.render();
    }).catch(function (error) {
      _this4.triggerMethod('show:error', error);
    });
  },
  onShowGroup: function onShowGroup(group) {
    var _this5 = this;

    if (!auth.isAuthenticated()) {
      return this.showHome();
    }

    var g = new Group({ id: group });

    g.fetch().then(function () {
      _this5.showChildView('mainRegion', new GroupView({ model: g }));
      Bb.history.navigate('groups/' + group);
    }).catch(function (err) {
      _this5.triggerMethod('show:error', JSON.stringify(err));
      _this5.onShowHome();
    });
  },

  onDoJoinGroup: function onDoJoinGroup(args) {
    console.log($(args));
  }
});

module.exports = LayoutView;

},{"../auth":"D:\\home\\coding\\roadmap-backbone\\app\\auth.js","../collections/groups":"D:\\home\\coding\\roadmap-backbone\\app\\collections\\groups.js","../models/group":"D:\\home\\coding\\roadmap-backbone\\app\\models\\group.js","../models/local.user":"D:\\home\\coding\\roadmap-backbone\\app\\models\\local.user.js","./flash":"D:\\home\\coding\\roadmap-backbone\\app\\views\\flash.js","./group":"D:\\home\\coding\\roadmap-backbone\\app\\views\\group.js","./home":"D:\\home\\coding\\roadmap-backbone\\app\\views\\home.js","./login":"D:\\home\\coding\\roadmap-backbone\\app\\views\\login.js","./nav":"D:\\home\\coding\\roadmap-backbone\\app\\views\\nav.js","./profile":"D:\\home\\coding\\roadmap-backbone\\app\\views\\profile.js","./register":"D:\\home\\coding\\roadmap-backbone\\app\\views\\register.js"}],"D:\\home\\coding\\roadmap-backbone\\app\\views\\login.js":[function(require,module,exports){
"use strict";

var template = Handlebars.templates.login;
var LoginUser = require('../models/login.user');

var LoginView = Mn.View.extend({
  template: template,

  ui: {
    inputUsername: "input#username",
    inputPassword: "input#password",
    validationError: "#validation-error"
  },

  triggers: {
    'click #register-button': 'show:register',
    'click #login-button': 'send:login'
  },

  model: new LoginUser(),

  onSendLogin: function onSendLogin() {
    this.model.set('username', this.getUI('inputUsername').val());
    this.model.set('password', this.getUI('inputPassword').val());

    if (!this.model.isValid()) {
      this.getUI('validationError').text(this.model.validationError);
    } else {
      this.triggerMethod('do:login', this.model);
    }
  },

  initialize: function initialize() {
    // console.log(this.model.toJSON())
  }
});

module.exports = LoginView;

},{"../models/login.user":"D:\\home\\coding\\roadmap-backbone\\app\\models\\login.user.js"}],"D:\\home\\coding\\roadmap-backbone\\app\\views\\nav.js":[function(require,module,exports){
"use strict";

var template = Handlebars.templates.nav;
var auth = require('../auth');

var NavView = Mn.View.extend({
  getTemplate: function getTemplate() {
    return template({
      user: auth.isAuthenticated() ? auth.user.toJSON() : null
    });
  },


  triggers: {
    "click #home-button": "show:home",
    "click #login-button": "show:login",
    "click #register-button": "show:register",
    "click #profile-button": "show:profile",
    "click #logout-button": "do:logout"
  }

});

module.exports = NavView;

},{"../auth":"D:\\home\\coding\\roadmap-backbone\\app\\auth.js"}],"D:\\home\\coding\\roadmap-backbone\\app\\views\\profile.js":[function(require,module,exports){
'use strict';

var template = Hbs.templates.profile;
var User = require('../models/user');
var auth = require('../auth');

var ProfileView = Mn.View.extend({
  template: template,

  triggers: {
    'click #logout-button': 'do:logout'
  }

});

module.exports = ProfileView;

},{}],"D:\\home\\coding\\roadmap-backbone\\app\\views\\register.js":[function(require,module,exports){
'use strict';

var template = Handlebars.templates.register;
var RegisterUser = require('../models/register.user');

var Register = Mn.View.extend({
  // tagName: 'div',
  template: template,

  model: new RegisterUser(),

  triggers: {
    'click #register-button': 'send:register'
  },

  onSendRegister: function onSendRegister() {
    this.model.set('username', $("#username").val());
    this.model.set('password', $("#password").val());
    this.model.set('password2', $("#password2").val());
    this.model.set('email', $("#email").val());

    if (!this.model.isValid()) {
      $('#validation-error').text(this.model.validationError);
    } else {
      this.triggerMethod('do:register', this.model);
    }
  }
});

module.exports = Register;

},{"../models/register.user":"D:\\home\\coding\\roadmap-backbone\\app\\models\\register.user.js"}]},{},["D:\\home\\coding\\roadmap-backbone\\app\\main.js"]);
