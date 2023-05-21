import './index.css';

import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';

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

const firebaseConfig = {
  apiKey: 'AIzaSyCs9v1WpgN0G-GKCBS8whPK2hPzwDiiyfU',
  authDomain: 'subme-ef6b7.firebaseapp.com',
  projectId: 'subme-ef6b7',
  storageBucket: 'subme-ef6b7.appspot.com',
  messagingSenderId: '759387159264',
  appId: '1:759387159264:web:8bfcf46c688a421c586e85',
  measurementId: 'G-RDQS51ZNB6'
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
    .catch((err) => {
      console.log('SW ERR: ', err);
    });
}

getToken(messaging, { vapidKey: 'BATXyq0BC6pv1xAdt7_F9MvESBLVdDRItBugFcktnkC_4pFo04NMvVNkt91enPfP2gjHQ8vpTAO3Dn1Ss98J0d0' }).then((currentToken) => {
  if (currentToken) {
    fetch('https://sub-me.ru/api/subscribeToNotifications/{creator-uuid}', {
      method: 'POST',
      body: JSON.stringify({ token: currentToken }),
    }).finally();
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

async function begin() {
  await startStore.start();
  router.start();
}

begin();
