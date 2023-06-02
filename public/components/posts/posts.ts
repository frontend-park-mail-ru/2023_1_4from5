import { router } from '../../modules/Router';
import { URLS } from '../../modules/Notifier';
import { dateParse } from '../../modules/handler';

// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const template = require('./posts.handlebars');

class Posts {
  render(config: any) {
    const postsSpace = document.getElementById('posts');

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    postsSpace.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'postsDiv';
    newDiv.innerHTML = template(config);
    // @ts-expect-error TS(2531): Object is possibly 'null'.
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
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          router.go(URLS.post, '', event.target.parentElement.parentElement.parentElement.parentElement.id);
        });
      }
    }
  }
}

export const posts = new Posts();
