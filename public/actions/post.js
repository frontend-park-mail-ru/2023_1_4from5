import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsPost = {
  createPost(input) {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_POST,
      input,
    });
  },

  deletePost(postId) {
    dispatcher.dispatch({
      type: ActionTypes.DELETE_POST,
      postId,
    });
  },

  updatePost(postId, input) {
    dispatcher.dispatch({
      type: ActionTypes.UPDATE_POST,
      postId,
      input,
    });
  },

  downloadAttachPhoto(file) {
    dispatcher.dispatch({
      type: ActionTypes.DOWNLOAD_ATTACH_PHOTO,
      file,
    });
  },

  downloadAttachVideo(file) {
    dispatcher.dispatch({
      type: ActionTypes.DOWNLOAD_ATTACH_VIDEO,
      file,
    });
  },

  downloadAttachAudio(file) {
    dispatcher.dispatch({
      type: ActionTypes.DOWNLOAD_ATTACH_AUDIO,
      file,
    });
  },
};
