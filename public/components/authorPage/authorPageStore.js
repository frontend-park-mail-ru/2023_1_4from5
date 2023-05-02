import { dispatcher } from '../../dispatcher/dispatcher.js';
import { authorPage } from './authorPage.js';
import { request } from '../../modules/request.js';
import { userStore } from '../user/userStore.js';
import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { isValidDescriptionAim, isValidMoneyString } from '../../modules/isValid.js';
import { color } from '../../consts/styles.js';
import { aim } from './aim';
import { getSubscription } from './getSubscription';
import { Actions } from '../../actions/actions';

class AuthorPageStore {
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
      case ActionTypes.RENDER_AUTHOR_PAGE:
        await this.renderMyPage();
        break;

      case ActionTypes.DELETE_POST:
        const token = await request.getHeader(`/api/post/delete/${action.postId}`);
        await request.delete(`/api/post/delete/${action.postId}`, token);
        await this.renderMyPage();
        break;

      case ActionTypes.CLICK_LIKE:
        await this.changeLikeState(action);
        break;

      case ActionTypes.RENDER_AIM:
        aim.render();
        break;

      case ActionTypes.REMOVE_AIM:
        aim.remove();
        break;

      case ActionTypes.UPDATE_AIM:
        aim.render(action.aim);
        break;

      case ActionTypes.SAVE_AIM:
        await this.saveEditAim(action.input);
        aim.remove();
        break;

      case ActionTypes.FOLLOW:
        await request.post(`/api/user/follow/${action.id}`);
        this.#config.follows = true;
        authorPage.config = this.#config;
        authorPage.render();
        break;

      case ActionTypes.UNFOLLOW:
        await request.put(`/api/user/unfollow/${action.id}`);
        this.#config.follows = false;
        authorPage.config = this.#config;
        if (action.page === 'authorPage') {
          authorPage.render();
        }
        if (action.page === 'subscriptions') {
          Actions.renderSubscriptions();
        }
        break;

      case ActionTypes.GET_SUBSCRIPION:
        const tokenSub = await request.getHeader(`/api/user/subscribe/${action.id}`);
        await request.post(`/api/user/subscribe/${action.id}`, {
          month_count: Number(action.monthCount),
          money: Number(action.money),
          creator_id: action.creatorId,
        }, tokenSub);
        getSubscription.remove();
        break;

      case ActionTypes.CREATOR_COVER_UPDATE:
        const formDataCover = new FormData();
        formDataCover.append('upload', action.file);
        formDataCover.append('path', action.coverId);

        const tokenCover = await request.getHeader('/api/creator/updateCoverPhoto');
        await request.putMultipart('/api/creator/updateCoverPhoto', formDataCover, tokenCover);
        await this.renderMyPage();
        break;

      case ActionTypes.CREATOR_PHOTO_UPDATE:
        const formDataPhoto = new FormData();
        formDataPhoto.append('upload', action.file);
        formDataPhoto.append('path', action.profilePhoto);

        const tokenPhoto = await request.getHeader('/api/creator/updateProfilePhoto');
        await request.putMultipart('/api/creator/updateProfilePhoto', formDataPhoto, tokenPhoto);
        await this.renderMyPage();
        break;

      case ActionTypes.CREATOR_PHOTO_DELETE:
        await this.creatorPhotoDelete(action.photoId);
        break;

      case ActionTypes.CREATOR_COVER_DELETE:
        await this.creatorCoverDelete(action.coverId);
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
    authorPage.config = this.#config;
    authorPage.render();
  }

  async changeLikeState(action) {
    if (action.typeLike === 'addLike') {
      const result = await request.put('/api/post/addLike', { post_id: action.postId });
      if (result.ok) {
        const res = await result.json();
        const currentPost = this.#config.posts.find((post) => post.id === action.postId);
        currentPost.is_liked = true;
        currentPost.likes_count = res.likes_count;
        authorPage.config = this.#config;
        authorPage.render();
      }
    } else {
      const result = await request.put('/api/post/removeLike', { post_id: action.postId });
      if (result.ok) {
        const res = await result.json();
        const currentPost = this.#config.posts.find((post) => post.id === action.postId);
        currentPost.is_liked = false;
        currentPost.likes_count = res.likes_count;
        authorPage.config = this.#config;
        authorPage.render();
      }
    }
  }

  async saveEditAim(input) {
    let description = input.descriptionInput.value;
    let moneyNeeded = input.moneyNeededInput.value.split(' ')
      .join('');
    const errDescriptionOutput = input.errorDescriptionOutput;
    const errMoneyNeededOutput = input.errorMoneyNeededOutput;
    const errDescription = isValidDescriptionAim(description);
    const errMoneyNeeded = isValidMoneyString(moneyNeeded);
    if (moneyNeeded.isEmpty) {
      moneyNeeded = '0';
    }
    input.descriptionInput.style.backgroundColor = color.field;
    input.moneyNeededInput.style.backgroundColor = color.field;
    errDescriptionOutput.innerHTML = '';
    errMoneyNeededOutput.innerHTML = '';

    if (errDescription) {
      errDescriptionOutput.innerHTML = '';
      errDescriptionOutput.innerHTML = errDescription;
      input.descriptionInput.style.backgroundColor = color.error;
    } else if (errMoneyNeeded) {
      errMoneyNeededOutput.innerHTML = '';
      errMoneyNeededOutput.innerHTML = errMoneyNeeded;
      input.moneyNeededInput.style.backgroundColor = color.error;
    } else {
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
        authorPage.config = this.#config;
        authorPage.render();
      } else {
        errMoneyNeededOutput.innerHTML = '';
        errMoneyNeededOutput.innerHTML = 'Введённые данные некорректны';
        input.descriptionInput.style.backgroundColor = color.error;
        input.moneyNeededInput.style.backgroundColor = color.error;
      }
    }
  }

  async creatorPhotoDelete(photoId) {
    console.log(photoId);
    const token = await request.getHeader(`/api/creator/deleteProfilePhoto/${photoId}`);
    await request.delete(`/api/creator/deleteProfilePhoto/${photoId}`, token);
    await this.renderMyPage();
  }

  async creatorCoverDelete(coverId) {
    console.log(coverId);
    const token = await request.getHeader(`/api/creator/deleteCoverPhoto/${coverId}`);
    await request.delete(`/api/creator/deleteCoverPhoto/${coverId}`, token);
    await this.renderMyPage();
  }
}

export const authorPageStore = new AuthorPageStore();
