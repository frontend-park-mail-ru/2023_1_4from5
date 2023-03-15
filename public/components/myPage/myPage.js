export class MyPage {
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
    const newDiv = document.createElement('div');
    newDiv.id = 'myPageDiv';
    const template = Handlebars.templates.myPage;
    newDiv.innerHTML = template(this.#config);
    this.#parent.appendChild(newDiv);
  }
}
