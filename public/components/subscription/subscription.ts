// @ts-expect-error TS(2307): Cannot find module './subscription.handlebars' or ... Remove this comment to see the full error message
import template from './subscription.handlebars';
import { Actions } from '../../actions/actions';

const rootElement = document.getElementById('root');

export class SubscriptionWin {
  #parent;

  constructor(parent: any) {
    this.#parent = parent;
  }

  render(content: any) {
    const newDiv = document.createElement('div');
    newDiv.id = 'subscriptionDiv';
    newDiv.innerHTML = template(content);
    this.#parent.appendChild(newDiv);

    const background = document.getElementById('backSubscription');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
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
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    titleHead.innerHTML = 'Создание подписки';

    const createSubBtn = document.getElementById('subscription__btn');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    createSubBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const titleInput = document.getElementById('sub-title-input');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const title = titleInput.value;

      const descriptionInput = document.getElementById('sub-description-input');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const description = descriptionInput.value;

      const costInput = document.getElementById('sub-cost-input');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
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

  update(id: any) {
    const titleHead = document.getElementById('sub__title');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    titleHead.innerHTML = 'Редактирование подписки';

    const createSubBtn = document.getElementById('subscription__btn');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    createSubBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const titleInput = document.getElementById('sub-title-input');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const title = titleInput.value;

      const descriptionInput = document.getElementById('sub-description-input');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const description = descriptionInput.value;

      const costInput = document.getElementById('sub-cost-input');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const cost = costInput.value;

      Actions.updateSub(id, {
        title,
        description,
        cost,
      });
    });
  }

  isCostValid(cost: any) {
    if (Number(cost)) {
      return true;
    }
    const err = document.getElementById('cost__err');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    err.textContent = 'Стоимость подписки должна быть числом';
    return false;
  }
}

export const subscriptionWin = new SubscriptionWin(rootElement);
