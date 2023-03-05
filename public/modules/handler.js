export default function clickHandler(e, configPart, config) {
    if (e.target instanceof HTMLAnchorElement) {
        e.preventDefault();
        const targetId = e.target.id;
        let target = configPart.pages.find((element) => element.id === targetId);
        if (config.activePage === target.name) {
            return;
        }

        if (!(target.name === 'Регистрация' || target.name === 'Войти' || target.name === config.user.username)) {
            target.parent.innerHTML = '';
        }
        // eslint-disable-next-line no-param-reassign
        config.activePage = target.name;
        target.render(target.parent);
    }
}
