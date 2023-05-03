import { Actions } from '../../actions/actions';
import { router } from '../../modules/Router';
import { newPostStore } from './newPostStore';
import { subLevels } from './levels';

// TODO (сделал минимальную валидацию на каждый файл < 5 Мб)
//  более лучшая валидация файлов (обработка 413 и общий размер)
// TODO сделать режим ожидания загрузки файлов

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
    this.#config = {};
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

    if (this.#config && this.#config.attachments) {
      const divPreview = document.getElementById('preview');
      let flag = false;

      this.#config.attachments.forEach((item) => {
        if (item.type.startsWith('image')) {
          const attachPreview = document.createElement('img');

          attachPreview.className = 'img-preview';
          attachPreview.id = item.id;
          attachPreview.src = `../../images/${item.id}.${item.type.split('/')[1]}`;
          // attachPreview.style.display = 'block';

          divPreview.append(attachPreview);
          flag = true;
        } else if (item.type.startsWith('video')) {
          const attachPreview = document.createElement('video');

          attachPreview.className = 'video-preview';
          attachPreview.id = item.id;
          attachPreview.src = `../../images/${item.id}.${item.type.split('/')[1]}`;
          attachPreview.controls = true;
          // attachPreview.style.display = 'block';

          divPreview.append(attachPreview);
          flag = true;
        } else if (item.type.startsWith('audio')) {
          const attachPreview = document.createElement('audio');

          attachPreview.className = 'audio-preview';
          attachPreview.id = item.id;
          attachPreview.src = `../../images/${item.id}.${item.type.split('/')[1]}`;
          attachPreview.controls = true;
          // attachPreview.style.display = 'block';

          divPreview.append(attachPreview);
          flag = true;
        }
        if (flag) {
          const deleteAttachBtn = document.createElement('img');
          deleteAttachBtn.id = `delete#${item.id}`;
          deleteAttachBtn.className = 'delete-icon';
          deleteAttachBtn.src = '../../images/delete.svg';

          deleteAttachBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const id = event.target.id.split('#')[1];
            // eslint-disable-next-line max-len
            const deletedAttach = this.#config.attachments.findIndex((attach) => attach.id === id);
            // this.#config.attachments.split(deletedAttach).join();
            this.#config.attachments.splice(deletedAttach, 1);

            const deletedAttachDOM = document.getElementById(id);
            deletedAttachDOM.remove();
            event.target.remove();
          });

          divPreview.append(deleteAttachBtn);
        }
      });
    }

    const backBtn = document.getElementById('newpost-btn-back');
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      router.popstate();
    });

    const photoInput = document.querySelector('#attach-photo-download');
    photoInput.addEventListener('change', (event) => {
      this.addAttachListener(event, 'img');
    });

    const videoInput = document.querySelector('#attach-video-download');
    videoInput.addEventListener('change', (event) => {
      this.addAttachListener(event, 'video');
    });

    const audioInput = document.querySelector('#attach-music-download');
    audioInput.addEventListener('change', (event) => {
      this.addAttachListener(event, 'audio');
    });

    const levelAll = document.getElementById('switch__level--all');
    const levelSubsOnly = document.getElementById('switch__level--subs-only');

    levelAll.addEventListener('click', (event) => {
      event.preventDefault();
      this.#switch.all = true;
      this.#switch.subsOnly = false;
      const imgLevelAll = levelAll.querySelector('#switch__img--all');
      imgLevelAll.src = '../../images/radio-active.svg';
      const imgLevelSubOnly = levelSubsOnly.querySelector('#switch__img--subs-only');
      imgLevelSubOnly.src = '../../images/radio-inactive.svg';
      subLevels.remove();
    });

    levelSubsOnly.addEventListener('click', (event) => {
      event.preventDefault();
      this.#switch.all = false;
      this.#switch.subsOnly = true;
      const imgLevelAll = levelAll.querySelector('#switch__img--all');
      imgLevelAll.src = '../../images/radio-inactive.svg';
      const imgLevelSubOnly = levelSubsOnly.querySelector('#switch__img--subs-only');
      imgLevelSubOnly.src = '../../images/radio-active.svg';
      subLevels.render(levels);
    });
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

      Actions.createPost({
        attachments: this.#config.attachments,
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

    const availableSubscriptions = [];

    titleInput.value = title;
    textInput.textContent = text;
    postBtn.textContent = 'Готово';

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
        attachments: this.#config.attachments,
        titleInput,
        textInput,
        errorTitleOutput,
        errorTextOutput,
        availableSubscriptions,
      });
    });
  }

  addAttachListener(event, type) {
    event.preventDefault();
    const files = event.target.files[0];

    const errOutput = document.getElementById('newpost-attachments-error');
    if (files.size > 5242800) {
      errOutput.innerHTML = 'Размер файла превышает допустимый предел и не может быть сохранен';
      return;
    }

    errOutput.innerHTML = '';
    if (this.#config && this.#config.attachments) {
      this.#config.attachments.push(files);
    } else {
      this.#config = {
        attachments: [files],
      };
    }

    const divPreview = document.getElementById('preview');
    const container = document.createElement('div');
    container.style.display = 'inline-block';
    container.className = 'attach-container';
    // container.style.verticalAlign = 'top';

    const attachPreview = document.createElement(type);
    const src = URL.createObjectURL(files);
    attachPreview.className = `${type}-preview`;
    attachPreview.src = src;
    attachPreview.id = files.name;
    if (type !== 'img') {
      attachPreview.controls = true;
    }
    // attachPreview.style.display = 'block';

    const deleteAttachBtn = this.addAttachDeleteBtn(files.name);

    divPreview.append(container);
    container.append(attachPreview, deleteAttachBtn);
  }

  addAttachDeleteBtn(attachName) {
    const deleteAttachBtn = document.createElement('img');
    deleteAttachBtn.id = `delete#${attachName}`;
    deleteAttachBtn.className = 'delete-icon';
    deleteAttachBtn.src = '../../images/delete.svg';

    deleteAttachBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const name = event.target.id.split('#')[1];
      const deletedAttach = this.#config.attachments.findIndex((attach) => attach.name === name);
      // this.#config.attachments.split(deletedAttach).join();
      this.#config.attachments.splice(deletedAttach, 1);

      const deletedAttachDOM = document.getElementById(name);
      deletedAttachDOM.remove();
      event.target.remove();
    });
    return deleteAttachBtn;
  }
  func () {
    const deleteAttachBtn = document.createElement('img');
    deleteAttachBtn.id = `delete#${item.id}`;
    deleteAttachBtn.className = 'delete-icon';
    deleteAttachBtn.src = '../../images/delete.svg';

    deleteAttachBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const id = event.target.id.split('#')[1];
      // eslint-disable-next-line max-len
      const deletedAttach = this.#config.attachments.findIndex((attach) => attach.id === id);
      // this.#config.attachments.split(deletedAttach).join();
      this.#config.attachments.splice(deletedAttach, 1);

      const deletedAttachDOM = document.getElementById(id);
      deletedAttachDOM.remove();
      event.target.remove();
    });
  }
}

export const newPost = new NewPost(contentElement);

// TODO чтобы можно было вставлять аттачи прямо в input поле, нужно заменить textarea на следующее:
//  <div class="newpost-text-input-container" contenteditable="true">
