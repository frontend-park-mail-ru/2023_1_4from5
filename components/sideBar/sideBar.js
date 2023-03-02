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
        let newDiv = document.createElement('div');

        let template = Handlebars.templates.sideBar;
        newDiv.innerHTML = template(this.#config);

        this.#parent.appendChild(newDiv);

        // const authorBtn = document.getElementById('author');

        // authorBtn.addEventListener( 'click', (e) => {
        //     e.preventDefault();
        //     console.log('eventListener');
        //     fetch ('http://sub-me.ru:8000/api/user/profile', {
        //         method: 'GET',
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             "user_id": "b184cc4e-78ef-434f-ac88-5084a77ee085",
        //         }),
        //     })
        //     .then(response => console.log(response))
        // });
    }  
}

