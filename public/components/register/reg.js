import { request } from '../../modules/request.js';
import { color } from '../../consts/styles.js';
import { Actions } from '../../actions/actions';
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

    const clearNameBtn = document.getElementById('clear--username');
    clearNameBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const nameInput = document.getElementById('reg-username');
      nameInput.value = '';
    });

    const clearLoginBtn = document.getElementById('clear--login');
    clearLoginBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const loginInput = document.getElementById('reg-login');
      loginInput.value = '';
    });

    const watchPassBtn = document.getElementById('watch--pass');
    let isPassHide = true;
    watchPassBtn.addEventListener('click', (event) => {
      event.preventDefault();
      isPassHide = !isPassHide;
      const passInput = document.getElementById('reg-password');
      if (isPassHide) {
        passInput.type = 'password';
      } else {
        passInput.type = 'text';
      }
    });

    const watchRepPassBtn = document.getElementById('watch--pass--repeat');
    let isRepPassHide = true;
    watchRepPassBtn.addEventListener('click', (event) => {
      event.preventDefault();
      isRepPassHide = !isRepPassHide;
      const repPassInput = document.getElementById('reg-repeat-password');
      if (isRepPassHide) {
        repPassInput.type = 'password';
      } else {
        repPassInput.type = 'text';
      }
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

    const usernameForm = document.getElementById('username__form');
    const loginForm = document.getElementById('login__form');
    const passwordForm = document.getElementById('password__form');
    const repeatForm = document.getElementById('password--repeat__form');

    usernameForm.style.backgroundColor = color.field;
    loginForm.style.backgroundColor = color.field;
    passwordForm.style.backgroundColor = color.field;
    repeatForm.style.backgroundColor = color.field;

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
        usernameForm,
        loginForm,
        passwordForm,
        repeatForm,
      });
    });
  }

  async validation(input) {
    input.usernameForm.style.backgroundColor = color.field;
    input.loginForm.style.backgroundColor = color.field;
    input.passwordForm.style.backgroundColor = color.field;
    input.repeatForm.style.backgroundColor = color.field;

    input.errorLoginOutput.innerHTML = '';
    input.errorUsernameOutput.innerHTML = '';
    input.errorPasswordOutput.innerHTML = '';
    input.errorRepeatPasswordOutput.innerHTML = '';
    input.errorOutput.innerHTML = '';

    if (input.errLogin) {
      input.loginForm.style.backgroundColor = color.error;
      input.errorLoginOutput.innerHTML = '';
      input.errorLoginOutput.innerHTML = input.errLogin;
    } else if (input.errUsername) {
      input.usernameForm.style.backgroundColor = color.error;
      input.errorUsernameOutput.innerHTML = '';
      input.errorUsernameOutput.innerHTML = input.errUsername;
    } else if (input.errPassword) {
      input.passwordForm.style.backgroundColor = color.error;
      input.errorPasswordOutput.innerHTML = '';
      input.errorPasswordOutput.innerHTML = input.errPassword;
    } else if (input.password !== input.repeatPassword) {
      input.passwordForm.style.backgroundColor = color.error;
      input.repeatForm.style.backgroundColor = color.error;
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
