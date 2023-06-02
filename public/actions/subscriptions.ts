import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionSubscriptions = {
  renderSubscriptions() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_SUBSCRIPTIONS,
    });
  },

  removeSubscriptions() {
    dispatcher.dispatch({
      type: ActionTypes.REMOVE_SUBSCRIPTIONS,
    });
  },
};
