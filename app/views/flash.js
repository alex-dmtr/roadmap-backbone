var template = require('../templates/flash.hbs')
var Flash = require('../models/flash')

var FlashView = Mn.View.extend({
  // modelEvents: {
  //   'change': 'render'
  // },

  template: template,

  model: new Flash(),

  initialize: function({error}) {
    this.model.set('error', error)
  }

})

module.exports = FlashView