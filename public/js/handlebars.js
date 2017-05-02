this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};
this["Handlebars"]["templates"]["flash"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "  <div class=\"alert alert-danger\">\r\n  <strong>Error</strong>\r\n    \r\n      <p>"
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"error","hash":{},"data":data}) : helper)))
    + "</p>\r\n  </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "  <div class=\"alert alert-info\">\r\n    <strong>Info</strong>\r\n    <p>"
    + container.escapeExpression(((helper = (helper = helpers.info || (depth0 != null ? depth0.info : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"info","hash":{},"data":data}) : helper)))
    + "\r\n  </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.info : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n</div>";
},"useData":true});
this["Handlebars"]["templates"]["group"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "          <li>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.username : depth0), depth0))
    + "</li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\r\n <div>\r\n\r\n  <div class=\"col-xs-6\">\r\n\r\n    \r\n    <h1>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " </h1>\r\n      <p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n      <a>Join group</a>\r\n\r\n      <p>Group owner: <strong>"
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.username : stack1), depth0))
    + "</strong>\r\n      <p>Members:</p>\r\n      <ul>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.members : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </ul>\r\n  </div>\r\n  <div class=\"col-xs-6\">\r\n    <img src='"
    + alias4(((helper = (helper = helpers.avatarUrl || (depth0 != null ? depth0.avatarUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"avatarUrl","hash":{},"data":data}) : helper)))
    + "' class=\"img img-responsive img-thumbnail\"></img>\r\n  </div>\r\n</div>";
},"useData":true});
this["Handlebars"]["templates"]["groups"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "  <tr >\r\n \r\n    <div class=\"row\">\r\n    <div class=\"col-xs-4\">\r\n      <img src=\""
    + alias2(alias1((depth0 != null ? depth0.avatarUrl : depth0), depth0))
    + "\" class=\"img img-responsive\"></img>\r\n\r\n    </div>\r\n\r\n    <div class=\"col-xs-8\">\r\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.is_member : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "      <p>"
    + alias2(alias1((depth0 != null ? depth0.description : depth0), depth0))
    + "</p>\r\n      <p><em>"
    + alias2(alias1((depth0 != null ? depth0.num_members : depth0), depth0))
    + " members</em></p>\r\n"
    + ((stack1 = helpers.unless.call(alias3,(depth0 != null ? depth0.is_member : depth0),{"name":"unless","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      \r\n      <p>Created by: <strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.username : stack1), depth0))
    + "</strong></p>\r\n\r\n  \r\n    </div>\r\n    </div>\r\n  </tr>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "      <h2>\r\n      <a href=\"/groups/"
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</a> </h2>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "        <h2>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</h2>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "      <a class='join-button' data-group="
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.id : depth0), depth0))
    + ">Join group</a>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div>\r\n  <h1>Groups in your area</h1>\r\n  <table>\r\n    <tbody>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n  </tbody>\r\n  </table>\r\n</div>  ";
},"useData":true});
this["Handlebars"]["templates"]["home"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\r\n  <h2>Home</h2>\r\n  <p>Welcome to our groups website! You can meet awesome people here.</p>\r\n  <p>Joining is easy. Just click <a href='/register'>here</a> to go to to the sign up page.</p>\r\n</div>";
},"useData":true});
this["Handlebars"]["templates"]["layout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id='nav-region'>\r\n\r\n</div>\r\n<div id='flash-region' class='container'>\r\n\r\n</div>\r\n\r\n<div id=\"loader\" style=\"display:none\"></div>\r\n<div id='main-region' class='container animate-bottom'>\r\n\r\n</div>";
},"useData":true});
this["Handlebars"]["templates"]["login"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\r\n\r\n  <form role=\"form\" id=\"login-form\">\r\n      <h2>Sign in</h2>\r\n  <p>Sign in to view and access our groups! :)</p>\r\n  <a href=# id='register-button'>Don't have an account yet?</a>\r\n    <div class=\"form-group\">\r\n      <input type=\"text\" id=\"username\" placeholder=\"Username\" class=\"form-control\" required>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <input type=\"password\" id=\"password\"placeholder=\"Password\" class=\"form-control\" required>\r\n    </div>\r\n    <div class=\"text-danger\" id=\"validation-error\">\r\n\r\n    </div>\r\n    <input type=\"submit\" class=\"btn btn-success\" id='login-button' value='Sign in'></input>\r\n  </form>\r\n</div>";
},"useData":true});
this["Handlebars"]["templates"]["nav"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n              <li>\r\n                <a href=# id='profile-button'>\r\n                  <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span> "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), depth0))
    + "\r\n                </a>\r\n                  </li>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "              <li><a href=# id='login-button'>Sign in</a></li>\r\n              <li><a href=# id='register-button'>Sign up</a></li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div>\r\n <nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\r\n  \r\n      <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\r\n            <span class=\"sr-only\">Toggle navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n          </button>\r\n          <a class=\"navbar-brand\" href=\"#\" id='home-button'>Roadmap - Backbone</a>\r\n        </div>\r\n        <div id=\"navbar\" class=\"navbar-collapse collapse\">\r\n          <ul class=\"nav navbar-nav\">\r\n\r\n          </ul>\r\n\r\n          <ul class=\"nav navbar-nav navbar-right\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.is_auth : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "      </ul>\r\n        </div>\r\n  \r\n      </div>\r\n    </nav>\r\n\r\n    \r\n</div>";
},"useData":true});
this["Handlebars"]["templates"]["profile"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div>\r\n  <h2>"
    + container.escapeExpression(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"username","hash":{},"data":data}) : helper)))
    + "</h2>\r\n  \r\n\r\n  <a href=# id='logout-button'>Logout</a>\r\n</div>";
},"useData":true});
this["Handlebars"]["templates"]["register"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\r\n\r\n\r\n  <form role=\"form\" id=\"login-form\">\r\n    <h2>Create an account</h2>\r\n    <p>Create an account to view and access our groups.</p>\r\n    <p>We're a happy, growing community! :)</p>\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" id=\"username\" placeholder=\"Username\" class=\"form-control\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <input type=\"email\" id=\"email\" placeholder=\"Email address\" class=\"form-control\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <input type=\"password\" id=\"password\"placeholder=\"Password\" class=\"form-control\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <input type=\"password\" id=\"password2\" placeholder=\"Enter your password again\" class=\"form-control\">\r\n      </div>\r\n      <div class=\"text-danger\" id=\"validation-error\">\r\n\r\n      </div>\r\n      <button type=\"button\" class=\"btn btn-success\" id='register-button'>Create account</button>\r\n    </form>\r\n</div>";
},"useData":true});