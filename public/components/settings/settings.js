import { Actions } from '../../actions/actions';

const template = require('./settings.handlebars');

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
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'settingsDiv';
    newDiv.innerHTML = template(this.#user);
    this.#parent.appendChild(newDiv);

    const changePwdBtn = document.getElementById('change-password-btn');
    changePwdBtn.addEventListener('click', this.changePwd);

    const changeNameBtn = document.getElementById('change-username-btn');
    changeNameBtn.addEventListener('click', this.changeName);

    const changeLoginBtn = document.getElementById('change-login-btn');
    changeLoginBtn.addEventListener('click', this.changeLogin);

    const fileInput = document.querySelector('#photo-upload');
    fileInput.addEventListener('change', (event) => {
      event.preventDefault();
      const files = event.target.files;
      Actions.changePhoto(files[0]);
    });
  }

  changePwd(e) {
    e.preventDefault();
    const oldPwdInput = document.getElementById('old-password-input');
    const newPwdInput = document.getElementById('new-password-input');
    Actions.changePassword({
      oldPwdInput,
      newPwdInput,
    });
  }

  changeName(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('change-username-input');
    Actions.changeUsername(usernameInput);
  }

  changeLogin(e) {
    e.preventDefault();
    const loginInput = document.getElementById('change-login-input');
    Actions.changeLogin(loginInput);
  }

  invalidPassword(err) {
    const errorDiv = document.getElementById('change-password-error');
    errorDiv.textContent = err;

    const successTitle = document.getElementById('change-success-password');
    successTitle.textContent = '';
  }

  invalidLogin(err) {
    const errorDiv = document.getElementById('change-login-error');
    errorDiv.textContent = err;
  }

  successNameChanged() {
    const successTitle = document.getElementById('change-success-name');
    successTitle.textContent = 'Имя успешно изменено';
  }

  successLoginChanged() {
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
