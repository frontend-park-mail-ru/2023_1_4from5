// @ts-expect-error TS(2307): Cannot find module './aim.handlebars' or its corre... Remove this comment to see the full error message
import template from './aim.handlebars';
import { Actions } from '../../actions/actions';

const rootElement = document.getElementById('root');

export class Aim {
  #parent;

  constructor(parent: any) {
    this.#parent = parent;
  }

  render(content: any) {
    const newDiv = document.createElement('div');
    newDiv.id = 'aimDiv';
    newDiv.innerHTML = template(content);
    this.#parent.appendChild(newDiv);

    if (content) {
      const description = document.getElementById('aim__description');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      description.value = content.description;
      const cost = document.getElementById('aim__cost');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      cost.value = content.money_needed;
    }

    const background = document.getElementById('backAim');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    background.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.removeAim();
    });

    const publishBtn = document.getElementById('aim__btn');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
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
