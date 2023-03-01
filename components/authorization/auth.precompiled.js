(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['auth'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"auth\">\n        <div>\n            <label id=\"auth-username\" for=\"username\">Логин</label>\n            <input type=\"text\">\n        </div>\n        <div>\n            <label id=\"auth-password\" for=\"password\">Пароль</label>\n            <input type=\"password\">\n        </div>\n        <div>\n            <button id=\"auth-btn\"> Войти </button>\n        </div>\n</div>";
},"useData":true});
})();