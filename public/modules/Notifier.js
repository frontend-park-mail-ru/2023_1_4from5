import { Actions } from '../actions/actions.js';
import { settingsStore } from '../store/settingsStore.js';
import { myPageStore } from '../store/myPageStore.js';
import { userStore } from '../store/userStore';
import { router } from './Router';
import { newPostStore } from '../store/newPostStore';
import { searchStore } from '../store/searchStore';
import { becameAuthorStore } from '../store/becomeAuthorStore';
import { page404 } from '../components/page404/page404';

export const URLS = {
  root: '/',
  myPage: '/creatorPage',
  settings: '/settings',
  authorSettings: '/authorSettings',
  newPost: '/newPost',
  editPost: '/editPost',
  search: '/search',
  becomeAuthor: '/becomeAuthor',
};

export function notifier(path, data, additionalUrl) {
  switch (path.pathname) {
    case URLS.root:
      Actions.renderStartPage();
      break;

    case URLS.myPage:
      if (userStore.getUserState().isAuthorizedIn) {
        myPageStore.renderMyPage();
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

    case URLS.becomeAuthor:
      becameAuthorStore.renderBecomeAuthor();
      break;

    case URLS.authorSettings:
      console.log('authorSettings');
      break;

    default:
      page404.render();
      break;
  }
}
