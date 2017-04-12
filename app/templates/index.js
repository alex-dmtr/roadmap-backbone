(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['flash'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "  <div class=\"alert alert-danger\">\n  <strong>Error</strong>\n    \n      <p>"
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "</p>\n  </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div>\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>";
},"useData":true});
templates['groups'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "  <tr>\n    <div class=\"row\">\n    <div class=\"col-md-4\">\n      <img src=\""
    + alias2(alias1((depth0 != null ? depth0.avatarUrl : depth0), depth0))
    + "\" class=\"img img-responsive\"></img>\n\n    </div>\n\n    <div class=\"col-md-8\">\n      <h2>\n  "
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + " </h2>\n      <p>"
    + alias2(alias1((depth0 != null ? depth0.description : depth0), depth0))
    + "</p>\n      <a>Join group</a>\n      \n      <p>Created by: <strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.username : stack1), depth0))
    + "</strong></p>\n\n  \n    </div>\n    </div>\n  \n  </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div>\n  <h1>Groups in your area</h1>\n  <table>\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n  </tbody>\n  </table>\n</div>  ";
},"useData":true});
templates['home'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\n  <h2>Home</h2>\n  <p>Welcome to our groups website! You can meet awesome people here.</p>\n  <p>Joining is easy. Just click <a href='/register'>here</a> to go to to the sign up page.</p>\n</div>";
},"useData":true});
templates['layout'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id='nav-region'>\n\n</div>\n<div id='flash-region' class='container'>\n\n</div>\n<div id='main-region' class='container'>\n\n</div>";
},"useData":true});
templates['login'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\n\n  <form role=\"form\" id=\"login-form\">\n      <h2>Sign in</h2>\n  <p>Sign in to view and access our groups! :)</p>\n  <a href=# id='register-button'>Don't have an account yet?</a>\n    <div class=\"form-group\">\n      <input type=\"text\" id=\"username\" placeholder=\"Username\" class=\"form-control\" required>\n    </div>\n    <div class=\"form-group\">\n      <input type=\"password\" id=\"password\"placeholder=\"Password\" class=\"form-control\" required>\n    </div>\n    <div class=\"text-danger\" id=\"validation-error\">\n\n    </div>\n    <input type=\"submit\" class=\"btn btn-success\" id='login-button' value='Sign in'></input>\n  </form>\n</div>";
},"useData":true});
templates['nav'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "              <li><a href=# id='profile-button'>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), depth0))
    + "</a></li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "              <li><a href=# id='login-button'>Sign in</a></li>\n              <li><a href=# id='register-button'>Sign up</a></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div>\n <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n  \n      <div class=\"container\">\n        <div class=\"navbar-header\">\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n          <a class=\"navbar-brand\" href=\"#\" id='home-button'>Roadmap - Backbone</a>\n        </div>\n        <div id=\"navbar\" class=\"navbar-collapse collapse\">\n          <ul class=\"nav navbar-nav\">\n\n          </ul>\n\n          <ul class=\"nav navbar-nav navbar-right\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.jwt : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "      </ul>\n        </div>\n  \n      </div>\n    </nav>\n</div>";
},"useData":true});
templates['profile'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div>\n  <h2>"
    + container.escapeExpression(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"username","hash":{},"data":data}) : helper)))
    + "</h2>\n  \n\n  <a href=# id='logout-button'>Logout</a>\n</div>";
},"useData":true});
templates['register'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\n\n\n  <form role=\"form\" id=\"login-form\">\n    <h2>Create an account</h2>\n    <p>Create an account to view and access our groups.</p>\n    <p>We're a happy, growing community! :)</p>\n      <div class=\"form-group\">\n        <input type=\"text\" id=\"username\" placeholder=\"Username\" class=\"form-control\">\n      </div>\n      <div class=\"form-group\">\n        <input type=\"password\" id=\"password\"placeholder=\"Password\" class=\"form-control\">\n      </div>\n      <button type=\"button\" class=\"btn btn-success\" id='login-button'>Sign in</button>\n    </form>\n</div>";
},"useData":true});
})();