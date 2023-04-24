import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsSettings = {
  changePassword(input) {
    dispatcher.dispatch({
      type: ActionTypes.CHANGE_PASSWORD,
      input,
    });
  },

  changeUsername(username) {
    dispatcher.dispatch({
      type: ActionTypes.CHANGE_USERNAME,
      username,
    });
  },

  changeLogin(login) {
    dispatcher.dispatch({
      type: ActionTypes.CHANGE_LOGIN,
      login,
    });
  },

  changePhoto(file) {
    dispatcher.dispatch({
      type: ActionTypes.CHANGE_PHOTO,
      file,
    });
  },
};
