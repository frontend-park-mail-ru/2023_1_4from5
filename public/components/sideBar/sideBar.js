import { clickHandler } from '../../modules/handler.js';
import { Actions } from '../../actions/actions';
import { router } from '../../modules/Router';
import { URLS } from '../../modules/Notifier';

const template = require('./sideBar.handlebars');

const sideBarElement = document.querySelector('sideBar');

export class SideBar {
  #parent;

  #config;

  constructor(parent) {
    this.#parent = parent;
    const handler = (event) => {
      clickHandler(event, this.#config);
    };
    this.#parent.addEventListener('click', handler);
  }

  get config() {
    return this.#config;
  }

  set config(config) {
    this.#config = config;
  }

  render() {
    const lastSideBar = document.getElementById('sidebarDiv');
    if (lastSideBar) {
      lastSideBar.remove();
    }
    const newDiv = document.createElement('div');
    newDiv.id = 'sidebarDiv';
    newDiv.innerHTML = template(this.#config);

    this.#parent.appendChild(newDiv);

    const logoBtn = document.getElementById('logo');
    logoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      router.go(URLS.root);
    });
  }
}

export const sideBar = new SideBar(sideBarElement);
