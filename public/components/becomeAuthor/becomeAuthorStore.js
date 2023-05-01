import { dispatcher } from '../../dispatcher/dispatcher';
import { becameAuthor } from './becomeAuthor';
import { ActionTypes } from '../../actionTypes/actionTypes';
import { request } from '../../modules/request';
import { router } from '../../modules/Router';
import { Actions } from '../../actions/actions';
import { URLS } from '../../modules/Notifier';
import { authorPageStore } from '../authorPage/authorPageStore';
import { userStore } from '../user/userStore';

class BecomeAuthorStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  reduce(action) {
    switch (action.type) {
      case ActionTypes.RENDER_BECOME_AUTHOR:
        this.renderBecomeAuthor(action.creatorId);
        break;

      case ActionTypes.REMOVE_BECOME_AUTHOR:
        becameAuthor.remove();
        break;

      case ActionTypes.BECOME_AUTHOR:
        this.becomeAuthor(action);
        break;

      case ActionTypes.UPDATE_PROFILE:
        this.updateProfile(action.input);
        break;

      default:
        break;
    }
  }

  async renderBecomeAuthor(creatorId) {
    becameAuthor.render();
    if (creatorId) {
      const req = await request.get(`/api/creator/page/${creatorId}`);
      const res = await req.json();
      const name = res.creator_info.name;
      const description = res.creator_info.description;
      becameAuthor.update(name, description);
    } else {
      becameAuthor.publish();
    }
  }

  async becomeAuthor(action) {
    const name = action.input.nameInput.value;
    const description = action.input.descriptionInput.value;
    const body = {
      name,
      description,
    };

    const token = await request.getHeader('/api/user/becameCreator');
    await request.post('/api/user/becameCreator', body, token);
    await userStore.getUser();
    becameAuthor.remove();
    router.go(URLS.myPage);
  }

  async updateProfile(input) {
    const token = await request.getHeader('/api/creator/updateData');
    await request.put('/api/creator/updateData', {
      name: input.newName,
      description: input.newDescription,
    }, token);
    becameAuthor.remove();
    router.go(URLS.myPage);
    await authorPageStore.renderMyPage();
  }
}

export const becameAuthorStore = new BecomeAuthorStore();
