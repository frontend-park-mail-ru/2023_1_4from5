import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { dispatcher } from '../../dispatcher/dispatcher.js';
import { donateWin } from './donateWin.js';
import { isValidDonate } from '../../modules/isValid.js';
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
    let moneyCount = input.moneyInput.value.split(' ').join('');
    const errMoneyGot = isValidDonate(moneyCount);
    if (moneyCount.isEmpty) {
      moneyCount = '0';
    }
    input.moneyInput.style.backgroundColor = color.field;

    if (!errMoneyGot) {
      const creatorIdIn = authorPageStore.getState().creator_info.creator_id;
      input.donateWinFormLabel.value = `donate;${creatorIdIn}`;
      input.donateWinForm.submit();
      // const token = await request.getHeader('/api/user/donate');
      // const donateAim = await request.post('/api/user/donate', {
      //   creator_id: authorPageStore.getState().creator_info.creator_id,
      //   money_count: Number(moneyCount),
      // }, token);

      authorPageStore.getState().aim.money_got += Number(moneyCount);
      authorPage.config = authorPageStore.getState();
      donateWin.removeDonateWin();
      authorPage.render();
    } else {
      input.errorOutput.innerHTML = '';
      input.errorOutput.innerHTML = 'Некорректная сумма доната';
      input.moneyInput.style.backgroundColor = color.error;
    }
    // } else {
    //   input.errorOutput.innerHTML = '';
    //   input.errorOutput.innerHTML = errMoneyGot;
    //   input.moneyInput.style.backgroundColor = color.error;
    // }
  }
}

export const donateWinStore = new DonateWinStore();
