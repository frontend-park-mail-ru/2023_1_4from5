class Router {
  start() {
    const url = new URL(window.location.href); // это встроенный класс
    notifier(url);

    window.onpopstate = () => {
      notifier(new URL(window.location.href));
    };
  }

  go(_path, _data) {
    const url = new URL(_path, window.location.href);
    if (window.location.pathname === _path && url.searchParams.toString() === '') return;
    if (_data) {
      url.searchParams.append('id', _data);
    }
    notifier(url);
    this.#pushHistoryState(_path, { _data });
  }

  // нужен если на странице делать кнопку назад
  popstate() {
    window.history.back();
    const url = new URL(window.location.href);
    notifier(url);
  }

  pushHistoryState(_path, _data) {
    this.#pushHistoryState(_path, { _data });
  }

  #pushHistoryState(_path, _data) {
    window.history.pushState(_data, _path, _path);
  }
}

export const router = new Router();
