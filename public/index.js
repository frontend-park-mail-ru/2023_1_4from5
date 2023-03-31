import { MyPage } from './components/myPage/myPage.js';
import { Register } from './components/register/reg.js';
import { Settings } from './components/settings/settings.js';
import { sideBar } from './components/sideBar/sideBar.js';
import { constructConfig } from './modules/constructConfig.js';
import { setConfig } from './consts/constants.js';
import { request } from './modules/request.js';
import { authStore } from './store/authStore.js'; // не удалять!!! он создает authStore!!! (потом починим)
import { sideBarStore } from "./store/sideBarStore.js"; // не удалять!!! он создает sidebarStore!!! (потом починим)
import { userStore } from './store/userStore.js';
import { Actions } from './actions/auth.js';
import { startStore } from './store/startStore.js';
import { winSettingsStore } from './store/winsettingsStore.js';
import { winSettings } from './components/winSettings/winSettings.js';

const rootElement = document.getElementById('root');
const sideBarElement = document.querySelector('sideBar');
const contentElement = document.querySelector('main');

const userIn = userStore.getUserState();
window.activePage = '';

const config = setConfig({
  userIn,
  contentElement,
  rootElement,
  renderRegister,
  renderWinSettings,
  clickMyPage,
  renderSettings,
  renderStartPage,
});

/**
 * rendering registration
 * @param {HTMLElement} parent - parent of registration window
 *
 * @returns {}
 */
function renderRegister(parent) {
  const reg = new Register(parent);
  reg.config = config;
  reg.render();

  const background = document.getElementById('backReg');
  background.addEventListener('click', (e) => {
    e.preventDefault();
    reg.removeReg();
  });
  reg.registration(async (result, request) => {
    if (result.login.length > 0) {
      const getPage = await request.get('/api/user/homePage');
      const result = await getPage.json();
      userIn.usernameIn = result.name;
      userIn.isAuthorIn = result.is_creator;
      userIn.isAuthorizedIn = true;
      userIn.authorURL = result.creator_id;
      Actions.renderSideBar(sideBarElement, userIn);
      reg.removeReg();
    }
  });
}

/**
 * rendering SideBar
 * @param {HTMLElement} parent - parent of SideBar window
 *
 * @returns {}
 */
// TODO проблема: используем эту функцию в нескольких сторах
// export function renderSideBar() {
//   console.log(userIn);
//   constructConfig(config, userIn);
//   sideBar.config = config;
//   sideBar.render();
// }

/**
 * rendering StartPage
 * @param {HTMLElement} parent - parent of StartPage window
 *
 * @returns {}
 */
function renderStartPage(parent) {
  const startPage = new StartPage(parent);
  startPage.render();
}

/**
 * rendering modal window with settings
 * @param {HTMLElement} parent - parent of WinSettings window
 *
 * @returns {}
 */
function renderWinSettings(parent) {
  const win = new WinSettings(parent);
  win.config = config;
  win.render();
}

/**
 * rendering Settings
 * @param {HTMLElement} parent - parent of Settings window
 *
 * @returns {}
 */
function renderSettings(parent) {
  const settings = new Settings(parent);
  settings.config = config;
  settings.render();
}

/**
 * rendering authors page
 * @param {HTMLElement} parent - parent of MyPage window
 * @param {Object} config - information about author
 *
 * @returns {}
 */
function renderMyPage(parent, config) {
  const myPage = new MyPage(parent);
  myPage.config = config;
  myPage.render();
}

/**
 * request before rendering authors page
 * @param {HTMLElement} parent - parent of MyPage window
 *
 * @returns {}
 */
export async function clickMyPage(parent) {
  const creatorPage = await request.get(`/api/creator/page/${config.user.authorURL}`);
  const result = await creatorPage.json();
  result.posts.forEach((post) => {
    const textArr = post.text.split('\\n');
    post.textWithBreaks = [];
    textArr.forEach((text) => {
      post.textWithBreaks.push({ text });
    });
  });
  renderMyPage(parent, result);
}

Actions.start();
