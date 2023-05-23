import { color } from '../../consts/styles.js';
import { Actions } from '../../actions/actions';
import template from './donateWin.handlebars';

const rootElement = document.getElementById('root');

export class DonateWin {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  render() {
    const newDiv = document.createElement('div');
    newDiv.id = 'donateWinDiv';
    newDiv.innerHTML = template();
    this.#parent.appendChild(newDiv);

    const background = document.getElementById('backDonateWin');
    background.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.removeDonateWin();
    });

    const donateWinBtn = document.getElementById('donateWin-btn');
    const donateWinForm = document.getElementById('donateWin__form');
    const donateWinFormLabel = document.getElementById('donateWin__label');
    const moneyInput = document.getElementById('donateWin-money');
    const errorOutput = document.getElementById('donateWin-error');

    moneyInput.style.backgroundColor = color.field;

    donateWinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.donate({
        moneyInput,
        donateWinForm,
        donateWinFormLabel,
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
