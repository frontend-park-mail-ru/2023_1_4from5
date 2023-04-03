import { startPage } from '../components/startPage/startPage.js';
import { myPage } from '../components/myPage/myPage.js';
import { settings } from '../components/settings/settings.js';

export const URLS = {
  root: '/',
  myPage: '/myPage',
  settings: '/settings',
  auth: '/auth',
  register: '/reg',
};
export function notifier(path) {
  switch (path.pathname) {
    case URLS.root:
      startPage.render();
      console.log('root');
      break;
    case URLS.myPage:
      myPage.render();
      console.log('myPage');
      break;
    case URLS.settings:
      settings.render();
      console.log('settings');
      break;
    case URLS.auth:
      console.log('auth');
      break;
    case URLS.register:
      console.log('reg');
      break;
    default:
      console.log('undefined url');
      break;
  }
}
