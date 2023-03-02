(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['auth'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div calss=\"background\">\n    <div id=\"auth\">\n        <div>\n            <label for=\"username\">Логин</label>\n            <input id=\"auth-login\" type=\"text\">\n        </div>\n        <div>\n            <label for=\"password\">Пароль</label>\n            <input id=\"auth-password\" type=\"password\">\n        </div>\n        <div>\n            <button id=\"auth-btn\"> Войти </button>\n        </div>\n    </div>\n</div>";
},"useData":true});
})();