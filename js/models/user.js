function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var User = Backbone.Model.extend({
  defaults: {
    idAttribute: "_id",
    username: 'username',
    email: 'email',
    description: 'desc',
    password: 'pass',
    age: 21,
    currentProject: 'project',
    agency: 'agency'
  },

  validate: function(attrs, options) {
    if (attrs.username=="") return "username can't be null"
    if (attrs.password=="") return "password can't be null"
    if (!validateEmail(attrs.email)) return "email not valid"

  },

  initialize: function() {
    this.on('change', function(model) {
      if (!model.isValid())
        console.log(model.validationError)
    })
  }

})

module.exports = User