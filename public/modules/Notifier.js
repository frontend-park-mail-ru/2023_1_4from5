import { Actions } from '../actions/actions.js';
import { settingsStore } from '../components/settings/settingsStore.js';
import { authorPageStore } from '../components/authorPage/authorPageStore.js';
import { userStore } from '../components/user/userStore';
import { router } from './Router';
import { newPostStore } from '../components/newPost/newPostStore';
import { searchStore } from '../components/search/searchStore';
import { page404 } from '../components/page404/page404';
import { feedStore } from '../components/feed/feedStore';

export const URLS = {
  root: '/',
  myPage: '/creatorPage',
  settings: '/settings',
  subscriptions: '/subscriptions',
  newPost: '/newPost',
  editPost: '/editPost',
  search: '/search',
  feed: '/feed',
};

export function notifier(path, data, additionalUrl) {
  switch (path.pathname) {
    case URLS.root:
      Actions.renderStartPage();
      break;

    case URLS.myPage:
      if (userStore.getUserState().isAuthorizedIn) {
        authorPageStore.renderMyPage();
      } else {
        router.go('/', data, parent);
      }
      break;

    case `${URLS.myPage}/${additionalUrl}`:
      authorPageStore.renderMyPage(additionalUrl);
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
      console.log('update router')
      newPostStore.renderUpdatingPost(additionalUrl);
      break;

    case URLS.search:
      if (!data) {
        searchStore.renderSearch();
      }
      break;

    case URLS.subscriptions:
      Actions.renderSubscriptions();
      break;

    case URLS.feed:
      feedStore.renderFeed();
      break;

    default:
      page404.render();
      break;
  }
}
