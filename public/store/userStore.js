import { dispatcher } from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../actionTypes/auth.js';
import { request } from '../modules/request.js';

export class UserStore {
  #user;

  constructor() {
    this.#user = {
      usernameIn: '',
      isAuthorIn: false,
      isAuthorizedIn: false,
      authorURL: '',
    };
    console.log('register userStore');
    dispatcher.register(this.reduce);
  }

  getState() {
    return this.#user;
  }

  setState(result) {
    this.#user.usernameIn = result.name;
    this.#user.isAuthorIn = result.is_creator;
    this.#user.isAuthorizedIn = true;
    this.#user.authorURL = result.creator_id;
  }

  reduce(action) {
    switch (action.type) {
      case ActionTypes.GET_USER:
        getUser();
        break;
      default: break;
    }
  }
}
async function getUser() {
  const getPage = await request.get('/api/user/homePage');
  const result = await getPage.json();
  userStore.setState(result);
}

export const userStore = new UserStore();
