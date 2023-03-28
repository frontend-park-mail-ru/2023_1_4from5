import { dispatcher } from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../actionTypes/auth.js';
import { renderSideBar } from '../index.js';
import { userStore } from './userStore.js';
import { Actions } from '../actions/auth.js';

const rootElement = document.getElementById('root');
const sideBarElement = document.getElementById('sideBar');
const contentElement = document.getElementById('main');

export class SideBarStore {
  #config;

  constructor() {
    // TODO вместо названий функций в рендере будут лежать действия
    this.#config = {
      feed: {
        name: 'Лента',
        href: '/feed',
        id: 'sidebar-feed',
        showDisplay: userStore.getUserState().isAuthorizedIn,
        parent: contentElement,
        // render: renderStartPage,
      },
      find: {
        name: 'Поиск авторов',
        href: '/find',
        id: 'sidebar-find',
        showDisplay: true,
        parent: contentElement,
        // render: renderStartPage,
      },
      subs: {
        name: 'Мои подписки',
        href: '/subs',
        id: 'sidebar-subs',
        showDisplay: userStore.getUserState().isAuthorizedIn,
        parent: contentElement,
        render() {
          console.log('Мои подписки');
        },
      },
      register: {
        name: 'Регистрация',
        href: '/register',
        id: 'sidebar-reg',
        showDisplay: !userStore.getUserState().isAuthorizedIn,
        parent: rootElement,
        // render: renderRegister,
      },
      auth: {
        name: 'Войти',
        href: '/auth',
        id: 'sidebar-auth',
        showDisplay: !userStore.getUserState().isAuthorizedIn,
        parent: rootElement,
        render: Actions.renderAuth,
        // render() {
        //   console.log('Войти');
        // },
      },
      beAuthor: {
        name: 'Стать автором',
        href: '/beAuthor',
        id: 'sidebar-beAuthor',
        showDisplay: userStore.getUserState().isAuthorizedIn * !userStore.getUserState().isAuthorIn,
        parent: contentElement,
        // render: renderStartPage,
      },
      modalWindow: {
        name: userStore.getUserState().usernameIn,
        href: '/modalWindow',
        id: 'sidebar-modalWindow',
        showDisplay: userStore.getUserState().isAuthorizedIn,
        parent: contentElement,
        // render: renderWinSettings,
      },
    };
    dispatcher.register(this.reduce.bind(this));
    console.log('register sideBarStore');
  }

  getSideBarState() {
    return this.#config;
  }

  // TODO перенести из constructConfig функцию сюда (не всю)
  setState(/* result */) {
    // this.#user.usernameIn = result.name;
    // this.#user.isAuthorIn = result.is_creator;
    // this.#user.isAuthorizedIn = true;
    // this.#user.authorURL = result.creator_id;
  }

  reduce(action) {
    switch (action.type) {
      case ActionTypes.RENDER_SIDEBAR:
        // console.log('inside sctore, renderSideBar', action.parent);
        renderSideBar(action.parent);
        console.log('RENDER_SIDEBAR');
        break;
      default:
        break;
    }
  }
}

export const sideBarStore = new SideBarStore();
