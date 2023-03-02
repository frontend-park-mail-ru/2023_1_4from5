(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['sideBar'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <a id="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":3,"column":10},"end":{"line":3,"column":16}}}) : helper)))
    + " href="
    + alias4(((helper = (helper = lookupProperty(helpers,"href") || (depth0 != null ? lookupProperty(depth0,"href") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data,"loc":{"start":{"line":3,"column":22},"end":{"line":3,"column":30}}}) : helper)))
    + "> "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":32},"end":{"line":3,"column":40}}}) : helper)))
    + " </a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <a id="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":17,"column":14},"end":{"line":17,"column":20}}}) : helper)))
    + " href="
    + alias4(((helper = (helper = lookupProperty(helpers,"href") || (depth0 != null ? lookupProperty(depth0,"href") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data,"loc":{"start":{"line":17,"column":26},"end":{"line":17,"column":34}}}) : helper)))
    + "> "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":17,"column":36},"end":{"line":17,"column":44}}}) : helper)))
    + " </a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"sideBar\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"general") : depth0)) != null ? lookupProperty(stack1,"pages") : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":4,"column":13}}})) != null ? stack1 : "")
    + "\n    <button> Стать автором </button>\n\n    <h4 style=\"display: inline;\">\n        "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"login") : stack1), depth0))
    + "\n    </h4>\n\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"entry") : depth0)) != null ? lookupProperty(stack1,"pages") : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":4},"end":{"line":18,"column":13}}})) != null ? stack1 : "")
    + "    \n</div>";
},"useData":true});
})();