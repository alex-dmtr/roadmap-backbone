(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var models = require('./models')
var Router = require('./router')

var App = new Marionette.Application({
  onStart: function(options) {

    var router = new Router(options)

    /** Starts the URL handling framework */
    Backbone.history.start()
  }
})

App.start()
},{"./models":3,"./router":6}],2:[function(require,module,exports){
var Group = Backbone.Model.extend({
  idAtribute: "_id",
  defaults: {
    name: 'name',
    ownerId: null,
    description: 'desc',
    avatarUrl: 'avatarUrl',
    memberIds: []
  },

  initialize: function() {

  }
})

module.exports = Group
},{}],3:[function(require,module,exports){
module.exports = {
  User: require('./user'),
  Group: require('./group'),
  Post: require('./post')
}
},{"./group":2,"./post":4,"./user":5}],4:[function(require,module,exports){
var Post = Backbone.Model.extend({
  idAttribute: "_id",
  defaults: {
    message: "msg",
    createdAt: new Date(),
    ownerId: null,
    groupId: null
  }
})

module.exports = Post
},{}],5:[function(require,module,exports){
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var User = Backbone.Model.extend({
  idAttribute: "_id",  
  defaults: {
    username: 'username',
    email: 'email',
    description: 'desc',
    password: 'pass',
    age: 21,
    currentProject: 'project',
    agency: 'agency'
  },

  validate: function(attrs, options) {
    if (attrs.username=="") return "username can't be null"
    if (attrs.password=="") return "password can't be null"
    if (!validateEmail(attrs.email)) return "email not valid"

  },

  initialize: function() {
    this.on('change', function(model) {
      if (!model.isValid())
        console.log(model.validationError)
    })
  }

})

module.exports = User
},{}],6:[function(require,module,exports){
var LayoutView = require('./views/layout')

var Controller = Marionette.Object.extend({
  regions: {
    main: '#app-hook'
  },
  initialize: function() {
    // this.options.regionManager = new Marionette.RegionManager({
    //   regions: {
    //     main: '#app-hook'
    //   }
    // })

    var initialData = this.getOption('initialData')

    var layout = new LayoutView()

    this.options.layout = layout 
  },

  index: function() {
    $("body").append("Welcome home!")
  },
  register: function() {
    var layout = this.getOption('layout')
    layout.triggerMethod('show:register')
  }
})

var Router = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'index',
    'register/': 'register'
  },

  initialize: function() {
    this.controller = new Controller ({
      initialData: this.getOption('initialData')
    })
  }
})

module.exports = Router
},{"./views/layout":7}],7:[function(require,module,exports){
var LayoutView = Marionette.View.extend({
  regions: {
    layout: '.layout-hook'
  },

  onShowRegister: function() {
    alert('got to register')
  }
})

module.exports = LayoutView
},{}]},{},[1]);
