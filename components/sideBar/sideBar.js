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
        var template = Handlebars.templates.sideBar;
        var tScript = template(this.#config);

        this.#parent.innerHTML += tScript;

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

Handlebars.registerHelper('stringifyFunc', function(renderElement) {
    return new Handlebars.SafeString("(" + renderElement.toString() + ")()");
});
