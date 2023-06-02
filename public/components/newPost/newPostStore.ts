import { dispatcher } from '../../dispatcher/dispatcher.js';
import { newPost } from './newPost';
import { ActionTypes } from '../../actionTypes/actionTypes';
import { userStore } from '../user/userStore';
import { request } from '../../modules/request';
import { router } from '../../modules/Router';
import {isValidTextPost, isValidTitlePost, LENGTH, validation, validationStructure} from '../../modules/isValid';
import { color } from '../../consts/styles';
import { URLS } from '../../modules/Notifier';

document.querySelector('main');

class NewPostStore {
  #config;

  constructor() {
    this.#config = {
      attachments: [],
    };
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action: any) {
    switch (action.type) {
      case ActionTypes.CREATE_POST:
        this.sendPost(action.type, action, async (body: any) => {
          const tokenCreate = await request.getHeader('/api/post/create');
          return request.postMultipart('/api/post/create', body, tokenCreate);
        });
        break;

      case ActionTypes.UPDATE_POST:
        this.sendPost(action.type, action, async (body: any, action: any) => {
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

  async renderNewPost() {
    // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
    if (newPost.config && newPost.config.attachments) {
      // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
      newPost.config.attachments = [];
    }
    const req = await request.get(`/api/creator/page/${userStore.getUserState().authorURL}`);
    const creatorPage = await req.json();
    const levels = {
      subs: creatorPage.subscriptions,
    };
    newPost.render(levels);
    newPost.publish();
  }

  async renderUpdatingPost(postId: any) {
    const postRequest = await request.get(`/api/post/get/${postId}`);
    const post = await postRequest.json();

    this.#config.attachments = [];
    if (post.attachments) {
      post.attachments.forEach((item: any) => {
        // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        this.#config.attachments.push(item);
      });
    }
    // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
    newPost.config.attachments = post.attachments;

    const req = await request.get(`/api/creator/page/${userStore.getUserState().authorURL}`);
    const creatorPage = await req.json();
    const levels = {
      subs: creatorPage.subscriptions,
    };
    newPost.render(levels);
    newPost.update(postId, post.post.title, post.post.text);
  }

  async sendPost(actionType: any, action: any, callback: any) {
    const createTitle = action.input.titleInput.value.trim();
    const createText = action.input.textInput.value;
    const subscriptions = action.input.availableSubscriptions;
    const validStructTitle = { ...validationStructure };
    validStructTitle.field = '"Название поста"';
    validStructTitle.length_flag = true;
    validStructTitle.min_length = LENGTH.MIN_TITLE_POST;
    validStructTitle.max_length = LENGTH.MAX_TITLE_POST;
    validStructTitle.whiteSymbolsError = 'Допустимы только символы кириллицы и латиницы, цифры и символы-разделители';
    validStructTitle.hasLetter = true;
    const errTitle = validation(validStructTitle, createTitle);
    // const errTitle = isValidTitlePost(createTitle);
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
        status = await this.sendCreatedPost(action, createTitle, createText, subscriptions, callback);
      } else {
        status = await this.sendCreatedPost(action, createTitle, createText, subscriptions, callback);
      }
      if (status) {
        // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
        newPost.config.attachments = [];
        this.#config.attachments = [];
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
        router.go(URLS.myPage);
      } else {
        errorTextOutput.innerHTML = '';
        errorTextOutput.innerHTML = 'Введённые данные некорректны';
        action.input.titleInput.style.backgroundColor = color.error;
        action.input.textInput.style.backgroundColor = color.error;
      }
    }
  }

  async sendCreatedPost(action: any, createTitle: any, createText: any, subscriptions: any, callback: any) {
    const formData = new FormData();
    formData.append('title', createTitle);
    formData.append('text', createText);
    formData.append('creator', userStore.getUserState().authorURL);
    for (const sub in subscriptions) {
      formData.append('subscriptions', subscriptions[sub]);
    }
    if (action.input.attachments) {
      action.input.attachments.forEach((attach: any) => formData.append('attachments', attach));
    }

    const result = await callback(formData, action);
    return result.ok;
  }

  async sendEditedPost(action: any, createTitle: any, createText: any, subscriptions: any, callback: any) {
    const body = {
      title: createTitle,
      text: createText,
      creator: userStore.getUserState().authorURL,
      subscriptions: action.input.availableSubscriptions,
    };
    const result = await callback(body, action);
    let deleteStatus = true;
    let addStatus = true;

    if (this.#config.attachments) {
      for (const attach of this.#config.attachments) {
        if (!action.input.attachments.includes(attach)) {
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
        // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        if (!this.#config.attachments.includes(attach)) {
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
    return result.ok && deleteStatus && addStatus;
  }
}

export const newPostStore = new NewPostStore();
