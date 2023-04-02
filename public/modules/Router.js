import { notifier } from './Notifier.js';

class Router {
  // стартовая функция
  start() {
    console.log(1);
    const url = new URL(window.location.href); // это встроенный класс
    notifier(url);

    window.onpopstate = () => {
      notifier(new URL(window.location.href));
    };
  }

  // переход на страницу
  go(_path, _data) {
    const url = new URL(_path, window.location.href);
    if (window.location.pathname === _path && url.searchParams.toString() === '') return;
    if (_data) {
      url.searchParams.append('id', _data);
    }
    notifier(url);
    this.#pushHistoryState(_path, { _data });
  //   тут наверное еще можно вызывать window.dispatchEvent(new Event('popstate'));
  }

  // нужен если на странице делать кнопку назад
  popstate() { // АХУЕТЬ это так работает? << нет, это не работает(
    console.log(1);
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
