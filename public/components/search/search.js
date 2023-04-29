import { router } from '../../modules/Router';
import { URLS } from '../../modules/Notifier';
import template from './search.handlebars';

const contentElement = document.querySelector('main');

class Search {
  #parent;

  #authors;

  constructor(parent) {
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
    console.log(this.#authors);
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'searchDiv';
    newDiv.innerHTML = template(this.#authors);
    this.#parent.appendChild(newDiv);

    let cards = document.querySelectorAll('.author-card');
    for (let index = 0; index < cards.length; index++) {
      const card = cards[index];
      card.addEventListener('click', this.selectAuthor.bind(this));
    }
  }

  selectAuthor(e) {
    e.preventDefault();
    router.go(URLS.myPage, {}, e.currentTarget.id);
  }
}

export const search = new Search(contentElement);
