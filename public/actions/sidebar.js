import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsSideBar = {
  renderSideBar(user) {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_SIDEBAR,
      user,
    });
  },
};
