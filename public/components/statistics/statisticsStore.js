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
        card_icon: 'user_photo.png',
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
        card_icon: 'user_photo.png',
        count: 0,
        description: 'подписчиков',
      },
      {
        name: 'new_followers',
        card_icon: 'user_photo.png',
        count: 0,
        description: 'наблюдателей',
      },
      {
        name: 'posts_per_month',
        card_icon: 'user_photo.png',
        count: 0,
        description: 'постов',
      },
      {
        name: 'likes_count',
        card_icon: 'user_photo.png',
        count: 0,
        description: 'лайков',
      },
      {
        name: 'comments_count',
        card_icon: 'user_photo.png',
        count: 0,
        description: 'комментариев',
      },
      {
        name: 'donations_count',
        card_icon: 'user_photo.png',
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
    this.#config.starMonth = now.getMonth();
    this.#config.startYear = now.getFullYear();
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
      console.log('123123123123');
      statisticsTotal = await statisticsTotalReq.json();
      console.log(statisticsTotal);
      this.setCardStatistics(statisticsTotal, 'total');
    }
    // this.setCardStatistics({
    //   creator_id: '10b0d1b8-0e67-4e7e-9f08-124b3e32cce4',
    //   posts_per_month: 1,
    //   subscriptions_bought: 1,
    //   donations_count: 5,
    //   money_from_donations: 4,
    //   money_from_subscriptions: 3,
    //   new_followers: 2,
    //   likes_count: 6,
    //   comments_count: 7
    // }, 'total');

    // TODO сделать проверку на <>10 (если меньше, прикастовать 0
    const statisticsLastMonthReq = await request.post('/api/creator/statistics', {
      first_month: `${this.#config.currentYear}-0${this.#config.currentMonth + 1}-01T00:00:00.000Z`,
      second_month: `${this.#config.currentYear}-0${this.#config.currentMonth + 1}-01T00:00:00.000Z`
    });
    if (statisticsLastMonthReq.ok) {
      statisticsLastMonth = await statisticsLastMonthReq.json();
      this.setCardStatistics(statisticsLastMonth, 'interval');
    }

    // this.setCardStatistics({
    //   creator_id: '10b0d1b8-0e67-4e7e-9f08-124b3e32cce4',
    //   posts_per_month: 3,
    //   subscriptions_bought: 1,
    //   donations_count: 6,
    //   money_from_donations: 8,
    //   money_from_subscriptions: 7,
    //   new_followers: 2,
    //   likes_count: 4,
    //   comments_count: 5
    // }, 'interval');
    //
    // 2023-03-18T21:54:42.123Z

    // {
    //   "creator_id": "10b0d1b8-0e67-4e7e-9f08-124b3e32cce4",
    //     "posts_per_month": 8,
    //     "subscriptions_bought": 0,
    //     "donations_count": 0,
    //     "money_from_donations": 0,
    //     "money_from_subscriptions": 0,
    //     "new_followers": 0,
    //     "likes_count": 0,
    //     "comments_count": 0
    // }

    const balanceReq = await request.get('/api/creator/balance');
    if (balanceReq.ok) {
      const balance = await balanceReq.json();
      if (balance) {
        this.#config.balance = balance;
      }
    }

    console.log('store', this.#config);
    statistics.config = this.#config;
    statistics.render();
  }

  async getMoney(input) {
  //    phoneInput,
    //         sumInput,
    //         getMoneyErr,
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
}

export const statisticsStore = new StatisticsStore();
