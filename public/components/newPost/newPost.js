import { Actions } from '../../actions/actions';
import { router } from '../../modules/Router';

// TODO (сделал минимальную валидацию на каждый файл < 5 Мб)
//  более лучшая валидация файлов (обработка 413 и общий размер)
// TODO сделать режим ожидания загрузки файлов

// TODO удаление аттача

const template = require('./newPost.handlebars');

const contentElement = document.querySelector('main');

class NewPost {
  #parent;

  #config;

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

  render() {
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'newPostDiv';
    newDiv.innerHTML = template(this.#config);
    this.#parent.appendChild(newDiv);

    if (this.#config) {
      if (this.#config.attachments) {
        const divPreview = document.getElementById('preview');

        this.#config.attachments.forEach((item) => {
          if (item.type.startsWith('image')) {
            const attachPreview = document.createElement('img');

            attachPreview.className = 'img-preview';
            attachPreview.id = item.id;
            attachPreview.src = `${item.id}.${item.type.split('/')[1]}`;
            attachPreview.style.display = 'block';

            divPreview.append(attachPreview);
          } else if (item.type.startsWith('video')) {
            const attachPreview = document.createElement('video');

            attachPreview.className = 'video-preview';
            attachPreview.id = item.id;
            attachPreview.src = `${item.id}.${item.type.split('/')[1]}`;
            attachPreview.controls = true;
            attachPreview.style.display = 'block';

            divPreview.append(attachPreview);
          } else if (item.type.startsWith('audio')) {
            const attachPreview = document.createElement('audio');

            attachPreview.className = 'audio-preview';
            attachPreview.id = item.id;
            attachPreview.src = `${item.id}.${item.type.split('/')[1]}`;
            attachPreview.controls = true;
            attachPreview.style.display = 'block';

            divPreview.append(attachPreview);
          }

          const deleteAttachBtn = document.createElement('img');
          deleteAttachBtn.id = `delete_${item.id}`;
          deleteAttachBtn.className = 'delete-icon';
          deleteAttachBtn.src = '../../images/delete.svg';
          divPreview.append(deleteAttachBtn);

          deleteAttachBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const id = event.target.id.split('_')[1];
            console.log(id);
            const deletedAttach = this.#config.attachments.findIndex((attach) => attach.id === id);
            console.log(deletedAttach);
            // this.#config.attachments.split(deletedAttach).join();
            delete this.#config.attachments[deletedAttach];
            console.log(this.#config.attachments);

            const deletedAttachDOM = document.getElementById(id);
            deletedAttachDOM.remove();
            event.target.remove();
            console.log(event);
          });
        });
      }
    }
    // if (serveAttachments) {
    //   this.config = [...serveAttachments, ...this.config];
    // }
    // if (this.config) {
    //   if (this.config.attachments.length > 0) {
    //     const divPreview = document.getElementById('preview');
    //     for (const attach of this.config.attachments) {
    //       let src = URL.createObjectURL(attach);
    //       if (attach.type.startsWith('image')) {
    //         const attachPreview = document.createElement('img');
    //         attachPreview.className = 'img-preview';
    //         attachPreview.src = src;
    //         attachPreview.style.display = 'block';
    //         divPreview.append(attachPreview);
    //       } else if (attach.type.startsWith('video')) {
    //         const attachPreview = document.createElement('video');
    //         attachPreview.className = 'video-preview';
    //         attachPreview.src = src;
    //         attachPreview.controls = true;
    //         attachPreview.style.display = 'block';
    //         divPreview.append(attachPreview);
    //       } else if (attach.type.startsWith('audio')) {
    //         const attachPreview = document.createElement('audio');
    //         attachPreview.className = 'audio-preview';
    //         attachPreview.src = src;
    //         attachPreview.controls = true;
    //         attachPreview.style.display = 'block';
    //         divPreview.append(attachPreview);
    //       }
    //     }
    //   }
    // }

    const backBtn = document.getElementById('newpost-btn-back');
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      router.popstate();
    });

    const photoInput = document.querySelector('#attach-photo-download');
    photoInput.addEventListener('change', (event) => {
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
      // container.style.verticalAlign = 'top';

      const attachPreview = document.createElement('img');
      const src = URL.createObjectURL(files);
      attachPreview.className = 'img-preview';
      attachPreview.src = src;
      // attachPreview.style.display = 'block';

      const deleteAttachBtn = document.createElement('img');
      deleteAttachBtn.id = `delete-${files.name}`;
      deleteAttachBtn.className = 'delete-icon';
      deleteAttachBtn.src = '../../images/delete.svg';
      deleteAttachBtn.addEventListener()

      divPreview.append(container);
      container.append(attachPreview, deleteAttachBtn);
    });

    const videoInput = document.querySelector('#attach-video-download');
    videoInput.addEventListener('change', (event) => {
      event.preventDefault();
      const files = event.target.files[0];

      const errOutput = document.getElementById('newpost-attachments-error');
      if (Number(files.size) > 5242800) {
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

      const attachPreview = document.createElement('video');
      const src = URL.createObjectURL(files);
      attachPreview.className = 'video-preview';
      attachPreview.src = src;
      attachPreview.controls = true;
      // attachPreview.style.display = 'block';

      const deleteAttachBtn = document.createElement('img');
      deleteAttachBtn.id = `delete-${files.name}`;
      deleteAttachBtn.className = 'delete-icon';
      deleteAttachBtn.src = '../../images/delete.svg';

      divPreview.append(container);
      container.append(attachPreview, deleteAttachBtn);
      console.log(this.#config);

      // Actions.downloadAttach(files[0]);
    });

    const audioInput = document.querySelector('#attach-music-download');
    audioInput.addEventListener('change', (event) => {
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

      const attachPreview = document.createElement('audio');
      const src = URL.createObjectURL(files);
      attachPreview.className = 'audio-preview';
      attachPreview.src = src;
      attachPreview.controls = true;
      // attachPreview.style.display = 'block';

      const deleteAttachBtn = document.createElement('img');
      deleteAttachBtn.id = `delete-${files.name}`;
      deleteAttachBtn.className = 'delete-icon';
      deleteAttachBtn.src = '../../images/delete.svg';

      divPreview.append(container);
      container.append(attachPreview, deleteAttachBtn);
      console.log(this.#config);

      // Actions.downloadAttach(files[0]);
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

    titleInput.value = title;
    textInput.textContent = text;
    postBtn.textContent = 'Готово';

    postBtn.addEventListener('click', (e) => {
      e.preventDefault();

      Actions.updatePost({
        attachments: this.#config.attachments,
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
