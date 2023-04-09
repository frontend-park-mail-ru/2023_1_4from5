import { router } from '../../modules/Router.js';
import { URLS } from '../../modules/Notifier.js';
import { Actions } from '../../actions/actions';

// TODO добавить возможность редактирования цели (от автора)
// TODO добавить возможность редактирования цели (от подписчика)
// TODO загрузка аватарки пользователя и автора
// TODO кнопки подписаться нет, когда ты не авторизован

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
    this.#parent.appendChild(newDiv);

    const createPostBtn = document.getElementById('createPost-btn');
    if (createPostBtn) {
      createPostBtn.addEventListener('click', (e) => {
        e.preventDefault();
        router.go(URLS.newPost, '', this.getParent());
      });
    }

    const deletePostBtns = document.querySelectorAll('#delete-icon');
    for (let index = 0; index < deletePostBtns.length; index++) {
      const button = deletePostBtns[index];
      button.addEventListener('click', this.deleteHandler);
    }

    const updatePostBtns = document.querySelectorAll('#pencil-icon');
    for (let index = 0; index < updatePostBtns.length; index++) {
      const button = updatePostBtns[index];
      button.addEventListener('click', this.updateHandler.bind(this));
    }

    const likeIcons = document.querySelectorAll('.like-icon');
    for (let index = 0; index < likeIcons.length; index++) {
      const likeIcon = likeIcons[index];
      likeIcon.addEventListener('click', (event) => {
        const eventLike = likeIcon.id === 'love-like-icon' ? 'removeLike' : 'addLike';
        Actions.clickLike(eventLike, event.target.parentElement.parentElement.parentElement.id);
      });
    }
    const editAimIcon = document.getElementById('pencil-icon-aim');

    editAimIcon.addEventListener('click', async (e) => {
      e.preventDefault();
      console.log('click on editAimIcon');
    });
  }

  deleteHandler(e) {
    e.preventDefault();
    Actions.deletePost(e.currentTarget.parentElement.parentElement.id);
  }

  updateHandler(e) {
    e.preventDefault();
    const postId = e.currentTarget.parentElement.parentElement.id;
    router.go(URLS.editPost, {
      postId,
    }, this.getParent(), postId);
  }
}

export const myPage = new MyPage(contentElement);
