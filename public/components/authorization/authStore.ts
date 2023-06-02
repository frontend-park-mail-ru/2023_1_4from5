import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { dispatcher } from '../../dispatcher/dispatcher.js';
import { auth } from './auth.js';
import { isValidLogin, isValidPassword } from '../../modules/isValid.js';

class AuthStore {
  // @ts-expect-error TS(7008): Member '#config' implicitly has an 'any' type.
  #config;

  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  setState(config: any) {
    this.#config = config;
  }

  renderAuth() {
    auth.render();
    auth.authentification();
  }

  reduce(action: any) {
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
          loginForm: action.input.loginForm,
          passwordForm: action.input.passwordForm,
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
