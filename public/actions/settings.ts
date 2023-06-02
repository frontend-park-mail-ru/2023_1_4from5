import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsSettings = {
  changePassword(input: any) {
    dispatcher.dispatch({
      type: ActionTypes.CHANGE_PASSWORD,
      input,
    });
  },

  changeUsernameLogin(username: any, login: any) {
    dispatcher.dispatch({
      type: ActionTypes.CHANGE_USERNAME_LOGIN,
      username,
      login,
    });
  },

  changePhoto(file: any) {
    dispatcher.dispatch({
      type: ActionTypes.CHANGE_PHOTO,
      file,
    });
  },

  deletePhoto(photoId: any) {
    dispatcher.dispatch({
      type: ActionTypes.DELETE_PHOTO,
      photoId,
    });
  },
};
