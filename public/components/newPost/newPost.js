import { Actions } from '../../actions/auth';

const template = require('./newPost.handlebars');

const contentElement = document.querySelector('main');

class NewPost {
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

  getParent() {
    return this.#parent;
  }

  render() {
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'newPostDiv';
    newDiv.innerHTML = template(this.#config);
    this.#parent.appendChild(newDiv);
  }

  publish() {
    const titleInput = document.getElementById('newpost-title-input');
    const textInput = document.getElementById('newpost-text-input');
    const postBtn = document.getElementById('newpost-btn');

    postBtn.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.createPost({
        titleInput,
        textInput,
      });
    });
  }
}

export const newPost = new NewPost(contentElement);
