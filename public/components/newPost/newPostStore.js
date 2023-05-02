import { dispatcher } from '../../dispatcher/dispatcher.js';
import { newPost } from './newPost';
import { ActionTypes } from '../../actionTypes/actionTypes';
import { userStore } from '../user/userStore';
import { request } from '../../modules/request';
import { router } from '../../modules/Router';
import { isValidTextPost, isValidTitlePost } from '../../modules/isValid';
import { color } from '../../consts/styles';

document.querySelector('main');
class NewPostStore {
  #config;

  constructor() {
    this.#config = {
      attachments: [],
    };
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.CREATE_POST:
        this.sendPost(action.type, action, async (body) => {
          const tokenCreate = await request.getHeader('/api/post/create');
          return request.postMultipart('/api/post/create', body, tokenCreate);
        });
        break;

      case ActionTypes.UPDATE_POST:
        this.sendPost(action.type, action, async (body, action) => {
          const postId = action.postId;
          const tokenEdit = await request.getHeader(`/api/post/edit/${postId}`);
          return request.put(`/api/post/edit/${postId}`, body, tokenEdit);
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
    post.attachments.forEach((item) => {
      this.#config.attachments.push(item);
    });
    newPost.config.attachments = post.attachments;
    newPost.render();
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
    let deleteStatus;
    let addStatus;

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
          deleteStatus = deleteResult.ok + 1;
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
          addStatus = addResult.ok + 1;
        }
      }
    }
    return result.ok && deleteStatus && addStatus;
  }
}

export const newPostStore = new NewPostStore();
