import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsStatistics = {
  getMoney(input: any) {
    dispatcher.dispatch({
      type: ActionTypes.GET_MONEY,
      input,
    });
  },
  showStatistics(input: any) {
    dispatcher.dispatch({
      type: ActionTypes.SHOW_STATISTICS,
      input,
    });
  },
};
