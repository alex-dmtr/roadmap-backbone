(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/adumitru/coding/roadmap-backbone/app/app.js":[function(require,module,exports){
'use strict';

window.Bb = Backbone;
window.Mn = Marionette = Backbone.Marionette;

if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}

var models = require('./models');
var Router = require('./router');

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

    // (new NavView()).render()

    if (!Bb.history.started) Bb.history.start({ pushState: true, root: "/" });
  }
});

var myApp = new App({
  layoutView: new LayoutView()
});

$(function () {
  myApp.start();
});

// $.ajax({url: "https://localhost:3000/api/users", method: "GET", success: console.log, error: console.log})

},{"./models":"/home/adumitru/coding/roadmap-backbone/app/models/index.js","./router":"/home/adumitru/coding/roadmap-backbone/app/router.js","./views/layout":"/home/adumitru/coding/roadmap-backbone/app/views/layout.js"}],"/home/adumitru/coding/roadmap-backbone/app/models/flash.js":[function(require,module,exports){
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
  User: require('./user'),
  Group: require('./group'),
  Post: require('./post')
};

},{"./group":"/home/adumitru/coding/roadmap-backbone/app/models/group.js","./post":"/home/adumitru/coding/roadmap-backbone/app/models/post.js","./user":"/home/adumitru/coding/roadmap-backbone/app/models/user.js"}],"/home/adumitru/coding/roadmap-backbone/app/models/post.js":[function(require,module,exports){
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

},{}],"/home/adumitru/coding/roadmap-backbone/app/models/user.js":[function(require,module,exports){
'use strict';

// import {LocalStorage} from 'backbone.localstorage'

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

var User = Bb.Model.extend({
  // idAttribute: "_id",  
  // localStorage: new LocalStorage('user'),

  defaults: {
    username: '',
    email: '',
    description: '',
    password: '',
    age: 21,
    currentProject: '',
    agency: ''
  },

  validate: function validate(attrs, options) {
    if (attrs.username == "") return "Username can't be null.";
    if (attrs.password == "") return "Password can't be null.";
    if (attrs.email !== "" && !validateEmail(attrs.email)) return "Email not valid.";
  },

  initialize: function initialize() {
    this.on('change', function (model) {
      if (!model.isValid()) console.log(model.validationError);
    });
  }

});

module.exports = User;

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
    'register': 'register'
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
  }
});

