import { clickHandler } from "../../modules/handler.js";

export class WinSettings {
    #parent;
    #config;

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
        const newDiv = document.createElement('div');
        newDiv.id = 'winSettingsDiv';
        const template = Handlebars.templates.winSettings;
        newDiv.innerHTML = template(this.#config);
        console.log(this.#config.activePage);

        newDiv.addEventListener('click', (e) => {
            clickHandler(e, this.#config.setting, this.#config);
        });
        this.#parent.appendChild(newDiv);

        const closeBtn = document.getElementById('closeWinSettings');
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.removeWinSettings();
        });
    }

    removeWinSettings() {
        const lastWinSettings = document.getElementById('winSettingsDiv');
        if (lastWinSettings) {
            lastWinSettings.remove();
        }
        this.#config.activePage = '';
    }
}
