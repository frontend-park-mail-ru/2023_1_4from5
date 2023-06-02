import { color } from '../../consts/styles.js';
import { Actions } from '../../actions/actions';
// @ts-expect-error TS(2307): Cannot find module './donateWin.handlebars' or its... Remove this comment to see the full error message
import template from './donateWin.handlebars';

const rootElement = document.getElementById('root');

export class DonateWin {
  #parent;

  constructor(parent: any) {
    this.#parent = parent;
  }

  render() {
    const newDiv = document.createElement('div');
    newDiv.id = 'donateWinDiv';
    newDiv.innerHTML = template();
    this.#parent.appendChild(newDiv);

    const background = document.getElementById('backDonateWin');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    background.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.removeDonateWin();
    });

    const donateWinBtn = document.getElementById('donateWin-btn');
    const donateWinForm = document.getElementById('donateWin__form');
    const donateWinFormLabel = document.getElementById('donateWin__label');
    const donateWinFormSum = document.getElementById('donateWin__sum');
    const moneyInput = document.getElementById('donateWin-money');
    const errorOutput = document.getElementById('donateWin-error');

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    moneyInput.style.backgroundColor = color.field;

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    donateWinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.donate({
        moneyInput,
        donateWinForm,
        donateWinFormLabel,
        donateWinFormSum,
        errorOutput,
      });
    });
  }

  removeDonateWin() {
    const lastDonateWin = document.getElementById('donateWinDiv');
    if (lastDonateWin) {
      lastDonateWin.remove();
    }
  }
}

export const donateWin = new DonateWin(rootElement);
