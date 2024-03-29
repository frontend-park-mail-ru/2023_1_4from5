import { dispatcher } from '../../dispatcher/dispatcher';
import { statistics } from './statistics';
import { request } from '../../modules/request';
import { ActionTypes } from '../../actionTypes/actionTypes';
import { isValidGetSum, isValidPhone, isValidSelectedDate } from '../../modules/isValid';
import { color } from '../../consts/styles';

class StatisticsStore {
  #config = {
    balance: 0,
    startMonth: 0,
    startYear: 0,
    currentMonth: 0,
    currentYear: 0,
    selectedStartMonth: 0,
    selectedStartYear: 0,
    selectedEndMonth: 0,
    selectedEndYear: 0,
    startMonths: [],
    startYears: [],
    endMonths: [],
    endYears: [],
    statisticsTotalList: [
      {
        name: 'subscriptions_bought',
        card_icon: 'user_photo.png',
        count: 0,
        description: 'платных подписчиков',
      },
      {
        name: 'new_followers',
        card_icon: 'watch.svg',
        count: 0,
        description: 'наблюдателей',
      },
    ],
    statisticsTotalListMoney: [
      {
        name: 'money_all',
        count: 0,
        description: 'всего заработано',
      },
      {
        name: 'money_from_donations',
        count: 0,
        description: 'всего заработано на донатах',
      },
      {
        name: 'money_from_subscriptions',
        count: 0,
        description: 'всего заработано на подписках',
      }
    ],
    statisticsIntervalList: [
      {
        name: 'subscriptions_bought',
        card_icon: 'follow.svg',
        count: 0,
        description: 'подписчиков',
      },
      {
        name: 'new_followers',
        card_icon: 'watch.svg',
        count: 0,
        description: 'наблюдателей',
      },
      {
        name: 'posts_per_month',
        card_icon: 'feed.svg',
        count: 0,
        description: 'постов',
      },
      {
        name: 'likes_count',
        card_icon: 'like_icon.png',
        count: 0,
        description: 'лайков',
      },
      {
        name: 'comments_count',
        card_icon: 'comment_icon.png',
        count: 0,
        description: 'комментариев',
      },
      {
        name: 'donations_count',
        card_icon: 'donate.svg',
        count: 0,
        description: 'донатов',
      },
    ],
    statisticsIntervalListMoney: [
      {
        name: 'money_from_subscriptions',
        count: 0,
        description: 'поступило за подписки',
      },
      {
        name: 'money_from_donations',
        count: 0,
        description: 'поступило за донаты',
      },
      {
        name: 'money_all',
        count: 0,
        description: 'поступило всего',
      }
    ],
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  };

  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action: any) {
    switch (action.type) {
      case ActionTypes.GET_MONEY:
        await this.getMoney(action.input);
        break;
      case ActionTypes.SHOW_STATISTICS:
        await this.showStatistics(action.input);
        break;
      default:
        break;
    }
  }

  setCardStatistics(input: any, type: any) {
    let propConfig;
    let moneyAll;
    let moneyPart;
    if (type === 'total') {
      for (let prop in input) {
        if (prop === 'money_from_donations' || prop === 'money_from_subscriptions') {
          moneyPart = this.#config.statisticsTotalListMoney.find((item) => item.name === prop);
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          moneyPart.count = input[prop];
        }
        if (prop === 'subscriptions_bought' || prop === 'new_followers') {
          let propConfig = this.#config.statisticsTotalList.find((item) => item.name === prop);
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          propConfig.count = input[prop];
        }
      }
      moneyAll = this.#config.statisticsTotalListMoney.find((item) => item.name === 'money_all');
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      moneyAll.count = Number(input.money_from_donations) + Number(input.money_from_subscriptions);
    } else if (type === 'interval') {
      for (let prop in input) {
        if (prop === 'money_from_donations' || prop === 'money_from_subscriptions') {
          moneyPart = this.#config.statisticsIntervalListMoney.find((item) => item.name === prop);
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          moneyPart.count = input[prop];
        }
        if (prop === 'subscriptions_bought' || prop === 'new_followers' || prop === 'posts_per_month'
            || prop === 'donations_count' || prop === 'likes_count' || prop === 'comments_count') {
          propConfig = this.#config.statisticsIntervalList.find((item) => item.name === prop);
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          propConfig.count = input[prop];
        }
      }
      moneyAll = this.#config.statisticsIntervalListMoney.find((item) => item.name === 'money_all');
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      moneyAll.count = Number(input.money_from_donations) + Number(input.money_from_subscriptions);
    }
  }

  async renderStatistics() {
    const now = new Date();
    this.#config.currentMonth = now.getMonth();
    this.#config.currentYear = now.getFullYear();
    this.#config.startMonth = now.getMonth();
    this.#config.startYear = now.getFullYear();
    this.#config.selectedStartMonth = now.getMonth();
    this.#config.selectedEndMonth = now.getMonth();
    let statisticsTotal = {};
    let statisticsLastMonth = {};

    const firstDateReq = await request.get('/api/creator/statisticsFirstDate');
    const firstDateString = await firstDateReq.json();
    if (firstDateString) {
      const firstDateArr = firstDateString.split('-');
      this.#config.startYear = Number(firstDateArr[0]);
      this.#config.startMonth = Number(firstDateArr[1]) - 1;
    }

    let count = 0;
    for (let i = this.#config.startYear; i <= this.#config.currentYear; ++i) {
      // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
      if (!this.#config.endYears.find((item) => item.name === i)) {
        // @ts-expect-error TS(2322): Type 'number' is not assignable to type 'never'.
        this.#config.endYears.push({ id: count, name: i });
        // @ts-expect-error TS(2322): Type 'number' is not assignable to type 'never'.
        this.#config.startYears.push({ id: count, name: i });
      }
      count++;
    }
    this.#config.selectedStartYear = count - 1;
    this.#config.selectedEndYear = count - 1;

    this.#config.months.forEach((item, index) => {
      // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
      if (!this.#config.startMonths.find((item) => item.id === index)) {
        // @ts-expect-error TS(2322): Type 'number' is not assignable to type 'never'.
        this.#config.startMonths.push({ id: index, name: item });
        // @ts-expect-error TS(2322): Type 'number' is not assignable to type 'never'.
        this.#config.endMonths.push({ id: index, name: item });
      }
    });

    let startMonthStr = this.#config.startMonth + 1;
    let endMonthStr = this.#config.currentMonth + 1;
    if (startMonthStr < 10) {
      // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
      startMonthStr = `0${startMonthStr}`;
    }
    if (endMonthStr < 10) {
      // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
      endMonthStr = `0${endMonthStr}`;
    }

    // @ts-expect-error TS(2554): Expected 3-4 arguments, but got 2.
    const statisticsTotalReq = await request.post('/api/creator/statistics', {
      first_month: `${this.#config.startYear}-${startMonthStr}-01T00:00:00.000Z`,
      second_month: `${this.#config.currentYear}-${endMonthStr}-01T00:00:00.000Z`
    });
    if (statisticsTotalReq.ok) {
      statisticsTotal = await statisticsTotalReq.json();
      this.setCardStatistics(statisticsTotal, 'total');
    }

    let currentMonthStr = this.#config.currentMonth + 1;
    if (currentMonthStr < 10) {
      // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
      currentMonthStr = `0${currentMonthStr}`;
    }

    // @ts-expect-error TS(2554): Expected 3-4 arguments, but got 2.
    const statisticsLastMonthReq = await request.post('/api/creator/statistics', {
      first_month: `${this.#config.currentYear}-${currentMonthStr}-01T00:00:00.000Z`,
      second_month: `${this.#config.currentYear}-${currentMonthStr}-01T00:00:00.000Z`
    });
    if (statisticsLastMonthReq.ok) {
      statisticsLastMonth = await statisticsLastMonthReq.json();
      this.setCardStatistics(statisticsLastMonth, 'interval');
    }

    const balanceReq = await request.get('/api/creator/balance');
    if (balanceReq.ok) {
      const balance = await balanceReq.json();
      if (balance) {
        this.#config.balance = balance;
      }
    }

    statistics.config = this.#config;
    statistics.render();
  }

  async getMoney(input: any) {
    const phoneNumber = input.phoneInput.value.trim().replace(/ /g, '').replace(/-/g, '');
    const money = input.sumInput.value.replace(/ /g, '');

    input.getMoneyErr.innerHTML = '';
    input.getPhoneErr.innerHTML = '';
    input.sumInput.style.backgroundColor = color.field;
    input.phoneInput.style.backgroundColor = color.field;

    const errMoney = isValidGetSum(money, input.balance);
    const errPhoneNumber = isValidPhone(phoneNumber);
    if (errMoney || errPhoneNumber) {
      if (errMoney) {
        input.getMoneyErr.innerHTML = errMoney;
        input.sumInput.style.backgroundColor = color.error;
      }
      if (errPhoneNumber) {
        input.getPhoneErr.innerHTML = errPhoneNumber;
        input.phoneInput.style.backgroundColor = color.error;
      }
    } else {
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
      const getMoneyReq = await request.put('/api/creator/transferMoney', {
        money: Number(money),
        phone_number: phoneNumber.substring(1),
      });
      if (getMoneyReq.ok) {
        input.getMoneyErr.innerHTML = 'Зачисление прошло успешно';
        this.renderStatistics();
      } else {
        input.getMoneyErr.innerHTML = 'Произошла ошибка. Пожалуйста повторите позже';
      }
    }
  }

  async showStatistics(input: any) {
    const startMonthSelected = Number(input.startMonth.value);
    const startYearSelected = Number(input.startYear.value);
    const endMonthSelected = Number(input.endMonth.value);
    const endYearSelected = Number(input.endYear.value);
    let statisticsInterval;
    const selectedErr = isValidSelectedDate({
      startMonthSelected,
      startYearSelected,
      endMonthSelected,
      endYearSelected,
      startMonth: this.#config.startMonth,
      startYear: this.#config.startYear,
      currentMonth: this.#config.currentMonth,
      currentYear: this.#config.currentYear,
    });

    if (selectedErr) {
      input.selectDateErr.innerHTML = selectedErr;
    } else {
      this.#config.selectedStartMonth = startMonthSelected;
      this.#config.selectedStartYear = startYearSelected;
      this.#config.selectedEndMonth = endMonthSelected;
      this.#config.selectedEndYear = endYearSelected;

      let startMonthSelectedStr = startMonthSelected + 1;
      let endMonthSelectedStr = endMonthSelected + 1;
      if (startMonthSelectedStr < 10) {
        // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
        startMonthSelectedStr = `0${startMonthSelectedStr}`;
      }
      if (endMonthSelectedStr < 10) {
        // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
        endMonthSelectedStr = `0${endMonthSelectedStr}`;
      }
      // @ts-expect-error TS(2554): Expected 3-4 arguments, but got 2.
      const statisticsIntervalReq = await request.post('/api/creator/statistics', {
        // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
        first_month: `${this.#config.startYears[startYearSelected].name}-${startMonthSelectedStr}-01T00:00:00.000Z`,
        // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
        second_month: `${this.#config.endYears[endYearSelected].name}-${endMonthSelectedStr}-01T00:00:00.000Z`
      });
      if (statisticsIntervalReq.ok) {
        statisticsInterval = await statisticsIntervalReq.json();
        this.setCardStatistics(statisticsInterval, 'interval');
      } else {
        input.selectDateErr.innerHTML = 'Произошла ошибка. Пожалуйста, повторите операцию позже';
      }

      statistics.config = this.#config;
      statistics.render();
    }
  }
}

export const statisticsStore = new StatisticsStore();
