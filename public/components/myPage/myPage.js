const template = require('./myPage.handlebars');

const contentElement = document.querySelector('main');

class MyPage {
  #parent;

  #config;

  constructor(parent) {
    this.#parent = parent;
  }

  get config() {
    return this.#config;
  }

  set config(config) {
    this.#config = config;
  }

  render() {
    const newDiv = document.createElement('div');
    newDiv.id = 'myPageDiv';
    newDiv.innerHTML = template(this.#config);
    this.#parent.appendChild(newDiv);
  }
}

export const myPage = new MyPage(contentElement);
