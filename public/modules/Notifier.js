import { Actions } from '../actions/auth.js';
import { settingsStore } from '../store/settingsStore.js';
import { myPageStore } from '../store/myPageStore.js';
import { userStore } from '../store/userStore';
import { router } from './Router';

export const URLS = { // TODO урлы в отдельный файл
  root: '/',
  myPage: '/my_profile',
  settings: '/settings',
};

export function notifier(path, data, parent) {
  switch (path.pathname) {
    case URLS.root:
      console.log('notifier');
      // TODO BAD action in notifier
      Actions.renderStartPage();
      console.log('root');
      break;

    case URLS.myPage:
      if (userStore.getUserState().isAuthorizedIn) {
        myPageStore.renderMyPage(); // TODO асинхронная функция без await + есть связь router-store
      } else {
        router.go('/', data, parent);
      }
      console.log('myPage');
      break;

    case URLS.settings:
      console.log(userStore.getUserState().isAuthorizedIn);
      if (userStore.getUserState().isAuthorizedIn) {
        settingsStore.renderSettings();
      } else {
        router.go('/', data, parent);
      }
      console.log('settings');
      break;

    default:
      console.log('undefined url'); // TODO page 404
      break;
  }
}
