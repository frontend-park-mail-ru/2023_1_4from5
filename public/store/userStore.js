import { dispatcher } from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../actionTypes/auth.js';
import { request } from '../modules/request.js';
import { Actions } from '../actions/auth.js';
import { router } from '../modules/Router.js';

const sideBarElement = document.querySelector('sideBar');

class UserStore {
  #user;

  constructor() {
    this.#user = {
      usernameIn: '',
      isAuthorIn: false,
      isAuthorizedIn: false,
      authorURL: '',
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
  }

  setState(result) {
    this.#user.usernameIn = result.name;
    this.#user.isAuthorIn = result.is_creator;
    this.#user.isAuthorizedIn = true;
    this.#user.authorURL = result.creator_id;
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.GET_USER:
        const getPage = await request.get('/api/user/homePage');
        const result = await getPage.json();
        this.setState(result);
        Actions.renderSideBar(sideBarElement, this.#user);
        break;

      case ActionTypes.LOGOUT:
        this.logout(action.parent);
        break;

      default:
        break;
    }
  }

  async logout(parent) {
    await request.get('/api/auth/logout');
    this.#user.loginIn = '';
    this.#user.usernameIn = '';
    this.#user.isAuthorIn = false;
    this.#user.isAuthorizedIn = false;
    Actions.removeWinSettings();
    Actions.renderSideBar(sideBarElement, this.#user);
    parent.innerHTML = '';
    router.go('/');
  }
}

export const userStore = new UserStore();
