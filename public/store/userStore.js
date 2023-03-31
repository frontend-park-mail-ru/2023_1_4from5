import { dispatcher } from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../actionTypes/auth.js';
import { request } from '../modules/request.js';
import { Actions } from '../actions/auth.js';

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
        console.log('GET_USER');
        break;

      case ActionTypes.LOGOUT:
        await request.get('/api/auth/logout');
        this.#user.loginIn = '';
        this.#user.usernameIn = '';
        this.#user.isAuthorIn = false;
        this.#user.isAuthorizedIn = false;
        Actions.renderSideBar(sideBarElement, this.#user);
        Actions.renderStartPage();
        break;
      default:
        break;
    }
  }
}

export const userStore = new UserStore();

// TODO при изменении инфы о юзере вызывать вторым действием стор сайт бара  и там обновлять данные
