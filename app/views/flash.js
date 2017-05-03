var template = Handlebars.templates.flash;
var Flash = require('../flash');

var FlashView = Mn.View.extend({
  // modelEvents: {
  //   'change': 'render'
  // },

  model: Flash.model,

  template,

  events: {
    'click .close': function (dom) {
      let link = dom.target;
      let alert = $(link).data('alert');

      Flash.removeAlert(alert);
    }
  },

  initialize() {
    var _this = this;
    Flash.subscribe(model => {
      _this.render();
    });
  }

})

module.exports = FlashView