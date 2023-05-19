import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { dispatcher } from '../../dispatcher/dispatcher.js';
import { donateWin } from './donateWin.js';
import { isValidDonate } from '../../modules/isValid.js';
import { color } from '../../consts/styles.js';
import { request } from '../../modules/request.js';
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

  async donate(input) {
    let moneyCount = input.moneyInput.value.split(' ').join('');
    const errMoneyGot = isValidDonate(moneyCount);
    if (moneyCount.isEmpty) {
      moneyCount = '0';
    }
    input.moneyInput.style.backgroundColor = color.field;

    if (!errMoneyGot) {
      const creatorIdIn = authorPageStore.getState().creator_info.creator_id;
      // const money = Number(moneyCount);
      // if (responseUserId.ok) {
      // const result = await responseUserId.json();
      // if (result.user_id) {
      //   userIdIn = result.user_id;
      // }
      input.donateWinFormLabel.value = {
        operation: 'donate',
        creator_id: creatorIdIn,
        // user_id: userIdIn,
        // money: money
      };
      console.log(input.donateWinForm);
      // input.donateWinForm.submit();

      // eslint-disable-next-line max-len
      // label = {"operation" : "donate",   "creator_id" : "10b0d1b8-0e67-4e7e-9f08-124b3e32cce4",
      // "user_id_in": "c3d5be1f-64ba-49d1-bb1d-06516c64bcba", "money":"1000"}

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
