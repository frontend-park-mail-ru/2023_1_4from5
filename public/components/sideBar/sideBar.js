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
      router.go(URLS.root);
    });

    const logoSmall = document.getElementById('logo--small');
    logoSmall.addEventListener('click', (event) => {
      event.preventDefault();
      router.go(URLS.root);
    });

    const photo = document.getElementById('sidebar__user--photo');
    if (photo) {
      photo.style.backgroundImage = `url(../../images/user/${this.#config.modalWindow.photo}.jpg)`;
    }

    const logoBtn = document.getElementById('logo');
    logoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      router.go(URLS.root);
    });

    const input = document.getElementById('find__input');
    input.style.backgroundImage = 'url(../../images/search_icon.svg)';
    input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const content = input.value;
        router.go(URLS.search, '', content);
      }
    });
  }
}

export const sideBar = new SideBar(sideBarElement);
