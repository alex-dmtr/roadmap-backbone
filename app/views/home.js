var home = Handlebars.templates.home
var groupsTemplate = Handlebars.templates.groups

var auth = require('../auth')
var Home = Mn.View.extend({
  getTemplate: function() {

    if (!auth.isAuthenticated())
      return home
    else {
    
      return groupsTemplate

    }
  },

  triggers: {
    'click #register-button': 'show:register',
    // 'click .join-button': 'do:joingroup'
  },

  events: {
    'click .join-button': 'joinGroup'
  },

  joinGroup(dom) {
    let link = dom.target;
    let group = $(link).data('group');
    // console.log($(link).data('group'));

    this.triggerMethod('do:joingroup', group);
  } 

})

module.exports = Home