(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/adumitru/coding/roadmap-backbone/app/app.js":[function(require,module,exports){
'use strict';

window.Bb = Backbone;
window.Mn = Marionette = Backbone.Marionette;
window.Hbs = Handlebars;
if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}

require('./templates');

var models = require('./models');
var Router = require('./router');
var Auth = require('./auth');

var LayoutView = require('./views/layout');
var App = Mn.Application.extend({
  region: '#app-hook',
  onStart: function onStart() {
    // console.log(this.options.layoutView)

    /** Starts the URL handling framework */

    // this.showView(new RootView())
    // (new NavView()).render()

    var router = new Router(this.options);

    this.showView(this.options.layoutView);
    this.auth = new Auth();
    // (new NavView()).render()

    if (!Bb.history.started) Bb.history.start({ pushState: true, root: "/" });
  }
});

var myApp = new App({
  layoutView: new LayoutView()
});

module.exports = myApp;

// $.ajax({url: "https://localhost:3000/api/users", method: "GET", success: console.log, error: console.log})

},{"./auth":"/home/adumitru/coding/roadmap-backbone/app/auth.js","./models":"/home/adumitru/coding/roadmap-backbone/app/models/index.js","./router":"/home/adumitru/coding/roadmap-backbone/app/router.js","./templates":"/home/adumitru/coding/roadmap-backbone/app/templates/index.js","./views/layout":"/home/adumitru/coding/roadmap-backbone/app/views/layout.js"}],"/home/adumitru/coding/roadmap-backbone/app/auth.js":[function(require,module,exports){
'use strict';

var Auth = function Auth() {

  getToken = function getToken() {
    alert('trying to get a token are we? hehe');
  };

  return {
    getToken: getToken
  };
};

module.exports = Auth;

},{}],"/home/adumitru/coding/roadmap-backbone/app/main.js":[function(require,module,exports){
"use strict";

var app = require('./app');

$(document).on("click", "a:not([data-bypass])", function (evt) {
  var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
  var root = location.protocol + "//" + location.host + Backbone.history.options.root;

  if (href.prop && href.prop.slice(0, root.length) === root) {
    evt.preventDefault();
    Bb.history.navigate(href.attr, true);
  }
});

$(function () {
  myApp.start();
});

},{"./app":"/home/adumitru/coding/roadmap-backbone/app/app.js"}],"/home/adumitru/coding/roadmap-backbone/app/models/flash.js":[function(require,module,exports){
'use strict';

var Flash = Bb.Model.extend({
  defaults: {
    error: ''
  }
});

module.exports = Flash;

},{}],"/home/adumitru/coding/roadmap-backbone/app/models/group.js":[function(require,module,exports){
'use strict';

var Group = Bb.Model.extend({
  // idAtribute: "_id",
  defaults: {
    name: 'name',
    ownerId: null,
    description: 'desc',
    avatarUrl: 'avatarUrl',
    memberIds: []
  },

  initialize: function initialize() {}
});

module.exports = Group;

},{}],"/home/adumitru/coding/roadmap-backbone/app/models/index.js":[function(require,module,exports){
'use strict';

module.exports = {
  LocalUser: require('./local.user'),
  LoginUser: require('./login.user'),
  Group: require('./group'),
  Post: require('./post')
};

},{"./group":"/home/adumitru/coding/roadmap-backbone/app/models/group.js","./local.user":"/home/adumitru/coding/roadmap-backbone/app/models/local.user.js","./login.user":"/home/adumitru/coding/roadmap-backbone/app/models/login.user.js","./post":"/home/adumitru/coding/roadmap-backbone/app/models/post.js"}],"/home/adumitru/coding/roadmap-backbone/app/models/local.user.js":[function(require,module,exports){
'use strict';

// import {LocalStorage} from 'backbone.localstorage'

var UID = 'local.user.roadmap';
var LocalUser = Bb.Model.extend({
  // localStorage: new LocalStorage('local.user'),

  defaults: {
    username: '',
    id: null,
    jwt: null
  },

  fetch: function fetch() {
    this.set(JSON.parse(localStorage.getItem(UID)));
  },

  destroy: function destroy() {
    localStorage.removeItem(UID);
  },

  save: function save() {
    localStorage.setItem(UID, JSON.stringify(this.toJSON()));
  }
});

module.exports = LocalUser;

},{}],"/home/adumitru/coding/roadmap-backbone/app/models/login.user.js":[function(require,module,exports){
'use strict';

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

var LoginUser = Bb.Model.extend({

  defaults: {
    username: '',
    password: ''
  },

  validate: function validate(attrs, options) {
    if (attrs.username == "") return "Username can't be null.";
    if (attrs.password == "") return "Password can't be null.";
    // if (attrs.email!=="" && !validateEmail(attrs.email)) return "Email not valid."
  },

  initialize: function initialize() {
    // this.on('change', function(model) {
    //   if (!model.isValid())
    //     console.log(model.validationError)
    // })
  }

});

module.exports = LoginUser;

},{}],"/home/adumitru/coding/roadmap-backbone/app/models/post.js":[function(require,module,exports){
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

},{}],"/home/adumitru/coding/roadmap-backbone/app/router.js":[function(require,module,exports){
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
    'profile': 'profile'
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
  }
});

