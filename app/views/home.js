var template = require('../templates/home.hbs')

var Index = Mn.View.extend({
  template: template,

  triggers: {
    'click #register-button': 'show:register'
  }
})

module.exports = Index