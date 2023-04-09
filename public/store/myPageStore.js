import { dispatcher } from '../dispatcher/dispatcher.js';
import { myPage } from '../components/myPage/myPage.js';
import { request } from '../modules/request.js';
import { userStore } from './userStore.js';
import { ActionTypes } from '../actionTypes/actionTypes';

class MyPageStore {
  #config;

  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.RENDER_MYPAGE:
        this.renderMyPage();
        break;

      case ActionTypes.DELETE_POST:
        await request.get(`/api/post/delete/${action.postId}`);
        await request.delete(`/api/post/delete/${action.postId}`);
        await this.renderMyPage();
        console.log('deleted');
        break;
      case ActionTypes.CLICK_LIKE:
        if (action.typeLike === 'addLike') {
          console.log(action.postId);
          const result = await request.put('/api/post/addLike', { post_id: action.postId });
          if (result.ok) {
            console.log('ADD_LIKE OK', result);
            // TODO научиться нормально считывать инфу с данного результата
            const currentPost = this.#config.posts.find((post) => post.id === action.postId);
            // TODO бэкендеры не обновляют is_liked у себя в бд
            currentPost.is_liked = true;
            currentPost.likes_count += 1;
            myPage.config = this.#config;
            myPage.render();
          } else {
            console.log('ADD_LIKE ERROR');
          }
        } else {
          console.log(action.postId);
          const result = await request.put('/api/post/removeLike', { post_id: action.postId });
          if (result.ok) {
            console.log('REMOVE_LIKE OK');
            const currentPost = this.#config.posts.find((post) => post.id === action.postId);
            currentPost.is_liked = false;
            currentPost.likes_count -= 1;
            myPage.config = this.#config;
            myPage.render();
          } else {
            console.log('REMOVE_LIKE ERROR');
          }
        }
        break;
      default:
        break;
    }
  }

  async renderMyPage(authorUrl = '') {
    let creatorPage;
    if (authorUrl) {
      creatorPage = await request.get(`/api/creator/page/${authorUrl}`);
    } else {
      creatorPage = await request.get(`/api/creator/page/${userStore.getUserState().authorURL}`);
    }
    const result = await creatorPage.json();
    result.posts.forEach((post) => {
      const textArr = post.text.split('\\n');
      post.textWithBreaks = [];
      textArr.forEach((text) => {
        post.textWithBreaks.push({ text });
      });
    });
    this.#config = result;
    const renderIcon = {
      edit_aim: this.#config.is_my_page,
      edit_aboutAuthor: this.#config.is_my_page,
      edit_level: this.#config.is_my_page,
    };
    this.#config = Object.assign(this.#config, renderIcon);
    console.log('testObject', this.#config);
    myPage.config = this.#config;
    myPage.render();
  }
}

export const myPageStore = new MyPageStore();
