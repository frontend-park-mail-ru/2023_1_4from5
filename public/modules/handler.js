/**
 * function of click handler
 * @param {MouseEvent} event - event
 * @param {Object} configPart - some part of configuration object
 * @param {Object} config - configuration object
 *
 * @returns {}
 */
export function clickHandler(event, configPart, config) {
    if (event.target instanceof HTMLAnchorElement) {
        event.preventDefault();
        const targetId = event.target.id;
        let target = configPart.pages.find((element) => element.id === targetId);
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
