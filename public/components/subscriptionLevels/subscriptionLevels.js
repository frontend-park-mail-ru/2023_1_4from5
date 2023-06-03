import { Actions } from '../../actions/actions';
import { getSubscription } from '../getSubscription/getSubscription';

const template = require('./subscriptionLevels.handlebars');

class SubscriptionLevels {
  render(config) {
    if (config.subscriptions) {
      config.subscriptions.forEach((sub) => {
        const textWithBreaks = sub.description.split('\n');
        sub.textWithBreaks = [];

        textWithBreaks.forEach((description) => {
          sub.textWithBreaks.push({ description });
        });
      });
    }

    const levelSpace = document.querySelectorAll('#subscriptionLevels');
    for (let index = 0; index < levelSpace.length; index++) {
      const sub = levelSpace[index];
      sub.textContent = '';
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
          const subId = event.target.parentElement.id;
          const price = event.target.parentElement.querySelector('#sub__price').textContent;
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

  deleteSubHandler(e) {
    e.preventDefault();
    Actions.deleteSub(e.currentTarget.parentElement.parentElement.id);
  }

  updateSubHandler(e) {
    e.preventDefault();
    const subscription = document.getElementById(e.currentTarget.parentElement.id);
    const titleContainer = subscription.querySelector('.sub__title--text');
    const title = titleContainer.textContent;

    const descriptionContainer = subscription.querySelectorAll('.sub__description');
    let description = '';
    descriptionContainer.forEach((elem) => {
      description += `${elem.textContent}\n`;
    });

    const costContainer = subscription.querySelector('.cost');
    const cost = costContainer.textContent;

    Actions.renderUpdatingSubscription(e.currentTarget.parentElement.id, {
      title,
      description,
      cost,
    });
  }

  filterBoughtSubs(filteredSubs) {
    const subCards = document.querySelectorAll('.sub__card');
    if (subCards) {
      for (let index = 0; index < subCards.length; index++) {
        const subCard = subCards[index];
        const hasBought = filteredSubs.some((sub) => sub.id === subCard.id);
        if (hasBought) {
          const btn = subCard.querySelector('#get__sub');
          btn.innerHTML = 'Продлить';
        }
      }
    }
  }
}

export const subscriptionLevels = new SubscriptionLevels();
