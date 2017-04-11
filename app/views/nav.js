var template = Handlebars.templates.nav

var NavView = Mn.View.extend({

  getTemplate: function() {
    return template({
      user: this.user? this.user.toJSON(): null
    })
  },

  triggers: {
    "click #home-button": "show:home",
    "click #login-button": "show:login",
    "click #register-button": "show:register" 
  },

  initialize: function({user}) {
    this.user = user

  },

  onRender: function() {
  }

 
})

module.exports = NavView