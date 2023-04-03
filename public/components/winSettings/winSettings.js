import { clickHandler } from '../../modules/handler.js';
import { Actions } from '../../actions/auth.js';

const template = require('./winSettings.handlebars');

const contentElement = document.querySelector('main');

export class WinSettings {
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
    newDiv.id = 'winSettingsDiv';
    newDiv.innerHTML = template(this.#config);

    newDiv.addEventListener('click', (e) => {
      clickHandler(e, this.#config);
    });
    this.#parent.appendChild(newDiv);

    const background = document.getElementById('background');
    background.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.removeWinSettings();
    });
  }

  removeWinSettings() {
    const lastWinSettings = document.getElementById('winSettingsDiv');
    if (lastWinSettings) {
      lastWinSettings.remove();
    }
  }
}

export const winSettings = new WinSettings(contentElement);
