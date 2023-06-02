import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { dispatcher } from '../../dispatcher/dispatcher.js';
import {
  isWhiteSignLogin, isWhiteSignName, isWhiteSignPassword,
  LENGTH,
  validation, validationStructure
} from '../../modules/isValid.js';
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
        const login = action.input.loginInput.value.trim();
        const validStructLogin = { ...validationStructure };
        validStructLogin.field = '"Логин"';
        validStructLogin.length_flag = true;
        validStructLogin.min_length = LENGTH.MIN_LOGIN;
        validStructLogin.max_length = LENGTH.MAX_LOGIN;
        validStructLogin.special_signs = isWhiteSignLogin;
        validStructLogin.rus_symbols_flag = false;
        validStructLogin.whiteSymbolsError = 'Допустимы только латинские символы, цифры и символы-разделители';
        validStructLogin.hasLetter = true;
        const errLogin = validation(validStructLogin, login);
        // const errLogin = isValidLogin(login);

        const username = action.input.usernameInput.value.trim();
        const validStructUsername = { ...validationStructure };
        validStructUsername.field = '"Имя пользователя"';
        validStructUsername.length_flag = true;
        validStructUsername.min_length = LENGTH.MIN_USERNAME;
        validStructUsername.max_length = LENGTH.MAX_USERNAME;
        validStructUsername.special_signs = isWhiteSignName;
        validStructUsername.whiteSymbolsError = 'Допустимы только символы кириллицы и латиницы, цифры и символы-разделители';
        validStructUsername.hasLetter = true;
        const errUsername = validation(validStructUsername, username);
        // const errUsername = isValidUsername(username);

        const password = action.input.passwordInput.value.trim();
        const validStructPassword = { ...validationStructure };
        validStructPassword.field = '"Пароль"';
        validStructPassword.length_flag = true;
        validStructPassword.min_length = LENGTH.MIN_PASSWORD;
        validStructPassword.max_length = LENGTH.MAX_PASSWORD;
        validStructPassword.special_signs = isWhiteSignPassword;
        validStructPassword.rus_symbols_flag = false;
        validStructPassword.whiteSymbolsError = 'Допустимы только латинские символы, цифры и символы-разделители';
        validStructPassword.hasNumber = true;
        const errPassword = validation(validStructPassword, password);
        // const errPassword = isValidPassword(password);

        const repeatPassword = action.input.passwordRepeatInput.value;

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
