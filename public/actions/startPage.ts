import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsStartPage = {
  // start
  renderStartPage() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_STARTPAGE,
      parent,
    });
  },
};
