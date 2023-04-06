import { dispatcher } from '../dispatcher/dispatcher.js';
import { myPage } from '../components/myPage/myPage.js';
import { request } from '../modules/request.js';
import { userStore } from './userStore.js';

class MyPageStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  reduce(action) {
    switch (action.type) {
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
