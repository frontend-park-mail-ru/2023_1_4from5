// @ts-expect-error TS(2307): Cannot find module './becomeAuthor.handlebars' or ... Remove this comment to see the full error message
import template from './becomeAuthor.handlebars';
import { Actions } from '../../actions/actions';

const contentElement = document.querySelector('main');

class BecomeAuthor {
  #parent;

  constructor(parent: any) {
    this.#parent = parent;
  }

  render() {
    const newDiv = document.createElement('div');
    newDiv.id = 'becameAuthorDiv';
    newDiv.innerHTML = template();
    this.#parent.appendChild(newDiv);

    const background = document.getElementById('becomeAuthor--back');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    background.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.removeBecomeAuthor();
    });
  }

  remove() {
    const lastBecomeAuthor = document.getElementById('becameAuthorDiv');
    if (lastBecomeAuthor) {
      lastBecomeAuthor.remove();
    }
  }

  publish() {
    const bcmAuthorBtn = document.getElementById('becameAuthor__btn');
    const nameInput = document.getElementById('becameAuthor__name--input');
    const descriptionInput = document.getElementById('becameAuthor__description--input');

    const errorNameOutput = document.getElementById('becameAuthor__name--err');
    const errorDescriptionOutput = document.getElementById('becameAuthor__description--err');

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    bcmAuthorBtn.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.becomeAuthor({
        nameInput,
        descriptionInput,
        errorNameOutput,
        errorDescriptionOutput,
      });
    });
  }

  update(name: any, description: any) {
    const bcmAuthorBtn = document.getElementById('becameAuthor__btn');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    bcmAuthorBtn.innerHTML = 'Обновить профиль';
    const nameInput = document.getElementById('becameAuthor__name--input');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    nameInput.value = name;
    const descriptionInput = document.getElementById('becameAuthor__description--input');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    descriptionInput.value = description;

    const errorNameOutput = document.getElementById('becameAuthor__name--err');
    const errorDescriptionOutput = document.getElementById('becameAuthor__description--err');

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    bcmAuthorBtn.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.updateProfile({
        nameInput,
        descriptionInput,
        errorNameOutput,
        errorDescriptionOutput,
      });
    });
  }
}

export const becameAuthor = new BecomeAuthor(contentElement);
