var App = require('./app')
var auth = require('./auth')

window.App = App
$(document).on("click", "a:not([data-bypass])", function(evt) {
  var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
  var root = location.protocol + "//" + location.host + Backbone.history.options.root;

  if (href.prop && href.prop.slice(0, root.length) === root) {
    evt.preventDefault();
    Bb.history.navigate(href.attr, true);
  }
});

// https://laracasts.com/discuss/channels/requests/tutorial-for-using-json-web-tokens
$.ajaxPrefilter(function( options ) {
  if (auth.isAuthenticated()) 
    options.beforeSend = function (xhr) { 
        xhr.setRequestHeader('Authorization', 'Bearer '+ auth.getToken());
    }
  });

// add loading spinner
// https://api.jquery.com/ajaxStart/
$(document).ajaxStart(function() {
  $("#loader").show()
  // $("#main-region").hide()
})

// https://api.jquery.com/ajaxStop/
$(document).ajaxStop(function() {
  $("#loader").hide()
  // $("#main-region").show()
})

// $.ajax({
//   url:"https://localhost:3000/api/groups", 
//   success: (data) => {
//     console.log(data)
//   },
//   error: (err) => {
//     console.log(err)
//   }

// })

$(function() {
  App.start()  
})