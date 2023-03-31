const rootElement = document.getElementById('root');
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
    const template = Handlebars.templates.startPage;
    newDiv.innerHTML = template();
    this.#parent.appendChild(newDiv);
  }
}

export const startPage = new StartPage(contentElement);
