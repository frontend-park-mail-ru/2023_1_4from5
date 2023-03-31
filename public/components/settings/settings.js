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
    const newDiv = document.createElement('div');
    newDiv.id = 'settingsDiv';
    const template = Handlebars.templates.settings;
    newDiv.innerHTML = template(this.#user);
    this.#parent.appendChild(newDiv);
  }
}

export const settings = new Settings(contentElement);
