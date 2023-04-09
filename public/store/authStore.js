import { ActionTypes } from '../actionTypes/actionTypes.js';
import { dispatcher } from '../dispatcher/dispatcher.js';
import { auth } from '../components/authorization/auth.js';
import { isValidLogin, isValidPassword } from '../modules/isValid.js';

class AuthStore {
  #config;

  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  setState(config) {
    this.#config = config;
  }

  getInitialState() {
    return this.#config;
  }

  renderAuth() {
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
          errorOutput: action.input.errorOutput,
          login,
          password,
          errLogin,
          errPassword,
        });
        break;

      case ActionTypes.REMOVE_AUTH:
        auth.removeAuth();
        break;

      default:
        break;
    }
  }
}

export const authStore = new AuthStore();
