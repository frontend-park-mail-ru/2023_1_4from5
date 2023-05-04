import { dispatcher } from '../../dispatcher/dispatcher.js';
import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { userStore } from '../user/userStore.js';
import { Actions } from '../../actions/actions.js';
import { sideBar } from './sideBar.js';
import { URLS } from '../../modules/Notifier.js';
import { router } from '../../modules/Router.js';

const rootElement = document.getElementById('root');
const contentElement = document.querySelector('main');

class SideBarStore {
  #config;

  constructor() {
    this.#config = {
      about: {
        href: URLS.root,
        id: 'sidebar__about',
        showDisplay: true,
        parent: contentElement,
        render: router.go,
      },
      feed: {
        href: URLS.feed,
        id: 'sidebar__feed',
        showDisplay: userStore.getUserState().isAuthorizedIn,
        parent: contentElement,
        render: router.go,
      },
      findAuth: {
        href: URLS.search,
        id: 'sidebar__find',
        showDisplay: true,
        parent: contentElement,
        render: router.go,
      },
      subs: {
        href: URLS.subscriptions,
        id: 'sidebar__subs',
        showDisplay: userStore.getUserState().isAuthorizedIn,
        parent: contentElement,
        render: router.go,
      },
      reg: {
        href: '',
        id: 'sidebar__reg',
        showDisplay: !userStore.getUserState().isAuthorizedIn,
        parent: rootElement,
        render: Actions.renderReg,
      },
      auth: {
        href: '',
        id: 'sidebar__auth',
        showDisplay: !userStore.getUserState().isAuthorizedIn,
        parent: rootElement,
        render: Actions.renderAuth,
      },
      beAuthor: {
        href: '',
        id: 'sidebar__beAuthor',
        showDisplay: userStore.getUserState().isAuthorizedIn * !userStore.getUserState().isAuthorIn,
        parent: contentElement,
        render: Actions.renderBecomeAuthor,
      },
      notifications: {
        href: '',
        id: 'sidebar__notifications',
        showDisplay: userStore.getUserState().isAuthorizedIn,
        parent: contentElement,
        render() {
          console.log('Уведомления');
        }
      },
      modalWindow: {
        name: userStore.getUserState().usernameIn,
        photo: userStore.getUserState().profilePhoto,
        href: '/modalWindow',
        id: 'sidebar__modalWindow',
        showDisplay: userStore.getUserState().isAuthorizedIn,
        parent: contentElement,
        render: Actions.renderWinSettings,
      },
      menu: {
        href: '/modalWindow',
        id: 'sidebar__menu',
        showDisplay: userStore.getUserState().isAuthorizedIn,
        parent: contentElement,
        render: Actions.renderWinSettings,
      }
    };
    dispatcher.register(this.reduce.bind(this));
  }

  setState(userIn) {
    this.#config.feed.showDisplay = userIn.isAuthorizedIn;
    this.#config.findAuth.showDisplay = true;
    this.#config.subs.showDisplay = userIn.isAuthorizedIn;
    this.#config.reg.showDisplay = !userIn.isAuthorizedIn;
    this.#config.auth.showDisplay = !userIn.isAuthorizedIn;
    this.#config.beAuthor.showDisplay = userIn.isAuthorizedIn * !userIn.isAuthorIn;
    this.#config.notifications.showDisplay = userIn.isAuthorizedIn;
    this.#config.modalWindow.showDisplay = userIn.isAuthorizedIn;
    this.#config.modalWindow.name = userIn.usernameIn;
  }

  getState() {
    return this.#config;
  }

  reduce(action) {
    switch (action.type) {
      case ActionTypes.RENDER_SIDEBAR:
        this.renderSideBar(action.user);
        break;

      default:
        break;
    }
  }

  renderSideBar(user) {
    this.setState(user);
    sideBar.config = this.#config;
    sideBar.render();
  }
}

export const sideBarStore = new SideBarStore();
