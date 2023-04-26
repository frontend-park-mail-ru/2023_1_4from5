import { router } from '../../modules/Router.js';
import { URLS } from '../../modules/Notifier.js';
import { Actions } from '../../actions/actions';
import template from './myPage.handlebars';

const contentElement = document.querySelector('main');

class MyPage {
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

    const backGnd = document.getElementById('myPage-header-container');
    backGnd.style.backgroundImage = 'url(../../images/myPage_phone.jpg)';

    const settingsIcon = document.getElementById('settings-icon');
    if (settingsIcon !== null) {
      settingsIcon.addEventListener('click', (e) => {
        e.preventDefault();
        router.go(URLS.authorSettings);
      });
    }

    const createPostBtn = document.getElementById('createPost-btn');
    if (createPostBtn) {
      createPostBtn.addEventListener('click', (e) => {
        e.preventDefault();
        router.go(URLS.newPost);
      });
    }

    const deletePostBtns = document.querySelectorAll('#delete-icon');
    for (let index = 0; index < deletePostBtns.length; index++) {
      const button = deletePostBtns[index];
      button.addEventListener('click', this.deleteHandler);
    }

    const updatePostBtns = document.querySelectorAll('#pencil-icon');
    for (let index = 0; index < updatePostBtns.length; index++) {
      const button = updatePostBtns[index];
      button.addEventListener('click', this.updateHandler.bind(this));
    }

    const likeIcons = document.querySelectorAll('.like-icon');
    for (let index = 0; index < likeIcons.length; index++) {
      const likeIcon = likeIcons[index];
      likeIcon.addEventListener('click', (event) => {
        const eventLike = likeIcon.id === 'love-like-icon' ? 'removeLike' : 'addLike';
        Actions.clickLike(eventLike, event.target.parentElement.parentElement.parentElement.id);
      });
    }

    const editAimIcon = document.getElementById('pencil-icon-aim');
    if (editAimIcon) {
      editAimIcon.addEventListener('click', (e) => {
        e.preventDefault();
        Actions.editAim();
        const aimInput = document.getElementById('description-edit-aim');
        aimInput.textContent = this.#config.aim.description;
      });
    }

    const closeEditAimIcon = document.getElementById('close-icon-aim');
    if (closeEditAimIcon) {
      closeEditAimIcon.addEventListener('click', (e) => {
        e.preventDefault();
        Actions.closeEditAim();
      });
    }

    const saveBtnAim = document.getElementById('save-btn-aim');
    if (saveBtnAim) {
      const descriptionInput = document.getElementById('description-edit-aim');
      const moneyNeededInput = document.getElementById('money-needed-edit-aim');
      const errorDescriptionOutput = document.getElementById('edit-aim-description-error');
      const errorMoneyNeededOutput = document.getElementById('edit-aim-money-needed-error');
      saveBtnAim.addEventListener('click', (e) => {
        e.preventDefault();
        Actions.saveEditAim({
          descriptionInput,
          moneyNeededInput,
          errorDescriptionOutput,
          errorMoneyNeededOutput,
        });
      });
    }

    const donateBtnAim = document.getElementById('donate-btn-aim');
    if (donateBtnAim) {
      donateBtnAim.addEventListener('click', (e) => {
        e.preventDefault();
        Actions.renderDonateWin();
      });
    }

    const createSubBtn = document.getElementById('create-sub-btn');
    if (createSubBtn) {
      createSubBtn.addEventListener('click', (event) => {
        event.preventDefault();
        Actions.renderSubscription();
      });
    }

    const updateSubBtns = document.querySelectorAll('#pencil-sub-icon');
    for (let index = 0; index < updateSubBtns.length; index++) {
      const button = updateSubBtns[index];
      button.addEventListener('click', this.updateSubHandler);
    }

    const deleteSubBtns = document.querySelectorAll('#delete-sub-icon');
    for (let index = 0; index < deleteSubBtns.length; index++) {
      const button = deleteSubBtns[index];
      button.addEventListener('click', this.deleteSubHandler);
    }
  }

  deleteHandler(e) {
    e.preventDefault();
    Actions.deletePost(e.currentTarget.parentElement.parentElement.id);
  }

  updateHandler(e) {
    e.preventDefault();
    const postId = e.currentTarget.parentElement.parentElement.id;
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
    const subscription = document.getElementById(e.currentTarget.parentElement.parentElement.id);
    const titleContainer = subscription.querySelector('#sub-title');
    const title = titleContainer.textContent;

    const descriptionContainer = subscription.querySelector('#sub-description');
    const description = descriptionContainer.textContent;

    const costContainer = subscription.querySelector('#sub-month_cost');
    const cost = costContainer.textContent;

    Actions.renderUpdatingSubscription(e.currentTarget.parentElement.parentElement.id, {
      title,
      description,
      cost,
    });
  }
}

export const myPage = new MyPage(contentElement);
