import { SideBar } from "./components/sideBar/sideBar.js";
import { Auth } from "./components/authorization/auth.js";
import { Register } from "./components/register/reg.js";
import { WinSettings } from "./components/winSettings/winSettings.js";
import { clickHandler } from "./modules/handler.js";

const rootElement = document.getElementById('root');
const sideBarElement = document.createElement('sideBar');
const contentElement = document.createElement('main');
rootElement.appendChild(sideBarElement);
rootElement.appendChild(contentElement);

const userIn  = {
    usernameIn: '', //так ли хранить username?
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
                render: becomeAuthor,
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
                render: function () {
                    console.log("Моя страница");
                },
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
                render: function () {
                    console.log("Настройки");
                },
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
        username: '',
        isAuthor: false,
        isAuthorized: false,
    },
    activePage: '',
};


function constructConfig() {    // можно ли улучшить?
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
    // await fetch ('http://sub-me.ru:8000/api/user/profile', {
    //         method: 'GET',
    //         mode: 'cors',
    //         credentials: 'include',
    //     })
    //     .then(response => response.json())
    //     .then(result => {
    //         if (result.login.length > 0) {
    //             userIn.usernameIn = result.login;
    //             console.log('user has entered as: ', userIn.usernameIn);
    //             userIn.isAuthorizedIn = true;
    //         }
    //     })
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
                userIn.usernameIn = result.login;
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
    const passwordRepeatInput = document.getElementById('reg-repeat-password');
    
    submitBtn.addEventListener( 'click', (e) => {
        e.preventDefault();
        const login = loginInput.value;
        const username = usernameInput.value;
        const password = passwordInput.value;
        const repeatPassword = passwordRepeatInput.value; //нигде не используется

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
                    if (result.login.length > 0) {
                        userIn.usernameIn = result.login;
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

function     renderRegister      (parent)        {
    const reg =       new Register(parent);
    reg.render()    ;
    console.log(      'Register rendered');

    registration();
}

function renderWinSettings(parent) {
    const win = new WinSettings(parent);
    win.config = config;
    win.render();
    console.log('winSetting rendered');
}

function becomeAuthor(parent) {
    userIn.isAuthorIn = true;
    renderSideBar(parent);
}

renderSideBar(sideBarElement);

const char = "a";

console.log(char.toUpperCase(), char.toLowerCase(), isNaN(char));


