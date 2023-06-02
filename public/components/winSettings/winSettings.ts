import { clickHandler } from '../../modules/handler.js';
import { Actions } from '../../actions/actions.js';
import template from './winSettings.handlebars';
import { notificationsStore } from '../notifications/notificationsStore';

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
    this.#config.are_notifications = notificationsStore.getNotifications().length > 0;

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

// TODO при открытии модального окна (стать автором, рег/авто и др) winSettings спрятать
//  (просто поменять z-index)
