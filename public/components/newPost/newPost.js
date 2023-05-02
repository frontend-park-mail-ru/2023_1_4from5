import { Actions } from '../../actions/actions';
import { router } from '../../modules/Router';
import * as events from 'events';
import { newPostStore } from './newPostStore';

const template = require('./newPost.handlebars');

const contentElement = document.querySelector('main');

class NewPost {
  #parent;

  #config;

  #levels;

  #switch = {
    all: true,
    subsOnly: false,
    subsOrPaid: false,
    paidOnly: false,
  };

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

  render(levels, serveAttachments = '') {
    levels.switch = this.#switch;

    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'newPostDiv';
    newDiv.innerHTML = template(levels);
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

    const levelAll = document.getElementById('switch__level--all');
    const levelSubsOnly = document.getElementById('switch__level--subs-only');
    levelAll.addEventListener('click', (event) => {
      event.preventDefault();
      this.#switch.all = true;
      this.#switch.subsOnly = false;
      newPostStore.renderNewPost();
    });

    levelSubsOnly.addEventListener('click', (event) => {
      event.preventDefault();
      this.#switch.all = false;
      this.#switch.subsOnly = true;
      newPostStore.renderNewPost();
    });

    const subs = document.querySelectorAll('.sub__level');
    if (subs) {
      for (let index = 0; index < subs.length; index++) {
        const sub = subs[index];
        sub.addEventListener('click', (event) => {
          event.preventDefault();
          const radio = sub.querySelector('#sub__level--radio');
          if (radio.classList.contains('sub__level--inactive')) {
            radio.classList.remove('sub__level--inactive');
            radio.classList.add('sub__level--active');
            radio.src = '../../images/radio-active.svg';
          } else if (radio.classList.contains('sub__level--active')) {
            radio.classList.remove('sub__level--active');
            radio.classList.add('sub__level--inactive');
            radio.src = '../../images/radio-inactive.svg';
          }
        });
      }
    }
  }

  publish() {
    const titleInput = document.getElementById('newpost-title-input');
    const textInput = document.getElementById('newpost-text-input');
    const postBtn = document.getElementById('newpost-btn');
    const errorTitleOutput = document.getElementById('newpost-title-error');
    const errorTextOutput = document.getElementById('newpost-text-error');

    const availableSubscriptions = [];

    postBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const subs = document.querySelectorAll('.sub__level');
      if (subs) {
        for (let index = 0; index < subs.length; index++) {
          const sub = subs[index];
          const radio = sub.querySelector('#sub__level--radio');
          if (radio.classList.contains('sub__level--active')) {
            availableSubscriptions.push(sub.id);
          }
        }
      }

      if (this.config) {
        console.log('ACTION WITN ATTACH');
        Actions.createPost({
          attachments: this.config.attachments,
          titleInput,
          textInput,
          errorTitleOutput,
          errorTextOutput,
          availableSubscriptions,
        });
      } else {
        console.log('ACTION WITNOUT ATTACH');
        Actions.createPost({
          titleInput,
          textInput,
          errorTitleOutput,
          errorTextOutput,
          availableSubscriptions,
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

    const availableSubscriptions = [];

    titleInput.value = title;
    textInput.textContent = text;
    postBtn.textContent = 'готово';

    postBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const subs = document.querySelectorAll('.sub__level');
      if (subs) {
        for (let index = 0; index < subs.length; index++) {
          const sub = subs[index];
          const radio = sub.querySelector('#sub__level--radio');
          if (radio.classList.contains('sub__level--active')) {
            availableSubscriptions.push(sub.id);
          }
        }
      }

      Actions.updatePost(postId, {
        titleInput,
        textInput,
        errorTitleOutput,
        errorTextOutput,
        availableSubscriptions,
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
