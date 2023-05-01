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

  getSubscription(id, monthCount, money, creatorId) {
    dispatcher.dispatch({
      type: ActionTypes.GET_SUBSCRIPION,
      id,
      monthCount,
      money,
      creatorId,
    });
  },

  creatorCoverUpdate(file, coverId) {
    dispatcher.dispatch({
      type: ActionTypes.CREATOR_COVER_UPDATE,
      file,
      coverId,
    });
  },

  creatorPhotoUpdate(file) {
    dispatcher.dispatch({
      type: ActionTypes.CREATOR_PHOTO_UPDATE,
      file,
    });
  },

  creatorInfoUpdate(info) {
    dispatcher.dispatch({
      type: ActionTypes.CREATOR_INFO_UPDATE,
      info,
    });
  },
};
