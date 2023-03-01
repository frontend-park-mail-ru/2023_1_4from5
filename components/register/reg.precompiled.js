(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['reg'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"register\">\n    <div>\n        <label for=\"username\">Логин</label>\n        <input type=\"text\">\n    </div>\n    <div>\n        <label for=\"password\">Пароль</label>\n        <input type=\"password\">\n    </div>\n    <div>\n        <label for=\"password\">Повторите пароль</label>\n        <input type=\"password\">\n    </div>\n    <div>\n        <input type=\"submit\">\n    </div>\n</div>";
},"useData":true});
})();