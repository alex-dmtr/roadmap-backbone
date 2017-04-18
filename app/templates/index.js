(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['flash'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "  <div class=\"alert alert-danger\">\n  <strong>Error</strong>\n    \n      <p>"
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "</p>\n  </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "  <div class=\"alert alert-info\">\n    <strong>Info</strong>\n    <p>"
    + container.escapeExpression(((helper = (helper = helpers.info || (depth0 != null ? depth0.info : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"info","hash":{},"data":data}) : helper)))
    + "\n  </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.info : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>";
},"useData":true});
templates['group'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "          <li>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.username : depth0), depth0))
    + "</li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "          <strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.username : stack1), depth0))
    + "</strong>\n          <li>"
    + alias2(alias1((depth0 != null ? depth0.message : depth0), depth0))
    + "</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n <div>\n\n  <div class=\"col-xs-6\">\n\n    \n    <h1>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " </h1>\n      <p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n\n      <p>Group owner: <strong>"
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.username : stack1), depth0))
    + "</strong>\n      <p>Members:</p>\n      <ul>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.members : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </ul>\n\n      <h3>Posts</h3>\n      <ul>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.posts : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </ul>\n  </div>\n  <div class=\"col-xs-6\">\n    <img src='"
    + alias4(((helper = (helper = helpers.avatarUrl || (depth0 != null ? depth0.avatarUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"avatarUrl","hash":{},"data":data}) : helper)))
    + "' class=\"img img-responsive img-thumbnail\"></img>\n  </div>\n</div>";
},"useData":true});
templates['groups'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return "  <tr >\n \n    <div class=\"row\">\n    <div class=\"col-xs-4\">\n      <img src=\""
    + alias2(alias1((depth0 != null ? depth0.avatarUrl : depth0), depth0))
    + "\" class=\"img img-responsive\"></img>\n\n    </div>\n\n    <div class=\"col-xs-8\">\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.is_member : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "      <p>"
    + alias2(alias1((depth0 != null ? depth0.description : depth0), depth0))
    + "</p>\n      <p><em>"
    + alias2(alias1((depth0 != null ? depth0.num_members : depth0), depth0))
    + " members</em></p>\n"
    + ((stack1 = helpers.unless.call(alias3,(depth0 != null ? depth0.is_member : depth0),{"name":"unless","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      \n      <p>Created by: <strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.username : stack1), depth0))
    + "</strong></p>\n\n  \n    </div>\n    </div>\n  </tr>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "      <h2>\n      <a href=\"/groups/"
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</a> </h2>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "        <h2>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</h2>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "      <a class='join-button' data-group="
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.id : depth0), depth0))
    + ">Join group</a>\n";
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
    return "<div id='nav-region'>\n\n</div>\n<div id='flash-region' class='container'>\n\n</div>\n\n<div id=\"loader\" style=\"display:none\"></div>\n<div id='main-region' class='container animate-bottom'>\n\n</div>";
},"useData":true});
templates['login'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\n\n  <form role=\"form\" id=\"login-form\">\n      <h2>Sign in</h2>\n  <p>Sign in to view and access our groups! :)</p>\n  <a href=# id='register-button'>Don't have an account yet?</a>\n    <div class=\"form-group\">\n      <input type=\"text\" id=\"username\" placeholder=\"Username\" class=\"form-control\" required>\n    </div>\n    <div class=\"form-group\">\n      <input type=\"password\" id=\"password\"placeholder=\"Password\" class=\"form-control\" required>\n    </div>\n    <div class=\"text-danger\" id=\"validation-error\">\n\n    </div>\n    <input type=\"submit\" class=\"btn btn-success\" id='login-button' value='Sign in'></input>\n  </form>\n</div>";
},"useData":true});
templates['nav'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n              <li>\n                <a href=# id='profile-button'>\n                  <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span> "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), depth0))
    + "\n                </a>\n              </li>\n              <li>\n                <a href=# id='logout-button'>\n                  Logout\n                </a>\n              </li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "              <li><a href=# id='login-button'>Sign in</a></li>\n              <li><a href=# id='register-button'>Sign up</a></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div>\n <nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n  \n      <div class=\"container\">\n        <div class=\"navbar-header\">\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n          <a class=\"navbar-brand\" href=\"#\" id='home-button'>Roadmap - Backbone</a>\n        </div>\n        <div id=\"navbar\" class=\"navbar-collapse collapse\">\n          <ul class=\"nav navbar-nav\">\n\n          </ul>\n\n          <ul class=\"nav navbar-nav navbar-right\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.is_auth : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "      </ul>\n        </div>\n  \n      </div>\n    </nav>\n\n    \n</div>";
},"useData":true});
templates['profile'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div>\n  <h2>"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "</h2>\n  \n  <p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n\n  <table class=\"table\" style=\"max-width:400px\">\n    <tr>\n      <td>Age</td>\n      <td>"
    + alias4(((helper = (helper = helpers.age || (depth0 != null ? depth0.age : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"age","hash":{},"data":data}) : helper)))
    + "</td>\n    </tr>\n    <tr>\n      <td>Current project</td>\n      <td>"
    + alias4(((helper = (helper = helpers.currentProject || (depth0 != null ? depth0.currentProject : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentProject","hash":{},"data":data}) : helper)))
    + "</td>\n    </tr>\n    <tr>\n      <td>Agency</td>\n      <td>"
    + alias4(((helper = (helper = helpers.agency || (depth0 != null ? depth0.agency : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"agency","hash":{},"data":data}) : helper)))
    + "</td>\n    </tr>\n  </table>\n\n  <a href=# id='logout-button'>Logout</a>\n</div>\n\n<!-- \nId, primary key,AI(auto incremented)  - unique \nusername - string,not null, 256(length)\nemail - string,not null, 256(length)\ndescription - string, nullable, 500(length)\npassword - string - plain- for the moment, no encryption needed, not null, 256(length)\navatarUrl - string, nullable, 500(length)\nage - integer,nullable, \ncurrentProject that he/she works on - string,nullable, 500(length)\nagency ( Brasov, Iasi, Cluj, Bucharest, Chisinau) - string,nullable, 500(length)\n\n  -->";
},"useData":true});
templates['register'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\n\n\n  <form role=\"form\" id=\"login-form\">\n    <h2>Create an account</h2>\n    <p>Create an account to view and access our groups.</p>\n    <p>We're a happy, growing community! :)</p>\n      <div class=\"form-group\">\n        <input type=\"text\" id=\"username\" placeholder=\"Username\" class=\"form-control\">\n      </div>\n      <div class=\"form-group\">\n        <input type=\"email\" id=\"email\" placeholder=\"Email address\" class=\"form-control\">\n      </div>\n      <div class=\"form-group\">\n        <input type=\"password\" id=\"password\"placeholder=\"Password\" class=\"form-control\">\n      </div>\n      <div class=\"form-group\">\n        <input type=\"password\" id=\"password2\" placeholder=\"Enter your password again\" class=\"form-control\">\n      </div>\n      <div class=\"text-danger\" id=\"validation-error\">\n\n      </div>\n          <input type=\"submit\" class=\"btn btn-success\" id='register-button' value='Create account'></input>\n    </form>\n</div>";
},"useData":true});
})();