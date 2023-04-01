import { sideBar } from './components/sideBar/sideBar.js';
import { startPage } from './components/startPage/startPage.js';
import { Register } from './components/register/reg.js';
import { request } from './modules/request.js';
import { authStore } from './store/authStore.js'; // не удалять!!! он создает authStore!!! (потом починим)
import { userStore } from './store/userStore.js';
import { Actions } from './actions/auth.js';
import { startStore } from './store/startStore.js';
import { sideBarStore } from "./store/sideBarStore.js"; // не удалять!!! он создает sidebarStore!!! (потом починим)
import { winSettingsStore } from './store/winsettingsStore.js';
import { winSettings } from './components/winSettings/winSettings.js';
import { regStore } from './store/regStore.js';
import { settingsStore } from './store/settingsStore.js';
import { myPageStore } from './store/myPageStore.js';

window.activePage = '';
Actions.start();

// TODO роутер (MDN)
// TODO вебпак
// TODO основные экраны

// TODO тех. требования
