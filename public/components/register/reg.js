import {isValidLogin, isValidPassword} from "../../modules/isValid.js";
import { request } from "../../modules/request.js";

export class Register {
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
        newDiv.id = 'regDiv';

        const template = Handlebars.templates.reg; // eslint-disable-line
        newDiv.innerHTML = template();

        this.#parent.appendChild(newDiv);
    }
    /**
     * removing registration window
     * @param {}
     *
     * @returns {}
     */
    removeReg() {
        const lastReg = document.getElementById('regDiv');
        if (lastReg) {
            lastReg.remove();
        }
        this.#config.activePage = '';
    }

    /**
     * rendering registration
     * @param {function} callback
     *
     * @returns {}
     */
    registration(callback) {
        const submitBtn = document.getElementById('reg-btn');
        const loginInput = document.getElementById('reg-login');
        const usernameInput = document.getElementById('reg-username');
        const passwordInput = document.getElementById('reg-password');
        const passwordRepeatInput = document.getElementById('reg-repeat-password');
        const errorOutput = document.getElementById('reg-error');

        submitBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const login = loginInput.value;
            const username = usernameInput.value;
            const password = passwordInput.value;
            const repeatPassword = passwordRepeatInput.value;
            const errLogin = isValidLogin(login);
            const errPassword = isValidPassword(password);

            if (username.length === 0) {
                errorOutput.innerHTML = '';
                errorOutput.innerHTML = 'Введите ваше имя';
            } else if (errLogin) {
                errorOutput.innerHTML = '';
                errorOutput.innerHTML = errLogin;
            } else if (errPassword) {
                errorOutput.innerHTML = '';
                errorOutput.innerHTML = errPassword;
            } else if (password !== repeatPassword) {
                errorOutput.innerHTML = '';
                errorOutput.innerHTML = 'Пароли не совпадают';
            } else {
                const signUp = await request.post(`/api/auth/signUp`, {
                    login,
                    name: username,
                    password_hash: password,
                })
                if (signUp.ok) {
                    const profile = await request.get(`/api/user/profile`)
                        // eslint-disable-next-line no-shadow
                    const result = await profile.json();
                    callback(result, request);
                } else {
                    errorOutput.innerHTML = '';
                    errorOutput.innerHTML = 'Такой логин уже существует';
                }
            }
        });
    }
}
