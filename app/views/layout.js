var Handlebars = require('handlebars')
// var register = require('./register')
var Bb = require('backbone')
var Mn = require('backbone.marionette')
var NavView = require('./nav')


var LayoutView = Mn.View.extend({
  regions: {
    navRegion: '#nav-region'
  },

  template: _.template(`
      <div id='nav-region'>
      </div>
  `),

  // onShowIndex: function() {
  //   console.log('at index')
    
  //   this.showChildView('layout', new index())
  //   Bb.history.navigate('/')
  // },

  // onShowRegister: function() {
  //   this.showChildView('layout', new register())
  //   Bb.history.navigate('register/')
  // },

  onRender: function() {
    this.showChildView('navRegion', new NavView())
  }
})

module.exports = LayoutView