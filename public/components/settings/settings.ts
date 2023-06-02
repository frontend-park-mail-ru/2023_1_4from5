import { Actions } from '../../actions/actions';
// @ts-expect-error TS(2307): Cannot find module './settings.handlebars' or its ... Remove this comment to see the full error message
import template from './settings.handlebars';

const contentElement = document.querySelector('main');

class Settings {
  #parent;

  // @ts-expect-error TS(7008): Member '#user' implicitly has an 'any' type.
  #user;

  constructor(parent: any) {
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
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    photo.style.backgroundImage = `url(../../images/user/${this.#user.profilePhoto}.jpg)`;

    const settingsBtn = document.getElementById('settings__btn');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    settingsBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.changeNameLogin();
      this.changePwd();
    });

    const fileInput = document.querySelector('#photo-upload');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    fileInput.addEventListener('change', (event) => {
      event.preventDefault();
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const files = event.target.files;
      Actions.changePhoto(files[0]);
    });

    const deletePhoto = document.getElementById('settings__delete--btn');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    deletePhoto.addEventListener('click', (event) => {
      event.preventDefault();
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      Actions.deletePhoto(event.target.parentElement.parentElement.id);
    });
  }

  changePwd() {
    const oldPwdInput = document.getElementById('old-password-input');
    const newPwdInput = document.getElementById('new-password-input');

    // @ts-expect-error TS(2531): Object is possibly 'null'.
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

  invalidPassword(err: any) {
    const errorDiv = document.getElementById('change-password-error');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    errorDiv.textContent = err;

    const successTitle = document.getElementById('change-success-name');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    successTitle.textContent = '';
  }

  invalidLogin(err: any) {
    const successTitle = document.getElementById('change-success-name');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    successTitle.textContent = '';
    const errorDiv = document.getElementById('change-login-error');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    errorDiv.textContent = err;
  }

  invalidUsername(err: any) {
    const successTitle = document.getElementById('change-success-name');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    successTitle.textContent = '';
    const errorDiv = document.getElementById('change-username-error');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    errorDiv.textContent = err;
  }

  successNameChanged() {
    const errorDiv = document.getElementById('change-username-error');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    errorDiv.textContent = '';
    const successTitle = document.getElementById('change-success-name');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    successTitle.textContent = 'Данные успешно сохранены';
  }

  successLoginChanged() {
    const errorDiv = document.getElementById('change-login-error');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    errorDiv.textContent = '';
    const successTitle = document.getElementById('change-success-name');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    successTitle.textContent = 'Данные успешно сохранены';
  }

  successPasswordChanged() {
    const successTitle = document.getElementById('change-success-name');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    successTitle.textContent = 'Пароль успешно изменен';

    const errTitle = document.getElementById('change-password-error');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    errTitle.textContent = '';
  }
}

export const settings = new Settings(contentElement);
