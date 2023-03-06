import {isValidLogin, isValidPassword} from "../../modules/isValid.js";
import Request from "../../modules/request.js";

export default class Auth {
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
        newDiv.id = 'authDiv';

        const template = Handlebars.templates.auth; // eslint-disable-line
        newDiv.innerHTML = template();

        this.#parent.appendChild(newDiv);
    }
    /**
     * removing authorization window
     * @param {}
     *
     * @returns {}
     */
     removeAuth() {
        const lastAuth = document.getElementById('authDiv');
        if (lastAuth) {
            lastAuth.remove();
        }
        this.#config.activePage = '';
    }

    /**
     * request for authorization
     * @param {function} callback
     *
     * @returns {}
     */
     authentification(callback) {
        const submitBtn = document.getElementById('auth-btn');
        const loginInput = document.getElementById('auth-login');
        const passwordInput = document.getElementById('auth-password');
        const errorOutput = document.getElementById('auth-error');

        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const login = loginInput.value;
            const password = passwordInput.value;
            const errLogin = isValidLogin(login);
            const errPassword = isValidPassword(password);

            if (!errLogin && !errPassword) {
                const req = new Request();
                req.post(`/api/auth/signIn`, {login: login, password_hash: password})
                    .then((response) => {
                        if (response.ok) {
                            req.get(`/api/user/profile`)
                                // eslint-disable-next-line no-shadow
                                .then((response) => response.json())
                                .then((result) => {
                                    callback(result, req);
                                    // if (result.login.length > 0) {
                                    //     req.get(`/api/user/homePage`)
                                    //         .then((response) => response.json())
                                    //         .then((result) => {
                                    //             userIn.usernameIn = result.name;
                                    //             userIn.isAuthorIn = result.is_creator;
                                    //             userIn.isAuthorizedIn = true;
                                    //             userIn.authorURL = result.creator_id;
                                    //             renderSideBar(sideBarElement);
                                    //             removeAuth();
                                    //         })
                                    // }
                                });
                        } else {
                            errorOutput.innerHTML = '';
                            errorOutput.innerHTML = 'Неверный логин или пароль';
                        }
                    });

            } else {
                errorOutput.innerHTML = '';
                errorOutput.innerHTML = 'Неверный логин или пароль';
            }
        });
    }
}

