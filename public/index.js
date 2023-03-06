import Auth from './components/authorization/auth.js';
import MyPage from './components/myPage/myPage.js';
import Register from './components/register/reg.js';
import Settings from './components/settings/settings.js';
import SideBar from './components/sideBar/sideBar.js';
import StartPage from "./components/startPage/startPage.js";
import WinSettings from './components/winSettings/winSettings.js';
import Request from "./modules/request.js";

import { constructConfig } from './modules/constructConfig.js';

import { setConfig } from "./consts/constants.js";

const rootElement = document.getElementById('root');
const sideBarElement = document.createElement('sideBar');
const contentElement = document.createElement('main');
rootElement.appendChild(sideBarElement);
rootElement.appendChild(contentElement);

const userIn = {
    loginIn: '',
    usernameIn: '',
    authorURL: '',
    isAuthorIn: false,
    isAuthorizedIn: false,
};

const config =
    setConfig({
    userIn, contentElement, rootElement, renderRegister, renderAuth,
    renderWinSettings, clickMyPage, renderSettings, logout, renderStartPage
});

/**
 * First request for entering with cookies
 * @param {}
 *
 * @returns {}
 */
async function enterRequest() {
    const req = new Request();

    try {
        const response = await req.get(`/api/user/profile`);
        const result = await response.json();
        if (result.login) {
            userIn.usernameIn = result.name;
            userIn.isAuthorizedIn = true;

            const getPage = await req.get(`/api/user/homePage`);
            const userHomePage = await getPage.json();
            userIn.authorURL = userHomePage.creator_id;
            userIn.isAuthorIn = userHomePage.is_creator;
            renderSideBar(sideBarElement);
            renderStartPage(contentElement);
        }
    }
    catch (err) {
        renderSideBar(sideBarElement);
        renderStartPage(contentElement);
        console.log(err);
    }
}

/**
 * rendering authorization
 * @param {HTMLElement} parent - parent of authorization window
 *
 * @returns {}
 */
function renderAuth(parent) {
    const auth = new Auth(parent);
    auth.config = config;
    auth.render();

    const closeBtn = document.getElementById('closeAuth');
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-use-before-define
        auth.removeAuth();
    });
    // eslint-disable-next-line no-use-before-define
    auth.authentification((result, req) => {
        if (result.login.length > 0) {
            req.get(`/api/user/homePage`)
                .then((response) => response.json())
                .then((result) => {
                    userIn.usernameIn = result.name;
                    userIn.isAuthorIn = result.is_creator;
                    userIn.isAuthorizedIn = true;
                    userIn.authorURL = result.creator_id;
                    renderSideBar(sideBarElement);
                    auth.removeAuth();
                })}
    });
}

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

    const closeBtn = document.getElementById('closeReg');
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        reg.removeReg();
    });
    reg.registration((result, req) => {
        if (result.login.length > 0) {
            req.get(`/api/user/homePage`)
                .then((response) => response.json())
                .then((result) => {
                    userIn.usernameIn = result.name;
                    userIn.isAuthorIn = result.is_creator;
                    userIn.isAuthorizedIn = true;
                    userIn.authorURL = result.creator_id;

                    renderSideBar(sideBarElement);
                    reg.removeReg();
                })
        }
    });
}

/**
 * log out
 * @param {}
 *
 * @returns {}
 */
function logout() {
    const req = new Request();
    req.get(`/api/auth/logout`)
    .then(() => {
        userIn.loginIn = '';
        userIn.usernameIn = '';
        userIn.isAuthorIn = false;
        userIn.isAuthorizedIn = false;
        renderSideBar(sideBarElement);
        renderStartPage(contentElement);
    })
}

/**
 * rendering SideBar
 * @param {HTMLElement} parent - parent of SideBar window
 *
 * @returns {}
 */
function renderSideBar(parent) {
    const sideBar = new SideBar(parent);
    constructConfig(config, userIn);
    sideBar.config = config;
    sideBar.render();
}

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
function clickMyPage(parent) {
    const req = new Request();
    req.get(`/api/creator/page/${config.user.authorURL}`)
    .then((response) => response.json())
    .then((config) => {
        renderMyPage(parent, config);
    })
    .catch((err) => {
        console.log(err);
        renderMyPage(parent, config);
    });
}

/**
 * start function
 * @param {}
 *
 * @returns {}
 */
function enter() {
    enterRequest();
}

enter();
