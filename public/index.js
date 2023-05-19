import './index.css';

import { startPage } from './components/startPage/startPage.js';
import { sideBar } from './components/sideBar/sideBar.js';
import { Register } from './components/register/reg.js';
import { request } from './modules/request.js';
import { authStore } from './components/authorization/authStore.js';
import { userStore } from './components/user/userStore.js';
import { Actions } from './actions/actions.js';
import { subscriptions } from './components/subscriptions/subscriptions';
import { becameAuthor } from './components/becomeAuthor/becomeAuthor';
import { post } from './components/post/post';

import { startStore } from './components/startPage/startStore.js';
import { sideBarStore } from './components/sideBar/sideBarStore.js';
import { winSettingsStore } from './components/winSettings/winsettingsStore.js';
import { winSettings } from './components/winSettings/winSettings.js';
import { regStore } from './components/register/regStore.js';
import { settingsStore } from './components/settings/settingsStore.js';
import { authorPageStore } from './components/authorPage/authorPageStore.js';
import { donateWinStore } from './components/donateWin/donateWinStore.js';
import { subscriptionStore } from './components/subscription/subscriptionStore';
import { aim } from './components/aim/aim';
import { getSubscription } from './components/getSubscription/getSubscription';
import { subscriptionsStore } from './components/subscriptions/subscriptionsStore';
import { becameAuthorStore } from './components/becomeAuthor/becomeAuthorStore';
import { postStore } from './components/post/postStore';
import { router } from './modules/Router.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
    .catch((err) => {
      console.log('SW ERR: ', err);
    });
}

async function begin() {
  await startStore.start();
  router.start();
}

begin();
