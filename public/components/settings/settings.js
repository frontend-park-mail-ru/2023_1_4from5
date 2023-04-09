import { Actions } from '../../actions/actions';
import { userStore } from '../../store/userStore';

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
  }
}

export const settings = new Settings(contentElement);
