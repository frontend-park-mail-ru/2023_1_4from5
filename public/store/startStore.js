import { dispatcher } from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../actionTypes/actionTypes.js';
import { request } from '../modules/request.js';
import { userStore } from './userStore.js';
import { Actions } from '../actions/actions.js';
import { startPage } from '../components/startPage/startPage.js';

const sideBarElement = document.querySelector('sideBar');

class StartStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.RENDER_STARTPAGE:
        startPage.render();
        break;

      default:
        break;
    }
  }

  async start() {
    const userIn = userStore.getUserState();
    try {
      if (!userIn.isAuthorizedIn) {
        const response = await request.get('/api/user/profile');
        const result = await response.json();
        if (result.login) {
          userIn.usernameIn = result.name;
          userIn.isAuthorizedIn = true;
          userIn.login = result.login;
          userIn.profilePhoto = result.profile_photo;
          const getPage = await request.get('/api/user/homePage');
          const userHomePage = await getPage.json();
          userIn.authorURL = userHomePage.creator_id;
          userIn.isAuthorIn = userHomePage.is_creator;
        }
      }
    } catch (err) {
      console.log(err);
    }
    Actions.renderSideBar(sideBarElement, userIn);
  }
}

export const startStore = new StartStore();
