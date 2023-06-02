import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsAuthorPage = {
  renderAuthorPage() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_AUTHOR_PAGE,
    });
  },

  clickLike(typeLike: any, postId: any, page: any) {
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

  updateAim(aim: any) {
    dispatcher.dispatch({
      type: ActionTypes.UPDATE_AIM,
      aim,
    });
  },

  saveAim(input: any) {
    dispatcher.dispatch({
      type: ActionTypes.SAVE_AIM,
      input,
    });
  },

  follow(id: any) {
    dispatcher.dispatch({
      type: ActionTypes.FOLLOW,
      id,
    });
  },

  unfollow(id: any, page: any) {
    dispatcher.dispatch({
      type: ActionTypes.UNFOLLOW,
      id,
      page,
    });
  },

  getSubscription(input: any) {
    dispatcher.dispatch({
      type: ActionTypes.GET_SUBSCRIPION,
      input,
    });
  },

  creatorCoverUpdate(file: any, coverId: any) {
    dispatcher.dispatch({
      type: ActionTypes.CREATOR_COVER_UPDATE,
      file,
      coverId,
    });
  },

  creatorPhotoUpdate(file: any, profilePhoto: any) {
    dispatcher.dispatch({
      type: ActionTypes.CREATOR_PHOTO_UPDATE,
      file,
      profilePhoto,
    });
  },

  creatorCoverDelete(coverId: any) {
    dispatcher.dispatch({
      type: ActionTypes.CREATOR_COVER_DELETE,
      coverId,
    });
  },

  creatorPhotoDelete(photoId: any) {
    dispatcher.dispatch({
      type: ActionTypes.CREATOR_PHOTO_DELETE,
      photoId,
    });
  },

  filterSubscriptions(subscriptions: any) {
    dispatcher.dispatch({
      type: ActionTypes.FILTER_SUBSCRIPTIONS,
      subscriptions,
    });
  },
};
