import template from './subscriptions.handlebars';
import { Actions } from '../../actions/actions';
import { getSubscription } from '../getSubscription/getSubscription';

const contentElement = document.querySelector('main');

class Subscriptions {
  #parent;

  #isPaid = true;

  constructor(parent) {
    this.#parent = parent;
  }

  getParent() {
    return this.#parent;
  }

  render(subs) {
    subs.isPaid = this.#isPaid;

    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'subscriptionsDiv';
    newDiv.innerHTML = template(subs);
    this.#parent.appendChild(newDiv);

    const chapterPaid = document.getElementById('chapter--paid');
    const chapterFollow = document.getElementById('chapter--follow');

    if (this.#isPaid) {
      chapterPaid.classList.add('chapter--active');
      chapterFollow.classList.remove('chapter--active');
    } else {
      chapterFollow.classList.add('chapter--active');
      chapterPaid.classList.remove('chapter--active');
    }

    chapterPaid.addEventListener('click', (event) => {
      event.preventDefault();
      this.#isPaid = true;
      this.render(subs);
    });

    chapterFollow.addEventListener('click', (event) => {
      event.preventDefault();
      this.#isPaid = false;
      this.render(subs);
    });

    // ----------------------------------------------------------------------------//

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

    const disfollowBtns = document.querySelectorAll('#subs__disfollow');
    for (let index = 0; index < disfollowBtns.length; index++) {
      const disfollow = disfollowBtns[index];
      disfollow.addEventListener('click', (event) => {
        event.preventDefault();
        Actions.unfollow(event.target.parentElement.id, 'subscriptions');
      });
    }
  }

  remove() {
    const lastPage = document.getElementById('subscriptionsDiv');
    if (lastPage) {
      lastPage.remove();
    }
  }
}

export const subscriptions = new Subscriptions(contentElement);
