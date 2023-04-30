import { Actions } from '../../actions/actions';
import template from './settings.handlebars';

const contentElement = document.querySelector('main');

class Settings {
  #parent;

  #user;

  constructor(parent) {
    this.#parent = parent;
  }

  get config() {
    return this.#user;
  }

  set config(user) {
    this.#user = user;
  }

  render() {
    console.log(this.#user);

    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'settingsDiv';
    newDiv.innerHTML = template(this.#user);
    this.#parent.appendChild(newDiv);

    const settingsBtn = document.getElementById('settings__btn');
    settingsBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.changeNameLogin();
      this.changePwd();
    });

    const fileInput = document.querySelector('#photo-upload');
    fileInput.addEventListener('change', (event) => {
      event.preventDefault();
      const files = event.target.files;
      Actions.changePhoto(files[0]);
    });
  }

  changePwd() {
    const oldPwdInput = document.getElementById('old-password-input');
    const newPwdInput = document.getElementById('new-password-input');

    if (oldPwdInput.value && newPwdInput.value) {
      Actions.changePassword({
        oldPwdInput,
        newPwdInput,
      });
    }
  }

  changeNameLogin() {
    const usernameInput = document.getElementById('change-username-input');
    const loginInput = document.getElementById('change-login-input');
    Actions.changeUsernameLogin(usernameInput, loginInput);
  }

  invalidPassword(err) {
    const errorDiv = document.getElementById('change-password-error');
    errorDiv.textContent = err;

    const successTitle = document.getElementById('change-success-password');
    successTitle.textContent = '';
  }

  invalidLogin(err) {
    const successTitle = document.getElementById('change-success-login');
    successTitle.textContent = '';
    const errorDiv = document.getElementById('change-login-error');
    errorDiv.textContent = err;
  }

  invalidUsername(err) {
    const successTitle = document.getElementById('change-success-name');
    successTitle.textContent = '';
    const errorDiv = document.getElementById('change-username-error');
    errorDiv.textContent = err;
  }

  successNameChanged() {
    const errorDiv = document.getElementById('change-username-error');
    errorDiv.textContent = '';
    const successTitle = document.getElementById('change-success-name');
    successTitle.textContent = 'Имя успешно изменено';
  }

  successLoginChanged() {
    const errorDiv = document.getElementById('change-login-error');
    errorDiv.textContent = '';
    const successTitle = document.getElementById('change-success-login');
    successTitle.textContent = 'Логин успешно изменен';
  }

  successPasswordChanged() {
    const successTitle = document.getElementById('change-success-password');
    successTitle.textContent = 'Пароль успешно изменен';

    const errTitle = document.getElementById('change-password-error');
    errTitle.textContent = '';
  }
}

export const settings = new Settings(contentElement);
