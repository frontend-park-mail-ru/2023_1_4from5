export class Auth {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        const newDiv = document.createElement('div');
        newDiv.id = 'authDiv';

        const template = Handlebars.templates.auth;
        newDiv.innerHTML = template();

        this.#parent.appendChild(newDiv);
    }
}