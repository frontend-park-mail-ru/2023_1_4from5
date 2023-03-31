import { Actions } from '../actions/auth.js';
import { userStore } from '../store/userStore.js';

/**
 * function of click handler
 * @param {MouseEvent} event - event
 * @param {Object} configPart - some part of configuration object
 * @param {Object} config - configuration object
 *
 * @returns {}
 */
export function clickHandler(event, config) {
  if (event.target instanceof HTMLAnchorElement) {
    event.preventDefault();
    const targetId = event.target.id;
    let target;
    for (let element in config) {
      if (config[element].id === targetId) {
        target = config[element];
      }
    }

    if (window.activePage === target.name) {
      return;
    }
    if (!(target.id === 'sidebar-reg' || target.id === 'sidebar-auth' || target.id === 'sidebar-modalWindow')) {
      target.parent.innerHTML = '';
    }
    window.activePage = target.name;
    switch (target.id) {
      case 'sidebar-auth':
        Actions.renderAuth();
        break;
      case 'sidebar-modalWindow':
        Actions.renderWinSettings(userStore.getUserState()); // TODO исправить на action
        break;
      case 'winSetting-startPage':
        Actions.logout();
        break;
      default:
        break;
    }
  }
}
