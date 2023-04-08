import { notifier, URLS } from './Notifier.js';

class Router {
  // стартовая функция
  start() {
    const url = new URL(window.location.href); // это встроенный класс
    notifier(url);

    window.onpopstate = () => {
      notifier(new URL(window.location.href));
    };
  }

  // переход на страницу
  go(path, data, parent) {
    const url = new URL(path, window.location.href);
    if (window.location.pathname === path && data !== 'logout' && url.searchParams.toString() === '') return;
    if (parent) {
      parent.innerHTML = '';
    }
    if (data) {
      url.searchParams.append('id', data);
    }
    notifier(url, data, parent);
    window.history.pushState(data, path, path);
    //   тут наверное еще можно вызывать window.dispatchEvent(new Event('popstate'));
  }

  // нужен если на странице делать кнопку назад
  popstate() {
    window.history.back();
    const url = new URL(window.location.href);
    notifier(url);
  }

  // ЕБАТЬ ГЕНИАЛЬНАЯ ФУНКЦИЯ!?!?!?!?!?
  pushHistoryState(_path, _data) {
    this.#pushHistoryState(_path, { _data });
  }

  #pushHistoryState(_path, _data) {
    window.history.pushState(_data, _path, _path);
  }
}

export const router = new Router();
