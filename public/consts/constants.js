export function setConfig ({userIn, contentElement, rootElement, renderRegister, renderAuth,
                               renderWinSettings, clickMyPage, renderSettings, logout}) {
    return {
        general: {
            pages: [
                {
                    name: 'Лента',
                    href: '/feed',
                    id: 'sidebar-feed',
                    showDisplay: userIn.isAuthorizedIn,
                    parent: contentElement,
                    render() {
                        console.log('лента');
                    },
                },
                {
                    name: 'Поиск авторов',
                    href: '/find',
                    id: 'sidebar-find',
                    showDisplay: true,
                    parent: contentElement,
                    render() {
                        console.log('поиск');
                    },
                },
                {
                    name: 'Мои подписки',
                    href: '/subs',
                    id: 'sidebar-subs',
                    showDisplay: userIn.isAuthorizedIn,
                    parent: contentElement,
                    render() {
                        console.log('подписки');
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
                    render() {
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
                    render: clickMyPage,
                },
                {
                    name: 'Мои доходы',
                    href: '/finance',
                    id: 'winSetting-finance',
                    showDisplay: userIn.isAuthorIn,
                    parent: contentElement,
                    render() {
                        console.log('Мои доходы');
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
                    render: logout,
                },
            ],
        },
        user: {
            login: '',
            username: '',
            authorURL: '',
            isAuthor: false,
            isAuthorized: false,
        },
        activePage: '',
    }
}
