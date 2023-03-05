(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['myPage'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <h5>Пост: "
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":7,"column":18},"end":{"line":7,"column":27}}}) : helper)))
    + "</h5>\n        <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":8,"column":11},"end":{"line":8,"column":19}}}) : helper)))
    + "</p>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div>\n    <h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"creator_info") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</h1>\n    <img id=\"user-photo\" width=\"50\" src=\"../../../public/user_photo.png\" alt=\"user_photo\">\n    <h3>О моем блоге: "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"creator_info") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</h3>\n    <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"creator_info") : depth0)) != null ? lookupProperty(stack1,"followers_count") : stack1), depth0))
    + " подписчиков</p>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"posts") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":4},"end":{"line":9,"column":13}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
})();