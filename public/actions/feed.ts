import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsFeed = {
  likeFeed(typeLike: any, postId: any) {
    dispatcher.dispatch({
      type: ActionTypes.LIKE_FEED,
      typeLike,
      postId,
    });
  },
};
