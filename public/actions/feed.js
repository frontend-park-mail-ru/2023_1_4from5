import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsFeed = {
  likeFeed(typeLike, postId) {
    dispatcher.dispatch({
      type: ActionTypes.LIKE_FEED,
      typeLike,
      postId,
    });
  },
};
