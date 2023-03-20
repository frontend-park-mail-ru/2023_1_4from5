import { ActionTypes } from '../actionTypes/auth.js';
import { dispatcher } from '../dispatcher/dispatcher.js';
import { renderAuth } from '../index.js';
import { auth } from '../components/authorization/auth.js';
import { isValidLogin, isValidPassword } from '../modules/isValid.js';

export class AuthStore {
  constructor() {
    console.log('register auth');
    dispatcher.register(this.reduce);
  }

  getInitialState() {
    return {};
  }

  reduce(action) {
    switch (action.type) {
      case ActionTypes.RENDER_AUTH:
        console.log('RENDER_AUTH');
        renderAuth();
        break;
      case ActionTypes.AUTHORIZATION:
        console.log('AUTHORIZATION STORE');
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
        break;
      case ActionTypes.REMOVE_AUTH:
        console.log('REMOVE_AUTH STORE');
        auth.removeAuth();
        break;
      default:
        break;
    }
  }
}

export const authStore = new AuthStore();
