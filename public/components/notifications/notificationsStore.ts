import { dispatcher } from '../../dispatcher/dispatcher';
import { ActionTypes } from '../../actionTypes/actionTypes';
import { notifications } from './notifications';
import { sideBar } from '../sideBar/sideBar';

class NotificationsStore {
  // @ts-expect-error TS(7008): Member '#notifications' implicitly has an 'any[]' ... Remove this comment to see the full error message
  #notifications;

  constructor() {
    this.#notifications = [];

    dispatcher.register(this.reduce.bind(this));
  }

  getNotifications() {
    return this.#notifications;
  }

  addNotification(ntf: any) {
    this.#notifications.push(ntf);
    notifications.removeNotifications();
    notifications.render(this.#notifications);
    sideBar.render();
  }

  async reduce(action: any) {
    switch (action.type) {
      case ActionTypes.RENDER_NOTIFICATIONS:
        this.renderNotifications(this.#notifications);
        break;

      case ActionTypes.REMOVE_NOTIFICATIONS:
        this.removeNotifications();
        break;

      default:
        break;
    }
  }

  renderNotifications(config: any) {
    this.removeNotifications();
    notifications.render(config);
  }

  removeNotifications() {
    notifications.removeNotifications();
  }
}

export const notificationsStore = new NotificationsStore();
