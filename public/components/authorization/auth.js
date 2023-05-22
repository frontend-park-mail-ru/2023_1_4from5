import { color } from '../../consts/styles.js';
import { Actions } from '../../actions/actions';
import { request } from '../../modules/request.js';
import { router } from '../../modules/Router';
import { URLS } from '../../modules/Notifier';
import template from './auth.handlebars';
import { userStore } from '../user/userStore';

const rootElement = document.getElementById('root');

export class Auth {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  render() {
    const newDiv = document.createElement('div');
    newDiv.id = 'authDiv';
    newDiv.innerHTML = template();
    this.#parent.appendChild(newDiv);

    const clearBtn = document.getElementById('clear');
    clearBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const loginInput = document.getElementById('auth__login');
      loginInput.value = '';
    });

    const watchBtn = document.getElementById('watch');
    let isHide = true;
    watchBtn.addEventListener('click', (event) => {
      event.preventDefault();
      isHide = !isHide;
      const passInput = document.getElementById('auth__password');
      if (isHide) {
        passInput.type = 'password';
      } else {
        passInput.type = 'text';
      }
    });

    const background = document.getElementById('backAuth');
    background.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.removeAuth();
    });

    const toReg = document.getElementById('toReg');
    toReg.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.removeAuth();
      Actions.renderReg();
    });
  }

  /**
   * removing authorization window
   * @param {}
   *
   * @returns {}
   */
  removeAuth() {
    const lastAuth = document.getElementById('authDiv');
    if (lastAuth) {
      lastAuth.remove();
    }
  }

  /**
   * request for authorization
   * @param {function} callback
   *
   * @returns {}
   */
  authentification() {
    const submitBtn = document.getElementById('auth__btn');
    const loginInput = document.getElementById('auth__login');
    const passwordInput = document.getElementById('auth__password');
    const errorOutput = document.getElementById('auth__error');

    const loginForm = document.getElementById('login--form');
    const passwordForm = document.getElementById('password--form');
    loginForm.style.backgroundColor = color.field;
    passwordForm.style.backgroundColor = color.field;

    submitBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      Actions.authorization({
        loginInput,
        passwordInput,
        errorOutput,
        loginForm,
        passwordForm,
      });
    });
  }

  async authorization(input) {
    input.loginForm.style.backgroundColor = color.field;
    input.passwordForm.style.backgroundColor = color.field;

    if (!input.errLogin && !input.errPassword) {
      const signIn = await request.post('/api/auth/signIn', {
        login: input.login,
        password_hash: input.password,
      });
      if (signIn.ok) {
        Actions.getUser();
        Actions.removeAuth();
        router.go(URLS.root);
      } else {
        input.loginForm.style.backgroundColor = color.error;
        input.passwordForm.style.backgroundColor = color.error;
        input.errorOutput.innerHTML = '';
        input.errorOutput.innerHTML = 'Неверный логин или пароль';
      }
    } else {
      // TODO чтобы не подсказывать юзеру, где именно ошибка, подсвечивать лучше оба поля
      input.loginForm.style.backgroundColor = color.error;
      input.passwordForm.style.backgroundColor = color.error;
      // if (input.errLogin) {
      //   input.loginInput.style.backgroundColor = color.error;
      // }
      // if (input.errPassword) {
      //   input.passwordInput.style.backgroundColor = color.error;
      // }
      input.errorOutput.innerHTML = '';
      input.errorOutput.innerHTML = 'Неверный логин или пароль';
    }
  }
}

export const auth = new Auth(rootElement);
