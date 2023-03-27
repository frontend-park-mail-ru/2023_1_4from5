import { dispatcher } from '../dispatcher/dispatcher';
import { ActionTypes } from '../actionTypes/auth';
import { request } from '../modules/request';
import { renderSideBar } from '../index';

export class SideBarStore {
  #config;

  constructor() {
    this.#config = {
      pages: [
        {
          name: 'Лента',
          href: '/feed',
          id: 'sidebar-feed',
          showDisplay: userIn.isAuthorizedIn,
          parent: contentElement,
          render: renderStartPage,
        },
        {
          name: 'Поиск авторов',
          href: '/find',
          id: 'sidebar-find',
          showDisplay: true,
          parent: contentElement,
          render: renderStartPage,
        },
        {
          name: 'Мои подписки',
          href: '/subs',
          id: 'sidebar-subs',
          showDisplay: userIn.isAuthorizedIn,
          parent: contentElement,
          render() {
            console.log('Мои подписки');
          },
        },
        {
          name: 'Регистрация',
          href: '/register',
          id: 'sidebar-reg',
          showDisplay: !userIn.isAuthorizedIn,
          parent: rootElement,
          render: renderRegister,
        },
        {
          name: 'Войти',
          href: '/auth',
          id: 'sidebar-auth',
          showDisplay: !userIn.isAuthorizedIn,
          parent: rootElement,
          render() {
            console.log('Войти');
          },
        },
        {
          name: 'Стать автором',
          href: '/beAuthor',
          id: 'sidebar-beAuthor',
          showDisplay: userIn.isAuthorizedIn * !userIn.isAuthorIn,
          parent: contentElement,
          render: renderStartPage,
        },
        {
          name: userIn.usernameIn,
          href: '/modalWindow',
          id: 'sidebar-modalWindow',
          showDisplay: userIn.isAuthorizedIn,
          parent: contentElement,
          render: renderWinSettings,
        },
      ],
    };
    dispatcher.register(this.reduce.bind(this));
    console.log('register userStore');
  }

  getUserState() {
    return this.#user;
  }

  setState(result) {
    this.#user.usernameIn = result.name;
    this.#user.isAuthorIn = result.is_creator;
    this.#user.isAuthorizedIn = true;
    this.#user.authorURL = result.creator_id;
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.GET_USER:
        const getPage = await request.get('/api/user/homePage');
        const result = await getPage.json();
        this.setState(result);
        renderSideBar(sideBarElement);
        console.log('GET_USER');
        break;
      default:
        break;
    }
  }
}

export const sideBarStore = new SideBarStore();
