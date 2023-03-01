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
            },
            {
                name: 'Поиск авторов',
                href: '/find',    
            },
            {
                name: 'Мои подписки',
                href: '/subs',    
            },
        ]
    },
    entry: {
        pages: [
            {
                name: 'Регистрация',
                href: '/register',   
                render: function(a, b) {
                    console.log(a, b);
                },
            },
            {
                name: 'Войти',
                href: '/login',    
                render: function(a, b) {
                    console.log(a - b);
                },
            },
        ],
    },
    user: {
        login: 'Cockpit',
        isAuthor: false,
        isAuthorized: false,
    },

};

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
    const usernameInput = document.getElementById('auth-username');
    const passwordInput = document.getElementById('auth-password');
    
    submitBtn.addEventListener( "click", (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        console.log(username);
        const password = passwordInput.value;
        console.log(password);

        fetch ('sub-me.ru/api/auth/signIn', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            data: JSON.stringify({
                "login": username,
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
}

renderSideBar(sideBarElement);
renderAuth(rootElement);
renderRegister(rootElement);
