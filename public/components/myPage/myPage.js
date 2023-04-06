import { router } from '../../modules/Router.js';
import { URLS } from '../../modules/Notifier.js';

// TODO закинуть посты в контейнер
// TODO лайки
// TODO если пользователь подписан, то кнопка Вы подписаны
// TODO кнопка Отправить донат только, если ты юзер
// TODO добавить возможность редактирования цели, постов
// TODO добавить иконку редактирования в целях, уровнях подписки, об авторе
// TODO при нажатии на подписку предлагает на выбор подписку либо без неё

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

    const createPostBtn = document.getElementById('createPost-btn');
    createPostBtn.addEventListener('click', (e) => {
      e.preventDefault();
      router.go(URLS.newPost, '', this.getParent());
    });
  }
}

export const myPage = new MyPage(contentElement);
