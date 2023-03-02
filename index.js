import { SideBar } from "./components/sideBar/sideBar.js";
import { Auth } from "./components/authorization/auth.js";
import { Register } from "./components/register/reg.js";

const rootElement = document.getElementById('root');
const sideBarElement = document.createElement('sideBar');
const contentElement = document.createElement('main');
rootElement.appendChild(sideBarElement);
rootElement.appendChild(contentElement);


const usernameIn = 'Cockpit'; //так ли хранить username?
const isAuthorIn = false;
const isAuthorizedIn = true;
const config = {
    general: {
        pages: [
            {
                name: 'Лента',
                href: '/feed',
                id: 'sidebar-feed',
                showDisplay: isAuthorizedIn,
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
                showDisplay: isAuthorizedIn,
                parent: contentElement,
                render: function () {
                    console.log("подписки");
                },
            },
            {
                name: 'Регистрация',
                href: '/register',
                id: 'sidebar-reg',
                showDisplay: !isAuthorizedIn,
                parent: rootElement,
                render: renderRegister,
            },
            {
                name: 'Войти',
                href: '/auth',
                id: 'sidebar-auth',
                showDisplay: !isAuthorizedIn,
                parent: rootElement,
                render: renderAuth,
            },
            {
                name: 'Стать автором',
                href: '/beAuthor',
                id: 'sidebar-beAuthor',
                showDisplay: isAuthorizedIn * !isAuthorIn,
                parent: contentElement,
                render: function () {
                    console.log("Стать автором");
                },
            },
            {
                name: usernameIn,
                href: '/modalWindow',
                id: 'sidebar-modalWindow',
                showDisplay: isAuthorizedIn,
                parent: contentElement,
                render: function () {
                    console.log("модальное окно");
                },
            },
        ],
    },
    user: {
        username: usernameIn,
        isAuthor: isAuthorIn,
        isAuthorized: isAuthorizedIn,
    },
};

let activePage;

function renderSideBar(parent) {
    const sideBar = new SideBar(parent);
    sideBar.config = config;

    sideBar.render();
    console.log('sideBar rendered');
}

function renderAuth(parent) {
    const auth = new Auth(parent);
    auth.render();
    console.log('authorization rendered');

    const submitBtn = document.getElementById('auth-btn');
    const loginInput = document.getElementById('auth-login');
    const passwordInput = document.getElementById('auth-password');
    
    submitBtn.addEventListener( 'click', (e) => {
        e.preventDefault();
        const login = loginInput.value;
        console.log(login);
        const password = passwordInput.value;
        console.log(password);

        fetch ('http://127.0.0.1:8000/api/auth/signIn', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            data: JSON.stringify({
                "login": login,
                "password_hash": password,
            })
        })
        .then(response => console.log(response.ok))
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


        fetch ('http://127.0.0.1:8000/api/auth/signUp', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            data: JSON.stringify({
                "login": login,
                "name": username,
                "password_hash": password,
            })
        })
        .then(response => console.log(response.ok))
    });
}

function goToPage(target) {
    if (activePage === target.name) {
        return;
    }

    if (!(target.name === 'Регистрация' || target.name === 'Войти' || target.name === usernameIn)) {
        target.parent.innerHTML = '';
    }
    activePage = target.name;
    console.log(activePage);
    target.render(target.parent);
}

sideBarElement.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement) {
        e.preventDefault();
        const targetId = e.target.id;
        let target;
        // console.log(e.target.id);
        // console.log(key, config[key], config[key].pages);
        // config.key.pages
        // console.log(config.general)
        config.general.pages.forEach(element => {
            // console.log(element.id, targetId, typeof element.id, typeof targetId )
            if (element.id === targetId) {
                // console.log(element, config[key]);
                target = element;
            }
        });
        goToPage(target);
    }
});

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
