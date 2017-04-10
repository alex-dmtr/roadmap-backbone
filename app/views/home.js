var template = Handlebars.templates.home

var Index = Mn.View.extend({
  template: template,

  triggers: {
    'click #register-button': 'show:register'
  }
})

module.exports = Index