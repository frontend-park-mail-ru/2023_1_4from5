import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsUser = {
  getUser() {
    dispatcher.dispatch({
      type: ActionTypes.GET_USER,
    });
  },

  logout(href, data, parent) {
    dispatcher.dispatch({
      type: ActionTypes.LOGOUT,
      parent,
    });
  },
};
