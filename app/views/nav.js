var Bb = require('backbone')
var Mn = require('backbone.marionette')
var User = require('./../models/user')

var NavView = Mn.View.extend({
  // el: '#nav-hook',
  template: _.template(`
  <nav class="navbar navbar-inverse" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Roadmap - Backbone</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <form class="navbar-form navbar-right" role="form" id="login-form">
            <div class="form-group">
              <input type="text" id="username" placeholder="Username" class="form-control">
            </div>
            <div class="form-group">
              <input type="password" id="password"placeholder="Password" class="form-control">
            </div>
            <button type="button" class="btn btn-success" id='login-button'>Sign in</button>
          </form>
        </div><!--/.navbar-collapse -->
  
      </div>
    </nav>
     
  `),

  ui: {
    inputUsername: "input#username",
    inputPassword: "input#password",
    inputButton: "input#login-button"
  },

  events: {
    "click #login-button": "login"
  },

  initialize: function() {
    
  },

  login: function(event) {
    event.preventDefault()

    var user = {
      username: this.getUI('inputUsername').val(),
      password: this.getUI('inputPassword').val()
    }

    $.post({
      url: "https://localhost:3000/api/auth",
      data: user,
      success: function(data) {
        alert(JSON.stringify(data))
      },
      error: function(err) {
        alert(JSON.stringify(err))
      }
    })
}

 
})

module.exports = NavView