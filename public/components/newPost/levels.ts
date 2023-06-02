// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const template = require('./levels.handlebars');

class Levels {
  render(subscriptionLevels: any) {
    const levelSpace = document.getElementById('subscription__levels');

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    levelSpace.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'levelsDiv';
    newDiv.innerHTML = template(subscriptionLevels);
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    levelSpace.appendChild(newDiv);

    const subs = document.querySelectorAll('.sub__level');
    if (subs) {
      for (let index = 0; index < subs.length; index++) {
        const sub = subs[index];
        sub.addEventListener('click', (event) => {
          event.preventDefault();
          const radio = sub.querySelector('#sub__level--radio');

          // @ts-expect-error TS(2531): Object is possibly 'null'.
          if (radio.classList.contains('sub__level--inactive')) {
            sub.classList.remove('card__inactive');
            sub.classList.add('card__active');

            // @ts-expect-error TS(2531): Object is possibly 'null'.
            radio.classList.remove('sub__level--inactive');
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            radio.classList.add('sub__level--active');
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            radio.src = '../../images/radio-active.svg';
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          } else if (radio.classList.contains('sub__level--active')) {
            sub.classList.remove('card__active');
            sub.classList.add('card__inactive');

            // @ts-expect-error TS(2531): Object is possibly 'null'.
            radio.classList.remove('sub__level--active');
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            radio.classList.add('sub__level--inactive');
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            radio.src = '../../images/radio-inactive.svg';
          }
        });
      }
    }
  }

  remove() {
    const lastLevels = document.getElementById('levelsDiv');
    if (lastLevels) {
      lastLevels.remove();
    }
  }
}

export const subLevels = new Levels();
