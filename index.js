import { SideBar } from "./components/sideBar/sideBar.js";
import { Auth } from "./components/authorization/auth.js";
import { Register } from "./components/register/reg.js";

const rootElement = document.getElementById('root');
const sideBarElement = document.createElement('sideBar');
const contentElement = document.createElement('main');
rootElement.appendChild(sideBarElement);
rootElement.appendChild(contentElement);


const usernameIn = 'Cockpit'; //так ли хранить username?
const config = {
    general: {
        pages: [
            {
                name: 'Лента',
                href: '/feed',
                id: 'sidebar-feed',    
                render: function () {
                    console.log("лента");
                },
            },
            {
                name: 'Поиск авторов',
                href: '/find',    
                id: 'sidebar-find',
                render: function () {
                    console.log("поиск");
                },
            },
            {
                name: 'Мои подписки',
                href: '/subs',    
                id: 'sidebar-subs',
                render: function () {
                    console.log("подписки");
                },
            },
        ],
        parent: contentElement,
    },
    entry: {
        pages: [
            {
                name: 'Регистрация',
                href: '/register',   
                id: 'sidebar-reg',
                render: renderRegister,
            },
            {
                name: 'Войти',
                href: '/auth',
                id: 'sidebar-auth',
                render: renderAuth,
            },
        ],
        parent: rootElement,
    },
    beAuthor: {
        pages: [
            {
                name: 'Стать автором',
                href: '/beAuthor',
                id: 'sidebar-beAuthor',
                render: function () {
                    console.log("Стать автором");
                },
            },
        ],
        parent: contentElement
    },
    nickname: {
        pages: [
            {
                name: usernameIn,
                href: '/modalWindow',
                id: 'sidebar-modalWindow',
                render: function () {
                    console.log("модальное окно");
                },
            },
        ],
        parent: contentElement
    },
    user: {
        username: usernameIn,
        isAuthor: false,
        isAuthorized: false,
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

function goToPage(target, type) {
    if (activePage === target) {
        return;
    }

    if (type === config.general || type === config.nickname) {
        type.parent.innerHTML = '';
    }
    activePage = target;
    target.render(type.parent);
}

sideBarElement.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement) {
        e.preventDefault();
        const targetId = e.target.id;
        let target;
        let type;
        // console.log(e.target.id);
        for (let key in config) {
            // console.log(key, config[key], config[key].pages);
            if (key!=="user") {
                // config.key.pages
                config[key].pages.forEach(element => {
                    // console.log(element.id, targetId, typeof element.id, typeof targetId )
                    if (element.id === targetId) {
                        // console.log(element, config[key]);
                        target = element;
                        type = config[key];
                    }
                });
            }
        }
        // config.general.pages.forEach(element => {
        //     if (element.id === targetId) {
        //         target = element;
        //         type = config.general;
        //     }
        // });
        //
        // config.entry.pages.forEach(element => {
        //     if (element.id === targetId) {
        //         target = element;
        //         type = config.entry;
        //     }
        // });
        goToPage(target, type);
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
