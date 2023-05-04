import template from './getSubscription.handlebars';
import { Actions } from '../../actions/actions';

const rootElement = document.getElementById('root');

export class GetSubscription {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  render(subscriptionId, price, creatorId) {
    const newDiv = document.createElement('div');
    newDiv.id = 'subDiv';
    newDiv.innerHTML = template();
    this.#parent.appendChild(newDiv);

    const background = document.getElementById('backGetSub');
    background.addEventListener('click', (e) => {
      e.preventDefault();
      this.remove();
    });

    const getSub = document.getElementById('getsub__btn');
    getSub.addEventListener('click', (event) => {
      event.preventDefault();
      const monthCount = document.getElementById('getsub__months').value;
      const money = Number(monthCount) * Number(price);
      Actions.getSubscription(subscriptionId, monthCount, money, creatorId);
    });
  }

  remove() {
    const lastSub = document.getElementById('subDiv');
    if (lastSub) {
      lastSub.remove();
    }
  }
}

export const getSubscription = new GetSubscription(rootElement);
