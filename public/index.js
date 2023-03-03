import { SideBar } from "./components/sideBar/sideBar.js";
import { Auth } from "./components/authorization/auth.js";
import { Register } from "./components/register/reg.js";
import { WinSettings } from "./components/winSettings/winSettings.js";
import { clickHandler } from "./modules/handler.js";
import { Settings } from "./components/winSettings/settings/settings.js";
import { MyPage } from "./components/winSettings/myPage/myPage.js";

const USER_DASHA_URL = '10b0d1b8-0e67-4e7e-9f08-124b3e32cce4';

const rootElement = document.getElementById('root');
const sideBarElement = document.createElement('sideBar');
const contentElement = document.createElement('main');
rootElement.appendChild(sideBarElement);
rootElement.appendChild(contentElement);

const userIn  = {
    loginIn: 'Cockpit1',
    usernameIn: 'Cockpit1!', //так ли хранить username?
    isAuthorIn: false,
    isAuthorizedIn: false,
}
const config = {
    general: {
        pages: [
            {
                name: 'Лента',
                href: '/feed',
                id: 'sidebar-feed',
                showDisplay: userIn.isAuthorizedIn,
                parent: contentElement,
                render: function () {
                    console.log("лента");
                },
            },
            {
                name: 'Поиск авторов',
                href: '/find',
                id: 'sidebar-find',
                showDisplay: true,
                parent: contentElement,
                render: function () {
                    console.log("поиск");
                },
            },
            {
                name: 'Мои подписки',
                href: '/subs',
                id: 'sidebar-subs',
                showDisplay: userIn.isAuthorizedIn,
                parent: contentElement,
                render: function () {
                    console.log("подписки");
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
                render: function () {
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
                render: renderMyPage,
            },
            {
                name: 'Мои доходы',
                href: '/finance',
                id: 'winSetting-finance',
                showDisplay: userIn.isAuthorIn,
                parent: contentElement,
                render: function () {
                    console.log("Мои доходы");
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
                render: function () {
                    console.log("Выйти");
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


function constructConfig() {    // можно ли улучшить?
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

async function renderSideBar(parent) {
    // этот запрос можно отключить, если хотим страничку входа
    await fetch ('http://sub-me.ru:8000/api/user/profile', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(result => {
            if (result.login.length > 0) {
                userIn.usernameIn = result.login;
                console.log('user has entered as: ', userIn.usernameIn);
                userIn.isAuthorizedIn = true;

                fetch ('http://sub-me.ru:8000/api/user/homePage', {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                })
                .then(response => response.json())
                .then(userHomePage => {
                    userIn.isAuthorIn = userHomePage.is_creator;
                    // код повторяется
                    const sideBar = new SideBar(parent);
                    constructConfig();
                    sideBar.config = config;
                    sideBar.render();
                    console.log('sideBar rendered');
                })
            }
        })
    ///////////////////////////////////////////////////////////
    const sideBar = new SideBar(parent);
    constructConfig();
    sideBar.config = config;
    sideBar.render();
    console.log('sideBar rendered');
}

sideBarElement.addEventListener('click', (e) => {
    clickHandler(e, config.general, config);
});

function renderAuth(parent) {
    const auth = new Auth(parent);
    auth.render();
    console.log('authorization rendered');
    authentification();
}

function removeAuth() {
    const lastAuth = document.getElementById('authDiv');
    if (lastAuth) {
        lastAuth.remove();
    }
}

function authentification() {
    const submitBtn = document.getElementById('auth-btn');
    const loginInput = document.getElementById('auth-login');
    const passwordInput = document.getElementById('auth-password');

    submitBtn.addEventListener( 'click', (e) => {
        e.preventDefault();
        const login = loginInput.value;
        const password = passwordInput.value;

        fetch ('http://sub-me.ru:8000/api/auth/signIn', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "login": login,
                "password_hash": password
            }),
        })
        .then(response => {
            if (response.ok) {
            fetch ('http://sub-me.ru:8000/api/user/profile', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(result => {
            if (result.login.length > 0) {
                userIn.usernameIn = result.name;
                console.log('user has entered as: ', userIn.usernameIn);
                userIn.isAuthorizedIn = true;
                renderSideBar(sideBarElement);
                removeAuth();
            }
        })
        }})
    });
}

function removeReg() {
    const lastReg = document.getElementById('regDiv');
    if (lastReg) {
        lastReg.remove();
    }
}

function registration() {
    const submitBtn = document.getElementById('reg-btn');
    const loginInput = document.getElementById('reg-login');
    const usernameInput = document.getElementById('reg-username');
    const passwordInput = document.getElementById('reg-password');
    // const passwordRepeatInput = document.getElementById('reg-repeat-password');
    
    submitBtn.addEventListener( 'click', (e) => {
        e.preventDefault();
        const login = loginInput.value;
        const username = usernameInput.value;
        const password = passwordInput.value;
        // const repeatPassword = passwordRepeatInput.value;

        fetch ('http://sub-me.ru:8000/api/auth/signUp', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "login": login,
                "name": username,
                "password_hash": password
            })
        })
        .then(response => {
            if (response.ok) {
                fetch ('http://sub-me.ru:8000/api/user/profile', {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                })
                .then(response => response.json())
                .then(result => {
                    if (result.name.length > 0) {
                        userIn.usernameIn = result.name;
                        console.log('user has entered as: ', userIn.usernameIn);
                        userIn.isAuthorizedIn = true;
                        renderSideBar(sideBarElement);
                        removeReg();
                    }
                })
            }
        })
    });
}

function renderRegister(parent) {
    const reg = new Register(parent);
    reg.render();
    console.log('Register rendered');

    registration();
}

function renderWinSettings(parent) {
    const win = new WinSettings(parent);
    win.config = config;
    win.render();
    console.log('winSetting rendered');
}

function renderSettings(parent) {
    const settings = new Settings(parent);
    settings.config = config;
    settings.render();
    console.log('settings rendered');
}

function renderMyPage(parent) {
    fetch ('http://sub-me.ru:8000/api/creator/page/' + USER_DASHA_URL, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        const myPage = new MyPage(parent);
        myPage.config = result;
        myPage.render();
        console.log('myPage rendered');
    })

    
}

renderSideBar(sideBarElement);


// function isValid(inputStr) {
//     const blackList = ""; //надо ли???
//     let hasUpper=false, hasLower = false, hasNumber = false, hasSpecial = false,
//         hasntBlackList = true, hasMinLen = false;
//     if (inputStr.length >= 7) {
//         hasMinLen = true;
//     }
//     for (const char in inputStr) {
//         if (!~blackList.indexOf(char)) {
//             hasntBlackList = false;
//         }

//     }

//     return hasMinLen && hasNumber && hasUpper && hasLower && hasSpecial && hasntBlackList;

// }
