import { Actions } from '../../actions/actions.js';
import { userStore } from '../user/userStore.js';
import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { dispatcher } from '../../dispatcher/dispatcher.js';
import { winSettings } from './winSettings.js';
import { router } from '../../modules/Router.js';
import { URLS } from '../../modules/Notifier.js';
import { sideBarStore } from '../sideBar/sideBarStore';

const contentElement = document.querySelector('main');

class WinSettingsStore {
  #config;

  constructor() {
    this.#config = {
      profile: {
        name: 'Моя страница',
        href: URLS.myPage,
        id: 'winSetting-profile',
        showDisplay: userStore.getUserState().isAuthorIn,
        parent: contentElement,
        render: router.go,
      },
      finance: {
        name: 'Мои доходы',
        href: '/finance',
        id: 'winSetting-finance',
        showDisplay: userStore.getUserState().isAuthorIn,
        parent: contentElement,
        render: router.go,
      },
      settings: {
        name: 'Настройки',
        href: URLS.settings,
        id: 'winSetting-settings',
        showDisplay: userStore.getUserState().isAuthorizedIn,
        parent: contentElement,
        render: router.go,
      },
      logout: {
        name: 'Выйти',
        href: URLS.root,
        id: 'winSetting-startPage',
        showDisplay: userStore.getUserState().isAuthorizedIn,
        parent: contentElement,
        render: Actions.logout,
      },
    };
    dispatcher.register(this.reduce.bind(this));
  }

  setState(user: any) {
    this.#config.profile.showDisplay = user.isAuthorIn;
    this.#config.finance.showDisplay = user.isAuthorIn;
    this.#config.settings.showDisplay = user.isAuthorizedIn;
    this.#config.logout.showDisplay = user.isAuthorizedIn;
  }

  reduce(action: any) {
    switch (action.type) {
      case ActionTypes.RENDER_WINSETTINGS:
        this.setState(userStore.getUserState());
        const sidebarState = sideBarStore.getState();

        winSettings.config = Object.assign(this.#config, sidebarState);
        winSettings.render();
        break;

      case ActionTypes.REMOVE_WINSETTINGS:
        winSettings.removeWinSettings();
        break;

      default:
        break;
    }
  }
}

export const winSettingsStore = new WinSettingsStore();
