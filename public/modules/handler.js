export function clickHandler(e, configPart, config) {
    if (e.target instanceof HTMLAnchorElement) {
        e.preventDefault();
        const targetId = e.target.id;
        let target;
        configPart.pages.forEach((element) => {
            if (element.id === targetId) {
                target = element;
            }
        });

        if (config.activePage === target.name) {
            return;
        }

        if (!(target.name === 'Регистрация' || target.name === 'Войти' || target.name === config.user.username)) {
            target.parent.innerHTML = '';
        }
        config.activePage = target.name;
        target.render(target.parent);
    }
}
