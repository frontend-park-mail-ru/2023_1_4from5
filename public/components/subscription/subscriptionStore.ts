import { dispatcher } from '../../dispatcher/dispatcher';
import { ActionTypes } from '../../actionTypes/actionTypes';
import { subscriptionWin } from './subscription';
import { request } from '../../modules/request';
import { authorPage } from '../authorPage/authorPage';
import { authorPageStore } from '../authorPage/authorPageStore';
import { donateWin } from '../donateWin/donateWin';
import { Actions } from '../../actions/actions';
import { userStore } from '../user/userStore';

class SubscriptionStore {
  // @ts-expect-error TS(7008): Member '#config' implicitly has an 'any' type.
  #config;

  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  setState(config: any) {
    this.#config = config;
  }

  getState() {
    return this.#config;
  }

  async reduce(action: any) {
    switch (action.type) {
      case ActionTypes.RENDER_SUBSCRIPTION:
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
        subscriptionWin.render();
        subscriptionWin.publish();
        break;

      case ActionTypes.RENDER_UPDATING_SUBSCRIPTION:
        subscriptionWin.render(action.content);
        subscriptionWin.update(action.id);
        break;

      case ActionTypes.REMOVE_SUBSCRIPTION:
        subscriptionWin.remove();
        break;

      case ActionTypes.CREATE_SUB:
        const tokenCreate = await request.getHeader('/api/subscription/create');
        await request.post('/api/subscription/create', {
          title: action.input.title,
          description: action.input.description,
          month_cost: Number(action.input.cost),
        }, tokenCreate);
        subscriptionWin.remove();
        await authorPageStore.renderMyPage();
        break;

      case ActionTypes.UPDATE_SUB:
        //.log(action.input);
        const tokenUpdate = await request.getHeader(`/api/subscription/edit/${action.id}`);
        await request.put(`/api/subscription/edit/${action.id}`, {
          creator: userStore.getUserState().authorURL,
          title: action.input.title,
          description: action.input.description,
          month_cost: Number(action.input.cost),
        }, tokenUpdate);
        subscriptionWin.remove();
        await authorPageStore.renderMyPage();
        break;

      case ActionTypes.DELETE_SUB:
        const tokenDelete = await request.getHeader(`/api/subscription/delete/${action.id}`);
        await request.delete(`/api/subscription/delete/${action.id}`, tokenDelete);
        await authorPageStore.renderMyPage();
        break;

      default:
        break;
    }
  }
}

export const subscriptionStore = new SubscriptionStore();
