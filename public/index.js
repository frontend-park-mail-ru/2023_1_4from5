import './index.css';

import { startPage } from './components/startPage/startPage.js';
import { sideBar } from './components/sideBar/sideBar.js';
import { Register } from './components/register/reg.js';
import { request } from './modules/request.js';
import { authStore } from './components/authorization/authStore.js';
import { userStore } from './components/user/userStore.js';
import { Actions } from './actions/actions.js';
import { startStore } from './components/startPage/startStore.js';
import { sideBarStore } from './components/sideBar/sideBarStore.js';
import { winSettingsStore } from './components/winSettings/winsettingsStore.js';
import { winSettings } from './components/winSettings/winSettings.js';
import { regStore } from './components/register/regStore.js';
import { settingsStore } from './components/settings/settingsStore.js';
import { myPageStore } from './components/myPage/myPageStore.js';
import { donateWinStore } from './components/donateWin/donateWinStore.js';
import { router } from './modules/Router.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../sw.js', { scope: '/' })
    .then(() => {
      console.log('SW registered');
    })
    .catch(() => {
      console.log('SW ERR');
    });
}

async function begin() {
  await startStore.start();
  router.start();
}

begin();
