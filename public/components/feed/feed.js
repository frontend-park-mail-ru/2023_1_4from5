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
  }
}

export const feed = new Feed(contentElement);
