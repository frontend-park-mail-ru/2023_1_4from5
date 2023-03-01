export class Login {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        var newDiv = document.createElement('div');

        var template = Handlebars.templates.login;
        var tScript = template();
        newDiv.innerHTML = tScript;

        this.#parent.appendChild(newDiv);
    }
}