import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { dispatcher } from '../../dispatcher/dispatcher.js';
import { isValidLogin, isValidPassword, isValidUsername } from '../../modules/isValid.js';
import { register } from './reg.js';

class RegStore {
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

  renderReg() {
    register.render();
    register.registration();
  }

  reduce(action) {
    switch (action.type) {
      case ActionTypes.RENDER_REG:
        this.renderReg();
        break;

      case ActionTypes.REGISTRATION:
        const login = action.input.loginInput.value;
        const username = action.input.usernameInput.value;
        const password = action.input.passwordInput.value;
        const repeatPassword = action.input.passwordRepeatInput.value;
        const errLogin = isValidLogin(login);
        const errUsername = isValidUsername(username);
        const errPassword = isValidPassword(password);
        register.validation({
          loginInput: action.input.loginInput,
          usernameInput: action.input.usernameInput,
          passwordInput: action.input.passwordInput,
          passwordRepeatInput: action.input.passwordRepeatInput,
          errorOutput: action.input.errorOutput,
          errorLoginOutput: action.input.errorLoginOutput,
          errorUsernameOutput: action.input.errorUsernameOutput,
          errorPasswordOutput: action.input.errorPasswordOutput,
          errorRepeatPasswordOutput: action.input.errorRepeatPasswordOutput,
          login,
          username,
          password,
          repeatPassword,
          errLogin,
          errUsername,
          errPassword,
        });
        break;

      case ActionTypes.REMOVE_REG:
        register.removeReg();
        break;

      default:
        break;
    }
  }
}

export const regStore = new RegStore();
