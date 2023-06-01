import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { dispatcher } from '../../dispatcher/dispatcher.js';
import { donateWin } from './donateWin.js';
import { isValidDonate, LENGTH, validation, validationStructure } from '../../modules/isValid.js';
import { color } from '../../consts/styles.js';
import { authorPage } from '../authorPage/authorPage.js';
import { authorPageStore } from '../authorPage/authorPageStore.js';

class DonateWinStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  renderDonateWin() {
    donateWin.render();
  }

  reduce(action) {
    switch (action.type) {
      case ActionTypes.RENDER_DONATE_WIN:
        donateWin.render();
        break;
      case ActionTypes.REMOVE_DONATE_WIN:
        donateWin.removeDonateWin();
        break;
      case ActionTypes.DONATE:
        this.donate(action.input);
        break;
      default:
        break;
    }
  }

  donate(input) {
    let moneyCount = input.moneyInput.value.replace(/ /g, '');
    const errorOutput = input.errorOutput;
    const validStructMoney = { ...validationStructure };
    validStructMoney.field = '"Отправить донат"';
    validStructMoney.isMoney = true;
    validStructMoney.moreThanTwoRub = true;
    validStructMoney.hasNumber = true;
    validStructMoney.whiteSymbolsError = 'Допустимы только числа';

    const errMoneyGot = validation(validStructMoney, moneyCount);
    if (moneyCount.isEmpty) {
      moneyCount = '0';
    }
    input.moneyInput.style.backgroundColor = color.field;

    if (!errMoneyGot) {
      const creatorIdIn = authorPageStore.getState().creator_info.creator_id;
      input.donateWinFormLabel.value = `donate;${creatorIdIn}`;
      input.donateWinFormSum.value = Number(moneyCount);
      input.donateWinForm.submit();
    } else {
      errorOutput.innerHTML = '';
      errorOutput.innerHTML = errMoneyGot;
      input.moneyInput.style.backgroundColor = color.error;
    }
  }
}

export const donateWinStore = new DonateWinStore();
