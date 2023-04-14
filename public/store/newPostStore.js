import { dispatcher } from '../dispatcher/dispatcher.js';
import { newPost } from '../components/newPost/newPost';
import { ActionTypes } from '../actionTypes/actionTypes';
import { userStore } from './userStore';
import { request } from '../modules/request';
import { router } from '../modules/Router';
import { URLS } from '../modules/Notifier';
import {isValidTextPost, isValidTitlePost} from "../modules/isValid";
import {color} from "../consts/styles";
import {myPage} from "../components/myPage/myPage";

const contentElement = document.querySelector('main');

class NewPostStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.CREATE_POST:
        this.createPost(action.input);
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
        router.go(URLS.myPage, {}, contentElement);
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

  async createPost(input) {
    const createTitle = input.titleInput.value;
    const createText = input.textInput.value;
    const errTitle = isValidTitlePost(createTitle);
    const errText = isValidTextPost(createText);
    const errorTitleOutput = input.errorTitleOutput;
    const errorTextOutput = input.errorTextOutput;

    input.titleInput.style.backgroundColor = color.field;
    input.textInput.style.backgroundColor = color.field;

    if (errTitle) {
      errorTitleOutput.innerHTML = '';
      errorTitleOutput.innerHTML = errTitle;
      input.titleInput.style.backgroundColor = color.error;
    } else if (errText) {
      errorTextOutput.innerHTML = '';
      errorTextOutput.innerHTML = errText;
      input.textInput.style.backgroundColor = color.error;
    } else {
      const body = {
        title: createTitle,
        text: createText,
        creator: userStore.getUserState().authorURL,
      };

      await request.get('/api/post/create');
      const createPost = await request.post('/api/post/create', body, 'multipart/form-data');
      if (createPost.ok) {
        router.go(URLS.myPage, {}, contentElement);
      } else {
        errorTextOutput.innerHTML = '';
        errorTextOutput.innerHTML = 'Введённые данные некорректны';
        input.titleInput.style.backgroundColor = color.error;
        input.textInput.style.backgroundColor = color.error;
      }
    }
  }
}

export const newPostStore = new NewPostStore();
