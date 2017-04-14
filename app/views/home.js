var home = Handlebars.templates.home
var groupsTemplate = Handlebars.templates.groups

var auth = require('../auth')
var Home = Mn.View.extend({
  getTemplate: function() {

    if (!auth.isAuthenticated())
      return home
    else {
    
      return groupsTemplate

    }
  },

  triggers: {
    'click #register-button': 'show:register',
    'click .join-button': 'do:joingroup'
  },

})

module.exports = Home