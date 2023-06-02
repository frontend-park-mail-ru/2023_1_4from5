import { Actions } from '../../actions/actions.js';
// @ts-expect-error TS(2307): Cannot find module './notifications.handlebars' or... Remove this comment to see the full error message
import template from './notifications.handlebars';
import { notificationsStore } from './notificationsStore';

const contentElement = document.querySelector('main');

export class Notifications {
  #parent;

  constructor(parent: any) {
    this.#parent = parent;
  }

  render(ntfs: any) {
    this.removeNotifications();

    const config = {
      ntfs,
    };

    const newDiv = document.createElement('div');
    newDiv.id = 'notificationsDiv';
    newDiv.innerHTML = template(config);
    this.#parent.appendChild(newDiv);

    const photo = document.getElementById('notification__image');
    if (photo) {
      photo.style.backgroundImage = 'url(../../images/author-photo.svg)';
    }

    const background = document.getElementById('backNotifications');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
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
