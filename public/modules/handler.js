export function clickHandler(e, configPart, config) {
    if (e.target instanceof HTMLAnchorElement) {
        e.preventDefault();
        const targetId = e.target.id;
        let target;
        // console.log(e.target.id);
        // console.log(key, config[key], config[key].pages);
        // config.key.pages
        // console.log(config.general)
        configPart.pages.forEach((element) => {
            // console.log(element.id, targetId, typeof element.id, typeof targetId )
            if (element.id === targetId) {
                // console.log(element, config[key]);
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
        // console.log(config.activePage);
        target.render(target.parent);
    }
}
