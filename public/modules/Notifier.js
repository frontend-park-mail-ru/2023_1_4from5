import { Actions } from '../actions/actions.js';
import { settingsStore } from '../store/settingsStore.js';
import { myPageStore } from '../store/myPageStore.js';
import { userStore } from '../store/userStore';
import { router } from './Router';
import { newPostStore } from '../store/newPostStore';
import { searchStore } from '../store/searchStore';

export const URLS = { // TODO урлы в отдельный файл
  root: '/',
  myPage: '/myPage',
  settings: '/settings',
  newPost: '/newPost',
  editPost: '/editPost',
  search: '/search',
};

export function notifier(path, data, parent, additionalUrl) {
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

    case `${URLS.myPage}/${additionalUrl}`:
      myPageStore.renderMyPage(additionalUrl);
      break;

    case URLS.settings:
      if (userStore.getUserState().isAuthorizedIn) {
        settingsStore.renderSettings();
      } else {
        router.go('/', data, parent);
      }
      break;

    case URLS.newPost:
      newPostStore.renderNewPost();
      break;

    case `${URLS.editPost}/${additionalUrl}`:
      newPostStore.renderUpdatingPost(additionalUrl);
      break;

    case URLS.search:
      searchStore.renderSearch();
      break;

    default:
      console.log('undefined url: ', path.pathname); // TODO page 404
      break;
  }
}
