import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionSubscription = {
  renderSubscription() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_SUBSCRIPTION,
    });
  },

  renderUpdatingSubscription(id: any, content: any) {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_UPDATING_SUBSCRIPTION,
      id,
      content,
    });
  },

  removeSubscription() {
    dispatcher.dispatch({
      type: ActionTypes.REMOVE_SUBSCRIPTION,
    });
  },

  createSub(input: any) {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_SUB,
      input,
    });
  },

  updateSub(id: any, input: any) {
    dispatcher.dispatch({
      type: ActionTypes.UPDATE_SUB,
      id,
      input,
    });
  },

  deleteSub(id: any) {
    dispatcher.dispatch({
      type: ActionTypes.DELETE_SUB,
      id,
    });
  },
};
