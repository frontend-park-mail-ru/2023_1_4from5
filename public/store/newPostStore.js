import { dispatcher } from '../dispatcher/dispatcher.js';
import { newPost } from '../components/newPost/newPost';
import { Actions } from '../actions/auth';
import { ActionTypes } from '../actionTypes/auth';
import { userStore } from './userStore';
import { request } from '../modules/request';

class NewPostStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.CREATE_POST:
        const title = action.input.titleInput.value;
        const text = action.input.textInput.value;

        // const body = new FormData();
        // body.append('title', title);
        // body.append('text', text);
        // body.append('creator', userStore.getUserState().authorURL);

        const body = {
          title,
          text,
          creator: userStore.getUserState().authorURL,
        };
        console.log(body);

        await request.get('/api/post/create');
        await request.post('/api/post/create', body, 'multipart/form-data');
        break;

      default:
        break;
    }
  }

  renderNewPost() {
    newPost.render();
    newPost.publish();
  }
}

export const newPostStore = new NewPostStore();
