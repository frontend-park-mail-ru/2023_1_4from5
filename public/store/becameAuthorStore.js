import { dispatcher } from '../dispatcher/dispatcher';
import { becameAuthor } from '../components/becameAuthor/becameAuthor';

const contentElement = document.querySelector('main');

class BecameAuthorStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  reduce(action) {
    switch (action.type) {
      default:
        break;
    }
  }

  renderBecomeAuthor() {
    becameAuthor.render();
  }
}

export const becameAuthorStore = new BecameAuthorStore();
