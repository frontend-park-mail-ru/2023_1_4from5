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
        let lastSideBar = document.getElementById('sidebarDiv');
        if (lastSideBar) {
            lastSideBar.remove();
        }
        let newDiv = document.createElement('div');
        newDiv.id = 'sidebarDiv';
        let template = Handlebars.templates.sideBar;
        let tScript = template(this.#config);
        newDiv.innerHTML = tScript;
        this.#parent.appendChild(newDiv);
    }  
}
