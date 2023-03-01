export class Auth {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        var template = Handlebars.templates.auth;
        var tScript = template();

        this.#parent.innerHTML += tScript;
    }
}