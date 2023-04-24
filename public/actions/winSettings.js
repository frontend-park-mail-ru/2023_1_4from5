import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsWinSettings = {
  renderWinSettings() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_WINSETTINGS,
    });
  },

  removeWinSettings() {
    dispatcher.dispatch({
      type: ActionTypes.REMOVE_WINSETTINGS,
    });
  },
};
