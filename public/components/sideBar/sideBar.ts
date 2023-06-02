import { clickHandler } from '../../modules/handler.js';
import { router } from '../../modules/Router';
import { URLS } from '../../modules/Notifier';
import { Actions } from '../../actions/actions';
import { sideBarStore } from './sideBarStore';
import { userStore } from '../user/userStore';
import { notificationsStore } from '../notifications/notificationsStore';
// @ts-expect-error TS(2307): Cannot find module './sideBar.handlebars' or its c... Remove this comment to see the full error message
import template from './sideBar.handlebars';

const sideBarElement = document.querySelector('sideBar');

export class SideBar {
  #parent;

  // @ts-expect-error TS(7008): Member '#config' implicitly has an 'any' type.
  #config;

  constructor(parent: any) {
    this.#parent = parent;
    const handler = (event: any) => {
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
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    logo.addEventListener('click', (event) => {
      event.preventDefault();
      if (!userStore.getUserState().isAuthorizedIn) {
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
        router.go(URLS.root);
      } else {
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
        router.go(URLS.feed);
      }
    });

    const logoSmall = document.getElementById('logo--small');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    logoSmall.addEventListener('click', (event) => {
      event.preventDefault();
      if (!userStore.getUserState().isAuthorizedIn) {
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
        router.go(URLS.root);
      } else {
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
        router.go(URLS.feed);
      }
    });

    const photo = document.getElementById('sidebar__user--photo');
    if (photo) {
      photo.style.backgroundImage = `url(../../images/user/${this.#config.modalWindow.photo}.jpg)`;
    }

    const input = document.getElementById('find__input');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    input.style.backgroundImage = 'url(../../images/search_icon.svg)';

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        const content = input.value;
        router.go(URLS.search, '', content);
      }
    });

    const delay = 300;

    let timeout: any;
    function timeoutWrap(delay: any) {
      timeout = setTimeout(() => {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        const content = input.value;
        router.go(URLS.search, '', content);
      }, delay);
    }

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    input.addEventListener('keydown', () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeoutWrap(delay);
    });
  }
}

export const sideBar = new SideBar(sideBarElement);
