export class MyPage {
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
        const lastMyPage = document.getElementById('myPageDiv');
        if (lastMyPage) {
            lastMyPage.remove();
        }

        const newDiv = document.createElement('div');
        newDiv.id = 'myPageDiv';
        const template = Handlebars.templates.myPage; // eslint-disable-line
        newDiv.innerHTML = template(this.#config);
    
        this.#parent.appendChild(newDiv);
    }
}