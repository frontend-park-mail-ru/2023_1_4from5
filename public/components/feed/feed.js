import template from './feed.handlebars';
import { Actions } from '../../actions/actions';

const contentElement = document.querySelector('main');

class Feed {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  getParent() {
    return this.#parent;
  }

  render(posts) {
    this.#parent.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'subscriptionsDiv';
    newDiv.innerHTML = template(posts);
    this.#parent.appendChild(newDiv);

    const photos = document.querySelectorAll('#feed__creator--photo');
    for (let index = 0; index < photos.length; index++) {
      const photo = photos[index];
      photo.style.backgroundImage = 'url(../../images/author-photo.svg)';
    }

    const likeIcons = document.querySelectorAll('.feed__like');
    for (let index = 0; index < likeIcons.length; index++) {
      const likeIcon = likeIcons[index];
      likeIcon.addEventListener('click', (event) => {
        event.preventDefault();
        const eventLike = likeIcon.id === 'love-like-icon' ? 'removeLike' : 'addLike';
        Actions.likeFeed(
          eventLike,
          event.target.parentElement.parentElement.parentElement.id,
        );
      });
    }

    const creationDates = document.querySelectorAll('.feed__date');
    for (let index = 0; index < creationDates.length; index++) {
      const timestamp = creationDates[index];
      const dateRaw = new Date(Date.parse(timestamp.textContent));
      const day = dateRaw.getDay();
      const month = dateRaw.getMonth();
      const year = dateRaw.getFullYear();
      const hour = dateRaw.getHours();
      const min = dateRaw.getMinutes();
      timestamp.textContent = `${day}.${month}.${year} ${hour}:${min}`;
    }
  }
}

export const feed = new Feed(contentElement);
