import { clickHandler} from "../../modules/handler.js";

export class Settings {
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
        const lastSettings = document.getElementById('settingsDiv');
        if (lastSettings) {
            lastSettings.remove();
        }

        const newDiv = document.createElement('div');
        newDiv.id = 'settingsDiv';
        const template = Handlebars.templates.winSettings; // eslint-disable-line
        newDiv.innerHTML = template(this.#config);

        newDiv.addEventListener('click', (e) => {
            clickHandler(e, this.#config.setting, this.#config);

        });
    
        this.#parent.appendChild(newDiv);
    }
}