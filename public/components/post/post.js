import { Actions } from '../../actions/actions';

const template = require('./post.handlebars');

const contentElement = document.querySelector('main');

class Post {
  render(config) {
    console.log(config);
    contentElement.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'postDiv';
    newDiv.innerHTML = template(config);
    contentElement.appendChild(newDiv);

    const photo = document.querySelector('#feed__creator--photo');
    photo.style.backgroundImage = 'url(../../images/author-photo.svg)';

    const creationDate = document.querySelector('#creation__date');
    const dateRaw = new Date(Date.parse(creationDate.textContent));
    const day = dateRaw.getDay();
    const month = dateRaw.getMonth();
    const year = dateRaw.getFullYear();
    const hour = dateRaw.getHours();
    const min = dateRaw.getMinutes();
    creationDate.textContent = `${day}.${month}.${year} ${hour}:${min}`;

    const likeIcon = document.querySelector('.icon--like');
    likeIcon.addEventListener('click', (event) => {
      const eventLike = likeIcon.id === 'love-like-icon' ? 'removeLike' : 'addLike';
      Actions.clickLike(
        eventLike,
        event.target.parentElement.parentElement.parentElement.parentElement.id,
      );
    });
  }
}

export const post = new Post();
