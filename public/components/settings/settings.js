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
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'settingsDiv';
    newDiv.innerHTML = template(this.#user);
    this.#parent.appendChild(newDiv);

    const photo = document.getElementById('user-photo');
    photo.style.backgroundImage = `url(../../images/user/${this.#user.profilePhoto}.png)`;

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

    const deletePhoto = document.getElementById('settings__delete--btn');
    deletePhoto.addEventListener('click', (event) => {
      event.preventDefault();
      Actions.deletePhoto(event.target.parentElement.parentElement.id);
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

    const successTitle = document.getElementById('change-success-name');
    successTitle.textContent = '';
  }

  invalidLogin(err) {
    const successTitle = document.getElementById('change-success-name');
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
    successTitle.textContent = 'Данные успешно сохранены';
  }

  successLoginChanged() {
    const errorDiv = document.getElementById('change-login-error');
    errorDiv.textContent = '';
    const successTitle = document.getElementById('change-success-name');
    successTitle.textContent = 'Данные успешно сохранены';
  }

  successPasswordChanged() {
    const successTitle = document.getElementById('change-success-name');
    successTitle.textContent = 'Пароль успешно изменен';

    const errTitle = document.getElementById('change-password-error');
    errTitle.textContent = '';
  }
}

export const settings = new Settings(contentElement);
