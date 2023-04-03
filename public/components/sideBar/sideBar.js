import { clickHandler } from '../../modules/handler.js';

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
    const template = Handlebars.templates.sideBar;
    newDiv.innerHTML = template(this.#config);

    this.#parent.appendChild(newDiv);
  }
}

export const sideBar = new SideBar(sideBarElement);
