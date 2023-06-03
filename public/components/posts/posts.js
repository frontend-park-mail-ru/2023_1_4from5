import { router } from '../../modules/Router';
import { URLS } from '../../modules/Notifier';
import { breakText, dateParse } from '../../modules/handler';

const template = require('./posts.handlebars');

class Posts {
  render(config) {
    const postsSpace = document.getElementById('posts');

    postsSpace.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'postsDiv';
    newDiv.innerHTML = template(config);
    postsSpace.appendChild(newDiv);

    const creationDates = document.querySelectorAll('#creation__date');
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
          router.go(URLS.post, '', event.target.parentElement.parentElement.parentElement.parentElement.id);
        });
      }
    }

    const titles = document.querySelectorAll('#content__header');
    titles.forEach((title) => {
      title.addEventListener('click', (event) => {
        event.preventDefault();
        const postId = event.target.parentElement.parentElement.id;
        router.go(URLS.post, '', postId);
      });
    });
  }
}

export const posts = new Posts();
