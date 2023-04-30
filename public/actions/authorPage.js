import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsAuthorPage = {
  clickLike(typeLike, postId) {
    dispatcher.dispatch({
      type: ActionTypes.CLICK_LIKE,
      typeLike,
      postId,
    });
  },

  renderAim() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_AIM,
    });
  },

  removeAim() {
    dispatcher.dispatch({
      type: ActionTypes.REMOVE_AIM,
    });
  },

  updateAim(aim) {
    dispatcher.dispatch({
      type: ActionTypes.UPDATE_AIM,
      aim,
    });
  },

  saveAim(input) {
    dispatcher.dispatch({
      type: ActionTypes.SAVE_AIM,
      input,
    });
  },

  follow(id) {
    dispatcher.dispatch({
      type: ActionTypes.FOLLOW,
      id,
    });
  },

  unfollow(id) {
    dispatcher.dispatch({
      type: ActionTypes.UNFOLLOW,
      id,
    });
  },
};
