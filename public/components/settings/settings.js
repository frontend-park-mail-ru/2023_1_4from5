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

    const editBtn = document.getElementById('pencil-icon');
    editBtn.addEventListener('click', this.editSettings);
  }

  editSettings(e) {
    e.preventDefault();
    const space = document.getElementById('change-password');
    const oldPwd = document.createElement('textarea');
    oldPwd.id = 'oldPwd';
    const newPwd = document.createElement('textarea');
  }
}

export const settings = new Settings(contentElement);
