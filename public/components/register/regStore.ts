import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { dispatcher } from '../../dispatcher/dispatcher.js';
import { isValidLogin, isValidPassword, isValidUsername } from '../../modules/isValid.js';
import { register } from './reg.js';

class RegStore {
  // @ts-expect-error TS(7008): Member '#config' implicitly has an 'any' type.
  #config;

  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  setState(config: any) {
    this.#config = config;
  }

  getInitialState() {
    return this.#config;
  }

  renderReg() {
    register.render();
    register.registration();
  }

  reduce(action: any) {
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
          usernameForm: action.input.usernameForm,
          loginForm: action.input.loginForm,
          passwordForm: action.input.passwordForm,
          repeatForm: action.input.repeatForm,
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
