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
    this.#config = {
      attachments: [],
    };
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.CREATE_POST:
// RK3-Alik
        this.sendPost(action.type, action, async (body) => {
          const tokenCreate = await request.getHeader('/api/post/create');
          return request.postMultipart('/api/post/create', body, tokenCreate);
//==
        this.sendPost(action, async (body) => {
          const formData = new FormData();

          for (const key in body) {
            if (key !== 'subscriptions') {
              formData.append(`${key}`, body[key]);
            } else {
              for (const sub in body[key]) {
                formData.append('subscriptions', body[key][sub]);
              }
            }
          }
          const tokenCreate = await request.getHeader('/api/post/create');
          return request.postMultipart('/api/post/create', formData, tokenCreate);
// RK3
        });
        break;

      case ActionTypes.UPDATE_POST:
        this.sendPost(action.type, action, async (body, action) => {
          const postId = action.postId;
          body.available_subscriptions = body.subscriptions;
          const tokenEdit = await request.getHeader(`/api/post/edit/${postId}`);
          return request.put(`/api/post/edit/${postId}`, body, tokenEdit);
        });
        break;

      default:
        break;
    }
  }

// RK3-Alik
  renderNewPost() {
    if (newPost.config && newPost.config.attachments) {
      newPost.config.attachments = [];
    }
    newPost.render();
//==
  async renderNewPost() {
    const req = await request.get(`/api/creator/page/${userStore.getUserState().authorURL}`);
    const creatorPage = await req.json();
    const levels = {
      subs: creatorPage.subscriptions,
    };
    newPost.render(levels);
// RK3
    newPost.publish();
  }

  async renderUpdatingPost(postId) {
    const postRequest = await request.get(`/api/post/get/${postId}`);
    const post = await postRequest.json();
// RK3-Alik
    this.#config.attachments = [];
    post.attachments.forEach((item) => {
      this.#config.attachments.push(item);
    });
    newPost.config.attachments = post.attachments;
    newPost.render();
//=======

    const req = await request.get(`/api/creator/page/${userStore.getUserState().authorURL}`);
    const creatorPage = await req.json();
    const levels = {
      subs: creatorPage.subscriptions,
    };

    newPost.render(levels);
// RK3
    newPost.update(postId, post.title, post.text);
  }

  async sendPost(actionType, action, callback) {
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
// RK3-Alik
      let status;
      if (actionType === ActionTypes.CREATE_POST) {
        status = await this.sendCreatedPost(action, createTitle, createText, callback);
      } else {
        status = await this.sendEditedPost(action, createTitle, createText, callback);
      }
      if (status) {
        newPost.config.attachments = [];
        this.#config.attachments = [];
        router.popstate();
//==
      const body = {
        title: createTitle,
        text: createText,
        creator: userStore.getUserState().authorURL,
        attachments: action.input.attachments,
        subscriptions: action.input.availableSubscriptions,
      };
      const result = await callback(body, action);
      if (result.ok) {
        router.go(URLS.myPage);
// RK3
      } else {
        errorTextOutput.innerHTML = '';
        errorTextOutput.innerHTML = 'Введённые данные некорректны';
        action.input.titleInput.style.backgroundColor = color.error;
        action.input.textInput.style.backgroundColor = color.error;
      }
    }
  }

  async sendCreatedPost(action, createTitle, createText, callback) {
    const formData = new FormData();
    formData.append('title', createTitle);
    formData.append('text', createText);
    formData.append('creator', userStore.getUserState().authorURL);
    if (action.input.attachments) {
      action.input.attachments.forEach((attach) => formData.append('attachments', attach));
    }

    const result = await callback(formData, action);
    return result.ok;
  }

  async sendEditedPost(action, createTitle, createText, callback) {
    const body = {
      title: createTitle,
      text: createText,
      creator: userStore.getUserState().authorURL,
    };
    const result = await callback(body, action);
    let deleteStatus = true;
    let addStatus = true;
    console.log(this.#config.attachments, action.input.attachments);

    if (this.#config.attachments) {
      for (const attach of this.#config.attachments) {
        if (!action.input.attachments.includes(attach)) {
          console.log('deleted file: ', attach);
          const tokenEdit = await request.getHeader(`/api/post/deleteAttach/${action.postId}`);
          const deleteResult = await request.deleteWithBody(
            `/api/post/deleteAttach/${action.postId}`,
            attach,
            tokenEdit
          );
          deleteStatus = true;
          // TODO в будущем сделать обработку ошибок отдельно
        }
      }
    }

    if (action.input.attachments) {
      for (const attach of action.input.attachments) {
        if (!this.#config.attachments.includes(attach)) {
          console.log('new file: ', attach);
          const formData = new FormData();
          formData.append('attachment', attach);
          const tokenEdit = await request.getHeader(`/api/post/addAttach/${action.postId}`);
          const addResult = await request.postMultipart(
            `/api/post/addAttach/${action.postId}`,
            formData,
            tokenEdit
          );
          addStatus = true;
        }
      }
    }
    console.log(result.ok && deleteStatus && addStatus);
    return result.ok && deleteStatus && addStatus;
  }
}

export const newPostStore = new NewPostStore();
