import { dispatcher } from '../../dispatcher/dispatcher';
import { ActionTypes } from '../../actionTypes/actionTypes';
import { request } from '../../modules/request';
import { subscriptionLevels } from './subscriptionLevels';

class SubscriptionLevelsStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.FILTER_SUBSCRIPTIONS:
        const req = await request.get('/api/user/subscriptions');
        const bought = await req.json();
        // eslint-disable-next-line max-len
        const intersection = action.subscriptions.filter((sub1) => bought.some((sub2) => sub1.id === sub2.id));
        subscriptionLevels.filterBoughtSubs(intersection);
        break;

      default:
        break;
    }
  }
}

export const subscriptionLevelsStore = new SubscriptionLevelsStore();
