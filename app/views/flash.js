var template = Handlebars.templates.flash
var Flash = require('../models/flash')

var FlashView = Mn.View.extend({
  // modelEvents: {
  //   'change': 'render'
  // },

  template: template,

  model: new Flash(),

  initialize: function({error, info}) {
    this.model.set('error', error)
    this.model.set('info', info)
  }

})

module.exports = FlashView