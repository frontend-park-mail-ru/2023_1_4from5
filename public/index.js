import './index.css';

import { startPage } from './components/startPage/startPage.js';
import { sideBar } from './components/sideBar/sideBar.js';
import { Register } from './components/register/reg.js';
import { request } from './modules/request.js';
import { authStore } from './store/authStore.js';
import { userStore } from './store/userStore.js';
import { Actions } from './actions/auth.js';
import { startStore } from './store/startStore.js';
import { sideBarStore } from './store/sideBarStore.js';
import { winSettingsStore } from './store/winsettingsStore.js';
import { winSettings } from './components/winSettings/winSettings.js';
import { regStore } from './store/regStore.js';
import { settingsStore } from './store/settingsStore.js';
import { myPageStore } from './store/myPageStore.js';
import { router } from './modules/Router.js';

begin();

async function begin() {
  await startStore.start();
  router.start();
}

// TODO основные экраны

// TODO тех. требования

// TODO question: add to .gitignore .babelrc?

// TODO не работает авторизация на Хроме (возможно только на локальном сервере)

// TODO для поключения scss and acss в webpack в конфиге читать https://habr.com/ru/articles/701724/#загрузка-стилей-в-webpack
