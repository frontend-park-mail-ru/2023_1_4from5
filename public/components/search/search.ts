import { router } from '../../modules/Router';
import { URLS } from '../../modules/Notifier';
// @ts-expect-error TS(2307): Cannot find module './search.handlebars' or its co... Remove this comment to see the full error message
import template from './search.handlebars';

const contentElement = document.querySelector('main');

class Search {
  #parent;

  // @ts-expect-error TS(7008): Member '#authors' implicitly has an 'any' type.
  #authors;

  constructor(parent: any) {
    this.#parent = parent;
  }

  set authors(authors) {
    this.#authors = authors;
  }

  get authors() {
    return this.#authors;
  }

  getParent() {
    return this.#parent;
  }

  render() {
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'searchDiv';
    newDiv.innerHTML = template(this.#authors);
    this.#parent.appendChild(newDiv);

    let cards = document.querySelectorAll('.creator__card');
    for (let index = 0; index < cards.length; index++) {
      const card = cards[index];
      card.addEventListener('click', this.selectAuthor.bind(this));
    }
  }

  selectAuthor(e: any) {
    e.preventDefault();
    router.go(URLS.myPage, {}, e.currentTarget.id);
  }
}

export const search = new Search(contentElement);
