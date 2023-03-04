import { SideBar } from './components/sideBar/sideBar.js';
import { Auth } from "./components/authorization/auth.js";
import { Register } from "./components/register/reg.js";
import { WinSettings } from "./components/winSettings/winSettings.js";
import { clickHandler } from "./modules/handler.js";
import { isValidLogin, isValidPassword } from "./modules/isValid.js";
import { Settings } from "./components/winSettings/settings/settings.js";
import { MyPage } from "./components/winSettings/myPage/myPage.js";

const USER_DASHA_URL = '10b0d1b8-0e67-4e7e-9f08-124b3e32cce4';

const rootElement = document.getElementById('root');
const sideBarElement = document.createElement('sideBar');
const contentElement = document.createElement('main');
rootElement.appendChild(sideBarElement);
rootElement.appendChild(contentElement);

const userIn = {
    loginIn: 'Cockpit1',
    usernameIn: 'Cockpit1!',
    isAuthorIn: false,
    isAuthorizedIn: true,
};
const config = {
    general: {
        pages: [
            {
                name: 'Лента',
                href: '/feed',
                id: 'sidebar-feed',
                showDisplay: userIn.isAuthorizedIn,
                parent: contentElement,
                render() {
                    console.log('лента');
                },
            },
            {
                name: 'Поиск авторов',
                href: '/find',
                id: 'sidebar-find',
                showDisplay: true,
                parent: contentElement,
                render() {
                    console.log('поиск');
                },
            },
            {
                name: 'Мои подписки',
                href: '/subs',
                id: 'sidebar-subs',
                showDisplay: userIn.isAuthorizedIn,
                parent: contentElement,
                render() {
                    console.log('подписки');
                },
            },
            {
                name: 'Регистрация',
                href: '/register',
                id: 'sidebar-reg',
                showDisplay: !userIn.isAuthorizedIn,
                parent: rootElement,
                render: renderRegister,
            },
            {
                name: 'Войти',
                href: '/auth',
                id: 'sidebar-auth',
                showDisplay: !userIn.isAuthorizedIn,
                parent: rootElement,
                render: renderAuth,
            },
            {
                name: 'Стать автором',
                href: '/beAuthor',
                id: 'sidebar-beAuthor',
                showDisplay: userIn.isAuthorizedIn * !userIn.isAuthorIn,
                parent: contentElement,
                render() {
                    console.log('стать автором');
                },
            },
            {
                name: userIn.usernameIn,
                href: '/modalWindow',
                id: 'sidebar-modalWindow',
                showDisplay: userIn.isAuthorizedIn,
                parent: contentElement,
                render: renderWinSettings,
            },
        ],
    },
    setting: {
        pages: [
            {
                name: 'Моя страница',
                href: '/my_profile',
                id: 'winSetting-profile',
                showDisplay: userIn.isAuthorIn,
                parent: contentElement,
                render: clickMyPage,
            },
            {
                name: 'Мои доходы',
                href: '/finance',
                id: 'winSetting-finance',
                showDisplay: userIn.isAuthorIn,
                parent: contentElement,
                render() {
                    console.log('Мои доходы');
                },
            },
            {
                name: 'Настройки',
                href: '/settings',
                id: 'winSetting-settings',
                showDisplay: true,
                parent: contentElement,
                render: renderSettings,
            },
            {
                name: 'Выйти',
                href: '/startPage',
                id: 'winSetting-startPage',
                showDisplay: true,
                parent: contentElement,
                render() {
                    console.log('Выйти');
                },
            },
        ],
    },
    user: {
        login: '',
        username: '',
        isAuthor: false,
        isAuthorized: false,
    },
    activePage: '',
};

