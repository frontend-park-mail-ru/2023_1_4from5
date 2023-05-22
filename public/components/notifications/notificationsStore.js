import { dispatcher } from '../../dispatcher/dispatcher';
import { ActionTypes } from '../../actionTypes/actionTypes';
import { notifications } from './notifications';

class NotificationsStore {
  #notifications;

  constructor() {
    this.#notifications = [];

    dispatcher.register(this.reduce.bind(this));
  }

  addNotificaiton(ntf) {
    this.#notifications.push(ntf);
  }

  async reduce(action) {
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

  renderNotifications(config) {
    notifications.render(config);
  }

  removeNotifications() {
    notifications.removeNotifications();
  }
}

export const notificationsStore = new NotificationsStore();
