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

    const backBtn = document.getElementById('becameAuthor__backBtn');
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      router.popstate();
    });
  }

  publish() {
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
  }

  update(name, description) {
    const bcmAuthorBtn = document.getElementById('becameAuthor__btn');
    bcmAuthorBtn.innerHTML = 'Обновить профиль';
    const nameInput = document.getElementById('becameAuthor__name--input');
    nameInput.value = name;
    const descriptionInput = document.getElementById('becameAuthor__description--input');
    descriptionInput.value = description;

    bcmAuthorBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const newName = nameInput.value;
      const newDescription = descriptionInput.value;
      Actions.updateProfile({
        newName,
        newDescription,
      });
    });
  }
}

export const becameAuthor = new BecomeAuthor(contentElement);
