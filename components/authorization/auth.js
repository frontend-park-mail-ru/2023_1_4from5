export class Auth {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        var newDiv = document.createElement('div');
        newDiv.id = 'authDiv';
        var template = Handlebars.templates.auth;
        var tScript = template();
        newDiv.innerHTML = tScript;
        this.#parent.appendChild(newDiv);
    }
}