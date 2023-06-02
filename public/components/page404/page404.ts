// @ts-expect-error TS(2307): Cannot find module './page404.handlebars' or its c... Remove this comment to see the full error message
import template from './page404.handlebars';

const contentElement = document.querySelector('main');

class Page404 {
  #parent;

  constructor(parent: any) {
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
