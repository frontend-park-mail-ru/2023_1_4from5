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

  // downloadAttach(file) {
  //   dispatcher.dispatch({
  //     type: ActionTypes.DOWNLOAD_ATTACH,
  //     file,
  //   });
  // },
};
