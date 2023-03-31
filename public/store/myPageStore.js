import { dispatcher } from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../actionTypes/auth.js';
import { myPage } from '../components/myPage/myPage.js';
import { request } from '../modules/request.js';
import { userStore } from './userStore.js';

class MyPageStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.RENDER_MYPAGE:
        const creatorPage = await request.get(`/api/creator/page/${userStore.getUserState().authorURL}`);
        const result = await creatorPage.json();
        result.posts.forEach((post) => {
          const textArr = post.text.split('\\n');
          post.textWithBreaks = [];
          textArr.forEach((text) => {
            post.textWithBreaks.push({ text });
          });
        });

        myPage.config = result;
        myPage.render();
        break;
      default:
        break;
    }
  }
}

export const myPageStore = new MyPageStore();
