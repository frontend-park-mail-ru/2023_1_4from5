// @ts-expect-error TS(2307): Cannot find module './subscriptions.handlebars' or... Remove this comment to see the full error message
import template from './subscriptions.handlebars';
import { Actions } from '../../actions/actions';
import { getSubscription } from '../getSubscription/getSubscription';
import { router } from '../../modules/Router';
import { URLS } from '../../modules/Notifier';

const contentElement = document.querySelector('main');

class Subscriptions {
  #parent;

  #isPaid = true;

  constructor(parent: any) {
    this.#parent = parent;
  }

  getParent() {
    return this.#parent;
  }

  render(subs: any) {
    subs.isPaid = this.#isPaid;

    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'subscriptionsDiv';
    newDiv.innerHTML = template(subs);
    this.#parent.appendChild(newDiv);

    const chapterPaid = document.getElementById('chapter--paid');
    const chapterFollow = document.getElementById('chapter--follow');

    if (this.#isPaid) {
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      chapterPaid.classList.add('chapter--active');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      chapterFollow.classList.remove('chapter--active');
    } else {
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      chapterFollow.classList.add('chapter--active');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      chapterPaid.classList.remove('chapter--active');
    }

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    chapterPaid.addEventListener('click', (event) => {
      event.preventDefault();
      this.#isPaid = true;
      this.render(subs);
    });

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    chapterFollow.addEventListener('click', (event) => {
      event.preventDefault();
      this.#isPaid = false;
      this.render(subs);
    });

    // ----------------------------------------------------------------------------//

    const creatorPhotos = document.querySelectorAll('#subs__photo');
    for (let index = 0; index < creatorPhotos.length; index++) {
      const photo = creatorPhotos[index];
      photo.addEventListener('click', (event) => {
        event.preventDefault();
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        const creatorId = event.target.parentElement.id;
        router.go(URLS.myPage, '', creatorId);
      });
    }

    const creatorNames = document.querySelectorAll('.subs__creator');
    for (let index = 0; index < creatorNames.length; index++) {
      const name = creatorNames[index];
      name.addEventListener('click', (event) => {
        event.preventDefault();
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        const creatorId = event.target.id;
        router.go(URLS.myPage, '', creatorId);
      });
    }

    const extendBtns = document.querySelectorAll('#subs__extend');
    for (let index = 0; index < extendBtns.length; index++) {
      const card = extendBtns[index];
      card.addEventListener('click', (event) => {
        event.preventDefault();
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        const subId = event.target.parentElement.id;
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        const price = event.target.parentElement.querySelector('#month__cost').textContent;
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        const creatorId = event.target.parentElement.querySelector('.subs__creator').id;
        getSubscription.render(subId, price, creatorId);
      });
    }

    const disfollowBtns = document.querySelectorAll('#subs__disfollow');
    for (let index = 0; index < disfollowBtns.length; index++) {
      const disfollow = disfollowBtns[index];
      disfollow.addEventListener('click', (event) => {
        event.preventDefault();
        // @ts-expect-error TS(2531): Object is possibly 'null'.
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
