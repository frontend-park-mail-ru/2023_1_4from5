import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsSettings = {
  changePassword(input) {
    dispatcher.dispatch({
      type: ActionTypes.CHANGE_PASSWORD,
      input,
    });
  },

  changeUsernameLogin(username, login) {
    dispatcher.dispatch({
      type: ActionTypes.CHANGE_USERNAME_LOGIN,
      username,
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
