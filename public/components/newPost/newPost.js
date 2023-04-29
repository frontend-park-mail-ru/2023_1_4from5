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
    if (this.config) {
      if (this.config.attachments) {
        console.log('store2');
        // const divPreview = document.getElementById('preview');
        // for (const groupAttach of this.config.attachments) {
        //   for (const attach in groupAttach) {
        //     console.log('1');
        //     let src = URL.createObjectURL(files[0]);
        //     const imagePreview = document.createElement('img');
        //     imagePreview.className = 'image-preview';
        //     console.log(src, imagePreview);
        //     imagePreview.src = src;
        //     imagePreview.style.display = 'block';
        //     divPreview.append(imagePreview);
        //   }
        // }
      }
      console.log('store2.1', this.config);
    }

    newDiv.innerHTML = template(this.#config);
    console.log('store2.2', this.config);

    this.#parent.appendChild(newDiv);
    console.log('store3', this.config);

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
      Actions.downloadAttachPhoto(files[0]);
    });

    const videoInput = document.querySelector('#attach-video-download');
    videoInput.addEventListener('change', (event) => {
      event.preventDefault();
      const files = event.target.files;
      console.log('video', files);
      Actions.downloadAttachVideo(files[0]);
    });

    const audioInput = document.querySelector('#attach-music-download');
    audioInput.addEventListener('change', (event) => {
      event.preventDefault();
      const files = event.target.files;
      console.log('music', files);
      Actions.downloadAttachAudio(files[0]);
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
