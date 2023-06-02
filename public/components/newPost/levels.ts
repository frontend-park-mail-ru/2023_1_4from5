const template = require('./levels.handlebars');

class Levels {
  render(subscriptionLevels) {
    const levelSpace = document.getElementById('subscription__levels');

    levelSpace.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'levelsDiv';
    newDiv.innerHTML = template(subscriptionLevels);
    levelSpace.appendChild(newDiv);

    const subs = document.querySelectorAll('.sub__level');
    if (subs) {
      for (let index = 0; index < subs.length; index++) {
        const sub = subs[index];
        sub.addEventListener('click', (event) => {
          event.preventDefault();
          const radio = sub.querySelector('#sub__level--radio');

          if (radio.classList.contains('sub__level--inactive')) {
            sub.classList.remove('card__inactive');
            sub.classList.add('card__active');

            radio.classList.remove('sub__level--inactive');
            radio.classList.add('sub__level--active');
            radio.src = '../../images/radio-active.svg';
          } else if (radio.classList.contains('sub__level--active')) {
            sub.classList.remove('card__active');
            sub.classList.add('card__inactive');

            radio.classList.remove('sub__level--active');
            radio.classList.add('sub__level--inactive');
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
