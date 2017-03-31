var LayoutView = Marionette.View.extend({
  regions: {
    layout: '.layout-hook'
  },

  onShowRegister: function() {
    alert('got to register')
  }
})

module.exports = LayoutView