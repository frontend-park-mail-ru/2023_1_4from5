import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsBecomeAuthor = {
  renderBecomeAuthor(creatorId) {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_BECOME_AUTHOR,
      creatorId,
    });
  },

  removeBecomeAuthor() {
    dispatcher.dispatch({
      type: ActionTypes.REMOVE_BECOME_AUTHOR,
    });
  },

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
