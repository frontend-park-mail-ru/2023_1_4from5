import { SideBar } from "./components/sideBar/sideBar.js";
import { Auth } from "./components/authorization/auth.js";
import { Login } from "./components/login/login.js";

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
                render: renderLogin,
            },
            {
                name: 'Войти',
                href: '/login',    
                render: renderAuth,
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
}

function renderLogin(parent) {
    const login = new Login(parent);
    login.render();
    console.log('login rendered');
}

renderSideBar(sideBarElement);
renderAuth(rootElement);
renderLogin(rootElement);
