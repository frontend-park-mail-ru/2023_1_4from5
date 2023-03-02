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


let userIn  = {
    usernameIn: 'Cockpit', //так ли хранить username?
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
                    console.log("Стать автором");
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

    config.general.pages[6].name = userIn.usernameIn;
}

function renderSideBar(parent) {
    const sideBar = new SideBar(parent);
    constructConfig();
    sideBar.config = config;
    sideBar.render();
    console.log('sideBar rendered');
}

sideBarElement.addEventListener('click', (e) => {
    // console.log("start_add_event-listener");
    clickHandler(e, config.general, config);
});


function renderAuth(parent) {
    const auth = new Auth(parent);
    auth.render();
    console.log('authorization rendered');
    authentification();
}

function removeAuth() {
    let lastAuth = document.getElementById('authDiv');
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

function renderRegister(parent) {
    const reg = new Register(parent);
    reg.render();
    console.log('Register rendered');

    const submitBtn = document.getElementById('reg-btn');
    const loginInput = document.getElementById('reg-login');
    const usernameInput = document.getElementById('reg-username');
    const passwordInput = document.getElementById('reg-password');
    const passwordRepeatInput = document.getElementById('reg-repeat-password');
    
    submitBtn.addEventListener( 'click', (e) => {
        e.preventDefault();
        const login = loginInput.value;
        console.log(login);
        const username = usernameInput.value;
        console.log(username);
        const password = passwordInput.value;
        console.log(password);
        const repeatPassword = passwordRepeatInput.value;
        console.log(repeatPassword);


        fetch ('http://sub-me.ru:8000/api/auth/signUp', { // 400 Bad Request!!!
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                "login": login,
                "name": username,
                "password_hash": password
            })
        })
        .then(response => console.log(response.ok))
    });
}

function renderWinSettings(parent) {
    const win = new WinSettings(parent);

    win.config = config;

    win.render();
    console.log('winSetting rendered');
}

renderSideBar(sideBarElement);
//renderWinSettings(contentElement);


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
