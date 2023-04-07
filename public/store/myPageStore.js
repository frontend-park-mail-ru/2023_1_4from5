import { dispatcher } from '../dispatcher/dispatcher.js';
import { myPage } from '../components/myPage/myPage.js';
import { request } from '../modules/request.js';
import { userStore } from './userStore.js';
import { ActionTypes } from '../actionTypes/auth';

class MyPageStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.DELETE_POST:
        console.log(action.postId);
        await request.get(`/api/post/delete/${action.postId}`);
        await request.delete(`/api/post/delete/${action.postId}`);
        await this.renderMyPage();
        console.log('deleted');
        break;

      default:
        break;
    }
  }

  async renderMyPage() {
    console.log(userStore.getUserState().authorURL);
    const creatorPage = await request.get(`/api/creator/page/${userStore.getUserState().authorURL}`);
    const result = await creatorPage.json();
    result.posts.forEach((post) => {
      const textArr = post.text.split('\\n');
      post.textWithBreaks = [];
      textArr.forEach((text) => {
        post.textWithBreaks.push({ text });
      });
    });

    console.log(result);

    myPage.config = result;
    myPage.render();
  }
}

export const myPageStore = new MyPageStore();
