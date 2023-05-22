import { Actions } from '../../actions/actions';
import template from './statistics.handlebars';

const contentElement = document.querySelector('main');

class Statistics {
  #parent;

  #config;

  constructor(parent) {
    this.#parent = parent;
  }

  get config() {
    return this.#config;
  }

  set config(config) {
    this.#config = config;
  }

  render() {
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'statisticsDiv';
    newDiv.innerHTML = template(this.#config);
    this.#parent.appendChild(newDiv);

    const startMonth = document.getElementById('select_date__start_month');
    const startYear = document.getElementById('select_date__start_year');
    const endMonth = document.getElementById('select_date__end_month');
    const endYear = document.getElementById('select_date__end_year');
    console.log(endYear);

    startMonth.value = this.#config.selectedStartMonth;
    startYear.value = this.#config.selectedStartYear;
    endMonth.value = this.#config.selectedEndMonth;
    endYear.value = this.#config.selectedStartYear;
    console.log(endYear);

    const phoneInput = document.getElementById('get_money__phone');
    const sumInput = document.getElementById('get_money__sum');
    const getMoneyBtn = document.getElementById('get_money__button');
    const getMoneyErr = document.getElementById('get_money__err');

    getMoneyBtn.addEventListener('click', (event) => {
      event.preventDefault();
      Actions.getMoney({
        phoneInput,
        sumInput,
        getMoneyErr,
      });
    });

    const selectDateErr = document.getElementById('statistics__err');
    const showButton = document.getElementById('select_date__show_button');

    showButton.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('click', this.#config);
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
