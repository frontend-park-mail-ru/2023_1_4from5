import { Actions } from '../../actions/actions.js';
import template from './notifications.handlebars';

const contentElement = document.querySelector('main');

export class Notifications {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  render(ntfs) {
    const lastNotifications = document.getElementById('notificationsDiv');
    if (lastNotifications) {
      lastNotifications.remove();
    }

    const config = {
      ntfs,
    };
    console.log('notifications config', config);
    const newDiv = document.createElement('div');
    newDiv.id = 'notificationsDiv';
    newDiv.innerHTML = template(config);
    this.#parent.appendChild(newDiv);

    const photo = document.getElementById('notification__image');
    if (photo) {
      photo.style.backgroundImage = 'url(../../images/author-photo.svg)';
    }

    const background = document.getElementById('backNotifications');
    background.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.removeNotifications();
    });

    const winsettings = document.getElementById('winSettings');
    if (winsettings) {
      winsettings.addEventListener('click', (e) => {
        e.preventDefault();
        Actions.removeNotifications();
      });
    }
  }

  removeNotifications() {
    const lastNotifications = document.getElementById('notificationsDiv');
    if (lastNotifications) {
      lastNotifications.remove();
    }
  }
}

export const notifications = new Notifications(contentElement);
