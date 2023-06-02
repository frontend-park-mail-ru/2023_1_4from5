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
            attachPreview.src = `../../images/user/${item.id}.${item.type.split('/')[1]}`;
            attachPreview.style.display = 'block';
            divAttaches.append(attachPreview);
          } else if (item.type.startsWith('video')) {
            const attachPreview = document.createElement('video');
            const source = document.createElement('source');

            attachPreview.className = 'video-preview';
            attachPreview.controls = true;
            attachPreview.style.display = 'block';

            source.src = `../../images/user/${item.id}.${item.type.split('/')[1]}`;
            source.type = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
            attachPreview.append(source);
            divAttaches.append(attachPreview);
          } else if (item.type.startsWith('audio')) {
            const attachPreview = document.createElement('audio');
            attachPreview.className = 'audio-preview';
            attachPreview.src = `../../images/user/${item.id}.mp3`;
            attachPreview.controls = true;
            attachPreview.style.display = 'block';
            divAttaches.append(attachPreview);
          }
        });
      }
    });

    if (this.#subsPos > 0) {
      const prevDivs = document.querySelectorAll('#arrow--prev');
      if (prevDivs) {
        for (let index = 0; index < prevDivs.length; index++) {
          const prevDiv = prevDivs[index];
          prevDiv.innerHTML = '<img id="prev" class="arrows clickable" src="../../images/arrow-left.svg" alt="left">';
        }
      }
    }

    if (this.#subsPos < this.#config.subscriptions.length - subNum) {
      const nextDivs = document.querySelectorAll('#arrow--next');
      if (nextDivs) {
        for (let index = 0; index < nextDivs.length; index++) {
          const nextDiv = nextDivs[index];
          nextDiv.innerHTML = '<img id="next" class="arrows clickable" src="../../images/arrow-right.svg" alt="right">';
        }
      }
    }

    const prevs = document.querySelectorAll('#prev');
    if (prevs) {
      for (let index = 0; index < prevs.length; index++) {
        const prev = prevs[index];
        prev.addEventListener('click', (event) => {
          event.preventDefault();
          if (this.#subsPos >= subNum) {
            this.#subsPos -= subNum;
            this.render();
          }
        });
      }
    }

    const nexts = document.querySelectorAll('#next');
    if (nexts) {
      for (let index = 0; index < nexts.length; index++) {
        const next = nexts[index];
        next.addEventListener('click', (event) => {
          event.preventDefault();
          if (this.#config.subscriptions[this.#subsPos + subNum]) {
            this.#subsPos += subNum;
            this.render();
          }
        });
      }
    }

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
}

export const authorPage = new AuthorPage(contentElement);
