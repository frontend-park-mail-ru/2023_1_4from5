export class Register {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        const newDiv = document.createElement('div');

        const template = Handlebars.templates.reg;
        newDiv.innerHTML = template();

        this.#parent.appendChild(newDiv);
    }
}