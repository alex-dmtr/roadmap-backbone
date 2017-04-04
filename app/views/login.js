var Hbs = require('handlebars')
var Bb = require('backbone')
var Mn = require('backbone.marionette')
var template = require('../templates/login.hbs') 

var LoginView = Mn.View.extend({
  template: template(),

  ui: {
    inputUsername: "input#username",
    inputPassword: "input#password",
    validationError: "#validation-error"
  },

  triggers: {
    'click #register-button': 'show:register',
    'click #login-button': 'send:login'
  },

  onSendLogin: function() {
    this.model.set('username', this.getUI('inputUsername').val())
    this.model.set('password', this.getUI('inputPassword').val())

    if (!this.model.isValid())
    {
      this.getUI('validationError').text(this.model.validationError)
    }
    else
    {
      this.triggerMethod('do:login')
    }
  },

  initialize: function() {
    // console.log(this.model.toJSON())
  }
})

module.exports = LoginView