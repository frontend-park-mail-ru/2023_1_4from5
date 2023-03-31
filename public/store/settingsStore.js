import { dispatcher } from '../dispatcher/dispatcher.js';
import { ActionTypes } from '../actionTypes/auth.js';
import { settings } from '../components/settings/settings.js';
import { userStore } from './userStore.js';

class SettingsStore {
  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  reduce(action) {
    switch (action.type) {
      case ActionTypes.RENDER_SETTINGS:
        settings.config = userStore.getUserState();
        settings.render();
        break;
      default:
        break;
    }
  }
}

export const settingsStore = new SettingsStore();
