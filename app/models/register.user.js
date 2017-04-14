function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password) {
  if (password.length == 0) return "Password can't be empty";
  
  if (!(password.length >= 3 && password.length <= 12))
    return "Password must be between 3 and 12 characters";

  return null
}
var RegisterUser = Bb.Model.extend({
 validate: function(attrs, options) {
    if (attrs.username=="") return "Username can't be empty."
    if (!validateEmail(attrs.email)) return "Email not valid."
    
    var passError = validatePassword(attrs.password)
    if (passError) return passError
    if (attrs.password !== attrs.password2)
      return "Passwords don't match"

  },
})

module.exports = RegisterUser