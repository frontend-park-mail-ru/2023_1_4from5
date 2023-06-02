import { dispatcher } from '../../dispatcher/dispatcher';
import { ActionTypes } from '../../actionTypes/actionTypes';
import { subscriptionWin } from './subscription';
import { request } from '../../modules/request';
import { authorPageStore } from '../authorPage/authorPageStore';
import { userStore } from '../user/userStore';
import {
  isSpecialSignWithEnt, LENGTH, validation, validationStructure 
} from '../../modules/isValid';
import { color } from '../../consts/styles';

class SubscriptionStore {
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
      case ActionTypes.RENDER_SUBSCRIPTION:
        subscriptionWin.render();
        subscriptionWin.publish();
        break;

      case ActionTypes.RENDER_UPDATING_SUBSCRIPTION:
        subscriptionWin.render(action.content);
        subscriptionWin.update(action.id);
        break;

      case ActionTypes.REMOVE_SUBSCRIPTION:
        subscriptionWin.remove();
        break;

      case ActionTypes.CREATE_SUB:
        // this.sendPost(action.type, action, async (body) => {
        //   const tokenCreate = await request.getHeader('/api/post/create');
        //   return request.postMultipart('/api/post/create', body, tokenCreate);
        // });
        await this.sendSub(action.type, action.input, async (body) => {
          const tokenCreate = await request.getHeader('/api/subscription/create');
          return request.post('/api/subscription/create', body, tokenCreate);
        });
        break;

      case ActionTypes.UPDATE_SUB:
        await this.sendSub(action.type, action.input, async (body, postID) => {
          const tokenUpdate = await request.getHeader(`/api/subscription/edit/${postID}`);
          return request.put(`/api/subscription/edit/${postID}`, body, tokenUpdate);
        }, action.id);
        break;

      case ActionTypes.DELETE_SUB:
        const tokenDelete = await request.getHeader(`/api/subscription/delete/${action.id}`);
        await request.delete(`/api/subscription/delete/${action.id}`, tokenDelete);
        await authorPageStore.renderMyPage();
        break;

      default:
        break;
    }
  }

  async sendSub(actionType, input, callback, postID = '') {
    console.log(actionType, input, postID);
    const subTitle = input.titleInput.value.trim();
    const validStructTitle = { ...validationStructure };
    validStructTitle.field = '"Название подписки"';
    validStructTitle.length_flag = true;
    validStructTitle.min_length = LENGTH.MIN_TITLE_SUB;
    validStructTitle.max_length = LENGTH.MAX_TITLE_SUB;
    validStructTitle.whiteSymbolsError = 'Допустимы только символы кириллицы и латиницы, цифры и символы-разделители';
    validStructTitle.hasLetter = true;
    const errTitle = validation(validStructTitle, subTitle);

    const subDescription = input.descriptionInput.value.trim();
    const validStructDescription = { ...validationStructure };
    validStructDescription.field = '"Описание подписки"';
    validStructDescription.length_flag = true;
    validStructDescription.min_length = LENGTH.MIN_DESCRIPTION_SUB;
    validStructDescription.max_length = LENGTH.MAX_DESCRIPTION_SUB;
    validStructDescription.whiteSymbolsError = 'Допустимы только символы кириллицы и латиницы, цифры и символы-разделители';
    validStructDescription.special_signs = isSpecialSignWithEnt;
    const errDesc = validation(validStructDescription, subDescription);

    const subCost = input.costInput.value.replace(/ /g, '');
    const validStructCost = { ...validationStructure };
    validStructCost.field = '"Цена в месяц"';
    validStructCost.isMoney = true;
    validStructCost.moreThanTwoRub = true;
    validStructCost.hasNumber = true;
    validStructCost.whiteSymbolsError = 'Допустимы только числа';
    const errCost = validation(validStructCost, subCost);

    const errTitleOutput = input.subTitleErrorOutput;
    const errDescOutput = input.subDescErrorOutput;
    const errCostOutput = input.subCostErrorOutput;

    input.titleInput.style.backgroundColor = color.field;
    input.descriptionInput.style.backgroundColor = color.field;
    input.costInput.style.backgroundColor = color.field;
    errTitleOutput.innerHTML = '';
    errDescOutput.innerHTML = '';
    errCostOutput.innerHTML = '';

    if (errTitle || errDesc || errCost) {
      if (errTitle) {
        errTitleOutput.innerHTML = errTitle;
        input.titleInput.style.backgroundColor = color.error;
      }
      if (errDesc) {
        errDescOutput.innerHTML = errDesc;
        input.descriptionInput.style.backgroundColor = color.error;
      }
      if (errCost) {
        errCostOutput.innerHTML = errCost;
        input.costInput.style.backgroundColor = color.error;
      }
    } else {
      let status;
      const body = {
        title: subTitle,
        description: subDescription,
        month_cost: Number(subCost),
      };
      if (actionType === ActionTypes.CREATE_SUB) {
        status = await callback(body, postID);
      } else {
        body.creator = userStore.getUserState().authorURL;
        status = await callback(body, postID);
      }
      if (status) {
        subscriptionWin.remove();
        await authorPageStore.renderMyPage();
      } else {
        errCostOutput.innerHTML = '';
        errCostOutput.innerHTML = 'Введённые данные некорректны';
        input.titleInput.style.backgroundColor = color.error;
        input.descriptionInput.style.backgroundColor = color.error;
        input.costInput.style.backgroundColor = color.error;
      }
    }
  }
}

export const subscriptionStore = new SubscriptionStore();
