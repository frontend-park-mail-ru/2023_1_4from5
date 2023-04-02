import { color } from '../../consts/styles.js';
import { Actions } from '../../actions/auth.js';
import { request } from '../../modules/request.js';

const rootElement = document.getElementById('root');

export class Auth {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  render() {
    history.pushState({ activePage: 'auth' }, '', '/auth');
    const eventInitDict = {
      state: {
        activePage: 'authDispatch',
      },
    };
    window.dispatchEvent(new PopStateEvent('popstate', eventInitDict));
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

    history.pushState({}, '', 'auth');
    window.dispatchEvent(new Event('popstate'));
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
    window.activePage = '';
    history.back();
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
      // TODO запрос в store
      const signIn = await request.post('/api/auth/signIn', {
        login: input.login,
        password_hash: input.password,
      });
      if (signIn.ok) {
        Actions.getUser();
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
