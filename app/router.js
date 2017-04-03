var Bb = require('backbone')
var Mn = require('backbone.marionette')

var LayoutView = require('./views/layout')
// var Controller = Marionette.Object.extend({
//   tagName: '#app-hook',
//   initialize: function() {
//     // this.options.regionManager = new Marionette.RegionManager({
//     //   regions: {
//     //     main: '#app-hook'
//     //   }
//     // })

//     var initialData = this.getOption('initialData')

//     var layout = new LayoutView()

//     this.options.layout = layout 
//   },

//   index: function() {
    
//     alert(this.$el)
//     var layout = this.getOption('layout')
//     layout.triggerMethod('show:index')
//   },
//   register: function() {
//     var layout = this.getOption('layout')
//     layout.triggerMethod('show:register')
//   }
// })

var Controller = {

}
var Router = Mn.AppRouter.extend({
  // controller: Controller,
  routes: {
    '': 'index',
    'register/': 'register'
  },

  initialize: function() {
    // this.controller = new Controller ({
    //   initialData: this.getOption('initialData')
    // })

    var layout = new LayoutView()

    this.options.layout = layout
  },

  index: function() {
    var layout = this.options.layout
    layout.triggerMethod('show:index')
  },

  register: function() {
    var layout = this.options.layout
    layout.triggerMethod('show:register')
  }
})

module.exports = Router