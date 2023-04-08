const template = require('./search.handlebars');

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

  render() {
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'searchDiv';
    newDiv.innerHTML = template(this.#authors);
    this.#parent.appendChild(newDiv);
  }
}

export const search = new Search(contentElement);
