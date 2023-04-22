import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsRegister = {
  renderReg() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_REG,
    });
  },

  registration(input) {
    dispatcher.dispatch({
      type: ActionTypes.REGISTRATION,
      input,
    });
  },

  removeReg() {
    dispatcher.dispatch({
      type: ActionTypes.REMOVE_REG,
    });
  },
};
