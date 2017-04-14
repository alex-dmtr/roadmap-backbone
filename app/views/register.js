var template = Handlebars.templates.register
var RegisterUser = require('../models/register.user')

var Register = Mn.View.extend({
  // tagName: 'div',
  template,

  model: new RegisterUser,

  triggers: {
    'click #register-button': 'send:register'
  },

  onSendRegister() {
    this.model.set('username', $("#username").val())
    this.model.set('password', $("#password").val())
    this.model.set('password2', $("#password2").val())
    this.model.set('email', $("#email").val())

    if (!this.model.isValid())
    {
      $('#validation-error').text(this.model.validationError)
    }
    else
    {
      this.triggerMethod('do:register', this.model)
    }
  }
})

module.exports = Register