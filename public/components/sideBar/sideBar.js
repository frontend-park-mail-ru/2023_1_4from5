import { clickHandler } from '../../modules/handler.js';

const template = require('./sideBar.handlebars');

const rootElement = document.getElementById('root');
const sideBarElement = document.createElement('sideBar');
rootElement.appendChild(sideBarElement);

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
    // const template = templates.sideBar;
    newDiv.innerHTML = template(this.#config);

    this.#parent.appendChild(newDiv);
  }
}

export const sideBar = new SideBar(sideBarElement);
