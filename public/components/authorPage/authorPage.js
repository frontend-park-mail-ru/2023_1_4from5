import { router } from '../../modules/Router.js';
import { URLS } from '../../modules/Notifier.js';
import { Actions } from '../../actions/actions';
import template from './authorPage.handlebars';
import { getSubscription } from './getSubscription';
import { userStore } from '../user/userStore';

const contentElement = document.querySelector('main');

class AuthorPage {
  #parent;

  #config;

  #subsPos = 0;

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
    newDiv.id = 'myPageDiv';
    newDiv.innerHTML = template(this.#config);
    this.#parent.appendChild(newDiv);

    // const prev = document.getElementById('prev');
    // prev.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   if (this.#subsPos >= 4) {
    //     this.#subsPos -= 4;
    //     console.log(this.#subsPos);
    //   }
    // });
    //
    // const next = document.getElementById('next');
    // next.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   console.log(this.#subsPos);
    //   console.log(this.#config.subscriptions[3])
    //   if (this.#config.subscriptions[this.#subsPos + 4]) {
    //     this.#subsPos += 4;
    //     console.log(this.#subsPos);
    //   }
    // });
    this.#config.posts.forEach((post) => {
      console.log(post);
      if (post.attachments) {
        console.log('post', post.attachments);
        const divAttaches = document.getElementById(`attachments-${post.id}`);
        post.attachments.forEach((item) => {
          if (item.type.startsWith('image')) {
            const attachPreview = document.createElement('img');
            attachPreview.className = 'img-preview';
            attachPreview.src = `../../images/${item.id}.${item.type.split('/')[1]}`;
            attachPreview.style.display = 'block';
            divAttaches.append(attachPreview);
          } else if (item.type.startsWith('video')) {
            const attachPreview = document.createElement('video');
            attachPreview.className = 'video-preview';
            attachPreview.src = `../../images/${item.id}.${item.type.split('/')[1]}`;
            attachPreview.controls = true;
            attachPreview.style.display = 'block';
            divAttaches.append(attachPreview);
          } else if (item.type.startsWith('audio')) {
            const attachPreview = document.createElement('audio');
            attachPreview.className = 'audio-preview';
            attachPreview.src = `../../images/${item.id}.${item.type.split('/')[1]}`;
            attachPreview.controls = true;
            attachPreview.style.display = 'block';
            divAttaches.append(attachPreview);
          }
        });
      }
    });

    const backGnd = document.getElementById('author__header');
    backGnd.style.backgroundImage = 'url(../../images/cover-photo.svg)';

    const cover = document.getElementById('cover__upload');
    if (cover) {
      cover.addEventListener('change', (event) => {
        event.preventDefault();
        const files = event.target.files;
        Actions.creatorCoverUpdate(files[0]);
      });
    }

    const editProfile = document.getElementById('edit__profile');
    if (editProfile) {
      editProfile.addEventListener('click', (event) => {
        event.preventDefault();
        Actions.renderBecomeAuthor(userStore.getUserState().authorURL);
      });
    }

    const createPostBtn = document.getElementById('create__post');
    if (createPostBtn) {
      createPostBtn.addEventListener('click', (e) => {
        e.preventDefault();
        router.go(URLS.newPost);
      });
    }

    const getSubBtns = document.querySelectorAll('#get__sub');
    if (getSubBtns) {
      for (let index = 0; index < getSubBtns.length; index++) {
        const button = getSubBtns[index];
        button.addEventListener('click', (event) => {
          event.preventDefault();
          const subId = event.target.parentElement.id;
          const price = event.target.parentElement.querySelector('#sub__price').textContent;
          const creatorId = event.target.parentElement.parentElement.id;
          getSubscription.render(subId, price, creatorId);
        });
      }
    }

    const deletePostBtns = document.querySelectorAll('#delete__post');
    for (let index = 0; index < deletePostBtns.length; index++) {
      const button = deletePostBtns[index];
      button.addEventListener('click', this.deleteHandler);
    }

    const updatePostBtns = document.querySelectorAll('#edit__post');
    for (let index = 0; index < updatePostBtns.length; index++) {
      const button = updatePostBtns[index];
      button.addEventListener('click', this.updateHandler.bind(this));
    }

    const likeIcons = document.querySelectorAll('.icon--like');
    for (let index = 0; index < likeIcons.length; index++) {
      const likeIcon = likeIcons[index];
      likeIcon.addEventListener('click', (event) => {
        const eventLike = likeIcon.id === 'love-like-icon' ? 'removeLike' : 'addLike';
        Actions.clickLike(
          eventLike,
          event.target.parentElement.parentElement.parentElement.parentElement.id
        );
      });
    }

    const addAimBtn = document.getElementById('aim__add');
    if (addAimBtn) {
      addAimBtn.addEventListener('click', (event) => {
        event.preventDefault();
        Actions.renderAim();
      });
    }

    const editAimBtn = document.getElementById('aim__edit');
    if (editAimBtn) {
      editAimBtn.addEventListener('click', (event) => {
        event.preventDefault();
        Actions.updateAim(this.#config.aim);
      });
    }

    const donateBtnAim = document.getElementById('donate__btn');
    if (donateBtnAim) {
      donateBtnAim.addEventListener('click', (e) => {
        e.preventDefault();
        Actions.renderDonateWin();
      });
    }

    const createSubBtn = document.getElementById('subs__add');
    if (createSubBtn) {
      createSubBtn.addEventListener('click', (event) => {
        event.preventDefault();
        Actions.renderSubscription();
      });
    }

    const updateSubBtns = document.querySelectorAll('#sub__edit');
    for (let index = 0; index < updateSubBtns.length; index++) {
      const button = updateSubBtns[index];
      button.addEventListener('click', this.updateSubHandler);
    }

    const deleteSubBtns = document.querySelectorAll('#sub__delete');
    for (let index = 0; index < deleteSubBtns.length; index++) {
      const button = deleteSubBtns[index];
      button.addEventListener('click', this.deleteSubHandler);
    }

    const followBtn = document.getElementById('follow__btn');
    if (followBtn) {
      followBtn.addEventListener('click', (event) => {
        event.preventDefault();
        Actions.follow(followBtn.parentElement.id);
      });
    }

    const unfollowBtn = document.getElementById('unfollow__btn');
    if (unfollowBtn) {
      unfollowBtn.addEventListener('click', (event) => {
        event.preventDefault();
        Actions.unfollow(unfollowBtn.parentElement.id);
      });
    }

    const aimBar = document.getElementById('bar--row');
    if (aimBar) {
      let width = String((this.#config.aim.money_got / this.#config.aim.money_needed) * 100);
      if (width > 100) {
        width = 100;
      }
      aimBar.style.width = `${width}%`;
    }

    const creationDates = document.querySelectorAll('#creation__date');
    for (let index = 0; index < creationDates.length; index++) {
      const timestamp = creationDates[index];
      const dateRaw = new Date(Date.parse(timestamp.textContent));
      const day = dateRaw.getDay();
      const month = dateRaw.getMonth();
      const year = dateRaw.getFullYear();
      const hour = dateRaw.getHours();
      const min = dateRaw.getMinutes();
      timestamp.textContent = `${day}.${month}.${year} ${hour}:${min}`;
    }
  }

  deleteHandler(e) {
    e.preventDefault();
    Actions.deletePost(e.currentTarget.parentElement.parentElement.parentElement.id);
  }

  updateHandler(e) {
    e.preventDefault();
    const postId = e.currentTarget.parentElement.parentElement.parentElement.id;
    router.go(URLS.editPost, {
      postId,
    }, postId);
  }

  deleteSubHandler(e) {
    e.preventDefault();
    Actions.deleteSub(e.currentTarget.parentElement.parentElement.id);
  }

  updateSubHandler(e) {
    e.preventDefault();
    const subscription = document.getElementById(e.currentTarget.parentElement.id);
    const titleContainer = subscription.querySelector('.sub__title--text');
    const title = titleContainer.textContent;

    const descriptionContainer = subscription.querySelector('.sub__description');
    const description = descriptionContainer.textContent;

    const costContainer = subscription.querySelector('.cost');
    const cost = costContainer.textContent;

    Actions.renderUpdatingSubscription(e.currentTarget.parentElement.id, {
      title,
      description,
      cost,
    });
  }
}

export const authorPage = new AuthorPage(contentElement);

// кусок из hbs с аттачами, которые разделены по типам:
// <!--TOD проверить, норм ли отображается-->
// {{#if attachments}}
// {{#each attachments.img}}
// <!-- TOD попробовать тэг <{{id}}>-->
// <img id="attach-photo" width="500" src="../../images/logo.png" alt="attach_photo">
//   {{/each}}
//   {{#each attachments.video}}
//     <audio id="audio" src="../../images/music_test.mp3" controls></audio>
//   {{/each}}
//   {{#each attachments.audio}}
//     <video id="video" width="500" src="../../images/video_test.mp4" controls></video>
//   {{/each}}
//   {{/if}}
