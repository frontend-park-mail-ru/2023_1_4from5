import { Actions } from '../actions/actions.js';
import { settingsStore } from '../components/settings/settingsStore.js';
import { authorPageStore } from '../components/authorPage/authorPageStore.js';
import { userStore } from '../components/user/userStore';
import { router } from './Router';
import { newPostStore } from '../components/newPost/newPostStore';
import { searchStore } from '../components/search/searchStore';
import { page404 } from '../components/page404/page404';
import { feedStore } from '../components/feed/feedStore';
import { authorPage } from '../components/authorPage/authorPage';
import { post } from '../components/post/post';
import { postStore } from '../components/post/postStore';

export const URLS = {
  root: '/',
  myPage: '/creatorPage',
  settings: '/settings',
  subscriptions: '/subscriptions',
  newPost: '/newPost',
  editPost: '/editPost',
  search: '/search',
  feed: '/feed',
  post: '/post',
};

export function notifier(path, data, additionalUrl) {
  switch (path.pathname) {
    case URLS.root:
      Actions.renderStartPage();
      break;

    case URLS.myPage:
      if (userStore.getUserState().isAuthorizedIn) {
        authorPage.setSubsPos(0);
        authorPageStore.renderMyPage();
      } else {
        router.go('/', data, parent);
      }
      break;

    case `${URLS.myPage}/${additionalUrl}`:
      authorPage.setSubsPos(0);
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

    case `${URLS.post}/${additionalUrl}`:
      postStore.renderPost(additionalUrl);
      break;

    default:
      page404.render();
      break;
  }
}
