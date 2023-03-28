import { dispatcher } from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../actionTypes/auth.js';
import { request } from '../modules/request.js';
import { renderSideBar } from '../index.js';

const sideBarElement = document.getElementById('sideBar');

export class UserStore {
  #user;

  constructor() {
    this.#user = {
      usernameIn: '',
      isAuthorIn: false,
      isAuthorizedIn: false,
      authorURL: '',
    };
    dispatcher.register(this.reduce.bind(this));
    console.log('register userStore');
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
        console.log('answer on get request', getPage);
        const result = await getPage.json();
        this.setState(result);
        renderSideBar(sideBarElement);
        console.log('GET_USER');
        break;
      default:
        break;
    }
  }
}

export const userStore = new UserStore();
