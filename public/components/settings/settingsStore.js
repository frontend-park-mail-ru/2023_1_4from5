import { dispatcher } from '../../dispatcher/dispatcher.js';
import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { settings } from './settings.js';
import { userStore } from '../user/userStore.js';
import {isValidLogin, isValidPassword, isValidUsername} from '../../modules/isValid';
import { request } from '../../modules/request';
import { Actions } from '../../actions/actions';
import { router } from '../../modules/Router';
import { URLS } from '../../modules/Notifier';
import { sideBar } from '../sideBar/sideBar';

const sideBarElement = document.querySelector('sideBar');

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

  async changeUsernameLogin(usernameInput, loginInput) {
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
  //
  // async changeLogin(loginInput) {
  //
  //   if (!errLogin) {
  //     const token = await request.getHeader('/api/user/updateData');
  //     const response = await request.put('/api/user/updateData', {
  //       login,
  //       name,
  //     }, token);
  //
  //     if (response.ok) {
  //       const user = userStore.getUserState();
  //       user.login = login;
  //       userStore.setUserState(user);
  //       settings.successLoginChanged();
  //     }
  //   }
  // }
}

export const settingsStore = new SettingsStore();
