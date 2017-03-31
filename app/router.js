var LayoutView = require('./views/layout')

var Controller = Marionette.Object.extend({
  regions: {
    main: '#app-hook'
  },
  initialize: function() {
    // this.options.regionManager = new Marionette.RegionManager({
    //   regions: {
    //     main: '#app-hook'
    //   }
    // })

    var initialData = this.getOption('initialData')

    var layout = new LayoutView()

    this.options.layout = layout 
  },

  index: function() {
    $("body").append("Welcome home!")
  },
  register: function() {
    var layout = this.getOption('layout')
    layout.triggerMethod('show:register')
  }
})

var Router = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'index',
    'register/': 'register'
  },

  initialize: function() {
    this.controller = new Controller ({
      initialData: this.getOption('initialData')
    })
  }
})

module.exports = Router