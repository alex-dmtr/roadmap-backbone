var template = Handlebars.templates.nav
var auth = require('../auth')

var NavView = Mn.View.extend({

  // getTemplate() {
  //   return template({
  //     user: auth.isAuthenticated() ? auth.user.toJSON() : null
  //   })
  // },

  template,

  serializeData() {
    var data = {};

    if (auth.isAuthenticated())
      data["user"] = auth.user.toJSON();

    return data;
  },
  triggers: {
    "click #home-button": "show:home",
    "click #login-button": "show:login",
    "click #register-button": "show:register",
    "click #profile-button": "show:profile",
    "click #logout-button": "do:logout"
  },



})

module.exports = NavView