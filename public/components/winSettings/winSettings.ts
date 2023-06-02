import { clickHandler } from '../../modules/handler.js';
import { Actions } from '../../actions/actions.js';
// @ts-expect-error TS(2307): Cannot find module './winSettings.handlebars' or i... Remove this comment to see the full error message
import template from './winSettings.handlebars';
import { notificationsStore } from '../notifications/notificationsStore';

const contentElement = document.querySelector('main');

export class WinSettings {
  #parent;

  // @ts-expect-error TS(7008): Member '#config' implicitly has an 'any' type.
  #config;

  constructor(parent: any) {
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
    // @ts-expect-error TS(2531): Object is possibly 'null'.
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
