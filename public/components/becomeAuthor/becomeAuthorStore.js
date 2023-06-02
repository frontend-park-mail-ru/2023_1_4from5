import { dispatcher } from '../../dispatcher/dispatcher';
import { becameAuthor } from './becomeAuthor';
import { ActionTypes } from '../../actionTypes/actionTypes';
import { request } from '../../modules/request';
import { router } from '../../modules/Router';
import { URLS } from '../../modules/Notifier';
import { authorPageStore } from '../authorPage/authorPageStore';
import { userStore } from '../user/userStore';
import {
  LENGTH,
  validationStructure,
  validation, isSpecialSignWithEnt
} from '../../modules/isValid';
import { color } from '../../consts/styles';

class BecomeAuthorStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  reduce(action) {
    switch (action.type) {
      case ActionTypes.RENDER_BECOME_AUTHOR:
        this.renderBecomeAuthor(action.creatorId);
        break;

      case ActionTypes.REMOVE_BECOME_AUTHOR:
        becameAuthor.remove();
        break;

      case ActionTypes.BECOME_AUTHOR:
        this.becomeAuthor(action.input);
        break;

      case ActionTypes.UPDATE_PROFILE:
        this.updateProfile(action.input);
        break;

      default:
        break;
    }
  }

  async renderBecomeAuthor(creatorId) {
    becameAuthor.render();
    if (creatorId) {
      const req = await request.get(`/api/creator/page/${creatorId}`);
      const res = await req.json();
      const name = res.creator_info.name;
      const description = res.creator_info.description;
      becameAuthor.update(name, description);
    } else {
      becameAuthor.publish();
    }
  }

  async becomeAuthor(input) {
    await this.validation(
      input,
      async (body) => {
        const token = await request.getHeader('/api/user/becameCreator');
        return request.post('/api/user/becameCreator', body, token);
      },
      async () => {
        await userStore.getUser();
        becameAuthor.remove();
        router.go(URLS.myPage);
      }
    );
  }

  async updateProfile(input) {
    await this.validation(
      input,
      async (body) => {
        const token = await request.getHeader('/api/creator/updateData');
        return request.put('/api/creator/updateData', body, token);
      },
      async () => {
        becameAuthor.remove();
        router.go(URLS.myPage);
        await authorPageStore.renderMyPage();
      }
    );
  }

  async validation(input, require, callback) {
    const name = input.nameInput.value.trim();
    const errorNameOutput = input.errorNameOutput;
    const validStructName = { ...validationStructure };
    validStructName.field = '"Название блога"';
    validStructName.length_flag = true;
    validStructName.min_length = LENGTH.MIN_CREATOR_NAME;
    validStructName.max_length = LENGTH.MAX_CREATOR_NAME;
    validStructName.hasLetter = true;
    validStructName.whiteSymbolsError = 'Допустимы только латинские, русские буквы и спецсимволы';
    const errName = validation(validStructName, name);

    const description = input.descriptionInput.value.trim();
    const errDescriptionOutput = input.errorDescriptionOutput;
    const validStructDescription = { ...validationStructure };
    validStructDescription.field = '"Описание блога"';
    validStructDescription.length_flag = true;
    validStructDescription.min_length = LENGTH.MIN_CREATOR_DESCRIPTION;
    validStructDescription.max_length = LENGTH.MAX_CREATOR_DESCRIPTION;
    validStructDescription.special_signs = isSpecialSignWithEnt;
    validStructDescription.whiteSymbolsError = 'Допустимы только латинские, русские буквы и спецсимволы';
    const errDescription = validation(validStructDescription, description);

    input.nameInput.style.backgroundColor = color.field;
    input.descriptionInput.style.backgroundColor = color.field;
    errorNameOutput.innerHTML = '';
    errDescriptionOutput.innerHTML = '';

    if (errName) {
      errorNameOutput.innerHTML = errName;
      input.nameInput.style.backgroundColor = color.error;
    } else if (errDescription) {
      errDescriptionOutput.innerHTML = '';
      errDescriptionOutput.innerHTML = errDescription;
      input.descriptionInput.style.backgroundColor = color.error;
    } else {
      const body = {
        name,
        description,
      };
      const status = await require(body);

      if (status.ok) {
        await callback();
      } else {
        errDescriptionOutput.innerHTML = '';
        errDescriptionOutput.innerHTML = 'Введённые данные некорректны';
        input.nameInput.style.backgroundColor = color.error;
        input.descriptionInput.style.backgroundColor = color.error;
      }
    }
  }
}

export const becameAuthorStore = new BecomeAuthorStore();
