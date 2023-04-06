import { router } from '../../modules/Router.js';
import { URLS } from '../../modules/Notifier.js';

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

  getParent() {
    return this.#parent;
  }

  render() {
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'myPageDiv';
    newDiv.innerHTML = template(this.#config);
    this.#parent.appendChild(newDiv);

    const createPostBtn = document.getElementById('subs-btn');
    createPostBtn.addEventListener('click', (e) => {
      e.preventDefault();
      router.go(URLS.newPost, '', this.getParent());
    });
  }
}

export const myPage = new MyPage(contentElement);
