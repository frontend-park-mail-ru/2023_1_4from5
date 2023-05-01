import template from './subscriptions.handlebars';
import { Actions } from '../../actions/actions';
import { getSubscription } from '../authorPage/getSubscription';

const contentElement = document.querySelector('main');

class Subscriptions {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  getParent() {
    return this.#parent;
  }

  render(subs) {
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'subscriptionsDiv';
    newDiv.innerHTML = template(subs);
    this.#parent.appendChild(newDiv);

    const photos = document.querySelectorAll('#subs__photo');
    for (let index = 0; index < photos.length; index++) {
      const photo = photos[index];
      photo.style.backgroundImage = 'url(../../images/author-photo.svg)';
    }

    const extendBtns = document.querySelectorAll('#subs__extend');
    for (let index = 0; index < extendBtns.length; index++) {
      const card = extendBtns[index];
      card.addEventListener('click', (event) => {
        event.preventDefault();
        const subId = event.target.parentElement.id;
        const price = event.target.parentElement.querySelector('#month__cost').textContent;
        const creatorId = event.target.parentElement.querySelector('.subs__creator').id;
        getSubscription.render(subId, price, creatorId);
      });
    }
  }
}

export const subscriptions = new Subscriptions(contentElement);
