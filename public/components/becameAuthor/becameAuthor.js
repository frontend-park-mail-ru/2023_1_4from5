import template from './becameAuthor.handlebars';

const contentElement = document.querySelector('main');

class BecameAuthor {
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
  }
}

export const becameAuthor = new BecameAuthor(contentElement);
