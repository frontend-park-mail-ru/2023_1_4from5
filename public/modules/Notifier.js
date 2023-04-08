import { Actions } from '../actions/auth.js';
import { settingsStore } from '../store/settingsStore.js';
import { myPageStore } from '../store/myPageStore.js';
import { userStore } from '../store/userStore';
import { router } from './Router';
import { newPostStore } from '../store/newPostStore';

export const URLS = { // TODO урлы в отдельный файл
  root: '/',
  myPage: '/myPage',
  settings: '/settings',
  newPost: '/newPost',
  editPost: '/editPost',
};

export function notifier(path, data, parent) {
  switch (path.pathname) {
    case URLS.root:
      // TODO BAD action in notifier
      Actions.renderStartPage();
      break;

    case URLS.myPage:
      if (userStore.getUserState().isAuthorizedIn) {
        myPageStore.renderMyPage(); // TODO асинхронная функция без await + есть связь router-store
      } else {
        router.go('/', data, parent);
      }
      break;

    case URLS.settings:
      console.log(userStore.getUserState().isAuthorizedIn);
      if (userStore.getUserState().isAuthorizedIn) {
        settingsStore.renderSettings();
      } else {
        router.go('/', data, parent);
      }
      break;

    case URLS.newPost:
      newPostStore.renderNewPost();
      break;

    case URLS.editPost:
      newPostStore.renderUpdatingPost(data.postId, data.title, data.text);
      console.log(data.text);
      console.log('editPost');
      break;

    default:
      console.log('undefined url'); // TODO page 404
      break;
  }
}
