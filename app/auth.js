var LocalUser = require('./models/local.user')

class AuthClass {

  constructor() {
    this.user = new LocalUser()
    this.user.fetch()
    
  }


  getToken() {
    if (!this.isAuthenticated())
      return null

    return this.user.get('jwt')
  }

  isAuthenticated() {
    return this.user && this.user.get('is_auth')
  }


  doLogin(user) {
    
    return new Promise((resolve, reject) => {
      console.log(user.toJSON())
      $.post({
        url: `https://localhost:3000/api/auth`,
        data: { username: user.get('username'), password: user.get('password')},
        success: (data) =>  {

          this.user.set('id', data.user.id)
          this.user.set('username', data.user.username)
          this.user.set('jwt', data.jwt)
          this.user.set('is_auth', true)

          this.user.save()

          resolve(this.user)
        },
        error: (err) => {

          reject(err)
        }
      })

    })
  }

  doLogout() {
    this.user.destroy()
    this.user.unset('username')
    this.user.unset('jwt')
    this.user.unset('id')
  }

  doRegister(user) {
    return new Promise(function(resolve, reject) {
      $.post({
        url: `https://localhost:3000/api/users`,
        data: {
          username: user.get('username'),
          password: user.get('password'),
          email: user.get('email')
        },
        success: function() {
          resolve()
        },
        error: function(err) {
          reject(err)
        }
      })
    })
  }


}

var Auth = new AuthClass()

module.exports = Auth