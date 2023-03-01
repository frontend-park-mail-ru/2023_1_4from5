import { SideBar } from "./components/sideBar/sideBar.js";
import { Auth } from "./components/authorization/auth.js";

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
    user: {
        login: 'Cockpit',
        isAuthor: false,
        isAuthorized: false,
    }
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

renderAuth(rootElement);
renderSideBar(sideBarElement);

