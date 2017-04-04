var template = require('../templates/register.hbs')

var Register = Mn.View.extend({
  // tagName: 'div',
  template: template()
})

module.exports = Register