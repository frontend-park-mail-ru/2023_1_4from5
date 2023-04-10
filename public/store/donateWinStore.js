import { ActionTypes } from '../actionTypes/actionTypes.js';
import { dispatcher } from '../dispatcher/dispatcher.js';
import { donateWin } from '../components/donateWin/donateWin.js';
import { isValidDonate } from '../modules/isValid.js';
import { color } from '../consts/styles.js';
import { request } from '../modules/request.js';
import { myPage } from '../components/myPage/myPage.js';
import { myPageStore } from './myPageStore.js';

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
        console.log(action);
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

  async donate(input) {
    let moneyCount = input.moneyInput.value;
    const errMoneyGot = isValidDonate(moneyCount);
    if (moneyCount.isEmpty) {
      moneyCount = '0';
    }
    input.moneyInput.style.backgroundColor = color.field;

    if (!errMoneyGot) {
      await request.get('/api/user/donate');
      const donateAim = await request.post('/api/user/donate', {
        creator_id: myPageStore.getState().creator_info.creator_id,
        money_count: Number(moneyCount),
      });
      if (donateAim.ok) {
        myPageStore.getState().aim.money_got += Number(moneyCount);
        myPage.config = myPageStore.getState();
        donateWin.removeDonateWin();
        myPage.render();
      } else {
        input.errorOutput.innerHTML = '';
        input.errorOutput.innerHTML = 'Неверная сумма доната';
        input.moneyInput.style.backgroundColor = color.error;
      }
    } else {
      input.errorOutput.innerHTML = '';
      if (errMoneyGot) {
        input.errorOutput.innerHTML = errMoneyGot;
        input.moneyInput.style.backgroundColor = color.error;
      }
    }
  }
}

export const donateWinStore = new DonateWinStore();
