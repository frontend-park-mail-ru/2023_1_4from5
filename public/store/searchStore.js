import { dispatcher } from '../dispatcher/dispatcher';
import { request } from '../modules/request';
import { search } from '../components/search/search';

class SearchStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  reduce(action) {
    switch (action.type) {
      default:
        break;
    }
  }

  async renderSearch() {
    const creatorListRequest = await request.get('/api/creator/list');
    const creatorList = await creatorListRequest.json();
    const authors = {
      creatorList,
    };
    search.authors = authors;
    search.render();
  }
}

export const searchStore = new SearchStore();
