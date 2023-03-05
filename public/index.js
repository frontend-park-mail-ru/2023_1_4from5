import Auth from './components/authorization/auth.js';
import MyPage from './components/myPage/myPage.js';
import Register from './components/register/reg.js';
import Settings from './components/settings/settings.js';
import SideBar from './components/sideBar/sideBar.js';
import StartPage from "./components/startPage/startPage.js";
import WinSettings from './components/winSettings/winSettings.js';
import Request from "./modules/request.js";

import { constructConfig } from './modules/constructConfig.js';
import { isValidLogin, isValidPassword } from './modules/isValid.js';

import { setConfig } from "./consts/constants.js";

// ssh -i 2023-1-4from5-AtRLyZTf.pem ubuntu@95.163.212.32
// http://sub-me.ru:8080


const rootElement = document.getElementById('root');
const sideBarElement = document.createElement('sideBar');
const contentElement = document.createElement('main');
rootElement.appendChild(sideBarElement);
rootElement.appendChild(contentElement);

const userIn = {
    loginIn: '',
    usernameIn: 'Ashan',
    authorURL: '',
    isAuthorIn: false,
    isAuthorizedIn: true,
};

const config =
    setConfig({
    userIn, contentElement, rootElement, renderRegister, renderAuth,
    renderWinSettings, clickMyPage, renderSettings, logout, renderStartPage
});

async function enterRequest() {
    const req = new Request();

    try {
        console.log(1);
    const response = await req.get(`/api/user/profile`);
    console.log(2);
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
        console.log(3);
        renderSideBar(sideBarElement);
        renderStartPage(contentElement);
        console.log(err);
    }
}

function renderAuth(parent) {
    const auth = new Auth(parent);
    auth.render();

    const closeBtn = document.getElementById('closeAuth');
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-use-before-define
        removeAuth();
    });
    // eslint-disable-next-line no-use-before-define
    authentification();
}

function removeAuth() {
    const lastAuth = document.getElementById('authDiv');
    if (lastAuth) {
        lastAuth.remove();
    }
    config.activePage = '';
}

function authentification() {
    const submitBtn = document.getElementById('auth-btn');
    const loginInput = document.getElementById('auth-login');
    const passwordInput = document.getElementById('auth-password');
    const errorOutput = document.getElementById('auth-error');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const login = loginInput.value;
        const password = passwordInput.value;
        const errLogin = isValidLogin(login);
        const errPassword = isValidPassword(password);

        if (!errLogin && !errPassword) {
            const req = new Request();
            req.post(`/api/auth/signIn`, {login: login, password_hash: password})
            .then((response) => {
                if (response.ok) {
                    req.get(`/api/user/profile`)
                        // eslint-disable-next-line no-shadow
                            .then((response) => response.json())
                            .then((result) => {
                                if (result.login.length > 0) {
                                    req.get(`/api/user/homePage`)
                                    .then((response) => response.json())
                                    .then((result) => {
                                        userIn.usernameIn = result.name;
                                        userIn.isAuthorIn = result.is_creator;
                                        userIn.isAuthorizedIn = true;
                                        userIn.authorURL = result.creator_id; 
                                        renderSideBar(sideBarElement);
                                        removeAuth();
                                    })
                                }
                            });
                    } else {
                        errorOutput.innerHTML = '';
                        errorOutput.innerHTML = 'Неверный логин или пароль';
                    }
                });

        } else {
        errorOutput.innerHTML = '';
        errorOutput.innerHTML = 'Неверный логин или пароль';
        }
    });
}

function renderRegister(parent) {
    const reg = new Register(parent);
    reg.render();

    const closeBtn = document.getElementById('closeReg');
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        removeReg();
    });
    registration();
}
function removeReg() {
    const lastReg = document.getElementById('regDiv');
    if (lastReg) {
        lastReg.remove();
    }
    config.activePage = '';
}

function registration() {
    const submitBtn = document.getElementById('reg-btn');
    const loginInput = document.getElementById('reg-login');
    const usernameInput = document.getElementById('reg-username');
    const passwordInput = document.getElementById('reg-password');
    const passwordRepeatInput = document.getElementById('reg-repeat-password');
    const errorOutput = document.getElementById('reg-error');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const login = loginInput.value;
        const username = usernameInput.value;
        const password = passwordInput.value;
        const repeatPassword = passwordRepeatInput.value;
        const errLogin = isValidLogin(login);
        const errPassword = isValidPassword(password);

        if (username.length === 0) {
            errorOutput.innerHTML = '';
            errorOutput.innerHTML = 'Введите ваше имя';
        } else if (errLogin) {
            errorOutput.innerHTML = '';
            errorOutput.innerHTML = errLogin;
        } else if (errPassword) {
            errorOutput.innerHTML = '';
            errorOutput.innerHTML = errPassword;
        } else if (password !== repeatPassword) {
            errorOutput.innerHTML = '';
            errorOutput.innerHTML = 'Пароли не совпадают';
        } else {
            const req = new Request();
            req.post(`/api/auth/signUp`, {
                login,
                name: username,
                password_hash: password,
            }) 
            .then((response) => {
                if (response.ok) {

                    req.get(`/api/user/profile`)

                    // eslint-disable-next-line no-shadow
                    .then((response) => response.json())
                    .then((result) => {
                        if (result.login.length > 0) {
                            req.get(`/api/user/homePage`)
                            .then((response) => response.json())
                            .then((result) => {
                                userIn.usernameIn = result.name;
                                userIn.isAuthorIn = result.is_creator;
                                userIn.isAuthorizedIn = true;
                                userIn.authorURL = result.creator_id; 

                                renderSideBar(sideBarElement);
                                removeReg();
                                renderStartPage(contentElement);
                            })
                        }
                    });
                } else {
                    errorOutput.innerHTML = '';
                    errorOutput.innerHTML = 'Такой логин уже существует';
                }
            });
        }
    });
}

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

function renderSideBar(parent) {
    const sideBar = new SideBar(parent);
    constructConfig(config, userIn);
    sideBar.config = config;
    sideBar.render();
}
function renderStartPage(parent) {
    const startPage = new StartPage(parent);
    startPage.render();
}
function renderWinSettings(parent) {
    const win = new WinSettings(parent);
    win.config = config;
    win.render();
}

function renderSettings(parent) {
    const settings = new Settings(parent);
    settings.config = config;
    settings.render();
}

function renderMyPage(parent, config) {
    const myPage = new MyPage(parent);
    myPage.config = config;
    myPage.render();
}

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

async function enter() {
    await enterRequest();
}

enter();
