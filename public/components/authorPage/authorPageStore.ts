import { dispatcher } from '../../dispatcher/dispatcher.js';
import { authorPage } from './authorPage.js';
import { request } from '../../modules/request.js';
import { userStore } from '../user/userStore.js';
import { ActionTypes } from '../../actionTypes/actionTypes.js';
import {
  isValidDescriptionAim,
  isValidDonate,
  isValidMoneyString,
  isWhiteSignWithRus,
  LENGTH, validation,
  validationStructure
} from '../../modules/isValid.js';
import { color } from '../../consts/styles.js';
import { aim } from '../aim/aim';
import { getSubscription } from '../getSubscription/getSubscription';
import { Actions } from '../../actions/actions';
import { postStore } from '../post/postStore';

class AuthorPageStore {
  // @ts-expect-error TS(7008): Member '#config' implicitly has an 'any' type.
  #config;

  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  setState(config: any) {
    this.#config = config;
  }

  getState() {
    return this.#config;
  }

  async reduce(action: any) {
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
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
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
        break;

      case ActionTypes.FOLLOW:
        // @ts-expect-error TS(2554): Expected 3-4 arguments, but got 1.
        await request.post(`/api/user/follow/${action.id}`);
        this.#config.follows = true;
        await userStore.followAll();
        authorPage.config = this.#config;
        authorPage.render();
        break;

      case ActionTypes.UNFOLLOW:
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
        await request.put(`/api/user/unfollow/${action.id}`);
        if (action.page === 'authorPage') {
          this.#config.follows = false;
          await userStore.unfollow(action.id);
          authorPage.config = this.#config;
          authorPage.render();
        }
        if (action.page === 'subscriptions') {
          await userStore.unfollow(action.id);
          Actions.renderSubscriptions();
        }
        break;

      case ActionTypes.GET_SUBSCRIPION:
        this.getSub(action.input);
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
    result.posts.forEach((post: any) => {
      const textArr = post.text.split('\\n');
      post.textWithBreaks = [];
      textArr.forEach((text: any) => {
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

  async changeLikeState(action: any) {
    if (action.typeLike === 'addLike') {
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
      const result = await request.put('/api/post/addLike', { post_id: action.postId });
      if (result.ok) {
        const res = await result.json();
        const currentPost = this.#config.posts.find((post: any) => post.id === action.postId);
        currentPost.is_liked = true;
        currentPost.likes_count = res.likes_count;
        authorPage.config = this.#config;
        authorPage.render();
      }
    } else {
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
      const result = await request.put('/api/post/removeLike', { post_id: action.postId });
      if (result.ok) {
        const res = await result.json();
        const currentPost = this.#config.posts.find((post: any) => post.id === action.postId);
        currentPost.is_liked = false;
        currentPost.likes_count = res.likes_count;
        authorPage.config = this.#config;
        authorPage.render();
      }
    }
  }

  async saveEditAim(input: any) {
    let description = input.descriptionInput.value.trim();
    const errDescriptionOutput = input.errorDescriptionOutput;
    const validStructDescription = { ...validationStructure };
    validStructDescription.field = '"Описание цели"';
    validStructDescription.length_flag = true;
    validStructDescription.min_length = LENGTH.MIN_DESCRIPTION_AIM;
    validStructDescription.max_length = LENGTH.MAX_DESCRIPTION_AIM;
    validStructDescription.whiteSymbolsError = 'Допустимы только символы кириллицы и латиницы, цифры и символы-разделители';
    validStructDescription.hasLetter = true;
    const errDescription = validation(validStructDescription, description);

    let moneyNeeded = input.moneyNeededInput.value.replace(/ /g, '');
    const errMoneyNeededOutput = input.errorMoneyNeededOutput;
    const validStructMoney = { ...validationStructure };
    validStructMoney.field = '"Сумма"';
    validStructMoney.isMoney = true;
    validStructMoney.whiteSymbolsError = 'В поле "Сумма" можно вводить только число';

    const errMoneyNeeded = validation(validStructMoney, moneyNeeded);
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
      // @ts-expect-error TS(2554): Expected 3-4 arguments, but got 2.
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
        aim.remove();
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

  async creatorPhotoDelete(photoId: any) {
    const token = await request.getHeader(`/api/creator/deleteProfilePhoto/${photoId}`);
    await request.delete(`/api/creator/deleteProfilePhoto/${photoId}`, token);
    await this.renderMyPage();
  }

  async creatorCoverDelete(coverId: any) {
    const token = await request.getHeader(`/api/creator/deleteCoverPhoto/${coverId}`);
    await request.delete(`/api/creator/deleteCoverPhoto/${coverId}`, token);
    await this.renderMyPage();
  }

  async getSub(input: any) {
    //     let moneyCount = input.moneyInput.value.replace(/ /g, '');
    //     const errorOutput = input.errorOutput;
    //     const validStructMoney = { ...validationStructure };
    //     validStructMoney.field = '"Отправить донат"';
    //     validStructMoney.isMoney = true;
    //     validStructMoney.moreThanTwoRub = true;
    //     validStructMoney.hasNumber = true;
    //     validStructMoney.whiteSymbols.error = 'Допустимы только числа';

    const monthCount = input.monthCount.value.replace(/ /g, '');
    const getSubErr = input.getSubErr;

    getSubErr.innerHTML = '';
    if (isNaN(monthCount) || monthCount.length === 0) {
      getSubErr.innerHTML = 'Поле должно содеражать число';
    } else {
      const money = Number(monthCount) * Number(input.price);

      const tokenSub = await request.getHeader(`/api/user/subscribe/${input.subscriptionId}`);
      const result = await request.post(`/api/user/subscribe/${input.subscriptionId}`, {
        creator_id: input.creatorId,
        month_count: Number(monthCount)
      }, tokenSub);

      if (result.ok) {
        const subId = await result.json();
        input.getSubFormSum.value = Number(money);
        input.getSubFormLabel.value = `subscribe;${subId}`;
        input.getSubForm.submit();
        getSubscription.remove();
      } else {
        getSubErr.innerHTML = 'Произошла ошибка. Пожалуйста, попробуйте позже';
      }
    }
  }
}

export const authorPageStore = new AuthorPageStore();
