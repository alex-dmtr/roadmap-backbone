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
    '': 'home',
    'login': 'login',
    'register': 'register',
    'profile': 'profile',
    'profile/edit': 'profileEdit',
    'groups/:group': 'showGroup'
  },

  initialize(options) {
    this.options = options
    // this.controller = new Controller ({
    //   initialData: this.getOption('initialData')
    // })
  },

  home() {
    var layout = this.options.layoutView
    layout.triggerMethod('show:home')
  },

  login() {
    var layout = this.options.layoutView
    layout.triggerMethod('show:login')
  },

  register() {
    var layout = this.options.layoutView

    layout.triggerMethod('show:register')
  },

  profile() {
    var layout = this.options.layoutView

    layout.triggerMethod('show:profile')
  },

  showGroup(group) {
    var layout = this.options.layoutView

    // console.log(group)
    layout.triggerMethod('show:group', group)
  },

  profileEdit() {
    var layout = this.options.layoutView;
    layout.triggerMethod('show:profileEdit');
  }
})

module.exports = Router