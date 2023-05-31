import { clickHandler } from '../../modules/handler.js';
import { router } from '../../modules/Router';
import { URLS } from '../../modules/Notifier';
import { Actions } from '../../actions/actions';
import { sideBarStore } from './sideBarStore';
import { userStore } from '../user/userStore';
import { notificationsStore } from '../notifications/notificationsStore';
import template from './sideBar.handlebars';

const sideBarElement = document.querySelector('sideBar');

export class SideBar {
  #parent;

  #config;

  constructor(parent) {
    this.#parent = parent;
    const handler = (event) => {
      clickHandler(event, this.#config);
    };
    this.#parent.addEventListener('click', handler);
  }

  get config() {
    return this.#config;
  }

  set config(config) {
    this.#config = config;
  }

  render() {
    this.#config.modalWindow.photo = userStore.getUserState().profilePhoto;

    const lastSideBar = document.getElementById('sidebarDiv');
    if (lastSideBar) {
      lastSideBar.remove();
    }

    this.#config.are_notifications = notificationsStore.getNotifications().length > 0;

    const newDiv = document.createElement('div');
    newDiv.id = 'sidebarDiv';
    newDiv.innerHTML = template(this.#config);
    this.#parent.appendChild(newDiv);

    const logo = document.getElementById('logo');
    logo.addEventListener('click', (event) => {
      event.preventDefault();
      if (!userStore.getUserState().isAuthorizedIn) {
        router.go(URLS.root);
      } else {
        router.go(URLS.feed);
      }
    });

    const logoSmall = document.getElementById('logo--small');
    logoSmall.addEventListener('click', (event) => {
      event.preventDefault();
      if (!userStore.getUserState().isAuthorizedIn) {
        router.go(URLS.root);
      } else {
        router.go(URLS.feed);
      }
    });

    const photo = document.getElementById('sidebar__user--photo');
    if (photo) {
      photo.style.backgroundImage = `url(../../images/user/${this.#config.modalWindow.photo}.jpg)`;
    }

    const input = document.getElementById('find__input');
    input.style.backgroundImage = 'url(../../images/search_icon.svg)';

    let timeout;

    function timeoutWrap(delay) {
      timeout = setTimeout(() => {
        console.log('key down');
        const content = input.value;
        router.go(URLS.search, '', content);
      }, delay);
    }

    const delay = 300;
    input.addEventListener('keydown', () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeoutWrap(delay);
    });
  }
}

export const sideBar = new SideBar(sideBarElement);
