import { router } from '../../modules/Router.js';
import { URLS } from '../../modules/Notifier.js';
import { Actions } from '../../actions/actions';
import template from './authorPage.handlebars';
import { aim } from './aim';
import { getSubscription } from './getSubscription';
import { userStore } from '../user/userStore';

const contentElement = document.querySelector('main');

class AuthorPage {
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
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'myPageDiv';
    newDiv.innerHTML = template(this.#config);
    this.#parent.appendChild(newDiv);

    const backGnd = document.getElementById('author__header');
    backGnd.style.backgroundImage = 'url(../../images/cover-photo.svg)';

    const cover = document.getElementById('cover__upload');
    if (cover) {
      cover.addEventListener('change', (event) => {
        event.preventDefault();
        const files = event.target.files;
        console.log(files);
        Actions.creatorCoverUpdate(files[0]);
      });
    }

    const editProfile = document.getElementById('edit__profile');
    editProfile.addEventListener('click', (event) => {
      event.preventDefault();
      router.go(URLS.becomeAuthor, '', userStore.getUserState().authorURL);
    });

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
