var template = Hbs.templates.profile;
var User = require('../models/user');
var auth = require('../auth');

var ProfileView = Mn.View.extend({
  template,

  triggers: {
    'click #logout-button': 'do:logout'
  },

  // initialize() {
  //   if (!auth.isAuthenticated())
  //     return this.triggerMethod('show:home');

  //   this.model = new User();
  //   this.model.set('id', auth.user.get('id'));
  //   this.model.fetch()
  //     .then(() => {
  //       console.log(this.model.toJSON());
  //     })
  // }
})

module.exports = ProfileView