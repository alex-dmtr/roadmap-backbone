var Handlebars = require('handlebars')
var register = require('./register')
var index = require('./index')
var Bb = require('backbone')
var Mn = require('backbone.marionette')

var LayoutView = Mn.View.extend({
  // template: Handlebars.compile("Hello, {{name}}"),
  // model: new Backbone.Model({name: 'Steve'}),
  // template: Handlebars.compile(`
  //   <div id='layout-hook'>
  //   </div>
  // `),
  el: '#layout-hook',
  regions: {
    layout: '#layout-hook'
  },

  onShowIndex: function() {
    console.log('at index')
    
    this.showChildView('layout', new index())
    Bb.history.navigate('/')
  },

  onShowRegister: function() {
    this.showChildView('layout', new register())
    Bb.history.navigate('register/')
  }
})

module.exports = LayoutView