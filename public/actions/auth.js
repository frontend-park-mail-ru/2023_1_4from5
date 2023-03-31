import { ActionTypes } from '../actionTypes/auth.js';
import { dispatcher } from '../dispatcher/dispatcher.js';

export const Actions = {
  // start
  start() {
    dispatcher.dispatch({
      type: ActionTypes.START,
    });
  },

  renderStartPage() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_STARTPAGE,
      parent,
    });
  },

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

  logout() {
    dispatcher.dispatch({
      type: ActionTypes.LOGOUT,
    });
  },

  // sideBar
  renderSideBar(parent, user) {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_SIDEBAR,
      parent,
      user,
    });
  },

  // winsettings
  renderWinSettings(user) {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_WINSETTINGS,
      user,
    });
  },
};
