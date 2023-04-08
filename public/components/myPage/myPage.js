import { router } from '../../modules/Router.js';
import { URLS } from '../../modules/Notifier.js';
import { Actions } from '../../actions/auth';
import { newPost } from '../newPost/newPost';

// TODO лайки (запросы, counter)
// TODO добавить возможность редактирования цели (от автора)
// TODO добавить возможность редактирования цели (от подписчика)

// TODO FUTURE при нажатии на подписку предлагает на выбор подписку либо без неё
// TODO FUTURE если пользователь подписан, то кнопка Вы подписаны

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
    console.log(this.#config);
    this.#parent.appendChild(newDiv);

    const createPostBtn = document.getElementById('createPost-btn');
    createPostBtn.addEventListener('click', (e) => {
      e.preventDefault();
      router.go(URLS.newPost, '', this.getParent());
    });

    let deletePostBtns = document.querySelectorAll('.delete-icon');
    for (let index = 0; index < deletePostBtns.length; index++) {
      const button = deletePostBtns[index];
      button.addEventListener('click', this.deleteHandler);
    }

    let updatePostBtns = document.querySelectorAll('.pencil-icon');
    for (let index = 0; index < updatePostBtns.length; index++) {
      const button = updatePostBtns[index];
      button.addEventListener('click', this.updateHandler.bind(this));
    }
  }

  deleteHandler(e) {
    e.preventDefault();

    Actions.deletePost(e.currentTarget.parentElement.parentElement.id);
  }

  updateHandler(e) {
    e.preventDefault();

    const postId = e.currentTarget.parentElement.parentElement.id;
    const title = e.currentTarget.parentElement.parentElement.title;
    const text = e.currentTarget.parentElement.parentElement.slot;
    router.go(URLS.editPost, {
      postId,
      title,
      text,
    }, this.getParent(), postId);
  }
}

export const myPage = new MyPage(contentElement);
