var home = Handlebars.templates.home;
var groupsTemplate = Handlebars.templates.groups;

var auth = require('../auth');
var Group = require('../models/group');
var Flash = require('../flash');
var config = require('../config');

var Home = Mn.View.extend({
  getTemplate: function () {

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
    'click .join-button': function joinGroup(dom) {
      let link = dom.target;
      let group = $(link).data('group');
      // console.log($(link).data('group'));

      this.triggerMethod('do:joingroup', group);
    },

    'click #groupSubmit': function (e) {
      e.preventDefault();
      let group = {
        name: $("#groupName").val(),
        description: $("#groupDescription").val(),
        avatarUrl: $("#groupAvatarUrl").val()
      };

      let newGroup = new Group();
      // Object.keys(group, key => {
      //   newGroup.set(key, group[key]);
      // });

      newGroup.save(group, {
          url: config.urls.groups()
        })
        .then(() => {
          Flash.pushInfo("Group created succesfully");
          this.triggerMethod('show:home');
        })
        .catch(err => {
          Flash.pushError("Couldn't create group");
        })

    }
  },



})

module.exports = Home