module.exports = Router;

},{"./views/layout":"/home/adumitru/coding/roadmap-backbone/app/views/layout.js"}],"/home/adumitru/coding/roadmap-backbone/app/templates/index.js":[function(require,module,exports){
"use strict";

exports["flash"] = { "1": function _(depth0, helpers, partials, data) {
        var helper;

        return "  <div class=\"alert alert-danger\">\n  <strong>Error</strong>\n    \n      <p>" + this.escapeExpression((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing, typeof helper === "function" ? helper.call(depth0, { "name": "error", "hash": {}, "data": data }) : helper)) + "</p>\n  </div>\n";
    }, "compiler": [6, ">= 2.0.0-beta.1"], "main": function main(depth0, helpers, partials, data) {
        var stack1;

        return "<div>\n" + ((stack1 = helpers['if'].call(depth0, depth0 != null ? depth0.error : depth0, { "name": "if", "hash": {}, "fn": this.program(1, data, 0), "inverse": this.noop, "data": data })) != null ? stack1 : "") + "\n</div>";
    }, "useData": true };
exports["home"] = { "compiler": [6, ">= 2.0.0-beta.1"], "main": function main(depth0, helpers, partials, data) {
        return "<div>\n  <h2>Home</h2>\n  <p>Welcome to our groups website! You can meet awesome people here.</p>\n  <p>Joining is easy. Just click <a href=# id='register-button'>here</a> to go to to the sign up page.</p>\n\n  <p>Hello world!</p>\n</div>";
    }, "useData": true };
exports["layout"] = { "compiler": [6, ">= 2.0.0-beta.1"], "main": function main(depth0, helpers, partials, data) {
        return "<div id='nav-region'>\n\n</div>\n<div id='flash-region' class='container'>\n\n</div>\n<div id='main-region' class='container'>\n\n</div>";
    }, "useData": true };
exports["login"] = { "compiler": [6, ">= 2.0.0-beta.1"], "main": function main(depth0, helpers, partials, data) {
        return "<div>\n\n  <form role=\"form\" id=\"login-form\">\n      <h2>Sign in</h2>\n  <p>Sign in to view and access our groups! :)</p>\n  <a href=# id='register-button'>Don't have an account yet?</a>\n    <div class=\"form-group\">\n      <input type=\"text\" id=\"username\" placeholder=\"Username\" class=\"form-control\" required>\n    </div>\n    <div class=\"form-group\">\n      <input type=\"password\" id=\"password\"placeholder=\"Password\" class=\"form-control\" required>\n    </div>\n    <div class=\"text-danger\" id=\"validation-error\">\n\n    </div>\n    <input type=\"submit\" class=\"btn btn-success\" id='login-button' value='Sign in'></input>\n  </form>\n</div>";
    }, "useData": true };
exports["nav"] = { "1": function _(depth0, helpers, partials, data) {
        var stack1;

        return "              <li><a href=# id='profile-button'>" + this.escapeExpression(this.lambda((stack1 = depth0 != null ? depth0.user : depth0) != null ? stack1.username : stack1, depth0)) + "</a></li>\n";
    }, "3": function _(depth0, helpers, partials, data) {
        return "              <li><a href=# id='login-button'>Sign in</a></li>\n              <li><a href=# id='register-button'>Sign up</a></li>\n";
    }, "compiler": [6, ">= 2.0.0-beta.1"], "main": function main(depth0, helpers, partials, data) {
        var stack1;

        return "<div>\n <nav class=\"navbar navbar-default\" role=\"navigation\">\n  \n      <div class=\"container\">\n        <div class=\"navbar-header\">\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n          <a class=\"navbar-brand\" href=\"#\" id='home-button'>Roadmap - Backbone</a>\n        </div>\n        <div id=\"navbar\" class=\"navbar-collapse collapse\">\n          <ul class=\"nav navbar-nav\">\n\n          </ul>\n\n          <ul class=\"nav navbar-nav navbar-right\">\n" + ((stack1 = helpers['if'].call(depth0, (stack1 = depth0 != null ? depth0.user : depth0) != null ? stack1.jwt : stack1, { "name": "if", "hash": {}, "fn": this.program(1, data, 0), "inverse": this.program(3, data, 0), "data": data })) != null ? stack1 : "") + "      </ul>\n        </div>\n  \n      </div>\n    </nav>\n</div>";
    }, "useData": true };
exports["register"] = { "compiler": [6, ">= 2.0.0-beta.1"], "main": function main(depth0, helpers, partials, data) {
        return "<div>\n\n\n  <form role=\"form\" id=\"login-form\">\n      <h2>Sign up</h2>\n  <p>Create an account to view and access our groups.</p>\n  <p>We're a happy, growing community! :)</p>\n    <div class=\"form-group\">\n      <input type=\"text\" id=\"username\" placeholder=\"Username\" class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n      <input type=\"password\" id=\"password\"placeholder=\"Password\" class=\"form-control\">\n    </div>\n    <button type=\"button\" class=\"btn btn-success\" id='login-button'>Sign in</button>\n  </form>\n</div>";
    }, "useData": true };

},{}],"/home/adumitru/coding/roadmap-backbone/app/views/flash.js":[function(require,module,exports){
'use strict';

var template = require('../templates').flash;
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

},{"../models/flash":"/home/adumitru/coding/roadmap-backbone/app/models/flash.js","../templates":"/home/adumitru/coding/roadmap-backbone/app/templates/index.js"}],"/home/adumitru/coding/roadmap-backbone/app/views/home.js":[function(require,module,exports){
'use strict';

var template = require('../templates').home;

var Index = Mn.View.extend({
  template: template,

  triggers: {
    'click #register-button': 'show:register'
  }
});

module.exports = Index;

},{"../templates":"/home/adumitru/coding/roadmap-backbone/app/templates/index.js"}],"/home/adumitru/coding/roadmap-backbone/app/views/layout.js":[function(require,module,exports){
'use strict';

var NavView = require('./nav');
var LoginView = require('./login');
var RegisterView = require('./register');
var FlashView = require('./flash');
var HomeView = require('./home');
var User = require('../models/user');
var template = require('../templates').layout;
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
    'do:login': 'onDoLogin'
  },

  onRender: function onRender() {
    this.showChildView('navRegion', this.navView);
    // this.triggerMethod('show:login')
  },

  initialize: function initialize() {
    var _this = this;

    this.user = new User();

    this.navView = new NavView({ user: this.user });

    this.user.on('change:jwt', function () {
      console.log('jwt changed');
      _this.navView.render();
    });
  },

  onShowHome: function onShowHome(args) {
    this.homeView = new HomeView();

    this.showChildView('mainRegion', this.homeView);
    Bb.history.navigate('');
  },

  onShowLogin: function onShowLogin(args) {
    this.loginView = new LoginView({ model: this.user });

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

  onDoLogin: function onDoLogin(args) {
    var _this2 = this;

    $.post({
      url: 'https://localhost:3000/api/auth',
      data: { username: this.user.get('username'), password: this.user.get('password') },
      success: function success(data) {
        var user = _this2.user;

        user.set('id', data.user.id);
        user.set('username', data.user.username);
        user.set('jwt', data.jwt);
        user.unset('password');

        // console.log(JSON.stringify(user.toJSON()))

        user.save();

        _this2.onShowHome();
      },
      error: function error(err) {
        _this2.triggerMethod('show:error', 'Username and password combination not recognised.');
      }
    });
  }

});

