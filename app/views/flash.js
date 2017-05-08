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
      let alertID = $(link).data('alert');

      Flash.removeAlert(alertID);
    }
  },


  initialize() {
    var _this = this;

    function update({
      model,
      push,
      pop
    }) {
      _this.render();
      if (push) {
        $(`#alert${push.id}`).show(1000);
        setTimeout(() => {
          $(`#alert${push.id}`).hide(1000, () => {
            Flash.removeAlert(push.id);
          })
        }, 5000);
      }
    }
    Flash.subscribe(update);
  }

})

module.exports = FlashView