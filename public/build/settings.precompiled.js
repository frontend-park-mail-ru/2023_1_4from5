(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['settings'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "        <h3>Автор</h3>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <h3>Пользователь</h3>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"settings\">\n    <h1> Настройки </h1>\n    <h3>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":20}}}) : helper)))
    + "</h3>    \n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isAuthor") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":4,"column":4},"end":{"line":8,"column":11}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
})();