function constructConfig() {
    config.user.login = userIn.loginIn;
    config.user.username = userIn.usernameIn;
    config.user.isAuthor = userIn.isAuthorIn;
    config.user.isAuthorized = userIn.isAuthorizedIn;

    config.general.pages[0].showDisplay = userIn.isAuthorizedIn;
    config.general.pages[1].showDisplay = true;
    config.general.pages[2].showDisplay = userIn.isAuthorizedIn;
    config.general.pages[3].showDisplay = !userIn.isAuthorizedIn;
    config.general.pages[4].showDisplay = !userIn.isAuthorizedIn;
    config.general.pages[5].showDisplay = userIn.isAuthorizedIn * !userIn.isAuthorIn;
    config.general.pages[6].showDisplay = userIn.isAuthorizedIn;

    config.setting.pages[0].showDisplay = userIn.isAuthorIn;
    config.setting.pages[1].showDisplay = userIn.isAuthorIn;
    config.setting.pages[2].showDisplay = true;
    config.setting.pages[3].showDisplay = true;

    config.general.pages[6].name = userIn.usernameIn;
}

function enterRequest() {
    fetch('http://sub-me.ru:8000/api/user/profile', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
        .then((response) => {
            console.log('get response');
            response.json();
        })
        .then((result) => {
            if (result.login.length > 0) {
                userIn.usernameIn = result.name;
                console.log('user has entered as: ', userIn.usernameIn);
                userIn.isAuthorizedIn = true;

                fetch('http://sub-me.ru:8000/api/user/homePage', {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                })
                    .then((response) => response.json())
                    .then((userHomePage) => {
                        console.log('get home page');
                        userIn.isAuthorIn = userHomePage.is_creator;
                        renderSideBar(sideBarElement);
                    });
            }
        })
        .catch((err) => {
            renderSideBar(sideBarElement);
            console.log(err);
        });
}

async function enter() {
    // этот запрос можно отключить, если хотим страничку входа
    await enterRequest();
    renderSideBar(sideBarElement);
}

function renderSideBar(parent) {
    const sideBar = new SideBar(parent);
    constructConfig();
    sideBar.config = config;
    sideBar.render();
}

sideBarElement.addEventListener('click', (e) => {
    clickHandler(e, config.general, config);
});

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

        if (errLogin === '' && errPassword === '') {
            fetch('https://sub-me.ru:8000/api/auth/signIn', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login,
                    password_hash: password,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        fetch('http://sub-me.ru:8000/api/user/profile', {
                            method: 'GET',
                            mode: 'cors',
                            credentials: 'include',
                        })
                            // eslint-disable-next-line no-shadow
                            .then((response) => response.json())
                            .then((result) => {
                                if (result.login.length > 0) {
                                    userIn.usernameIn = result.name;
                                    console.log('user has entered as: ', userIn.usernameIn);
                                    userIn.isAuthorizedIn = true;
                                    renderSideBar(sideBarElement);
                                    removeAuth();
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
        } else if (errLogin !== '') {
            errorOutput.innerHTML = '';
            errorOutput.innerHTML = errLogin;
        } else if (errPassword !== '') {
            errorOutput.innerHTML = '';
            errorOutput.innerHTML = errPassword;
        } else if (password !== repeatPassword) {
            errorOutput.innerHTML = '';
            errorOutput.innerHTML = 'Пароли не совпадают';
        } else {
            fetch('http://sub-me.ru:8000/api/auth/signUp', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login,
                    name: username,
                    password_hash: password,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        fetch('http://sub-me.ru:8000/api/user/profile', {
                            method: 'GET',
                            mode: 'cors',
                            credentials: 'include',
                        })
                            // eslint-disable-next-line no-shadow
                            .then((response) => response.json())
                            .then((result) => {
                                if (result.name.length > 0) {
                                    userIn.usernameIn = result.name;
                                    console.log('user has entered as: ', userIn.usernameIn);
                                    userIn.isAuthorizedIn = true;
                                    renderSideBar(sideBarElement);
                                    removeReg();
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

function renderMyPage(parent) {
    const myPage = new MyPage(parent);
    myPage.config = result;
    myPage.render();
}

function clickMyPage(parent) {
    fetch(`http://sub-me.ru:8000/api/creator/page/${USER_DASHA_URL}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            renderMyPage(parent);
        })
        .catch((err) => {
            console.log(err);
            renderMyPage(parent);
        });
}

enter();
