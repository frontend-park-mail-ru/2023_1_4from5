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

    // const form = document.getElementById('auth-form');
    const submitBtn = document.getElementById('auth-btn');
    console.log(submitBtn);
    const usernameInput = document.getElementById('auth-username');
    const passwordInput = document.getElementById('auth-password');

    submitBtn.onclick = function() { alert(1); }
    // submitBtn.addEventListener( "click", () => {
    //     // e.preventDefault();
    //     console.log("1");
    //     alert('1');
    //     const username = usernameInput.value.trim();
    //     console.log(username);
    //     const password = passwordInput.value;
    //     console.log(password);

        // ajax(
        //     'POST',
        //     'sub-me.ru/api/auth/signIn',
        //     {username, password},
        //     status => {
        //         if (status === 200) {
        //             // goToPage(config.profile);
        //             console.log("user has been authorized");
        //             return;
        //         }

        //         alert('Неверный емейл или пароль');
        //     }
        // )
    // });
}

function renderLogin(parent) {
    const login = new Login(parent);
    login.render();
    console.log('login rendered');
}


renderSideBar(sideBarElement);
renderAuth(rootElement);
renderLogin(rootElement);
