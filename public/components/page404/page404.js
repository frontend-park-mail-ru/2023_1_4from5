import template from './page404.handlebars';

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

    // const page404 = document.getElementById('page404');
    // page404.style.backgroundImage = 'url(../../images/page404.jpeg)';
  }
}

export const page404 = new Page404(contentElement);
