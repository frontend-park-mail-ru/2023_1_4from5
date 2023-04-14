import { request } from '../../modules/request.js';
import { color } from '../../consts/styles.js';
import { Actions } from '../../actions/actions.js';
import template from './reg.handlebars';

const rootElement = document.getElementById('root');

export class Register {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  render() {
    const newDiv = document.createElement('div');
    newDiv.id = 'regDiv';

    newDiv.innerHTML = template();
    this.#parent.appendChild(newDiv);

    const background = document.getElementById('backReg');
    background.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.removeReg();
    });

    const toAuth = document.getElementById('toAuth');
    toAuth.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.removeReg();
      Actions.renderAuth();
    });
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
  }

  /**
   * rendering registration
   * @param {function} callback
   *
   * @returns {}
   */
  registration() {
    const submitBtn = document.getElementById('reg-btn');
    const loginInput = document.getElementById('reg-login');
    const usernameInput = document.getElementById('reg-username');
    const passwordInput = document.getElementById('reg-password');
    const passwordRepeatInput = document.getElementById('reg-repeat-password');
    const errorOutput = document.getElementById('reg-error');
    const errorLoginOutput = document.getElementById('reg-login-error');
    const errorUsernameOutput = document.getElementById('reg-username-error');
    const errorPasswordOutput = document.getElementById('reg-password-error');
    const errorRepeatPasswordOutput = document.getElementById('reg-repeat-password-error');

    loginInput.style.backgroundColor = color.field;
    usernameInput.style.backgroundColor = color.field;
    passwordInput.style.backgroundColor = color.field;
    passwordRepeatInput.style.backgroundColor = color.field;

    submitBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      Actions.registration({
        loginInput,
        usernameInput,
        passwordInput,
        passwordRepeatInput,
        errorOutput,
        errorLoginOutput,
        errorUsernameOutput,
        errorPasswordOutput,
        errorRepeatPasswordOutput,
      });
    });
  }

  async validation(input) {
    input.loginInput.style.backgroundColor = color.field;
    input.usernameInput.style.backgroundColor = color.field;
    input.passwordInput.style.backgroundColor = color.field;
    input.passwordRepeatInput.style.backgroundColor = color.field;

    input.errorLoginOutput.innerHTML = '';
    input.errorUsernameOutput.innerHTML = '';
    input.errorPasswordOutput.innerHTML = '';
    input.errorRepeatPasswordOutput.innerHTML = '';
    input.errorOutput.innerHTML = '';

    if (input.errLogin) {
      input.loginInput.style.backgroundColor = color.error;
      input.errorLoginOutput.innerHTML = '';
      input.errorLoginOutput.innerHTML = input.errLogin;
    } else if (input.errUsername) {
      input.usernameInput.style.backgroundColor = color.error;
      input.errorUsernameOutput.innerHTML = '';
      input.errorUsernameOutput.innerHTML = input.errUsername;
    } else if (input.errPassword) {
      input.passwordInput.style.backgroundColor = color.error;
      input.errorPasswordOutput.innerHTML = '';
      input.errorPasswordOutput.innerHTML = input.errPassword;
    } else if (input.password !== input.repeatPassword) {
      input.passwordInput.style.backgroundColor = color.error;
      input.passwordRepeatInput.style.backgroundColor = color.error;
      input.errorRepeatPasswordOutput.innerHTML = '';
      input.errorRepeatPasswordOutput.innerHTML = 'Пароли не совпадают';
    } else {
      const signUp = await request.post('/api/auth/signUp', {
        login: input.login,
        name: input.username,
        password_hash: input.password,
      });
      if (signUp.ok) {
        Actions.getUser();
        Actions.removeReg();
        Actions.renderStartPage();
      } else {
        input.errorOutput.innerHTML = '';
        input.errorOutput.innerHTML = 'Введённые данные некорректны';
      }
    }
  }
}

export const register = new Register(rootElement);
