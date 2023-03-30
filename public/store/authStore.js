import { ActionTypes } from '../actionTypes/auth.js';
import { dispatcher } from '../dispatcher/dispatcher.js';
import { auth } from '../components/authorization/auth.js';
import { isValidLogin, isValidPassword } from '../modules/isValid.js';

export class AuthStore {
  #config;

  constructor() {
    // this.#config = {
    //   activePage: false,
    // };
    dispatcher.register(this.reduce.bind(this));
    console.log('register auth');
  }

  setState(config) {
    this.#config = config;
  }

  getInitialState() {
    return this.#config;
  }

  renderAuth() {
    // this.#config.activePage = true;
    // window.activePage = 'Войти';
    // auth.config = this.#config;
    auth.render();
    auth.authentification();
  }

  reduce(action) {
    switch (action.type) {
      case ActionTypes.RENDER_AUTH:
        this.renderAuth();
        break;

      case ActionTypes.AUTHORIZATION:
        const login = action.input.loginInput.value;
        const password = action.input.passwordInput.value;
        const errLogin = isValidLogin(login);
        const errPassword = isValidPassword(password);
        auth.authorization({
          loginInput: action.input.loginInput,
          passwordInput: action.input.passwordInput,
          login,
          password,
          errLogin,
          errPassword,
        });
        console.log('AUTHORIZATION');
        break;

      case ActionTypes.REMOVE_AUTH:
        // this.#config.activePage = false;
        window.activePage = '';
        auth.removeAuth();
        console.log('REMOVE_AUTH');
        break;

      default:
        break;
    }
  }
}

export const authStore = new AuthStore();
