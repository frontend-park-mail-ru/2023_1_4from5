import { dispatcher } from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../actionTypes/auth.js';
import { request } from '../modules/request.js';
import { userStore } from './userStore.js';
import { Actions } from '../actions/auth.js';
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
    console.log('startStore::start');
    const userIn = userStore.getUserState();
    try {
      if (!userIn.isAuthorizedIn) {
        const response = await request.get('/api/user/profile');
        const result = await response.json();
        if (result.login) {
          userIn.usernameIn = result.name;
          userIn.isAuthorizedIn = true;
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
    // Actions.renderStartPage();
  }
}

export const startStore = new StartStore();
