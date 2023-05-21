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

  createComment(input) {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_COMMENT,
      input,
    });
  },

  updateComment(commentId, input) {
    dispatcher.dispatch({
      type: ActionTypes.UPDATE_COMMENT,
      commentId,
      input,
    });
  },

  deleteComment(commentId, postId) {
    dispatcher.dispatch({
      type: ActionTypes.DELETE_COMMENT,
      commentId,
      postId,
    });
  },
};
