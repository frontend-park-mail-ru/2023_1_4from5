import { dispatcher } from '../../dispatcher/dispatcher.js';
import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { request } from '../../modules/request.js';
import { userStore } from '../user/userStore.js';
import { Actions } from '../../actions/actions.js';
import { startPage } from './startPage.js';

const sideBarElement = document.querySelector('sideBar');

class StartStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  reduce(action) {
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
    if (!userIn.isAuthorizedIn) {
      const response = await request.get('/api/user/profile');
      Actions.followAll();
      if (response.ok) {
        const result = await response.json();
        if (result.login) {
          userIn.usernameIn = result.name;
          userIn.isAuthorizedIn = true;
          userIn.login = result.login;
          userIn.profilePhoto = result.profile_photo;
          userIn.isAuthorIn = result.is_creator;
          userIn.authorURL = result.creator_id;
        }
      }
    }
    Actions.renderSideBar(userIn);
  }
}

export const startStore = new StartStore();
