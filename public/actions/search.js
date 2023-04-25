import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/actionTypes';

export const ActionsSearch = {
  searchAuthors(input) {
    dispatcher.dispatch({
      type: ActionTypes.SEARCH_AUTHORS,
      input,
    });
  },
};
