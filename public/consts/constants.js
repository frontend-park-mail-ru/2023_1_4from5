import { Actions } from '../actions/auth.js';

/**
 * sets configuration for source-object
 * @param {Object} - object of settings
 *
 * @returns {Object} - configuration object
 */
export function setConfig({
  userIn,
  contentElement,
  rootElement,
  renderWinSettings,
  clickMyPage,
  renderSettings,
  renderStartPage,
}) {
  return {
    general: {
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
          // render: renderRegister,
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
    },
    setting: {
      pages: [
        {
          name: 'Моя страница',
          href: '/my_profile',
          id: 'winSetting-profile',
          showDisplay: userIn.isAuthorIn,
          parent: contentElement,
          render: clickMyPage,
        },
        {
          name: 'Мои доходы',
          href: '/finance',
          id: 'winSetting-finance',
          showDisplay: userIn.isAuthorIn,
          parent: contentElement,
          render() {
            console.log('Мои доходы');
          },
        },
        {
          name: 'Настройки',
          href: '/settings',
          id: 'winSetting-settings',
          showDisplay: true,
          parent: contentElement,
          render: renderSettings,
        },
        {
          name: 'Выйти',
          href: '/startPage',
          id: 'winSetting-startPage',
          showDisplay: true,
          parent: contentElement,
          render: Actions.logout,
        },
      ],
    },
    user: {
      login: '',
      username: '',
      authorURL: '',
      isAuthor: false,
      isAuthorized: false,
    },
    activePage: '',
  };
}
