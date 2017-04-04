function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var User = Bb.Model.extend({
  // idAttribute: "_id",  
  defaults: {
    username: '',
    email: '',
    description: '',
    password: '',
    age: 21,
    currentProject: '',
    agency: ''
  },

  validate: function(attrs, options) {
    if (attrs.username=="") return "Username can't be null."
    if (attrs.password=="") return "Password can't be null."
    if (attrs.email!=="" && !validateEmail(attrs.email)) return "Email not valid."

  },

  initialize: function() {
    this.on('change', function(model) {
      if (!model.isValid())
        console.log(model.validationError)
    })
  }

})

module.exports = User