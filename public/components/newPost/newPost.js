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

  render(serveAttachments = '') {
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'newPostDiv';
    newDiv.innerHTML = template(this.#config);
    this.#parent.appendChild(newDiv);
    if (serveAttachments) {
      this.config = [...serveAttachments, ...this.config];
    }
    if (this.config) {
      if (this.config.attachments.length > 0) {
        const divPreview = document.getElementById('preview');
        for (const attach of this.config.attachments) {
          let src = URL.createObjectURL(attach);
          if (attach.type.startsWith('image')) {
            const attachPreview = document.createElement('img');
            attachPreview.className = 'img-preview';
            attachPreview.src = src;
            attachPreview.style.display = 'block';
            divPreview.append(attachPreview);
          } else if (attach.type.startsWith('video')) {
            const attachPreview = document.createElement('video');
            attachPreview.className = 'video-preview';
            attachPreview.src = src;
            attachPreview.controls = true;
            attachPreview.style.display = 'block';
            divPreview.append(attachPreview);
          } else if (attach.type.startsWith('audio')) {
            const attachPreview = document.createElement('audio');
            attachPreview.className = 'audio-preview';
            attachPreview.src = src;
            attachPreview.controls = true;
            attachPreview.style.display = 'block';
            divPreview.append(attachPreview);
          }
        }
      }
    }

    const backBtn = document.getElementById('newpost-btn-back');
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      router.popstate();
    });

    const photoInput = document.querySelector('#attach-photo-download');
    photoInput.addEventListener('change', (event) => {
      event.preventDefault();
      const files = event.target.files;
      Actions.downloadAttach(files[0]);
    });

    const videoInput = document.querySelector('#attach-video-download');
    videoInput.addEventListener('change', (event) => {
      event.preventDefault();
      const files = event.target.files;
      Actions.downloadAttach(files[0]);
    });

    const audioInput = document.querySelector('#attach-music-download');
    audioInput.addEventListener('change', (event) => {
      event.preventDefault();
      const files = event.target.files;
      Actions.downloadAttach(files[0]);
    });
  }

  publish() {
    const titleInput = document.getElementById('newpost-title-input');
    const textInput = document.getElementById('newpost-text-input');
    const postBtn = document.getElementById('newpost-btn');
    const errorTitleOutput = document.getElementById('newpost-title-error');
    const errorTextOutput = document.getElementById('newpost-text-error');

    postBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // e.stopPropagation();
      if (this.config) {
        console.log('ACTION WITN ATTACH');
        Actions.createPost({
          attachments: this.config.attachments,
          titleInput,
          textInput,
          errorTitleOutput,
          errorTextOutput,
        });
      } else {
        console.log('ACTION WITNOUT ATTACH');
        Actions.createPost({
          titleInput,
          textInput,
          errorTitleOutput,
          errorTextOutput,
        });
      }
    });

    const form = document.getElementById('create-post');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('submit');
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
