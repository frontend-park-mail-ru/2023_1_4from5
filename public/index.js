import './index.css';

import { startPage } from './components/startPage/startPage.js';
import { sideBar } from './components/sideBar/sideBar.js';
import { Register } from './components/register/reg.js';
import { request } from './modules/request.js';
import { authStore } from './store/authStore.js';
import { userStore } from './store/userStore.js';
import { Actions } from './actions/actions.js';
import { startStore } from './store/startStore.js';
import { sideBarStore } from './store/sideBarStore.js';
import { winSettingsStore } from './store/winsettingsStore.js';
import { winSettings } from './components/winSettings/winSettings.js';
import { regStore } from './store/regStore.js';
import { settingsStore } from './store/settingsStore.js';
import { myPageStore } from './store/myPageStore.js';
import { donateWinStore } from './store/donateWinStore.js';
import { router } from './modules/Router.js';

begin();

async function begin() {
  await startStore.start();
  router.start();
}
