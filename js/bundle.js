(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var models = require('./models')

var User = models.User

var you = new User()

while (!you.isValid())
{
  you.set('email', prompt('put in your email'))
}

alert('your email is correct')
},{"./models":2}],2:[function(require,module,exports){
module.exports = {
  User: require('./user')
}
},{"./user":3}],3:[function(require,module,exports){
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var User = Backbone.Model.extend({
  defaults: {
    idAttribute: "_id",
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
},{}]},{},[1]);
