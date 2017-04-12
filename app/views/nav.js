var template = Handlebars.templates.nav
var auth = require('../auth')

var NavView = Mn.View.extend({

  getTemplate: function() {
    return template({
      user: auth.isAuthenticated()? auth.user.toJSON(): null
    })
  },

  triggers: {
    "click #home-button": "show:home",
    "click #login-button": "show:login",
    "click #register-button": "show:register" ,
    "click #profile-button": "show:profile"
  },


 
})

module.exports = NavView