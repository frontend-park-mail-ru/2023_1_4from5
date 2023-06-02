import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsPost = {
  createPost(input: any) {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_POST,
      input,
    });
  },

  deletePost(postId: any) {
    dispatcher.dispatch({
      type: ActionTypes.DELETE_POST,
      postId,
    });
  },

  updatePost(postId: any, input: any) {
    dispatcher.dispatch({
      type: ActionTypes.UPDATE_POST,
      postId,
      input,
    });
  },

  createComment(input: any) {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_COMMENT,
      input,
    });
  },

  updateComment(commentId: any, input: any) {
    dispatcher.dispatch({
      type: ActionTypes.UPDATE_COMMENT,
      commentId,
      input,
    });
  },

  deleteComment(commentId: any, postId: any) {
    dispatcher.dispatch({
      type: ActionTypes.DELETE_COMMENT,
      commentId,
      postId,
    });
  },

  clickLikeLonely(typeLike: any, postId: any) {
    dispatcher.dispatch({
      type: ActionTypes.CLICK_LIKE_LONELY,
      typeLike,
      postId,
    });
  },
};
