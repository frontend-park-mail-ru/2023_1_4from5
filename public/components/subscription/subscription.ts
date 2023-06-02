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
    const titleHead = document.getElementById('sub__title');
    titleHead.innerHTML = 'Создание подписки';

    const createSubBtn = document.getElementById('subscription__btn');
    createSubBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const titleInput = document.getElementById('sub-title-input');
      const title = titleInput.value;

      const descriptionInput = document.getElementById('sub-description-input');
      const description = descriptionInput.value;

      const costInput = document.getElementById('sub-cost-input');
      const cost = costInput.value;

      if (this.isCostValid(cost)) {
        Actions.createSub({
          title,
          description,
          cost,
        });
      }
    });
  }

  update(id) {
    const titleHead = document.getElementById('sub__title');
    titleHead.innerHTML = 'Редактирование подписки';

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

  isCostValid(cost) {
    if (Number(cost)) {
      return true;
    }
    const err = document.getElementById('cost__err');
    err.textContent = 'Стоимость подписки должна быть числом';
    return false;
  }
}

export const subscriptionWin = new SubscriptionWin(rootElement);
