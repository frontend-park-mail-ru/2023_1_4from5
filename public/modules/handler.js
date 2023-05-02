/**
 * function of click handler
 * @param {MouseEvent} event - event
 * @param {Object} configPart - some part of configuration object
 * @param {Object} config - configuration object
 *
 * @returns {}
 */
export function clickHandler(event, config) {
  if (event.target instanceof HTMLAnchorElement) {
    event.preventDefault();
    const targetId = event.target.id;
    let target;
    for (let element in config) {
      if (config[element].id === targetId) {
        target = config[element];
      }
    }
    target.render(target.href);
  } else if (event.target.parentElement instanceof HTMLAnchorElement) {
    event.preventDefault();
    const targetId = event.target.parentElement.id;
    let target;
    for (let element in config) {
      if (config[element].id === targetId) {
        target = config[element];
      }
    }
    target.render(target.href);
  }
}
