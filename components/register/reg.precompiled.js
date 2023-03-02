(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['reg'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"register\">\n    <div>\n        <label for=\"username\"> Логин </label>\n        <input id=\"reg-login\" type=\"text\">\n    </div>\n    <div>\n        <label for=\"username\"> Ваше имя </label>\n        <input id=\"reg-username\" type=\"text\">\n    </div>\n    <div>\n        <label for=\"password\"> Пароль </label>\n        <input id=\"reg-password\" type=\"password\">\n    </div>\n    <div>\n        <label for=\"password\"> Повторите пароль </label>\n        <input id=\"reg-repeat-password\" type=\"password\">\n    </div>\n    <div>\n        <button id=\"reg-btn\"> Зарегистрироваться </button>\n    </div>\n</div>";
},"useData":true});
})();