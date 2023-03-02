import { SideBar } from "./components/sideBar/sideBar.js";
import { Auth } from "./components/authorization/auth.js";
import { Register } from "./components/register/reg.js";

const rootElement = document.getElementById('root');
const sideBarElement = document.createElement('sideBar');
const contentElement = document.createElement('main');
rootElement.appendChild(sideBarElement);
rootElement.appendChild(contentElement);

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
                href: '/login',    
                id: 'sidebar-auth',
                render: renderAuth,
            },
        ],
        parent: rootElement,
    },
    user: {
        login: 'Cockpit',
        isAuthor: false,
        isAuthorized: false,
    },

};

var activePage;

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

        fetch ('http://sub-me.ru:8000/api/auth/signIn', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "login": login,
                "password_hash": password
            }),
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
        fetch ('http://sub-me.ru:8000/api/user/profile', {
            method: 'GET',
            headers: {
                'Cookie': document.cookie
            }

        })
        .then(response => console.log(response))
    });
    // submitBtn.addEventListener( 'click', (e) => {
    //     e.preventDefault();
    //     const login = loginInput.value;
    //     console.log(login);
    //     const username = usernameInput.value;
    //     console.log(username);
    //     const password = passwordInput.value;
    //     console.log(password);
    //     const repeatPassword = passwordRepeatInput.value;
    //     console.log(repeatPassword);


    //     fetch ('http://sub-me.ru:8000/api/auth/signUp', {
    //         method: 'POST',
    //         data: JSON.stringify({
    //             "login": login,
    //             "name": username,
    //             "password_hash": password,
    //         })
    //     })
    //     .then(response => console.log(response.ok))
    // });
}

function goToPage(target, type) {
    if (activePage === target) {
        return;
    }

    if (type === config.general) {
        type.parent.innerHTML = '';
    }
    activePage = target;
    target.render(type.parent);
}

sideBarElement.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement) {
        e.preventDefault();
        const targetId = e.target.id;
        var target;
        var type;
        config.general.pages.forEach(element => {
            if (element.id === targetId) {
                target = element;
                type = config.general;
            }
        });        

        config.entry.pages.forEach(element => {
            if (element.id === targetId) {
                target = element;
                type = config.entry;
            }
        });   
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
