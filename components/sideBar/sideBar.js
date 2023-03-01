export class SideBar {
    #parent
    #config

    constructor(parent) {
        this.#parent = parent;
    }

    get config() {
        return this.#config;
    }

    set config(config) {
        this.#config = config;
    }

    render() {
        var template = Handlebars.templates.sideBar;
        var tScript = template(this.#config);

        this.#parent.innerHTML += tScript;
    }  
}

Handlebars.registerHelper('stringifyFunc', function(renderElement) {
    return new Handlebars.SafeString("(" + renderElement.toString() + ")()");
});
