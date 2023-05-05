import { Actions } from '../../actions/actions';

const template = require('./subscriptionLevels.handlebars');

class SubscriptionLevels {
  render(config) {
    const levelSpace = document.querySelectorAll('#subscriptionLevels');
    for (let index = 0; index < levelSpace.length; index++) {
      const sub = levelSpace[index];
      sub.innerHTML = '';
      const newDiv = document.createElement('div');
      newDiv.id = 'subscriptionLevelsDiv';
      newDiv.innerHTML = template(config);
      sub.appendChild(newDiv);
    }
  }
}

export const subscriptionLevels = new SubscriptionLevels();
