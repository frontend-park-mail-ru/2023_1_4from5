import { dispatcher } from '../../dispatcher/dispatcher';
import { ActionTypes } from '../../actionTypes/actionTypes';
import { request } from '../../modules/request';
import { subscriptions } from './subscriptions';

class SubscriptionsStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.RENDER_SUBSCRIPTIONS:
        const req = await request.get('/api/user/subscriptions');
        const subs = await req.json();
        const subsObj = {
          subs,
        };
        console.log(subsObj);
        subscriptions.render(subsObj);
        break;

      default:
        break;
    }
  }
}

export const subscriptionsStore = new SubscriptionsStore();
