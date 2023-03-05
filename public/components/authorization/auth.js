export default class Auth {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        const newDiv = document.createElement('div');
        newDiv.id = 'authDiv';

        const template = Handlebars.templates.auth; // eslint-disable-line
        newDiv.innerHTML = template();

        this.#parent.appendChild(newDiv);
    }
}
