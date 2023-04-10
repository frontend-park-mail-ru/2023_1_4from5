import { dispatcher } from '../dispatcher/dispatcher.js';
import { myPage } from '../components/myPage/myPage.js';
import { request } from '../modules/request.js';
import { userStore } from './userStore.js';
import { ActionTypes } from '../actionTypes/actionTypes.js';
import { isValidDescription, isValidMoneyString } from '../modules/isValid.js';
import { color } from '../consts/styles.js';

class MyPageStore {
  #config;

  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  setState(config) {
    this.#config = config;
  }

  getState() {
    return this.#config;
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.RENDER_MYPAGE:
        this.renderMyPage();
        break;

      case ActionTypes.DELETE_POST:
        await request.get(`/api/post/delete/${action.postId}`);
        await request.delete(`/api/post/delete/${action.postId}`);
        await this.renderMyPage();
        break;
      case ActionTypes.CLICK_LIKE:
        this.changeLikeState(action);
        break;
      case ActionTypes.OPEN_EDIT_AIM:
        this.#config.edit_aim = false;
        myPage.config = this.#config;
        myPage.render();
        break;
      case ActionTypes.CLOSE_EDIT_AIM:
        this.#config.edit_aim = true;
        myPage.config = this.#config;
        myPage.render();
        break;
      case ActionTypes.SAVE_EDIT_AIM:
        this.saveEditAim(action.input);
        break;
      default:
        break;
    }
  }

  async renderMyPage(authorUrl = '') {
    let creatorPage;
    if (authorUrl) {
      creatorPage = await request.get(`/api/creator/page/${authorUrl}`);
    } else {
      creatorPage = await request.get(`/api/creator/page/${userStore.getUserState().authorURL}`);
    }
    const result = await creatorPage.json();
    result.posts.forEach((post) => {
      const textArr = post.text.split('\\n');
      post.textWithBreaks = [];
      textArr.forEach((text) => {
        post.textWithBreaks.push({ text });
      });
    });
    this.#config = result;
    const renderIcon = {
      edit_aim: this.#config.is_my_page,
      isAuthorized: userStore.getUserState().isAuthorizedIn,
    };
    this.#config = Object.assign(this.#config, renderIcon);
    myPage.config = this.#config;
    myPage.render();
  }

  async changeLikeState(action) {
    if (action.typeLike === 'addLike') {
      const result = await request.put('/api/post/addLike', { post_id: action.postId });
      if (result.ok) {
        const res = await result.json();
        const currentPost = this.#config.posts.find((post) => post.id === action.postId);
        currentPost.is_liked = true;
        currentPost.likes_count = res.likes_count;
        myPage.config = this.#config;
        myPage.render();
      }
    } else {
      const result = await request.put('/api/post/removeLike', { post_id: action.postId });
      if (result.ok) {
        const res = await result.json();
        const currentPost = this.#config.posts.find((post) => post.id === action.postId);
        currentPost.is_liked = false;
        currentPost.likes_count = res.likes_count;
        myPage.config = this.#config;
        myPage.render();
      }
    }
  }

  async saveEditAim(input) {
    let description = input.descriptionInput.value;
    let moneyNeeded = input.moneyNeededInput.value;
    const errDescription = isValidDescription(description);
    const errMoneyNeeded = isValidMoneyString(moneyNeeded);
    if (moneyNeeded.isEmpty) {
      moneyNeeded = '0';
    }
    input.descriptionInput.style.backgroundColor = color.field;
    input.moneyNeededInput.style.backgroundColor = color.field;

    if (!errDescription && !errMoneyNeeded) {
      const aimEdit = await request.post('/api/creator/aim/create', {
        creator_id: this.#config.creator_info.creator_id,
        description: description,
        money_needed: Number(moneyNeeded),
        money_got: Number(this.#config.aim.money_got)
      });
      if (aimEdit.ok) {
        this.#config.aim.description = description;
        this.#config.aim.money_needed = Number(moneyNeeded);

        this.#config.edit_aim = true;
        myPage.config = this.#config;
        myPage.render();
      } else {
        input.errorOutput.innerHTML = '';
        input.errorOutput.innerHTML = 'Неверные описание или цель';
        input.descriptionInput.style.backgroundColor = color.error;
        input.moneyNeededInput.style.backgroundColor = color.error;
      }
    } else {
      input.errorOutput.innerHTML = '';
      if (errDescription) {
        input.errorOutput.innerHTML = errDescription;
        input.descriptionInput.style.backgroundColor = color.error;
      }
      if (errMoneyNeeded) {
        input.errorOutput.innerHTML = errMoneyNeeded;
        input.moneyNeededInput.style.backgroundColor = color.error;
      }
    }
  }
}

export const myPageStore = new MyPageStore();
