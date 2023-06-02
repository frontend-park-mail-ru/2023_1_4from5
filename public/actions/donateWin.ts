import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsDonateWin = {
  renderDonateWin() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_DONATE_WIN,
    });
  },

  removeDonateWin() {
    dispatcher.dispatch({
      type: ActionTypes.REMOVE_DONATE_WIN,
    });
  },

  donate(input) {
    dispatcher.dispatch({
      type: ActionTypes.DONATE,
      input,
    });
  },
};