module.exports = Router;

},{"./views/layout":"/home/adumitru/coding/roadmap-backbone/app/views/layout.js"}],"/home/adumitru/coding/roadmap-backbone/app/templates/index.js":[function(require,module,exports){
"use strict";

(function () {
    var template = Handlebars.template,
        templates = Handlebars.templates = Handlebars.templates || {};
    templates['flash'] = template({ "1": function _(container, depth0, helpers, partials, data) {
            var helper;

            return "  <div class=\"alert alert-danger\">\n  <strong>Error</strong>\n    \n      <p>" + container.escapeExpression((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {}, { "name": "error", "hash": {}, "data": data }) : helper)) + "</p>\n  </div>\n";
        }, "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            var stack1;

            return "<div>\n" + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {}, depth0 != null ? depth0.error : depth0, { "name": "if", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + "\n</div>";
        }, "useData": true });
    templates['home'] = template({ "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            return "<div>\n  <h2>Home</h2>\n  <p>Welcome to our groups website! You can meet awesome people here.</p>\n  <p>Joining is easy. Just click <a href='/register'>here</a> to go to to the sign up page.</p>\n</div>";
        }, "useData": true });
    templates['layout'] = template({ "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            return "<div id='nav-region'>\n\n</div>\n<div id='flash-region' class='container'>\n\n</div>\n<div id='main-region' class='container'>\n\n</div>";
        }, "useData": true });
    templates['login'] = template({ "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            return "<div>\n\n  <form role=\"form\" id=\"login-form\">\n      <h2>Sign in</h2>\n  <p>Sign in to view and access our groups! :)</p>\n  <a href=# id='register-button'>Don't have an account yet?</a>\n    <div class=\"form-group\">\n      <input type=\"text\" id=\"username\" placeholder=\"Username\" class=\"form-control\" required>\n    </div>\n    <div class=\"form-group\">\n      <input type=\"password\" id=\"password\"placeholder=\"Password\" class=\"form-control\" required>\n    </div>\n    <div class=\"text-danger\" id=\"validation-error\">\n\n    </div>\n    <input type=\"submit\" class=\"btn btn-success\" id='login-button' value='Sign in'></input>\n  </form>\n</div>";
        }, "useData": true });
    templates['nav'] = template({ "1": function _(container, depth0, helpers, partials, data) {
            var stack1;

            return "              <li><a href=# id='profile-button'>" + container.escapeExpression(container.lambda((stack1 = depth0 != null ? depth0.user : depth0) != null ? stack1.username : stack1, depth0)) + "</a></li>\n";
        }, "3": function _(container, depth0, helpers, partials, data) {
            return "              <li><a href=# id='login-button'>Sign in</a></li>\n              <li><a href=# id='register-button'>Sign up</a></li>\n";
        }, "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            var stack1;

            return "<div>\n <nav class=\"navbar navbar-default\" role=\"navigation\">\n  \n      <div class=\"container\">\n        <div class=\"navbar-header\">\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n          <a class=\"navbar-brand\" href=\"#\" id='home-button'>Roadmap - Backbone</a>\n        </div>\n        <div id=\"navbar\" class=\"navbar-collapse collapse\">\n          <ul class=\"nav navbar-nav\">\n\n          </ul>\n\n          <ul class=\"nav navbar-nav navbar-right\">\n" + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {}, (stack1 = depth0 != null ? depth0.user : depth0) != null ? stack1.jwt : stack1, { "name": "if", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.program(3, data, 0), "data": data })) != null ? stack1 : "") + "      </ul>\n        </div>\n  \n      </div>\n    </nav>\n</div>";
        }, "useData": true });
    templates['profile'] = template({ "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            var helper;

            return "<div>\n  <h2>" + container.escapeExpression((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : helpers.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {}, { "name": "username", "hash": {}, "data": data }) : helper)) + "</h2>\n  \n\n  <a href=# id='logout-button'>Logout</a>\n</div>";
        }, "useData": true });
    templates['register'] = template({ "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            return "<div>\n\n\n  <form role=\"form\" id=\"login-form\">\n    <h2>Create an account</h2>\n    <p>Create an account to view and access our groups.</p>\n    <p>We're a happy, growing community! :)</p>\n      <div class=\"form-group\">\n        <input type=\"text\" id=\"username\" placeholder=\"Username\" class=\"form-control\">\n      </div>\n      <div class=\"form-group\">\n        <input type=\"password\" id=\"password\"placeholder=\"Password\" class=\"form-control\">\n      </div>\n      <button type=\"button\" class=\"btn btn-success\" id='login-button'>Sign in</button>\n    </form>\n</div>";
        }, "useData": true });
})();

},{}],"/home/adumitru/coding/roadmap-backbone/app/views/flash.js":[function(require,module,exports){
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
    var error = _ref.error;

    this.model.set('error', error);
  }

});

