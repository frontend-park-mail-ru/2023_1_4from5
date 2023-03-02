import { clickHandler} from "../../modules/handler.js";

export class WinSettings {
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
        let newDiv = document.createElement('div');

        let template = Handlebars.templates.winSettings;
        newDiv.innerHTML = template(this.#config);

        newDiv.addEventListener('click', (e) => {
            clickHandler(e, this.#config.setting, this.#config);

        });

        this.#parent.appendChild(newDiv);
    }
}
// можно сделать один handlebars
