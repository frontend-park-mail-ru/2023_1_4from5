import template from './subscription.handlebars';
import { Actions } from '../../actions/actions';

const rootElement = document.getElementById('root');

export class SubscriptionWin {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  render(content) {
    const newDiv = document.createElement('div');
    newDiv.id = 'subscriptionDiv';
    newDiv.innerHTML = template(content);
    this.#parent.appendChild(newDiv);

    const background = document.getElementById('backSubscription');
    background.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.removeSubscription();
    });
  }

  remove() {
    const lastSub = document.getElementById('subscriptionDiv');
    if (lastSub) {
      lastSub.remove();
    }
  }

  publish() {
    const createSubBtn = document.getElementById('subscription__btn');
    createSubBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const titleInput = document.getElementById('sub-title-input');
      const title = titleInput.value;

      const descriptionInput = document.getElementById('sub-description-input');
      const description = descriptionInput.value;

      const costInput = document.getElementById('sub-cost-input');
      const cost = costInput.value;

      Actions.createSub({
        title,
        description,
        cost,
      });
    });
  }

  update(id) {
    const createSubBtn = document.getElementById('subscription__btn');
    createSubBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const titleInput = document.getElementById('sub-title-input');
      const title = titleInput.value;

      const descriptionInput = document.getElementById('sub-description-input');
      const description = descriptionInput.value;

      const costInput = document.getElementById('sub-cost-input');
      const cost = costInput.value;

      Actions.updateSub(id, {
        title,
        description,
        cost,
      });
    });
  }
}

export const subscriptionWin = new SubscriptionWin(rootElement);
