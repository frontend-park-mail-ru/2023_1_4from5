import { Actions } from '../../actions/actions';
import { router } from '../../modules/Router';

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
    console.log('store1', this.config);
    // console.log('store2', this.config);
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'newPostDiv';
    newDiv.innerHTML = template(this.#config);
    this.#parent.appendChild(newDiv);
    console.log('store3', this.config);

    if (this.config) {
      if (this.config.attachments) {
        console.log('store2', this.config.attachments);
        const divPreview = document.getElementById('preview');
        console.log(divPreview);
        for (const groupAttach in this.config.attachments) {
          console.log(groupAttach, this.config.attachments[groupAttach]);
          for (const attach of this.config.attachments[groupAttach]) {
            console.log('1');
            console.log('11111', attach, groupAttach);
            let src = URL.createObjectURL(attach);
            const attachPreview = document.createElement(groupAttach);
            attachPreview.className = `${groupAttach}-preview`;
            console.log(src, attachPreview);
            attachPreview.src = src;
            attachPreview.controls = true;
            attachPreview.style.display = 'block';
            divPreview.append(attachPreview);
          }
        }
      }
      console.log('store2.1', this.config);
    }

    const backBtn = document.getElementById('newpost-btn-back');
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      router.popstate();
    });

    const photoInput = document.querySelector('#attach-photo-download');
    photoInput.addEventListener('change', (event) => {
      console.log('add change input file');
      event.preventDefault();
      const files = event.target.files;
      console.log('add change photo', files);
      Actions.downloadAttach(files[0]);
    });

    const videoInput = document.querySelector('#attach-video-download');
    videoInput.addEventListener('change', (event) => {
      event.preventDefault();
      const files = event.target.files;
      console.log('video', files);
      Actions.downloadAttach(files[0]);
    });

    const audioInput = document.querySelector('#attach-music-download');
    audioInput.addEventListener('change', (event) => {
      event.preventDefault();
      const files = event.target.files;
      console.log('music', files);
      Actions.downloadAttach(files[0]);
    });
  }

  // TODO в чём проблем засунуть это в рендер?
  publish() {
    const titleInput = document.getElementById('newpost-title-input');
    const textInput = document.getElementById('newpost-text-input');
    const postBtn = document.getElementById('newpost-btn');
    const errorTitleOutput = document.getElementById('newpost-title-error');
    const errorTextOutput = document.getElementById('newpost-text-error');

    postBtn.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.createPost({
        titleInput,
        textInput,
        errorTitleOutput,
        errorTextOutput,
      });
    });
  }

  update(postId, title, text) {
    const titleInput = document.getElementById('newpost-title-input');
    const textInput = document.getElementById('newpost-text-input');
    const postBtn = document.getElementById('newpost-btn');
    const errorTitleOutput = document.getElementById('newpost-title-error');
    const errorTextOutput = document.getElementById('newpost-text-error');

    titleInput.textContent = title;
    textInput.textContent = text;
    postBtn.textContent = 'готово';

    postBtn.addEventListener('click', (e) => {
      e.preventDefault();
      Actions.updatePost(postId, {
        titleInput,
        textInput,
        errorTitleOutput,
        errorTextOutput,
      });
    });
  }
}

export const newPost = new NewPost(contentElement);

// TODO чтобы можно было вставлять аттачи прямо в input поле, нужно заменить textarea на следующее:
//  <div class="newpost-text-input-container" contenteditable="true">

// TODO указать, какие именно расширения доступны и правильно подставлять их (из запросов брать)

// {{#if (isVideo file.type)}}
// <video id="video" width="500" src="../../images/video_test.mp4" controls></video>
// {{/if}}
//   {{#if (isAudio file.type)}}
//   <audio id="audio" src="../../images/music_test.mp3" controls></audio>
//   {{/if}}
