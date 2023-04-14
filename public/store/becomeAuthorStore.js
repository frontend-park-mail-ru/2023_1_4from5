import { dispatcher } from '../dispatcher/dispatcher';
import { becameAuthor } from '../components/becomeAuthor/becomeAuthor';
import { ActionTypes } from '../actionTypes/actionTypes';
import { request } from '../modules/request';
import { router } from '../modules/Router';
import { URLS } from '../modules/Notifier';
import { Actions } from '../actions/actions';

const contentElement = document.querySelector('main');

class BecomeAuthorStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  reduce(action) {
    switch (action.type) {
      case ActionTypes.BECOME_AUTHOR:
        this.becomeAuthor(action);
        break;

      default:
        break;
    }
  }

  renderBecomeAuthor() {
    becameAuthor.render();
  }

  async becomeAuthor(action) {
    const name = action.input.nameInput.value;
    const description = action.input.descriptionInput.value;
    const body = {
      name,
      description,
    };

    const token = await request.getHeader('/api/user/becameCreator');
    await request.post('/api/user/becameCreator', body, token);
    Actions.getUser();
    router.popstate();
  }
}

export const becameAuthorStore = new BecomeAuthorStore();
