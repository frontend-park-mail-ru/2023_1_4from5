import { clickHandler } from '../../modules/handler.js';

const rootElement = document.getElementById('root');
const sideBarElement = document.createElement('sideBar');
rootElement.appendChild(sideBarElement);
// console.log('create sideBar tag');

export class SideBar {
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
    // console.log('inside view, renderSideBar');
    const lastSideBar = document.getElementById('sidebarDiv');
    if (lastSideBar) {
      lastSideBar.remove();
    }
    const newDiv = document.createElement('div');
    newDiv.id = 'sidebarDiv';
    const template = Handlebars.templates.sideBar;
    newDiv.innerHTML = template(this.#config);

    this.#parent.addEventListener('click', (event) => {
      clickHandler(event, this.#config.general, this.#config);
    });
    this.#parent.appendChild(newDiv);
  }
}

export const sideBar = new SideBar(sideBarElement);
