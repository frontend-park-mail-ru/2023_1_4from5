export class StartPage {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        const newDiv = document.createElement('div');
        newDiv.id = 'startPageDiv';
        const template = Handlebars.templates.startPage; // eslint-disable-line
        newDiv.innerHTML = template();
        this.#parent.appendChild(newDiv);
    }
}