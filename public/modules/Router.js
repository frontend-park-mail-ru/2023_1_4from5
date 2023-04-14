import { notifier } from './Notifier.js';

const contentElement = document.querySelector('main');

class Router {
  start() {
    const url = new URL(window.location.href);
    notifier(url, {}, this.parseUrl(url.pathname).additionalUrl);

    window.onpopstate = (e) => {
      if (e.state) {
        notifier(new URL(window.location.href), e.state.data, e.state.additionalUrl);
      } else {
        notifier(new URL(window.location.href));
      }
    };
  }

  go(path, data, additionalUrl) {
    let url;
    if (additionalUrl) {
      url = new URL(`${path}/${additionalUrl}`, window.location.href);
    } else {
      url = new URL(path, window.location.href);
    }

    // TODO разобраться, что такое url.searchParams.toString() === ''
    if (window.location.pathname === path && data !== 'logout' && url.searchParams.toString() === '') return;
    contentElement.innerHTML = '';

    if (data) {
      url.searchParams.append('id', data);
    }

    if (additionalUrl) {
      notifier(url, data, additionalUrl);
      window.history.pushState({
        data,
        additionalUrl,
      }, path, `${path}/${additionalUrl}`);
    } else {
      notifier(url, data);
      window.history.pushState(data, path, path);
    }
  }

  popstate() {
    window.history.back();
    const url = new URL(window.location.href);
    notifier(url, {}, this.parseUrl(url.pathname).additionalUrl);
  }

  pushHistoryState(_path, _data) {
    this.#pushHistoryState(_path, { _data });
  }

  #pushHistoryState(_path, _data) {
    window.history.pushState(_data, _path, _path);
  }

  parseUrl(url) {
    let countSlash = 0;
    let method = '/';
    let additionalUrl = '';
    for (let i in url) {
      if (url[i] === '/') {
        countSlash++;
      } else {
        if (countSlash === 1) {
          method += url[i];
        }
        if (countSlash === 2) {
          additionalUrl += url[i];
        }
      }
    }
    return {
      method,
      additionalUrl,
    };
  }
}

export const router = new Router();
