var template = Hbs.templates.profileedit;
var Flash = require('../flash');
var ProfileEditView = Mn.View.extend({
  template,

  events: {
    'click #save-button': function (e) {
      e.preventDefault();
      let obj = {
        avatarUrl: $("#avatarUrl").val(),
        email: $("#email").val(),
        description: $("#description").val(),
        age: $("#age").val(),
        currentProject: $("#currentProject").val(),
        agency: $("#agency").val()
      };

      Object.keys(obj).forEach(key => {
        this.model.set(key, obj[key]);
      });

      this.model.save()
        .then(() => {
          Flash.pushError("User data updated succesfuly");
        })
        .catch(err => {
          Flash.pushError("Error updating data");
        });
      // alert(JSON.stringify(obj));
    },

    'click #delete-button': function () {
      this.model.destroy()
        .then(() => {
          this.triggerMethod('do:logout');
        })
        .catch(err => {
          Flash.pushError("Delete unsuccesful");
        })
    }
  }
});

module.exports = ProfileEditView;