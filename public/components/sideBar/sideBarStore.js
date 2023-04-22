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
      feed: {
        name: 'Лента',
        href: '/feed',
        id: 'sidebar-feed',
        showDisplay: userStore.getUserState().isAuthorizedIn,
        parent: contentElement,
        render() {
        },
      },
      findAuth: {
        name: 'Авторы',
        href: URLS.search,
        id: 'sidebar-find',
        showDisplay: true,
        parent: contentElement,
        render: router.go,
      },
      subs: {
        name: 'Мои подписки',
        href: '/subs',
        id: 'sidebar-subs',
        showDisplay: userStore.getUserState().isAuthorizedIn,
        parent: contentElement,
        render() {
        },
      },
      reg: {
        name: 'Регистрация',
        href: '/register',
        id: 'sidebar-reg',
        showDisplay: !userStore.getUserState().isAuthorizedIn,
        parent: rootElement,
        render: Actions.renderReg,
      },
      auth: {
        name: 'Войти',
        href: '/auth',
        id: 'sidebar-auth',
        showDisplay: !userStore.getUserState().isAuthorizedIn,
        parent: rootElement,
        render: Actions.renderAuth,
      },
      beAuthor: {
        name: 'Стать автором',
        href: URLS.becomeAuthor,
        id: 'sidebar-beAuthor',
        showDisplay: userStore.getUserState().isAuthorizedIn * !userStore.getUserState().isAuthorIn,
        parent: contentElement,
        render: router.go,
      },
      modalWindow: {
        name: userStore.getUserState().usernameIn,
        href: '/modalWindow',
        id: 'sidebar-modalWindow',
        showDisplay: userStore.getUserState().isAuthorizedIn,
        parent: contentElement,
        render: Actions.renderWinSettings,
      },
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
    this.#config.modalWindow.showDisplay = userIn.isAuthorizedIn;
    this.#config.modalWindow.name = userIn.usernameIn;
  }

  renderSideBar(parent, user) {
    this.setState(user);
    sideBar.config = this.#config;
    sideBar.render();
  }

  reduce(action) {
    switch (action.type) {
      case ActionTypes.RENDER_SIDEBAR:
        this.renderSideBar(action.parent, action.user);
        break;

      default:
        break;
    }
  }
}

export const sideBarStore = new SideBarStore();