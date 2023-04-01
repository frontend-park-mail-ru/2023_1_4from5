import { Actions } from '../actions/auth.js';
import { userStore } from './userStore.js';
import { ActionTypes } from '../actionTypes/auth.js';
import { dispatcher } from '../dispatcher/dispatcher.js';
import { winSettings } from '../components/winSettings/winSettings.js';

const contentElement = document.querySelector('main');

class WinSettingsStore {
  #config;

  constructor() {
    this.#config = {
      profile: {
        name: 'Моя страница',
        href: '/my_profile',
        id: 'winSetting-profile',
        showDisplay: userStore.getUserState().isAuthorIn, // TODO убрать getuserState
        parent: contentElement,
        render: Actions.renderMyPage,
      },
      finance: {
        name: 'Мои доходы',
        href: '/finance',
        id: 'winSetting-finance',
        showDisplay: userStore.getUserState().isAuthorIn,
        parent: contentElement,
        render() {
          console.log('Мои доходы');
        },
      },
      settings: {
        name: 'Настройки',
        href: '/settings',
        id: 'winSetting-settings',
        showDisplay: true,
        parent: contentElement,
        render: Actions.renderSettings,
      },
      logout: {
        name: 'Выйти',
        href: '/startPage',
        id: 'winSetting-startPage',
        showDisplay: true,
        parent: contentElement,
        render: Actions.logout,
      },
    };
    dispatcher.register(this.reduce.bind(this));
  }

  setState(user) {
    this.#config.profile.showDisplay = user.isAuthorIn;
    this.#config.finance.showDisplay = user.isAuthorIn;
  }

  reduce(action) {
    switch (action.type) {
      case ActionTypes.RENDER_WINSETTINGS:
        this.setState(userStore.getUserState());
        winSettings.config = this.#config;
        winSettings.render();
        break;

      default:
        break;
    }
  }
}

export const winSettingsStore = new WinSettingsStore();
