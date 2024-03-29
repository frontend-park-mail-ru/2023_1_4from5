import { dispatcher } from '../../dispatcher/dispatcher.js';
import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { settings } from './settings.js';
import { userStore } from '../user/userStore.js';
import { isValidLogin, isValidPassword, isValidUsername } from '../../modules/isValid';
import { request } from '../../modules/request';
import { Actions } from '../../actions/actions';
import { router } from '../../modules/Router';
import { URLS } from '../../modules/Notifier';
import { sideBar } from '../sideBar/sideBar';

class SettingsStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action: any) {
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

  async changePhoto(file: any) {
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

  async changePassword(input: any) {
    const oldPwd = input.oldPwdInput.value;
    const newPwd = input.newPwdInput.value;
    const errPwd = isValidPassword(newPwd);

    settings.invalidPassword(errPwd);

    if (!errPwd) {
      const token = await request.getHeader('/api/user/updatePassword');
      const response = await request.put('/api/user/updatePassword', {
        old_password: oldPwd,
        new_password: newPwd,
      }, token);
      if (!response.ok) {
        settings.invalidPassword('неверный старый пароль');
      } else {
        settings.successPasswordChanged();
      }
    }
  }

  async changeUsernameLogin(usernameInput: any, loginInput: any) {
    const name = usernameInput.value;
    const login = loginInput.value;

    const errUsername = isValidUsername(name);
    settings.invalidUsername(errUsername);
    const errLogin = isValidLogin(login);
    settings.invalidLogin(errLogin);

    if (!errUsername && !errLogin) {
      const token = await request.getHeader('/api/user/updateData');
      const response = await request.put('/api/user/updateData', {
        login,
        name,
      }, token);

      if (response.ok) {
        const user = userStore.getUserState();
        user.usernameIn = name;
        user.login = login;
        userStore.setUserState(user);
        Actions.renderSideBar(user);
        settings.successNameChanged();
        settings.successLoginChanged();
      }
    }
  }

  async deletePhoto(photoId: any) {
    //.log(photoId);
    const token = await request.getHeader(`/api/user/deleteProfilePhoto/${photoId}`);
    await request.delete(`/api/user/deleteProfilePhoto/${photoId}`, token);
    await userStore.getUser();
    this.renderSettings();
  }
}

export const settingsStore = new SettingsStore();
