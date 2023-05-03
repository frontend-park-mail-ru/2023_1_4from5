import { dispatcher } from '../../dispatcher/dispatcher.js';
import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { request } from '../../modules/request.js';
import { Actions } from '../../actions/actions.js';
import { router } from '../../modules/Router.js';
import { URLS } from '../../modules/Notifier';

const sideBarElement = document.querySelector('sideBar');

class UserStore {
  #user;

  constructor() {
    this.#user = {
      usernameIn: '',
      login: '',
      isAuthorIn: false,
      isAuthorizedIn: false,
      authorURL: '',
      profilePhoto: '',
    };
    dispatcher.register(this.reduce.bind(this));
  }

  getUserState() {
    return this.#user;
  }

  setUserState(user) {
    this.#user.usernameIn = user.usernameIn;
    this.#user.isAuthorIn = user.isAuthorIn;
    this.#user.isAuthorizedIn = user.isAuthorizedIn;
    this.#user.authorURL = user.authorURL;
    this.#user.login = user.login;
    this.#user.profilePhoto = user.profilePhoto;
  }

  setState(profile) {
    this.#user.isAuthorizedIn = true;
    this.#user.login = profile.login;
    this.#user.usernameIn = profile.name;
    this.#user.profilePhoto = profile.profile_photo;
    this.#user.isAuthorIn = profile.is_creator;
    this.#user.authorURL = profile.creator_id;
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.GET_USER:
        await this.getUser();
        break;

      case ActionTypes.LOGOUT:
        await this.logout();
        break;

      default:
        break;
    }
  }

  async getUser() {
    const getUser = await request.get('/api/user/profile');
    const profile = await getUser.json();
    this.setState(profile);

    Actions.renderSideBar(this.#user);
  }

  async logout() {
    await request.put('/api/auth/logout');
    this.#user.loginIn = '';
    this.#user.usernameIn = '';
    this.#user.isAuthorIn = false;
    this.#user.isAuthorizedIn = false;
    this.#user.profilePhoto = '';
    Actions.removeWinSettings();
    Actions.renderSideBar(this.#user);
    router.go(URLS.root);
  }
}

export const userStore = new UserStore();
