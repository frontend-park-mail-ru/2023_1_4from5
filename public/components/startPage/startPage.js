const template = require('./startPage.handlebars');

const rootElement = document.getElementById('root');
const sideBarElement = document.createElement('sideBar');
rootElement.appendChild(sideBarElement);
const contentElement = document.createElement('main');
rootElement.appendChild(contentElement);

export class StartPage {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  render() {
    const newDiv = document.createElement('div');
    newDiv.id = 'startPageDiv';
    newDiv.innerHTML = template();
    this.#parent.appendChild(newDiv);
  }
}

export const startPage = new StartPage(contentElement);
