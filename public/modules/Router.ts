import { notifier } from './Notifier.js';

const contentElement = document.querySelector('main');

class Router {
  start() {
    const url = new URL(window.location.href);
    notifier(url, '', decodeURIComponent(this.parseUrl(url.pathname).additionalUrl));

    window.onpopstate = (e) => {
      if (e.state) {
        notifier(new URL(window.location.href), e.state.data, e.state.additionalUrl);
      } else {
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
        notifier(new URL(window.location.href));
      }
    };
  }

  go(path: any, data: any, additionalUrl: any) {
    let url;
    if (additionalUrl) {
      url = new URL(`${path}/${additionalUrl}`, window.location.href);
    } else {
      url = new URL(path, window.location.href);
    }

    if (window.location.pathname === url.pathname && url.searchParams.toString() === '') return;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
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
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
      notifier(url, data);
      window.history.pushState(data, path, path);
    }
  }

  popstate() {
    window.history.back();
    const url = new URL(window.location.href);
    notifier(url, {}, this.parseUrl(url.pathname).additionalUrl);
  }

  parseUrl(url: any) {
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
