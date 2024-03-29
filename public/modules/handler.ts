/**
 * function of click handler
 * @param {MouseEvent} event - event
 * @param {Object} configPart - some part of configuration object
 * @param {Object} config - configuration object
 *
 * @returns {}
 */
export function clickHandler(event: any, config: any) {
  if (event.target instanceof HTMLAnchorElement) {
    event.preventDefault();
    const targetId = event.target.id;
    let target;
    for (let element in config) {
      if (config[element].id === targetId) {
        target = config[element];
      }
    }
    if (target) {
      target.render(target.href);
    }
  } else if (event.target.parentElement instanceof HTMLAnchorElement) {
    event.preventDefault();
    const targetId = event.target.parentElement.id;
    let target;
    for (let element in config) {
      if (config[element].id === targetId) {
        target = config[element];
      }
    }
    if (target) {
      target.render(target.href);
    }
  }
}

export function dateParse(timestamp: any) {
  const dateRaw = new Date(Date.parse(timestamp.textContent));
  let day = dateRaw.getDate().toString();
  let month = (dateRaw.getMonth() + 1).toString();
  let year = dateRaw.getFullYear().toString();
  let hour = dateRaw.getHours().toString();
  let min = dateRaw.getMinutes().toString();
  if (day.length === 1) {
    day = `0${day}`;
  }
  if (month.length === 1) {
    month = `0${month}`;
  }
  if (hour.length === 1) {
    hour = `0${hour}`;
  }
  if (min.length === 1) {
    min = `0${min}`;
  }
  timestamp.textContent = `${day}.${month}.${year} ${hour}:${min}`;
}
