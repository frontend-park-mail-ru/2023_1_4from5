import { Actions } from '../../actions/actions';
import { dateParse } from '../../modules/handler';
import { userStore } from '../user/userStore';
import { router } from '../../modules/Router';
import { URLS } from '../../modules/Notifier';

// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const template = require('./post.handlebars');

const contentElement = document.querySelector('main');

class Post {
  render(config: any) {
    if (config.comments) {
      config.commentsNum = config.comments.length;
    } else {
      config.commentsNum = 0;
      config.comments = [];
    }

    config.post.is_my_post = config.post.creator === userStore.getUserState().authorURL;

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    contentElement.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'postDiv';
    newDiv.innerHTML = template(config);
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    contentElement.appendChild(newDiv);

    const creationDate = document.querySelector('#creation__date');
    dateParse(creationDate);

    const comments = document.querySelectorAll('.comment__container');
    for (const i in comments) {
      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      if (!isNaN(i)) {
        const comment = comments[i];
        const commentDate = comment.querySelector('#comment__date');
        dateParse(commentDate);
      }
    }

    const photo = document.getElementById('feed__creator--photo');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    photo.addEventListener('click', (event) => {
      event.preventDefault();
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const creatorId = event.target.parentElement.id;
      router.go(URLS.myPage, '', creatorId);
    });

    const likeIcon = document.querySelector('.icon--like');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    likeIcon.addEventListener('click', (event) => {
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const eventLike = likeIcon.id === 'love-like-icon' ? 'removeLike' : 'addLike';
      Actions.clickLikeLonely(
        eventLike,
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        event.target.parentElement.parentElement.parentElement.parentElement.id,
      );
    });

    const sendComment = document.getElementById('comment__send');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    sendComment.addEventListener('click', (event) => {
      event.preventDefault();
      const input = document.getElementById('comment__input');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const text = input.value;
      Actions.createComment({ text, postId: config.post.id });
    });

    const commentInput = document.getElementById('comment__input');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    commentInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        const text = commentInput.value;
        Actions.createComment({
          text,
          postId: config.post.id,
        });
      }
    });

    const edits = document.querySelectorAll('#comment__edit');
    if (edits) {
      for (let index = 0; index < edits.length; index++) {
        const edit = edits[index];
        edit.addEventListener('click', (event) => {
          event.preventDefault();
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          const comment = event.target.parentElement.parentElement;
          const post = comment.parentElement.parentElement.parentElement;

          const text = comment.querySelector('#comment__text');
          const textBefore = text.innerHTML;
          const input = document.createElement('textarea');
          input.classList.add('input--form');
          input.classList.add('comment__input--edit');
          input.value = textBefore;
          text.innerHTML = '';
          text.appendChild(input);

          const save = comment.querySelector('#comment__save');
          save.style.display = 'inline';
          // @ts-expect-error TS(2339): Property 'style' does not exist on type 'Element'.
          edit.style.display = 'none';
          save.addEventListener('click', (event2: any) => {
            event2.preventDefault();
            Actions.updateComment(comment.id, {
              text: input.value,
              postId: post.id,
            });
          });

          const close = comment.querySelector('#comment__close');
          close.style.display = 'inline';
          close.addEventListener('click', (event2: any) => {
            event2.preventDefault();
            text.innerHTML = textBefore;
            close.style.display = 'none';
            save.style.display = 'none';
            // @ts-expect-error TS(2339): Property 'style' does not exist on type 'Element'.
            edit.style.display = 'inline';
          });
        });
      }
    }

    const deletes = document.querySelectorAll('#comment__delete');
    if (deletes) {
      for (let index = 0; index < deletes.length; index++) {
        const del = deletes[index];

        del.addEventListener('click', (event) => {
          event.preventDefault();
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          const comment = event.target.parentElement.parentElement;
          const post = comment.parentElement.parentElement.parentElement;
          Actions.deleteComment(comment.id, post.id);
        });
      }
    }

    const backBtn = document.getElementById('post__back');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    backBtn.addEventListener('click', (event) => {
      event.preventDefault();
      router.popstate();
    });
  }

  findUser(comments: any, comment: any) {
    for (const i in comments) {
      const el = comments[i];
      if (el.comment_id === comment.id) {
        return el.user_id;
      }
    }
    return null;
  }
}

export const post = new Post();
