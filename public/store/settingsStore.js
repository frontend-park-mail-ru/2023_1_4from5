import { dispatcher } from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../actionTypes/actionTypes.js';
import { settings } from '../components/settings/settings.js';
import { userStore } from './userStore.js';
import { isValidPassword } from '../modules/isValid';
import { request } from '../modules/request';
import { Actions } from '../actions/actions';

const sideBarElement = document.querySelector('sideBar');

class SettingsStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  reduce(action) {
    switch (action.type) {
      case ActionTypes.CHANGE_PASSWORD:
        this.changePassword(action.input);
        break;

      case ActionTypes.CHANGE_USERNAME:
        this.changeUsername(action.username);
        break;

      case ActionTypes.CHANGE_LOGIN:
        this.changeLogin(action.login);
        break;

      case ActionTypes.CHANGE_PHOTO:
        this.changePhoto(action.file);
        break;

      default:
        break;
    }
  }

  renderSettings() {
    settings.config = userStore.getUserState();
    settings.render();
    console.log(1);
  }

  async changePhoto(file) {
    const formData = new FormData();
    formData.append('upload', file);
    formData.append('path', userStore.getUserState().profilePhoto);

    await request.get('/api/user/updateProfilePhoto');
    await request.postMultipart('/api/user/updateProfilePhoto', formData);

    const user = userStore.getUserState();
    user.usernameIn = name;
    userStore.setUserState(user);
    this.renderSettings();
  }

  async changePassword(input) {
    const oldPwd = input.oldPwdInput.value;
    const newPwd = input.newPwdInput.value;
    const errPwd = isValidPassword(newPwd);

    settings.invalidPassword(errPwd);

    if (!errPwd) {
      await request.get('/api/user/updatePassword');
      await request.put('/api/user/updatePassword', {
        old_password: oldPwd,
        new_password: newPwd,
      });
    }
  }

  async changeUsername(usernameInput) {
    const name = usernameInput.value;
    const login = userStore.getUserState().login;
    await request.get('/api/user/updateData');
    await request.put('/api/user/updateData', {
      login,
      name,
    });
    const user = userStore.getUserState();
    user.usernameIn = name;
    userStore.setUserState(user);
    Actions.renderSideBar(sideBarElement, user);
  }

  async changeLogin(loginInput) {
    const login = loginInput.value;
    const name = userStore.getUserState().usernameIn;
    await request.get('/api/user/updateData');
    await request.put('/api/user/updateData', {
      login,
      name,
    });
    const user = userStore.getUserState();
    user.login = login;
    userStore.setUserState(user);
  }
}

export const settingsStore = new SettingsStore();
