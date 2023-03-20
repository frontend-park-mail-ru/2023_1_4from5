import { color } from '../../consts/styles.js';
import { Actions } from '../../actions/auth.js';
import { request } from '../../modules/request.js';
import { renderSideBar } from '../../index.js';
import { userStore } from '../../store/userStore.js';

const rootElement = document.getElementById('root');
const sideBarElement = document.getElementById('sideBar');

export class Auth {
  #parent;

  #config;

  constructor(parent) {
    this.#parent = parent;
  }

  get config() {
    return this.#config;
  }

  set config(config) {
    this.#config = config;
  }

  render() {
    const newDiv = document.createElement('div');
    newDiv.id = 'authDiv';

    const template = Handlebars.templates.auth;
    newDiv.innerHTML = template();

    this.#parent.appendChild(newDiv);
    const background = document.getElementById('backAuth');
    background.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.removeAuth();
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
    this.#config.activePage = '';
  }

  /**
   * request for authorization
   * @param {function} callback
   *
   * @returns {}
   */
  authentification() {
    const submitBtn = document.getElementById('auth-btn');
    const loginInput = document.getElementById('auth-login');
    const passwordInput = document.getElementById('auth-password');
    const errorOutput = document.getElementById('auth-error');

    loginInput.style.backgroundColor = color.field;
    passwordInput.style.backgroundColor = color.field;

    submitBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      Actions.authorization({
        loginInput,
        passwordInput,
        errorOutput,
      });
    });
  }

  async authorization(input) {
    input.loginInput.style.backgroundColor = color.field;
    input.passwordInput.style.backgroundColor = color.field;

    if (!input.errLogin && !input.errPassword) {
      const signIn = await request.post('/api/auth/signIn', {
        login: input.login,
        password_hash: input.password,
      });
      if (signIn.ok) {
        // TODO убрал запрос на профиль перед запросом homePage
        Actions.getUser();
        renderSideBar(sideBarElement);
        Actions.removeAuth();
      } else {
        input.errorOutput.innerHTML = '';
        input.errorOutput.innerHTML = 'Неверный логин или пароль';
      }
    } else {
      if (input.errLogin) {
        input.loginInput.style.backgroundColor = color.error;
      }
      if (input.errPassword) {
        input.passwordInput.style.backgroundColor = color.error;
      }
      input.errorOutput.innerHTML = '';
      input.errorOutput.innerHTML = 'Неверный логин или пароль';
    }
  }
}

export const auth = new Auth(rootElement);
