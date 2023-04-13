import template from './becomeAuthor.handlebars';
import { Actions } from '../../actions/actions';
import { router } from '../../modules/Router';

const contentElement = document.querySelector('main');

class BecomeAuthor {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  render() {
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'becameAuthorDiv';
    newDiv.innerHTML = template();
    this.#parent.appendChild(newDiv);

    const bcmAuthorBtn = document.getElementById('becameAuthor__btn');
    const nameInput = document.getElementById('becameAuthor__name--input');
    const descriptionInput = document.getElementById('becameAuthor__description--input');

    bcmAuthorBtn.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.becomeAuthor({
        nameInput,
        descriptionInput,
      });
    });

    const backBtn = document.getElementById('becameAuthor__backBtn');
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      router.popstate();
    });
  }
}

export const becameAuthor = new BecomeAuthor(contentElement);
