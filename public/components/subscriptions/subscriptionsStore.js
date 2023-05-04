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
        console.log('SubscriptionsStore');
        const reqSubs = await request.get('/api/user/subscriptions');
        const subs = await reqSubs.json();

        const reqFollows = await request.get('/api/user/follows');
        const follows = await reqFollows.json();

        const subsObj = {
          subs,
          follows,
        };
        subscriptions.render(subsObj);
        break;

      default:
        break;
    }
  }
}

export const subscriptionsStore = new SubscriptionsStore();
