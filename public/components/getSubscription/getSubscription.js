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
    const getSubErr = document.getElementById('getsub__cost--err');
    const getSubForm = document.getElementById('getsub__payForm');
    const getSubFormLabel = document.getElementById('getsub__label');
    const getSubFormSum = document.getElementById('getsub__sum');
    const monthCount = document.getElementById('getsub__months');

    getSub.addEventListener('click', (event) => {
      event.preventDefault();
      Actions.getSubscription({
        subscriptionId,
        monthCount,
        price,
        creatorId,
        getSubForm,
        getSubFormLabel,
        getSubFormSum,
        getSubErr
      });
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
