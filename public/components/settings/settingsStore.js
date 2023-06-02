import { dispatcher } from '../../dispatcher/dispatcher.js';
import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { settings } from './settings.js';
import { userStore } from '../user/userStore.js';
import {
  isWhiteSignLogin, isWhiteSignName, isWhiteSignPassword,
  LENGTH, validation,
  validationStructure
} from '../../modules/isValid';
import { request } from '../../modules/request';
import { Actions } from '../../actions/actions';

class SettingsStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.CHANGE_PASSWORD:
        await this.changePassword(action.input);
        break;

      case ActionTypes.CHANGE_USERNAME_LOGIN:
        await this.changeUsernameLogin(action.username, action.login);
        break;

      case ActionTypes.CHANGE_PHOTO:
        await this.changePhoto(action.file);
        break;

      case ActionTypes.DELETE_PHOTO:
        await this.deletePhoto(action.photoId);
        break;

      default:
        break;
    }
  }

  renderSettings() {
    settings.config = userStore.getUserState();
    settings.render();
  }

  async changePhoto(file) {
    const formData = new FormData();
    formData.append('upload', file);
    formData.append('path', userStore.getUserState().profilePhoto);

    const token = await request.getHeader('/api/user/updateProfilePhoto');
    const update = await request.putMultipart('/api/user/updateProfilePhoto', formData, token);
    const newPhoto = await update.json();
    const user = userStore.getUserState();
    user.profilePhoto = newPhoto;
    this.renderSettings();
    Actions.renderSideBar(user);
  }

  async changePassword(input) {
    const oldPwd = input.oldPwdInput.value;

    const newPwd = input.newPwdInput.value.trim();
    const validStructPassword = { ...validationStructure };
    validStructPassword.field = '"Новый пароль"';
    validStructPassword.length_flag = true;
    validStructPassword.min_length = LENGTH.MIN_PASSWORD;
    validStructPassword.max_length = LENGTH.MAX_PASSWORD;
    validStructPassword.special_signs = isWhiteSignPassword;
    validStructPassword.rus_symbols_flag = false;
    validStructPassword.whiteSymbolsError = 'Допустимы только латинские символы, цифры и символы-разделители';
    validStructPassword.hasNumber = true;
    const errPwd = validation(validStructPassword, newPwd);
    // const errPwd = isValidPassword(newPwd);

    settings.invalidPassword(errPwd);

    if (!errPwd) {
      const token = await request.getHeader('/api/user/updatePassword');
      const response = await request.put('/api/user/updatePassword', {
        old_password: oldPwd,
        new_password: newPwd,
      }, token);
      if (!response.ok) {
        settings.invalidPassword('Неверный старый пароль');
      } else {
        settings.successPasswordChanged();
      }
    }
  }

  async changeUsernameLogin(usernameInput, loginInput) {
    const login = loginInput.value.trim();
    const validStructLogin = { ...validationStructure };
    validStructLogin.field = '"Логин"';
    validStructLogin.length_flag = true;
    validStructLogin.min_length = LENGTH.MIN_LOGIN;
    validStructLogin.max_length = LENGTH.MAX_LOGIN;
    validStructLogin.special_signs = isWhiteSignLogin;
    validStructLogin.rus_symbols_flag = false;
    validStructLogin.whiteSymbolsError = 'Допустимы только латинские символы, цифры и символы-разделители';
    validStructLogin.hasLetter = true;
    const errLogin = validation(validStructLogin, login);
    // const errLogin = isValidLogin(login);
    settings.invalidLogin(errLogin);

    const username = usernameInput.value.trim();
    // const username = action.input.usernameInput.value.trim();
    const validStructUsername = { ...validationStructure };
    validStructUsername.field = '"Имя пользователя"';
    validStructUsername.length_flag = true;
    validStructUsername.min_length = LENGTH.MIN_USERNAME;
    validStructUsername.max_length = LENGTH.MAX_USERNAME;
    validStructUsername.special_signs = isWhiteSignName;
    validStructUsername.whiteSymbolsError = 'Допустимы только символы кириллицы и латиницы, цифры и символы-разделители';
    validStructUsername.hasLetter = true;
    const errUsername = validation(validStructUsername, username);
    // const errUsername = isValidUsername(username);
    settings.invalidUsername(errUsername);

    if (!errUsername && !errLogin) {
      const token = await request.getHeader('/api/user/updateData');
      const response = await request.put('/api/user/updateData', {
        login,
        name: username,
      }, token);

      if (response.ok) {
        const user = userStore.getUserState();
        user.usernameIn = username;
        user.login = login;
        userStore.setUserState(user);
        Actions.renderSideBar(user);
        settings.successNameChanged();
        settings.successLoginChanged();
      }
    }
  }

  async deletePhoto(photoId) {
    const token = await request.getHeader(`/api/user/deleteProfilePhoto/${photoId}`);
    await request.delete(`/api/user/deleteProfilePhoto/${photoId}`, token);
    await userStore.getUser();
    this.renderSettings();
  }
}

export const settingsStore = new SettingsStore();
