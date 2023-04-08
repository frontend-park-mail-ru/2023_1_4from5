import { notifier, URLS } from './Notifier.js';

class Router {
  // стартовая функция
  start() {
    const url = new URL(window.location.href); // это встроенный класс
    notifier(url);

    window.onpopstate = (e) => {
      if (e.state) {
        notifier(new URL(window.location.href), e.state.data, {}, e.state.additionalUrl);
      } else {
        notifier(new URL(window.location.href));
      }
    };
  }

  // переход на страницу
  go(path, data, parent, additionalUrl) {
    let url;
    if (additionalUrl) {
      url = new URL(`${path}/${additionalUrl}`, window.location.href);
    } else {
      url = new URL(path, window.location.href);
    }

    if (window.location.pathname === path && data !== 'logout' && url.searchParams.toString() === '') return;
    if (parent) {
      parent.innerHTML = '';
    }
    if (data) {
      url.searchParams.append('id', data);
    }

    if (additionalUrl) {
      notifier(url, data, parent, additionalUrl);
      window.history.pushState({ data, additionalUrl }, path, `${path}/${additionalUrl}`);
    } else {
      notifier(url, data, parent);
      window.history.pushState(data, path, path);
    }
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
