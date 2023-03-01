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
        var tScript = template(this.#config, this.myFunc);

        this.#parent.innerHTML += tScript;
    }

    myFunc() {
        console.log('ааауууууф');
    }
}