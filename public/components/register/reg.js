import { isValidLogin, isValidPassword } from '../../modules/isValid.js';
import { request } from '../../modules/request.js';
import { color } from '../../consts/styles.js';
import { Actions } from '../../actions/auth.js';

const rootElement = document.getElementById('root');

export class Register {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  render() {
    const newDiv = document.createElement('div');
    newDiv.id = 'regDiv';

    const template = Handlebars.templates.reg;
    newDiv.innerHTML = template();
    this.#parent.appendChild(newDiv);

    const background = document.getElementById('backReg');
    background.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.removeReg();
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
    window.activePage = '';
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
      });
    });
  }

  async validation(input) {
    input.loginInput.style.backgroundColor = color.field;
    input.usernameInput.style.backgroundColor = color.field;
    input.passwordInput.style.backgroundColor = color.field;
    input.passwordRepeatInput.style.backgroundColor = color.field;

    if (input.username.length === 0) {
      input.usernameInput.style.backgroundColor = color.error;
      input.errorOutput.innerHTML = '';
      input.errorOutput.innerHTML = 'Введите ваше имя';
    } else if (input.errLogin) {
      input.loginInput.style.backgroundColor = color.error;
      input.errorOutput.innerHTML = '';
      input.errorOutput.innerHTML = input.errLogin;
    } else if (input.errPassword) {
      input.passwordInput.style.backgroundColor = color.error;
      input.errorOutput.innerHTML = '';
      input.errorOutput.innerHTML = input.errPassword;
    } else if (input.password !== input.repeatPassword) {
      input.passwordInput.style.backgroundColor = color.error;
      input.passwordRepeatInput.style.backgroundColor = color.error;
      input.errorOutput.innerHTML = '';
      input.errorOutput.innerHTML = 'Пароли не совпадают';
    } else {
      const signUp = await request.post('/api/auth/signUp', {
        login: input.login,
        name: input.username,
        password_hash: input.password,
      });
      if (signUp.ok) {
        Actions.getUser();
        Actions.removeReg();
      } else {
        input.errorOutput.innerHTML = '';
        input.errorOutput.innerHTML = 'Такой логин уже существует';
      }
    }
  }
}

export const register = new Register(rootElement);
