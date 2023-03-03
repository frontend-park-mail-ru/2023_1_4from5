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
        const lastSideBar = document.getElementById('sidebarDiv');
        if (lastSideBar) {
            lastSideBar.remove();
        }

        const newDiv = document.createElement('div');
        newDiv.id = 'sidebarDiv';

        const template = Handlebars.templates.sideBar; // eslint-disable-line
        newDiv.innerHTML = template(this.#config);

        this.#parent.appendChild(newDiv);
    }  
}
