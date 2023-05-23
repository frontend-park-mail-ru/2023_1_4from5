import { dispatcher } from '../../dispatcher/dispatcher';
import { request } from '../../modules/request';
import { search } from './search';
import { ActionTypes } from '../../actionTypes/actionTypes';

class SearchStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  reduce(action) {
    switch (action.type) {
      case ActionTypes.SEARCH_AUTHORS:
        this.renderSearch(action.input);
        break;

      default:
        break;
    }
  }

  async renderSearch(input) {
    let creatorListRequest;
    if (!input) {
      creatorListRequest = await request.get('/api/creator/list');
    } else {
      creatorListRequest = await request.get(`/api/creator/search/${input}`);
    }
    const creatorList = await creatorListRequest.json();
    search.authors = {
      creatorList,
    };
    search.render();
  }
}

export const searchStore = new SearchStore();
