import { sideBar } from './components/sideBar/sideBar.js';
import { startPage } from './components/startPage/startPage.js';
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

router.start();

// TODO роутер (MDN)
// TODO вебпак
// TODO основные экраны

// TODO тех. требования

// TODO вопросы к Саше
/** -----------------------------------------------------------------------------------------------|
 * как решить проблему с урлами авторизации и регистрации (скорее всего 1 варик)
 * >> 1) не делать урлы для регистрации и авторизации
 *        (как будто модальные окна) <-- бля отвечаю так делают ВК образование и бусти
 * 2) сделать ЁБНУТЫЙ чек предыдущего улра, чтобы отрисовать стартовую страничку либо поиска авторов
 * 3) рисовать стартовую страничку по дефолту
 * ------------------------------------------------------------------------------------------------|
 * что делать с ошибкой 404 при изменении урла?
 */
