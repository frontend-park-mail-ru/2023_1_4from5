import { Actions } from '../../actions/actions';
import { router } from '../../modules/Router';
import { subLevels } from './levels';
import { URLS } from '../../modules/Notifier';

// TODO (сделал минимальную валидацию на каждый файл < 5 Мб)
//  более лучшая валидация файлов (обработка 413 и общий размер)
// TODO сделать режим ожидания загрузки файлов

// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const template = require('./newPost.handlebars');

const contentElement = document.querySelector('main');

class NewPost {
  #parent;

  #config;

  #switch = {
    all: true,
    subsOnly: false,
    subsOrPaid: false,
    paidOnly: false,
  };

  constructor(parent: any) {
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

  render(levels: any) {
    levels.switch = this.#switch;

    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'newPostDiv';
    newDiv.innerHTML = template(levels);
    this.#parent.appendChild(newDiv);

    // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
    if (this.#config && this.#config.attachments) {
      const divPreview = document.getElementById('preview');
      let flag = false;

      // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
      this.#config.attachments.forEach((item: any) => {
        if (item.type.startsWith('image')) {
          const attachPreview = document.createElement('img');

          attachPreview.className = 'img-preview';
          attachPreview.id = item.id;
          attachPreview.src = `../../images/user/${item.id}.${item.type.split('/')[1]}`;

          // @ts-expect-error TS(2531): Object is possibly 'null'.
          divPreview.append(attachPreview);
          flag = true;
        } else if (item.type.startsWith('video')) {
          const attachPreview = document.createElement('video');

          attachPreview.className = 'video-preview';
          attachPreview.id = item.id;
          attachPreview.src = `../../images/user/${item.id}.${item.type.split('/')[1]}`;
          attachPreview.controls = true;

          // @ts-expect-error TS(2531): Object is possibly 'null'.
          divPreview.append(attachPreview);
          flag = true;
        } else if (item.type.startsWith('audio')) {
          const attachPreview = document.createElement('audio');

          attachPreview.className = 'audio-preview';
          attachPreview.id = item.id;
          attachPreview.src = `../../images/user/${item.id}.mp3`;
          attachPreview.controls = true;

          // @ts-expect-error TS(2531): Object is possibly 'null'.
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
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            const id = event.target.id.split('#')[1];
            // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
            const deletedAttach = this.#config.attachments.findIndex((attach: any) => attach.id === id);
            // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
            this.#config.attachments.splice(deletedAttach, 1);

            const deletedAttachDOM = document.getElementById(id);
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            deletedAttachDOM.remove();
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            event.target.remove();
          });

          // @ts-expect-error TS(2531): Object is possibly 'null'.
          divPreview.append(deleteAttachBtn);
        }
      });
    }

    const backBtn = document.getElementById('newpost-btn-back');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
      router.go(URLS.myPage);
    });

    const photoInput = document.querySelector('#attach-photo-download');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    photoInput.addEventListener('change', (event) => {
      this.addAttachListener(event, 'img');
    });

    const videoInput = document.querySelector('#attach-video-download');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    videoInput.addEventListener('change', (event) => {
      this.addAttachListener(event, 'video');
    });

    const audioInput = document.querySelector('#attach-music-download');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    audioInput.addEventListener('change', (event) => {
      this.addAttachListener(event, 'audio');
    });

    const levelAll = document.getElementById('switch__level--all');
    const levelSubsOnly = document.getElementById('switch__level--subs-only');

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    levelAll.addEventListener('click', (event) => {
      event.preventDefault();
      this.#switch.all = true;
      this.#switch.subsOnly = false;
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const imgLevelAll = levelAll.querySelector('#switch__img--all');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      imgLevelAll.src = '../../images/radio-active.svg';
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const imgLevelSubOnly = levelSubsOnly.querySelector('#switch__img--subs-only');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      imgLevelSubOnly.src = '../../images/radio-inactive.svg';
      subLevels.remove();
    });

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    levelSubsOnly.addEventListener('click', (event) => {
      event.preventDefault();
      this.#switch.all = false;
      this.#switch.subsOnly = true;
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const imgLevelAll = levelAll.querySelector('#switch__img--all');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      imgLevelAll.src = '../../images/radio-inactive.svg';
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const imgLevelSubOnly = levelSubsOnly.querySelector('#switch__img--subs-only');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
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

    const availableSubscriptions: any = [];

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    postBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const subs = document.querySelectorAll('.sub__level');
      if (subs) {
        for (let index = 0; index < subs.length; index++) {
          const sub = subs[index];
          const radio = sub.querySelector('#sub__level--radio');
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          if (radio.classList.contains('sub__level--active')) {
            availableSubscriptions.push(sub.id);
          }
        }
      }

      Actions.createPost({
        // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
        attachments: this.#config.attachments,
        titleInput,
        textInput,
        errorTitleOutput,
        errorTextOutput,
        availableSubscriptions,
      });
    });
  }

  update(postId: any, title: any, text: any) {
    const titleInput = document.getElementById('newpost-title-input');
    const textInput = document.getElementById('newpost-text-input');
    const postBtn = document.getElementById('newpost-btn');
    const errorTitleOutput = document.getElementById('newpost-title-error');
    const errorTextOutput = document.getElementById('newpost-text-error');

    const availableSubscriptions: any = [];

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    titleInput.value = title;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    textInput.textContent = text;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    postBtn.textContent = 'Готово';

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    postBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const subs = document.querySelectorAll('.sub__level');
      if (subs) {
        for (let index = 0; index < subs.length; index++) {
          const sub = subs[index];
          const radio = sub.querySelector('#sub__level--radio');
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          if (radio.classList.contains('sub__level--active')) {
            availableSubscriptions.push(sub.id);
          }
        }
      }

      Actions.updatePost(postId, {
        // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
        attachments: this.#config.attachments,
        titleInput,
        textInput,
        errorTitleOutput,
        errorTextOutput,
        availableSubscriptions,
      });
    });
  }

  addAttachListener(event: any, type: any) {
    event.preventDefault();
    const files = event.target.files[0];

    const errOutput = document.getElementById('newpost-attachments-error');
    if (files.size > 5242800) {
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      errOutput.innerHTML = 'Размер файла превышает допустимый предел и не может быть сохранен';
      return;
    }

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    errOutput.innerHTML = '';
    // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
    if (this.#config && this.#config.attachments) {
      // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
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

    const attachPreview = document.createElement(type);
    const src = URL.createObjectURL(files);
    attachPreview.className = `${type}-preview`;
    attachPreview.src = src;
    attachPreview.id = files.name;
    if (type !== 'img') {
      attachPreview.controls = true;
    }

    const deleteAttachBtn = this.addAttachDeleteBtn(files.name);

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    divPreview.append(container);
    container.append(attachPreview, deleteAttachBtn);
  }

  addAttachDeleteBtn(attachName: any) {
    const deleteAttachBtn = document.createElement('img');
    deleteAttachBtn.id = `delete#${attachName}`;
    deleteAttachBtn.className = 'delete-icon';
    deleteAttachBtn.src = '../../images/delete.svg';

    deleteAttachBtn.addEventListener('click', (event) => {
      event.preventDefault();
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const name = event.target.id.split('#')[1];
      // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
      const deletedAttach = this.#config.attachments.findIndex((attach: any) => attach.name === name);
      // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
      this.#config.attachments.splice(deletedAttach, 1);

      const deletedAttachDOM = document.getElementById(name);
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      deletedAttachDOM.remove();
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      event.target.remove();
    });
    return deleteAttachBtn;
  }

  func() {
    const deleteAttachBtn = document.createElement('img');
    // @ts-expect-error TS(2304): Cannot find name 'item'.
    deleteAttachBtn.id = `delete#${item.id}`;
    deleteAttachBtn.className = 'delete-icon';
    deleteAttachBtn.src = '../../images/delete.svg';

    deleteAttachBtn.addEventListener('click', (event) => {
      event.preventDefault();
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const id = event.target.id.split('#')[1];
      // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
      const deletedAttach = this.#config.attachments.findIndex((attach: any) => attach.id === id);
      // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
      this.#config.attachments.splice(deletedAttach, 1);

      const deletedAttachDOM = document.getElementById(id);
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      deletedAttachDOM.remove();
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      event.target.remove();
    });
  }
}

export const newPost = new NewPost(contentElement);

// TODO чтобы можно было вставлять аттачи прямо в input поле, нужно заменить textarea на следующее:
//  <div class="newpost-text-input-container" contenteditable="true">
