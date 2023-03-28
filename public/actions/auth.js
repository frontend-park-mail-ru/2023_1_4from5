import { ActionTypes } from '../actionTypes/auth.js';
import { dispatcher } from '../dispatcher/dispatcher.js';

export const Actions = {
  // start
  // TODO на будущее (закинуть начало в действия
  // async start() {
  //   await dispatcher.dispatch({
  //     type: ActionTypes.START,
  //   });
  //   dispatcher.dispatch({
  //     type: ActionTypes.RENDER_SIDEBAR,
  //   });
  //   dispatcher.dispatch({
  //     type: ActionTypes.RENDER_STARTPAGE,
  //   });
  // },
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
  renderSideBar(parent) {
    // console.log('inside action, renderSideBar', parent);
    dispatcher.dispatch({
      type: ActionTypes.RENDER_SIDEBAR,
      parent,
    });
  },
};
