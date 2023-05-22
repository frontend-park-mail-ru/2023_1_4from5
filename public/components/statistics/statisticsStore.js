import { dispatcher } from '../../dispatcher/dispatcher';
import { statistics } from './statistics';
import { request } from '../../modules/request';
import { ActionTypes } from '../../actionTypes/actionTypes';

class StatisticsStore {
  #config = {
    balance: 0,
    starMonth: 0,
    startYear: 0,
    currentMonth: 0,
    currentYear: 0,
    selectedStarMonth: 0,
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

  async reduce(action) {
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

  setCardStatistics(input, type) {
    let propConfig;
    let moneyAll;
    let moneyPart;
    if (type === 'total') {
      for (let prop in input) {
        if (prop === 'money_from_donations' || prop === 'money_from_subscriptions') {
          moneyPart = this.#config.statisticsTotalListMoney.find((item) => item.name === prop);
          moneyPart.count = input[prop];
        }
        if (prop === 'subscriptions_bought' || prop === 'new_followers') {
          let propConfig = this.#config.statisticsTotalList.find((item) => item.name === prop);
          propConfig.count = input[prop];
        }
      }
      moneyAll = this.#config.statisticsTotalListMoney.find((item) => item.name === 'money_all');
      moneyAll.count = Number(input.money_from_donations) + Number(input.money_from_subscriptions);
    } else if (type === 'interval') {
      for (let prop in input) {
        if (prop === 'money_from_donations' || prop === 'money_from_subscriptions') {
          moneyPart = this.#config.statisticsIntervalListMoney.find((item) => item.name === prop);
          moneyPart.count = input[prop];
        }
        if (prop === 'subscriptions_bought' || prop === 'new_followers' || prop === 'posts_per_month'
            || prop === 'donations_count' || prop === 'likes_count' || prop === 'comments_count') {
          propConfig = this.#config.statisticsIntervalList.find((item) => item.name === prop);
          propConfig.count = input[prop];
        }
      }
      moneyAll = this.#config.statisticsIntervalListMoney.find((item) => item.name === 'money_all');
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
      this.#config.starMonth = Number(firstDateArr[1]) - 1;
    }

    let count = 0;
    for (let i = this.#config.startYear; i <= this.#config.currentYear; ++i) {
      if (!this.#config.endYears.find((item) => item.name === i)) {
        this.#config.endYears.push({ id: count, name: i });
        this.#config.startYears.push({ id: count, name: i });
      }
      count++;
    }
    this.#config.selectedStartYear = count - 1;
    this.#config.selectedEndYear = count - 1;

    this.#config.months.forEach((item, index) => {
      if (!this.#config.startMonths.find((item) => item.id === index)) {
        this.#config.startMonths.push({ id: index, name: item });
        this.#config.endMonths.push({ id: index, name: item });
      }
    });

    const statisticsTotalReq = await request.post('/api/creator/statistics', {
      first_month: `${this.#config.startYear}-0${this.#config.starMonth + 1}-01T00:00:00.000Z`,
      second_month: `${this.#config.currentYear}-0${this.#config.currentMonth + 1}-01T00:00:00.000Z`
    });
    if (statisticsTotalReq.ok) {
      statisticsTotal = await statisticsTotalReq.json();
      this.setCardStatistics(statisticsTotal, 'total');
    }

    // TODO сделать проверку на <>10 (если меньше, прикастовать 0
    const statisticsLastMonthReq = await request.post('/api/creator/statistics', {
      first_month: `${this.#config.currentYear}-0${this.#config.currentMonth + 1}-01T00:00:00.000Z`,
      second_month: `${this.#config.currentYear}-0${this.#config.currentMonth + 1}-01T00:00:00.000Z`
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

  async getMoney(input) {
    const phoneNumber = input.phoneInput.value;
    const money = Number(input.sumInput.value);
    const getMoneyReq = await request.put('/api/creator/transferMoney', {
      money: money,
      phone_number: phoneNumber
    });
    if (getMoneyReq.ok) {
      input.getMoneyErr.innerHTML = 'Зачисление прошло успешно :)';
      this.renderStatistics();
    } else {
      input.getMoneyErr.innerHTML = 'Произошла ошибка. Пожалуйста повторите позже :(';
    }
  }

  async showStatistics(input) {
    const startMonth = Number(input.startMonth.value);
    const startYear = Number(input.startYear.value);
    const endMonth = Number(input.endMonth.value);
    const endYear = Number(input.endYear.value);
    let statisticsInterval;
    this.#config.selectedStartMonth = startMonth;
    this.#config.selectedStartYear = startYear;
    this.#config.selectedEndMonth = endMonth;
    this.#config.selectedEndYear = endYear;

    const statisticsIntervalReq = await request.post('/api/creator/statistics', {
      first_month: `${this.#config.startYears[startYear].name}-0${startMonth + 1}-01T00:00:00.000Z`,
      second_month: `${this.#config.endYears[endYear].name}-0${endMonth + 1}-01T00:00:00.000Z`
    });
    if (statisticsIntervalReq.ok) {
      statisticsInterval = await statisticsIntervalReq.json();
      this.setCardStatistics(statisticsInterval, 'interval');
    }

    statistics.config = this.#config;
    statistics.render();
  }
}

export const statisticsStore = new StatisticsStore();
