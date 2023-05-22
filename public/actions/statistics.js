import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsStatistics = {
  getMoney(input) {
    dispatcher.dispatch({
      type: ActionTypes.GET_MONEY,
      input,
    });
  },
};