module.exports = FlashView;

},{"../models/flash":"/home/adumitru/coding/roadmap-backbone/app/models/flash.js"}],"/home/adumitru/coding/roadmap-backbone/app/views/home.js":[function(require,module,exports){
'use strict';

var template = Handlebars.templates.home;

var Index = Mn.View.extend({
  template: template,

  triggers: {
    'click #register-button': 'show:register'
  }
});

module.exports = Index;

},{}],"/home/adumitru/coding/roadmap-backbone/app/views/layout.js":[function(require,module,exports){
'use strict';

var NavView = require('./nav');
var LoginView = require('./login');
var RegisterView = require('./register');
var FlashView = require('./flash');
var HomeView = require('./home');
var ProfileView = require('./profile');
var LocalUser = require('../models/local.user');
var template = Handlebars.templates.layout;
var App = require('../app');
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

  onRender: function onRender() {
    this.showChildView('navRegion', this.navView);
    // this.triggerMethod('show:login')
  },

  initialize: function initialize() {
    this.user = new LocalUser();
    this.user.fetch();

    this.navView = new NavView({ user: this.user });

    this.user.on('change', this.navView.render);
  },

  onShowHome: function onShowHome(args) {
    this.homeView = new HomeView();

    this.showChildView('mainRegion', this.homeView);
    Bb.history.navigate('');
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
    console.log(args);
  },

  onDoLogin: function onDoLogin(user) {
    var _this = this;

    $.post({
      url: 'https://localhost:3000/api/auth',
      data: { username: user.get('username'), password: user.get('password') },
      success: function success(data) {

        _this.user.set('id', data.user.id);
        _this.user.set('username', data.user.username);
        _this.user.set('jwt', data.jwt);

        _this.user.save();

        _this.onShowHome();

        App.auth.getToken();
      },
      error: function error(err) {
        _this.triggerMethod('show:error', 'Username and password combination not recognised.');
      }
    });
  },

  onShowProfile: function onShowProfile() {
    if (this.user.get('jwt') == null) {
      return this.onShowHome();
    }

    this.profileView = new ProfileView({ model: this.user });
    this.showChildView('mainRegion', this.profileView);
    Bb.history.navigate('profile');
  },
  onDoLogout: function onDoLogout() {
    this.user.destroy();
    this.user.unset('username');
    this.user.unset('jwt');
    this.user.unset('id');
    this.onShowHome();
    this.navView.render();
  }

});

module.exports = LayoutView;

},{"../app":"/home/adumitru/coding/roadmap-backbone/app/app.js","../models/local.user":"/home/adumitru/coding/roadmap-backbone/app/models/local.user.js","./flash":"/home/adumitru/coding/roadmap-backbone/app/views/flash.js","./home":"/home/adumitru/coding/roadmap-backbone/app/views/home.js","./login":"/home/adumitru/coding/roadmap-backbone/app/views/login.js","./nav":"/home/adumitru/coding/roadmap-backbone/app/views/nav.js","./profile":"/home/adumitru/coding/roadmap-backbone/app/views/profile.js","./register":"/home/adumitru/coding/roadmap-backbone/app/views/register.js"}],"/home/adumitru/coding/roadmap-backbone/app/views/login.js":[function(require,module,exports){
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

},{"../models/login.user":"/home/adumitru/coding/roadmap-backbone/app/models/login.user.js"}],"/home/adumitru/coding/roadmap-backbone/app/views/nav.js":[function(require,module,exports){
"use strict";

var template = Handlebars.templates.nav;

var NavView = Mn.View.extend({

  getTemplate: function getTemplate() {
    return template({
      user: this.user ? this.user.toJSON() : null
    });
  },

  triggers: {
    "click #home-button": "show:home",
    "click #login-button": "show:login",
    "click #register-button": "show:register",
    "click #profile-button": "show:profile"
  },

  initialize: function initialize(_ref) {
    var user = _ref.user;

    this.user = user;
  },

  onRender: function onRender() {}

});

module.exports = NavView;

},{}],"/home/adumitru/coding/roadmap-backbone/app/views/profile.js":[function(require,module,exports){
'use strict';

var template = Hbs.templates.profile;

var ProfileView = Mn.View.extend({
  template: template,

  triggers: {
    'click #logout-button': 'do:logout'
  }
});

module.exports = ProfileView;

},{}],"/home/adumitru/coding/roadmap-backbone/app/views/register.js":[function(require,module,exports){
"use strict";

var template = Handlebars.templates.register;

var Register = Mn.View.extend({
  // tagName: 'div',
  template: template
});

module.exports = Register;

},{}]},{},["/home/adumitru/coding/roadmap-backbone/app/main.js"]);
