export class Login {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        var template = Handlebars.templates.login;
        var tScript = template();

        this.#parent.innerHTML += tScript;
    }
}