import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { dispatcher } from '../../dispatcher/dispatcher.js';
import { auth } from './auth.js';
import {
  isSpecialSignWithEnt,
  isValidLogin,
  isValidPassword, isWhiteSignLogin, isWhiteSignPassword,
  LENGTH, validation,
  validationStructure
} from '../../modules/isValid.js';

class AuthStore {
  #config;

  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  setState(config) {
    this.#config = config;
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
