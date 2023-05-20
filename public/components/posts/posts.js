import { router } from '../../modules/Router';
import { URLS } from '../../modules/Notifier';

const template = require('./posts.handlebars');

class Posts {
  render(config) {
    const postsSpace = document.getElementById('posts');

    console.log(config);

    postsSpace.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'postsDiv';
    newDiv.innerHTML = template(config);
    postsSpace.appendChild(newDiv);

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
  }
}

export const posts = new Posts();
