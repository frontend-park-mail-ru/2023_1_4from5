import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsMyPage = {
  clickLike(typeLike, postId) {
    dispatcher.dispatch({
      type: ActionTypes.CLICK_LIKE,
      typeLike,
      postId,
    });
  },

  editAim() {
    dispatcher.dispatch({
      type: ActionTypes.OPEN_EDIT_AIM,
    });
  },

  saveEditAim(input) {
    dispatcher.dispatch({
      type: ActionTypes.SAVE_EDIT_AIM,
      input,
    });
  },

  closeEditAim() {
    dispatcher.dispatch({
      type: ActionTypes.CLOSE_EDIT_AIM,
    });
  },

};
