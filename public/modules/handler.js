import { Actions } from '../actions/auth.js';

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
    if (!(target.name === 'Регистрация' || target.name === 'Войти' || target.name === config.modalWindow.name)) {
      target.parent.innerHTML = '';
    }
    window.activePage = target.name;
    // target.render(target.parent);
    if (target.name === 'Войти') {
      Actions.renderAuth();
    }
  }
}
