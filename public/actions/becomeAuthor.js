import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsBecomeAuthor = {
  becomeAuthor(input) {
    dispatcher.dispatch({
      type: ActionTypes.BECOME_AUTHOR,
      input,
    });
  },

  updateProfile(input) {
    dispatcher.dispatch({
      type: ActionTypes.UPDATE_PROFILE,
      input,
    });
  },
};
