var template = Hbs.templates.profile

var ProfileView = Mn.View.extend({
  template,

  triggers: {
    'click #logout-button': 'do:logout'
  }
})

module.exports = ProfileView