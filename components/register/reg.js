export class Register {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        var newDiv = document.createElement('div');
        var template = Handlebars.templates.reg;
        var tScript = template();
        newDiv.innerHTML = tScript;
        this.#parent.appendChild(newDiv);
    }
}