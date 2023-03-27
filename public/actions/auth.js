import { ActionTypes } from '../actionTypes/auth.js';
import { dispatcher } from '../dispatcher/dispatcher.js';

export const Actions = {
  // authorization
  renderAuth() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_AUTH,
    });
  },

  authorization(input) {
    dispatcher.dispatch({
      type: ActionTypes.AUTHORIZATION,
      input,
    });
  },

  removeAuth() {
    dispatcher.dispatch({
      type: ActionTypes.REMOVE_AUTH,
    });
  },
  // user
  getUser() {
    dispatcher.dispatch({
      type: ActionTypes.GET_USER,
    });
  },
  // sideBar
  renderSideBar() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_SIDEBAR,
    });
  },
};
