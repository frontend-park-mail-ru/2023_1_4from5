import { dispatcher } from '../../dispatcher/dispatcher.js';
import { newPost } from './newPost';
import { ActionTypes } from '../../actionTypes/actionTypes';
import { userStore } from '../user/userStore';
import { request } from '../../modules/request';
import { router } from '../../modules/Router';
import { isValidTextPost, isValidTitlePost } from '../../modules/isValid';
import { color } from '../../consts/styles';
import { URLS } from '../../modules/Notifier';

document.querySelector('main');
class NewPostStore {
  #config;
  #levels;

  constructor() {
    this.config = {
      attachments: [],
    };
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.CREATE_POST:
        this.sendPost(action, async (body) => {
          const tokenCreate = await request.getHeader('/api/post/create');
          return request.post('/api/post/create', body, tokenCreate, 'multipart/form-data');
        });
        break;

      case ActionTypes.UPDATE_POST:
        this.sendPost(action, async (body, action) => {
          const postId = action.postId;
          const tokenEdit = await request.getHeader(`/api/post/edit/${postId}`);
          return request.put(`/api/post/edit/${postId}`, body, tokenEdit);
        });
        break;

      case ActionTypes.DOWNLOAD_ATTACH:
        this.addAttach(action.file);
        break;

      default:
        break;
    }
  }

  async renderNewPost() {
    const req = await request.get(`/api/creator/page/${userStore.getUserState().authorURL}`);
    const creatorPage = await req.json();
    const levels = {
      subs: creatorPage.subscriptions,
    };
    newPost.render(levels);
    newPost.publish();
  }

  async renderUpdatingPost(postId) {
    const postRequest = await request.get(`/api/post/get/${postId}`);
    const post = await postRequest.json();

    const req = await request.get(`/api/creator/page/${userStore.getUserState().authorURL}`);
    const creatorPage = await req.json();
    const levels = {
      subs: creatorPage.subscriptions,
    };

    newPost.render(levels);
    newPost.update(postId, post.title, post.text);
  }

  async sendPost(action, callback) {
    const createTitle = action.input.titleInput.value;
    const createText = action.input.textInput.value;
    const errTitle = isValidTitlePost(createTitle);
    const errText = isValidTextPost(createText);
    const errorTitleOutput = action.input.errorTitleOutput;
    const errorTextOutput = action.input.errorTextOutput;

    action.input.titleInput.style.backgroundColor = color.field;
    action.input.textInput.style.backgroundColor = color.field;
    errorTitleOutput.innerHTML = '';
    errorTextOutput.innerHTML = '';

    if (errTitle) {
      errorTitleOutput.innerHTML = '';
      errorTitleOutput.innerHTML = errTitle;
      action.input.titleInput.style.backgroundColor = color.error;
    } else if (errText) {
      errorTextOutput.innerHTML = '';
      errorTextOutput.innerHTML = errText;
      action.input.textInput.style.backgroundColor = color.error;
    } else {
      const body = {
        title: createTitle,
        text: createText,
        creator: userStore.getUserState().authorURL,
        attachments: action.input.attachments,
        // subscriptions: action.input.availableSubscriptions,
      };
      console.log(body, action);
      const result = await callback(body, action);
      console.log(result);
      if (result.ok) {
        router.go(URLS.myPage);
      } else {
        console.log('ERROR');
        errorTextOutput.innerHTML = '';
        errorTextOutput.innerHTML = 'Введённые данные некорректны';
        action.input.titleInput.style.backgroundColor = color.error;
        action.input.textInput.style.backgroundColor = color.error;
      }
    }
  }

  addAttach(file) {
    // if (file.type.startsWith('image')) {
    //   this.config.attachments.img.push(file);
    // } else if (file.type.startsWith('video')) {
    //   this.config.attachments.video.push(file);
    // } else if (file.type.startsWith('audio')) {
    //   this.config.attachments.audio.push(file);
    // }

    this.config.attachments.push(file);
    console.log('store add attach', file);

    newPost.config = this.config;
    newPost.render();
    console.log(this.config);
  }
}

export const newPostStore = new NewPostStore();
