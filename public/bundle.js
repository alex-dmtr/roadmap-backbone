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

},{"./auth":"/home/adumitru/coding/roadmap-backbone/app/auth.js","./collections/groups":"/home/adumitru/coding/roadmap-backbone/app/collections/groups.js","./models":"/home/adumitru/coding/roadmap-backbone/app/models/index.js","./router":"/home/adumitru/coding/roadmap-backbone/app/router.js","./templates":"/home/adumitru/coding/roadmap-backbone/app/templates/index.js","./views/layout":"/home/adumitru/coding/roadmap-backbone/app/views/layout.js"}],"/home/adumitru/coding/roadmap-backbone/app/auth.js":[function(require,module,exports){
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

},{"./models/local.user":"/home/adumitru/coding/roadmap-backbone/app/models/local.user.js"}],"/home/adumitru/coding/roadmap-backbone/app/collections/groups.js":[function(require,module,exports){
"use strict";

var Group = require('../models/group');
var Groups = Bb.Collection.extend({
  url: "https://localhost:3000/api/groups",
  model: Group
});

module.exports = Groups;

},{"../models/group":"/home/adumitru/coding/roadmap-backbone/app/models/group.js"}],"/home/adumitru/coding/roadmap-backbone/app/main.js":[function(require,module,exports){
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

},{"./app":"/home/adumitru/coding/roadmap-backbone/app/app.js","./auth":"/home/adumitru/coding/roadmap-backbone/app/auth.js"}],"/home/adumitru/coding/roadmap-backbone/app/models/flash.js":[function(require,module,exports){
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

},{}],"/home/adumitru/coding/roadmap-backbone/app/models/index.js":[function(require,module,exports){
'use strict';

module.exports = {
  LocalUser: require('./local.user'),
  LoginUser: require('./login.user'),
  Group: require('./group'),
  Post: require('./post'),
  User: require('./user')
};

},{"./group":"/home/adumitru/coding/roadmap-backbone/app/models/group.js","./local.user":"/home/adumitru/coding/roadmap-backbone/app/models/local.user.js","./login.user":"/home/adumitru/coding/roadmap-backbone/app/models/login.user.js","./post":"/home/adumitru/coding/roadmap-backbone/app/models/post.js","./user":"/home/adumitru/coding/roadmap-backbone/app/models/user.js"}],"/home/adumitru/coding/roadmap-backbone/app/models/local.user.js":[function(require,module,exports){
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

},{}],"/home/adumitru/coding/roadmap-backbone/app/models/login.user.js":[function(require,module,exports){
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

},{}],"/home/adumitru/coding/roadmap-backbone/app/models/register.user.js":[function(require,module,exports){
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

},{}],"/home/adumitru/coding/roadmap-backbone/app/models/user.js":[function(require,module,exports){
'use strict';

var User = Bb.Model.extend({
  urlRoot: 'https://localhost:3000/api/users/'
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

},{"./views/layout":"/home/adumitru/coding/roadmap-backbone/app/views/layout.js"}],"/home/adumitru/coding/roadmap-backbone/app/templates/index.js":[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    var template = Handlebars.template,
        templates = Handlebars.templates = Handlebars.templates || {};
    templates['flash'] = template({ "1": function _(container, depth0, helpers, partials, data) {
            var helper;

            return "  <div class=\"alert alert-danger\">\n  <strong>Error</strong>\n    \n      <p>" + container.escapeExpression((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {}, { "name": "error", "hash": {}, "data": data }) : helper)) + "</p>\n  </div>\n";
        }, "3": function _(container, depth0, helpers, partials, data) {
            var helper;

            return "  <div class=\"alert alert-info\">\n    <strong>Info</strong>\n    <p>" + container.escapeExpression((helper = (helper = helpers.info || (depth0 != null ? depth0.info : depth0)) != null ? helper : helpers.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {}, { "name": "info", "hash": {}, "data": data }) : helper)) + "\n  </div>\n";
        }, "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            var stack1,
                alias1 = depth0 != null ? depth0 : {};

            return "<div>\n" + ((stack1 = helpers["if"].call(alias1, depth0 != null ? depth0.error : depth0, { "name": "if", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + "\n" + ((stack1 = helpers["if"].call(alias1, depth0 != null ? depth0.info : depth0, { "name": "if", "hash": {}, "fn": container.program(3, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + "\n</div>";
        }, "useData": true });
    templates['group'] = template({ "1": function _(container, depth0, helpers, partials, data) {
            return "          <li>" + container.escapeExpression(container.lambda(depth0 != null ? depth0.username : depth0, depth0)) + "</li>\n";
        }, "3": function _(container, depth0, helpers, partials, data) {
            var stack1,
                alias1 = container.lambda,
                alias2 = container.escapeExpression;

            return "          <strong>" + alias2(alias1((stack1 = depth0 != null ? depth0.owner : depth0) != null ? stack1.username : stack1, depth0)) + "</strong>\n          <li>" + alias2(alias1(depth0 != null ? depth0.message : depth0, depth0)) + "</li>\n";
        }, "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            var stack1,
                helper,
                alias1 = depth0 != null ? depth0 : {},
                alias2 = helpers.helperMissing,
                alias3 = "function",
                alias4 = container.escapeExpression;

            return "\n <div>\n\n  <div class=\"col-xs-6\">\n\n    \n    <h1>" + alias4((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2, (typeof helper === "undefined" ? "undefined" : _typeof(helper)) === alias3 ? helper.call(alias1, { "name": "name", "hash": {}, "data": data }) : helper)) + " </h1>\n      <p>" + alias4((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2, (typeof helper === "undefined" ? "undefined" : _typeof(helper)) === alias3 ? helper.call(alias1, { "name": "description", "hash": {}, "data": data }) : helper)) + "</p>\n\n      <p>Group owner: <strong>" + alias4(container.lambda((stack1 = depth0 != null ? depth0.owner : depth0) != null ? stack1.username : stack1, depth0)) + "</strong>\n      <p>Members:</p>\n      <ul>\n" + ((stack1 = helpers.each.call(alias1, depth0 != null ? depth0.members : depth0, { "name": "each", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + "      </ul>\n\n      <h3>Posts</h3>\n      <ul>\n" + ((stack1 = helpers.each.call(alias1, depth0 != null ? depth0.posts : depth0, { "name": "each", "hash": {}, "fn": container.program(3, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + "      </ul>\n  </div>\n  <div class=\"col-xs-6\">\n    <img src='" + alias4((helper = (helper = helpers.avatarUrl || (depth0 != null ? depth0.avatarUrl : depth0)) != null ? helper : alias2, (typeof helper === "undefined" ? "undefined" : _typeof(helper)) === alias3 ? helper.call(alias1, { "name": "avatarUrl", "hash": {}, "data": data }) : helper)) + "' class=\"img img-responsive img-thumbnail\"></img>\n  </div>\n</div>";
        }, "useData": true });
    templates['groups'] = template({ "1": function _(container, depth0, helpers, partials, data) {
            var stack1,
                alias1 = container.lambda,
                alias2 = container.escapeExpression,
                alias3 = depth0 != null ? depth0 : {};

            return "  <tr >\n \n    <div class=\"row\">\n    <div class=\"col-xs-4\">\n      <img src=\"" + alias2(alias1(depth0 != null ? depth0.avatarUrl : depth0, depth0)) + "\" class=\"img img-responsive\"></img>\n\n    </div>\n\n    <div class=\"col-xs-8\">\n" + ((stack1 = helpers["if"].call(alias3, depth0 != null ? depth0.is_member : depth0, { "name": "if", "hash": {}, "fn": container.program(2, data, 0), "inverse": container.program(4, data, 0), "data": data })) != null ? stack1 : "") + "      <p>" + alias2(alias1(depth0 != null ? depth0.description : depth0, depth0)) + "</p>\n      <p><em>" + alias2(alias1(depth0 != null ? depth0.num_members : depth0, depth0)) + " members</em></p>\n" + ((stack1 = helpers.unless.call(alias3, depth0 != null ? depth0.is_member : depth0, { "name": "unless", "hash": {}, "fn": container.program(6, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + "      \n      <p>Created by: <strong>" + alias2(alias1((stack1 = depth0 != null ? depth0.owner : depth0) != null ? stack1.username : stack1, depth0)) + "</strong></p>\n\n  \n    </div>\n    </div>\n  </tr>\n";
        }, "2": function _(container, depth0, helpers, partials, data) {
            var alias1 = container.lambda,
                alias2 = container.escapeExpression;

            return "      <h2>\n      <a href=\"/groups/" + alias2(alias1(depth0 != null ? depth0.id : depth0, depth0)) + "\">" + alias2(alias1(depth0 != null ? depth0.name : depth0, depth0)) + "</a> </h2>\n";
        }, "4": function _(container, depth0, helpers, partials, data) {
            return "        <h2>" + container.escapeExpression(container.lambda(depth0 != null ? depth0.name : depth0, depth0)) + "</h2>\n";
        }, "6": function _(container, depth0, helpers, partials, data) {
            return "      <a class='join-button' data-group=" + container.escapeExpression(container.lambda(depth0 != null ? depth0.id : depth0, depth0)) + ">Join group</a>\n";
        }, "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            var stack1;

            return "<div>\n  <h1>Groups in your area</h1>\n  <table>\n    <tbody>\n" + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {}, depth0 != null ? depth0.items : depth0, { "name": "each", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "") + "\n  </tbody>\n  </table>\n</div>  ";
        }, "useData": true });
    templates['home'] = template({ "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            return "<div>\n  <h2>Home</h2>\n  <p>Welcome to our groups website! You can meet awesome people here.</p>\n  <p>Joining is easy. Just click <a href='/register'>here</a> to go to to the sign up page.</p>\n</div>";
        }, "useData": true });
    templates['layout'] = template({ "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            return "<div id='nav-region'>\n\n</div>\n<div id='flash-region' class='container'>\n\n</div>\n\n<div id=\"loader\" style=\"display:none\"></div>\n<div id='main-region' class='container animate-bottom'>\n\n</div>";
        }, "useData": true });
    templates['login'] = template({ "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            return "<div>\n\n  <form role=\"form\" id=\"login-form\">\n      <h2>Sign in</h2>\n  <p>Sign in to view and access our groups! :)</p>\n  <a href=# id='register-button'>Don't have an account yet?</a>\n    <div class=\"form-group\">\n      <input type=\"text\" id=\"username\" placeholder=\"Username\" class=\"form-control\" required>\n    </div>\n    <div class=\"form-group\">\n      <input type=\"password\" id=\"password\"placeholder=\"Password\" class=\"form-control\" required>\n    </div>\n    <div class=\"text-danger\" id=\"validation-error\">\n\n    </div>\n    <input type=\"submit\" class=\"btn btn-success\" id='login-button' value='Sign in'></input>\n  </form>\n</div>";
        }, "useData": true });
    templates['nav'] = template({ "1": function _(container, depth0, helpers, partials, data) {
            var stack1;

            return "\n              <li>\n                <a href=# id='profile-button'>\n                  <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span> " + container.escapeExpression(container.lambda((stack1 = depth0 != null ? depth0.user : depth0) != null ? stack1.username : stack1, depth0)) + "\n                </a>\n              </li>\n              <li>\n                <a href=# id='logout-button'>\n                  Logout\n                </a>\n              </li>\n";
        }, "3": function _(container, depth0, helpers, partials, data) {
            return "              <li><a href=# id='login-button'>Sign in</a></li>\n              <li><a href=# id='register-button'>Sign up</a></li>\n";
        }, "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            var stack1;

            return "<div>\n <nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n  \n      <div class=\"container\">\n        <div class=\"navbar-header\">\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n          <a class=\"navbar-brand\" href=\"#\" id='home-button'>Roadmap - Backbone</a>\n        </div>\n        <div id=\"navbar\" class=\"navbar-collapse collapse\">\n          <ul class=\"nav navbar-nav\">\n\n          </ul>\n\n          <ul class=\"nav navbar-nav navbar-right\">\n" + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {}, (stack1 = depth0 != null ? depth0.user : depth0) != null ? stack1.is_auth : stack1, { "name": "if", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.program(3, data, 0), "data": data })) != null ? stack1 : "") + "      </ul>\n        </div>\n  \n      </div>\n    </nav>\n\n    \n</div>";
        }, "useData": true });
    templates['profile'] = template({ "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            var helper,
                alias1 = depth0 != null ? depth0 : {},
                alias2 = helpers.helperMissing,
                alias3 = "function",
                alias4 = container.escapeExpression;

            return "<div>\n  <h2>" + alias4((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2, (typeof helper === "undefined" ? "undefined" : _typeof(helper)) === alias3 ? helper.call(alias1, { "name": "username", "hash": {}, "data": data }) : helper)) + "</h2>\n  \n  <p>" + alias4((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2, (typeof helper === "undefined" ? "undefined" : _typeof(helper)) === alias3 ? helper.call(alias1, { "name": "description", "hash": {}, "data": data }) : helper)) + "</p>\n\n\n  <a href=# id='logout-button'>Logout</a>\n</div>\n\n<!-- \nId, primary key,AI(auto incremented)  - unique \nusername - string,not null, 256(length)\nemail - string,not null, 256(length)\ndescription - string, nullable, 500(length)\npassword - string - plain- for the moment, no encryption needed, not null, 256(length)\navatarUrl - string, nullable, 500(length)\nage - integer,nullable, \ncurrentProject that he/she works on - string,nullable, 500(length)\nagency ( Brasov, Iasi, Cluj, Bucharest, Chisinau) - string,nullable, 500(length)\n\n  -->";
        }, "useData": true });
    templates['register'] = template({ "compiler": [7, ">= 4.0.0"], "main": function main(container, depth0, helpers, partials, data) {
            return "<div>\n\n\n  <form role=\"form\" id=\"login-form\">\n    <h2>Create an account</h2>\n    <p>Create an account to view and access our groups.</p>\n    <p>We're a happy, growing community! :)</p>\n      <div class=\"form-group\">\n        <input type=\"text\" id=\"username\" placeholder=\"Username\" class=\"form-control\">\n      </div>\n      <div class=\"form-group\">\n        <input type=\"email\" id=\"email\" placeholder=\"Email address\" class=\"form-control\">\n      </div>\n      <div class=\"form-group\">\n        <input type=\"password\" id=\"password\"placeholder=\"Password\" class=\"form-control\">\n      </div>\n      <div class=\"form-group\">\n        <input type=\"password\" id=\"password2\" placeholder=\"Enter your password again\" class=\"form-control\">\n      </div>\n      <div class=\"text-danger\" id=\"validation-error\">\n\n      </div>\n          <input type=\"submit\" class=\"btn btn-success\" id='register-button' value='Create account'></input>\n    </form>\n</div>";
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
    var error = _ref.error,
        info = _ref.info;

    this.model.set('error', error);
    this.model.set('info', info);
  }

});

module.exports = FlashView;

},{"../models/flash":"/home/adumitru/coding/roadmap-backbone/app/models/flash.js"}],"/home/adumitru/coding/roadmap-backbone/app/views/group.js":[function(require,module,exports){
"use strict";

var template = Hbs.templates.group;

var GroupView = Mn.View.extend({
  template: template
});

module.exports = GroupView;

},{}],"/home/adumitru/coding/roadmap-backbone/app/views/home.js":[function(require,module,exports){
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
    'click #register-button': 'show:register'
  },

  events: {
    'click .join-button': 'joinGroup'
  },

  joinGroup: function joinGroup(dom) {
    var link = dom.target;
    var group = $(link).data('group');
    // console.log($(link).data('group'));

    this.triggerMethod('do:joingroup', group);
  }
});

module.exports = Home;

},{"../auth":"/home/adumitru/coding/roadmap-backbone/app/auth.js"}],"/home/adumitru/coding/roadmap-backbone/app/views/layout.js":[function(require,module,exports){
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
  onDoJoinGroup: function onDoJoinGroup(group) {
    var _this6 = this;

    if (!auth.isAuthenticated()) {
      return this.showHome();
    };

    $.ajax({
      url: 'https://localhost:3000/api/group/' + group + '/add/' + auth.user.get('id'),
      method: 'PUT',
      success: function success(data) {
        console.log(data);

        _this6.triggerMethod('show:info', "Join successful!");
        _this6.onShowHome();
      },
      error: function error(err) {
        console.log(err);
      }
    });
    // console.log($(args).data("group"))
  }
});

module.exports = LayoutView;

},{"../auth":"/home/adumitru/coding/roadmap-backbone/app/auth.js","../collections/groups":"/home/adumitru/coding/roadmap-backbone/app/collections/groups.js","../models/group":"/home/adumitru/coding/roadmap-backbone/app/models/group.js","../models/local.user":"/home/adumitru/coding/roadmap-backbone/app/models/local.user.js","../models/user":"/home/adumitru/coding/roadmap-backbone/app/models/user.js","./flash":"/home/adumitru/coding/roadmap-backbone/app/views/flash.js","./group":"/home/adumitru/coding/roadmap-backbone/app/views/group.js","./home":"/home/adumitru/coding/roadmap-backbone/app/views/home.js","./login":"/home/adumitru/coding/roadmap-backbone/app/views/login.js","./nav":"/home/adumitru/coding/roadmap-backbone/app/views/nav.js","./profile":"/home/adumitru/coding/roadmap-backbone/app/views/profile.js","./register":"/home/adumitru/coding/roadmap-backbone/app/views/register.js"}],"/home/adumitru/coding/roadmap-backbone/app/views/login.js":[function(require,module,exports){
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

},{"../auth":"/home/adumitru/coding/roadmap-backbone/app/auth.js"}],"/home/adumitru/coding/roadmap-backbone/app/views/profile.js":[function(require,module,exports){
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

},{"../auth":"/home/adumitru/coding/roadmap-backbone/app/auth.js","../models/user":"/home/adumitru/coding/roadmap-backbone/app/models/user.js"}],"/home/adumitru/coding/roadmap-backbone/app/views/register.js":[function(require,module,exports){
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

},{"../models/register.user":"/home/adumitru/coding/roadmap-backbone/app/models/register.user.js"}]},{},["/home/adumitru/coding/roadmap-backbone/app/main.js"]);
