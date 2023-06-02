import { Actions } from '../../actions/actions';
// @ts-expect-error TS(2307): Cannot find module './statistics.handlebars' or it... Remove this comment to see the full error message
import template from './statistics.handlebars';

const contentElement = document.querySelector('main');

class Statistics {
  #parent;

  // @ts-expect-error TS(7008): Member '#config' implicitly has an 'any' type.
  #config;

  constructor(parent: any) {
    this.#parent = parent;
  }

  get config() {
    return this.#config;
  }

  set config(config) {
    this.#config = config;
  }

  render() {
    this.#config.statisticsIntervalListMoney.forEach((e: any) => {
      e.count = Number(e.count.toFixed(2));
    });

    this.#config.statisticsTotalListMoney.forEach((e: any) => {
      e.count = Number(e.count.toFixed(2));
    });

    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'statisticsDiv';
    newDiv.innerHTML = template(this.#config);
    this.#parent.appendChild(newDiv);

    const startMonth = document.getElementById('select_date__start_month');
    const startYear = document.getElementById('select_date__start_year');
    const endMonth = document.getElementById('select_date__end_month');
    const endYear = document.getElementById('select_date__end_year');

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    startMonth.value = this.#config.selectedStartMonth;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    startYear.value = this.#config.selectedStartYear;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    endMonth.value = this.#config.selectedEndMonth;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    endYear.value = this.#config.selectedStartYear;

    const phoneInput = document.getElementById('get_money__phone');
    const sumInput = document.getElementById('get_money__sum');
    const getMoneyBtn = document.getElementById('get_money__button');
    const getMoneyErr = document.getElementById('get_money__err');
    const getPhoneErr = document.getElementById('get_phone__err');

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    getMoneyBtn.addEventListener('click', (event) => {
      event.preventDefault();
      Actions.getMoney({
        balance: this.#config.balance,
        phoneInput,
        sumInput,
        getMoneyErr,
        getPhoneErr,
      });
    });

    const selectDateErr = document.getElementById('select_date__err');
    const showButton = document.getElementById('select_date__show_button');

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    showButton.addEventListener('click', (event) => {
      event.preventDefault();
      Actions.showStatistics({
        startMonth,
        startYear,
        endMonth,
        endYear,
        selectDateErr,
      });
    });
  }
}

export const statistics = new Statistics(contentElement);
