const template = require('./page404.handlebars');

const contentElement = document.querySelector('main');

class Page404 {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  render() {
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'page404Div';
    newDiv.innerHTML = template();
    this.#parent.appendChild(newDiv);
  }
}

export const page404 = new Page404(contentElement);
