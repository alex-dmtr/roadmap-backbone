var models = require('./models')

var User = models.User

var you = new User()

while (!you.isValid())
{
  you.set('email', prompt('put in your email'))
}

alert('your email is correct')