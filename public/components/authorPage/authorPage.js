import { router } from '../../modules/Router.js';
import { URLS } from '../../modules/Notifier.js';
import { Actions } from '../../actions/actions';
import template from './authorPage.handlebars';
import { getSubscription } from '../getSubscription/getSubscription';
import { userStore } from '../user/userStore';
import { subscriptionLevels } from '../subscriptionLevels/subscriptionLevels';
import { posts } from '../posts/posts';

const contentElement = document.querySelector('main');

class AuthorPage {
  #parent;

  #config;

  #subsPos = 0;

  constructor(parent) {
    this.#parent = parent;
  }

  getSubsPos() {
    return this.#subsPos;
  }

  setSubsPos(subsPos) {
    this.#subsPos = subsPos;
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
    const subNum = 4;

    const subs = [];
    if (!this.#config.subscriptions) {
      this.#config.subscriptions = [];
    }
    Object.assign(subs, this.#config.subscriptions.slice(this.#subsPos, this.#subsPos + subNum));
    const config = {};
    Object.assign(config, this.#config);
    config.subscriptions = subs;

    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'myPageDiv';
    newDiv.innerHTML = template(config);
    this.#parent.appendChild(newDiv);

    subscriptionLevels.render(config);
    posts.render(config);

    this.#config.posts.forEach((post) => {
      if (post.attachments) {
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
            const source = document.createElement('source');

            attachPreview.className = 'video-preview';
            attachPreview.controls = true;
            attachPreview.style.display = 'block';

            source.src = `../../images/${item.id}.${item.type.split('/')[1]}`;
            source.type = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
            attachPreview.append(source);
            divAttaches.append(attachPreview);
          } else if (item.type.startsWith('audio')) {
            const attachPreview = document.createElement('audio');
            attachPreview.className = 'audio-preview';
            attachPreview.src = `../../images/${item.id}.mp3`;
            attachPreview.controls = true;
            attachPreview.style.display = 'block';
            divAttaches.append(attachPreview);
          }
        });
      }
    });

    const createSubBtn = document.querySelectorAll('#subs__add');
    if (createSubBtn) {
      for (let index = 0; index < createSubBtn.length; index++) {
        const button = createSubBtn[index];
        button.addEventListener('click', (event) => {
          event.preventDefault();
          Actions.renderSubscription();
        });
      }
    }

    if (this.#subsPos > 0) {
      const prevDiv = document.getElementById('arrow--prev');
      if (prevDiv) {
        prevDiv.innerHTML = '<img id="prev" class="arrows clickable" src="../../images/arrow-left.svg" alt="left">';
      }
    }

    if (this.#subsPos < this.#config.subscriptions.length - subNum) {
      const nextDiv = document.getElementById('arrow--next');
      if (nextDiv) {
        nextDiv.innerHTML = '<img id="next" class="arrows clickable" src="../../images/arrow-right.svg" alt="right">';
      }
    }

    const prev = document.getElementById('prev');
    if (prev) {
      prev.addEventListener('click', (event) => {
        event.preventDefault();
        if (this.#subsPos >= subNum) {
          this.#subsPos -= subNum;
          this.render();
        }
      });
    }

    const next = document.getElementById('next');
    if (next) {
      next.addEventListener('click', (event) => {
        event.preventDefault();
        if (this.#config.subscriptions[this.#subsPos + subNum]) {
          this.#subsPos += subNum;
          this.render();
        }
      });
    }

    const backGnd = document.getElementById('author__header');
    backGnd.style.backgroundImage = 'url(../../images/cover-photo.svg)';

    const coverPhoto = document.getElementById('author__header--photo');
    coverPhoto.style.backgroundImage = `url(../../images/${this.#config.creator_info.cover_photo}.jpg)`;

    const cover = document.getElementById('cover__upload');
    if (cover) {
      cover.addEventListener('change', (event) => {
        event.preventDefault();
        const files = event.target.files;
        Actions.creatorCoverUpdate(files[0], this.#config.creator_info.cover_photo);
      });
    }

    const photo = document.getElementById('photo__upload');
    if (photo) {
      photo.addEventListener('change', (event) => {
        event.preventDefault();
        const files = event.target.files;
        Actions.creatorPhotoUpdate(files[0], this.#config.creator_info.profile_photo);
      });
    }

    const delPhoto = document.getElementById('delete__creator--photo');
    if (delPhoto) {
      delPhoto.addEventListener('click', (event) => {
        event.preventDefault();
        Actions.creatorPhotoDelete(this.#config.creator_info.profile_photo);
      });
    }

    const delCover = document.getElementById('delete__creator--cover');
    if (delCover) {
      delCover.addEventListener('click', (event) => {
        event.preventDefault();
        Actions.creatorCoverDelete(this.#config.creator_info.cover_photo);
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

    const updatePostBtns = document.querySelectorAll('#edit__post');
    for (let index = 0; index < updatePostBtns.length; index++) {
      const button = updatePostBtns[index];
      button.addEventListener('click', this.updateHandler.bind(this));
    }

    const deletePostBtns = document.querySelectorAll('#delete__post');
    for (let index = 0; index < deletePostBtns.length; index++) {
      const button = deletePostBtns[index];
      button.addEventListener('click', this.deleteHandler);
    }

    const getSubBtns = document.querySelectorAll('#get__sub');
    if (getSubBtns) {
      for (let index = 0; index < getSubBtns.length; index++) {
        const button = getSubBtns[index];
        button.addEventListener('click', (event) => {
          event.preventDefault();
          const subId = event.target.parentElement.id;
          const price = event.target.parentElement.querySelector('#sub__price').textContent;
          const creatorId = event.target.parentElement.parentElement.parentElement.id;
          getSubscription.render(subId, price, creatorId);
        });
      }
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
        Actions.unfollow(unfollowBtn.parentElement.id, 'authorPage');
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
