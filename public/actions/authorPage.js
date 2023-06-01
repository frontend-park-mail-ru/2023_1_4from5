import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsAuthorPage = {
  renderAuthorPage() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_AUTHOR_PAGE,
    });
  },

  clickLike(typeLike, postId, page) {
    dispatcher.dispatch({
      type: ActionTypes.CLICK_LIKE,
      typeLike,
      postId,
      page,
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

  unfollow(id, page) {
    dispatcher.dispatch({
      type: ActionTypes.UNFOLLOW,
      id,
      page,
    });
  },

  getSubscription(input) {
    dispatcher.dispatch({
      type: ActionTypes.GET_SUBSCRIPION,
      input,
    });
  },

  creatorCoverUpdate(file, coverId) {
    dispatcher.dispatch({
      type: ActionTypes.CREATOR_COVER_UPDATE,
      file,
      coverId,
    });
  },

  creatorPhotoUpdate(file, profilePhoto) {
    dispatcher.dispatch({
      type: ActionTypes.CREATOR_PHOTO_UPDATE,
      file,
      profilePhoto,
    });
  },

  creatorCoverDelete(coverId) {
    dispatcher.dispatch({
      type: ActionTypes.CREATOR_COVER_DELETE,
      coverId,
    });
  },

  creatorPhotoDelete(photoId) {
    dispatcher.dispatch({
      type: ActionTypes.CREATOR_PHOTO_DELETE,
      photoId,
    });
  },

  filterSubscriptions(subscriptions) {
    dispatcher.dispatch({
      type: ActionTypes.FILTER_SUBSCRIPTIONS,
      subscriptions,
    });
  },
};
