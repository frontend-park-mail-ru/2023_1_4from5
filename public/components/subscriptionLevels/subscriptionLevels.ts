import { Actions } from '../../actions/actions';
import { getSubscription } from '../getSubscription/getSubscription';

// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const template = require('./subscriptionLevels.handlebars');

class SubscriptionLevels {
  render(config: any) {
    const levelSpace = document.querySelectorAll('#subscriptionLevels');
    for (let index = 0; index < levelSpace.length; index++) {
      const sub = levelSpace[index];
      sub.innerHTML = '';
      const newDiv = document.createElement('div');
      newDiv.id = 'subscriptionLevelsDiv';
      newDiv.innerHTML = template(config);
      sub.appendChild(newDiv);
    }

    if (!config.is_my_page) {
      Actions.filterSubscriptions(config.subscriptions);
    }

    const getSubBtns = document.querySelectorAll('#get__sub');
    if (getSubBtns) {
      for (let index = 0; index < getSubBtns.length; index++) {
        const button = getSubBtns[index];
        button.addEventListener('click', (event) => {
          event.preventDefault();
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          const subId = event.target.parentElement.id;
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          const price = event.target.parentElement.querySelector('#sub__price').textContent;
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          const creatorId = event.target.parentElement.parentElement.parentElement.id;
          getSubscription.render(subId, price, creatorId);
        });
      }
    }

    const createSubBtn = document.querySelectorAll('#subs__add');
    if (createSubBtn) {
      for (let index = 0; index < createSubBtn.length; index++) {
        const button = createSubBtn[index];
        button.addEventListener('click', (event) => {
          event.preventDefault();
          Actions.renderSubscription();
        });
      }
    }

    const updateSubBtns = document.querySelectorAll('#sub__edit');
    for (let index = 0; index < updateSubBtns.length; index++) {
      const button = updateSubBtns[index];
      button.addEventListener('click', this.updateSubHandler);
    }

    const deleteSubBtns = document.querySelectorAll('#sub__delete');
    for (let index = 0; index < deleteSubBtns.length; index++) {
      const button = deleteSubBtns[index];
      button.addEventListener('click', this.deleteSubHandler);
    }
  }

  deleteSubHandler(e: any) {
    e.preventDefault();
    Actions.deleteSub(e.currentTarget.parentElement.parentElement.id);
  }

  updateSubHandler(e: any) {
    e.preventDefault();
    const subscription = document.getElementById(e.currentTarget.parentElement.id);
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    const titleContainer = subscription.querySelector('.sub__title--text');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    const title = titleContainer.textContent;

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    const descriptionContainer = subscription.querySelector('.sub__description');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    const description = descriptionContainer.textContent;

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    const costContainer = subscription.querySelector('.cost');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    const cost = costContainer.textContent;

    Actions.renderUpdatingSubscription(e.currentTarget.parentElement.id, {
      title,
      description,
      cost,
    });
  }

  filterBoughtSubs(filteredSubs: any) {
    const subCards = document.querySelectorAll('.sub__card');
    if (subCards) {
      for (let index = 0; index < subCards.length; index++) {
        const subCard = subCards[index];
        const hasBought = filteredSubs.some((sub: any) => sub.id === subCard.id);
        if (hasBought) {
          const btn = subCard.querySelector('#get__sub');
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          btn.innerHTML = 'Продлить';
        }
      }
    }
  }
}

export const subscriptionLevels = new SubscriptionLevels();
