// @ts-expect-error TS(2307): Cannot find module './startPage.handlebars' or its... Remove this comment to see the full error message
import template from './startPage.handlebars';

const rootElement = document.getElementById('root');
const sideBarElement = document.createElement('sideBar');
// @ts-expect-error TS(2531): Object is possibly 'null'.
rootElement.appendChild(sideBarElement);
const contentElement = document.createElement('main');
// @ts-expect-error TS(2531): Object is possibly 'null'.
rootElement.appendChild(contentElement);

export class StartPage {
  #parent;

  constructor(parent: any) {
    this.#parent = parent;
  }

  render() {
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'startPageDiv';
    newDiv.innerHTML = template();
    this.#parent.appendChild(newDiv);
  }
}

export const startPage = new StartPage(contentElement);
