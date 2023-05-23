import template from './feed.handlebars';
import { Actions } from '../../actions/actions';
import { router } from '../../modules/Router';
import { URLS } from '../../modules/Notifier';
import { dateParse } from '../../modules/handler';

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

    posts.posts.forEach((post) => {
      if (post.attachments) {
        const divAttaches = document.getElementById(`attachments-${post.id}`);
        post.attachments.forEach((item) => {
          if (item.type.startsWith('image')) {
            const attachPreview = document.createElement('img');
            attachPreview.className = 'img-preview';
            attachPreview.src = `../../images/user/${item.id}.${item.type.split('/')[1]}`;
            attachPreview.style.display = 'block';
            divAttaches.append(attachPreview);
          } else if (item.type.startsWith('video')) {
            const attachPreview = document.createElement('video');
            const source = document.createElement('source');

            attachPreview.className = 'video-preview';
            attachPreview.controls = true;
            attachPreview.style.display = 'block';

            source.src = `../../images/user/${item.id}.${item.type.split('/')[1]}`;
            source.type = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
            attachPreview.append(source);
            divAttaches.append(attachPreview);
          } else if (item.type.startsWith('audio')) {
            const attachPreview = document.createElement('audio');
            attachPreview.className = 'audio-preview';
            attachPreview.src = `../../images/user/${item.id}.mp3`;
            attachPreview.controls = true;
            attachPreview.style.display = 'block';
            divAttaches.append(attachPreview);
          }
        });
      }
    });

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
      dateParse(timestamp);
    }

    const comments = document.querySelectorAll('#post__comment');
    if (comments) {
      for (let index = 0; index < comments.length; index++) {
        const comment = comments[index];
        comment.addEventListener('click', (event) => {
          event.preventDefault();
          router.go(URLS.post, '', event.target.parentElement.parentElement.parentElement.id);
        });
      }
    }
  }
}

export const feed = new Feed(contentElement);
