import { Actions } from '../actions/auth.js';
import { request } from './request.js';
import { userStore } from '../store/userStore.js';
import { myPage } from '../components/myPage/myPage.js';
import { settingsStore } from '../store/settingsStore.js';
import { myPageStore } from '../store/myPageStore.js';
import { startStore } from '../store/startStore.js';

export const URLS = { // TODO урлы в отдельный файл
  root: '/',
  myPage: '/my_profile',
  settings: '/settings',
};

export function notifier(path) {
  switch (path.pathname) {
    case URLS.root:
      console.log('notifier');
      startStore.start();
      console.log('root');
      break;
    case URLS.myPage:
      myPageStore.renderMyPage(); // TODO асинхронная функция без await + есть связь router-store
      console.log('myPage');
      break;

    case URLS.settings:
      settingsStore.renderSettings();
      console.log('settings');
      break;

    default:
      console.log('undefined url');
      break;
  }
}
