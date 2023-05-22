import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsNotifications = {
  renderNotifications() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_NOTIFICATIONS,
    });
  },

  removeNotifications() {
    dispatcher.dispatch({
      type: ActionTypes.REMOVE_NOTIFICATIONS,
    });
  }
};