module.exports = LayoutView;

},{"../models/user":"/home/adumitru/coding/roadmap-backbone/app/models/user.js","../templates":"/home/adumitru/coding/roadmap-backbone/app/templates/index.js","./flash":"/home/adumitru/coding/roadmap-backbone/app/views/flash.js","./home":"/home/adumitru/coding/roadmap-backbone/app/views/home.js","./login":"/home/adumitru/coding/roadmap-backbone/app/views/login.js","./nav":"/home/adumitru/coding/roadmap-backbone/app/views/nav.js","./register":"/home/adumitru/coding/roadmap-backbone/app/views/register.js"}],"/home/adumitru/coding/roadmap-backbone/app/views/login.js":[function(require,module,exports){
"use strict";

var template = require('../templates').login;

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

  onSendLogin: function onSendLogin() {
    this.model.set('username', this.getUI('inputUsername').val());
    this.model.set('password', this.getUI('inputPassword').val());

    if (!this.model.isValid()) {
      this.getUI('validationError').text(this.model.validationError);
    } else {
      this.triggerMethod('do:login');
    }
  },

  initialize: function initialize() {
    // console.log(this.model.toJSON())
  }
});

module.exports = LoginView;

},{"../templates":"/home/adumitru/coding/roadmap-backbone/app/templates/index.js"}],"/home/adumitru/coding/roadmap-backbone/app/views/nav.js":[function(require,module,exports){
'use strict';

var User = require('./../models/user');
var template = require('../templates').nav;

var NavView = Mn.View.extend({

  getTemplate: function getTemplate() {
    return template({
      user: this.user ? this.user.toJSON() : null
    });
  },

  triggers: {
    "click #home-button": "show:home",
    "click #login-button": "show:login",
    "click #register-button": "show:register"
  },

  initialize: function initialize(_ref) {
    var user = _ref.user;

    this.user = user;
  },

  onRender: function onRender() {}

});

module.exports = NavView;

},{"../templates":"/home/adumitru/coding/roadmap-backbone/app/templates/index.js","./../models/user":"/home/adumitru/coding/roadmap-backbone/app/models/user.js"}],"/home/adumitru/coding/roadmap-backbone/app/views/register.js":[function(require,module,exports){
'use strict';

var template = require('../templates').register;

var Register = Mn.View.extend({
  // tagName: 'div',
  template: template()
});

module.exports = Register;

},{"../templates":"/home/adumitru/coding/roadmap-backbone/app/templates/index.js"}]},{},["/home/adumitru/coding/roadmap-backbone/app/app.js"]);
