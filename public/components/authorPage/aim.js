import template from './aim.handlebars';
import { Actions } from '../../actions/actions';

const rootElement = document.getElementById('root');

export class Aim {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  render(content) {
    const newDiv = document.createElement('div');
    newDiv.id = 'aimDiv';
    newDiv.innerHTML = template(content);
    this.#parent.appendChild(newDiv);

    const description = document.getElementById('aim__description');
    description.value = content.description;
    const cost = document.getElementById('aim__cost');
    cost.value = content.money_needed;

    const background = document.getElementById('backAim');
    background.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.removeAim();
    });

    const publishBtn = document.getElementById('aim__btn');
    publishBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const descriptionInput = document.getElementById('aim__description');
      const moneyNeededInput = document.getElementById('aim__cost');

      const errorDescriptionOutput = document.getElementById('aim__description--err');
      const errorMoneyNeededOutput = document.getElementById('aim__cost--err');
      Actions.saveAim({
        descriptionInput,
        moneyNeededInput,
        errorDescriptionOutput,
        errorMoneyNeededOutput,
      });
    });
  }

  remove() {
    const lastAim = document.getElementById('aimDiv');
    if (lastAim) {
      lastAim.remove();
    }
  }
}

export const aim = new Aim(rootElement);
