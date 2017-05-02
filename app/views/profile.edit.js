var template = Hbs.templates.profileedit;

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
          alert('saved OK');
        })
        .catch(err => {
          alert(JSON.stringify(err));
        })
      // alert(JSON.stringify(obj));
    }
  }
});

module.exports = ProfileEditView;