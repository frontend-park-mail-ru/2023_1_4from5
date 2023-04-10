import { dispatcher } from '../dispatcher/dispatcher.js';
import { newPost } from '../components/newPost/newPost';
import { ActionTypes } from '../actionTypes/actionTypes';
import { userStore } from './userStore';
import { request } from '../modules/request';

class NewPostStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.CREATE_POST:
        const createTitle = action.input.titleInput.value;
        const createText = action.input.textInput.value;

        const body = {
          title: createTitle,
          text: createText,
          creator: userStore.getUserState().authorURL,
        };

        await request.get('/api/post/create');
        await request.post('/api/post/create', body, 'multipart/form-data');
        break;

      case ActionTypes.UPDATE_POST:
        const postId = action.postId;
        const editTitle = action.input.titleInput.value;
        const editText = action.input.textInput.value;

        await request.get(`/api/post/edit/${postId}`);
        await request.put(`/api/post/edit/${postId}`, {
          title: editTitle,
          text: editText,
        });
        break;

      default:
        break;
    }
  }

  renderNewPost() {
    newPost.render();
    newPost.publish();
  }

  async renderUpdatingPost(postId) {
    const postRequest = await request.get(`/api/post/get/${postId}`);
    const post = await postRequest.json();
    newPost.render();
    newPost.update(postId, post.title, post.text);
  }
}

export const newPostStore = new NewPostStore();
