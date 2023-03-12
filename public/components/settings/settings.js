export class Settings {
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
    newDiv.id = 'settingsDiv';
    const template = Handlebars.templates.settings;
    newDiv.innerHTML = template(this.#config.user);
    this.#parent.appendChild(newDiv);
  }
}
