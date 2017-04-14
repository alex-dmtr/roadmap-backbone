var LoginUser = Bb.Model.extend({

  defaults: {
    username: '',
    password: '',
  },

  validate: function(attrs, options) {
    if (attrs.username=="") return "Username can't be null."
    if (attrs.password=="") return "Password can't be null."

  },

  initialize: function() {
    // this.on('change', function(model) {
    //   if (!model.isValid())
    //     console.log(model.validationError)
    // })
  }

})

module.exports = LoginUser