import { Actions } from '../../actions/actions';
import { dateParse } from '../../modules/handler';
import { userStore } from '../user/userStore';

const template = require('./post.handlebars');

const contentElement = document.querySelector('main');

class Post {
  render(config) {
    if (config.comments) {
      config.commentsNum = config.comments.length;
    } else {
      config.commentsNum = 0;
      config.comments = [];
    }

    config.post.is_my_post = config.post.creator === userStore.getUserState().authorURL;

    contentElement.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'postDiv';
    newDiv.innerHTML = template(config);
    contentElement.appendChild(newDiv);

    const photo = document.querySelector('#feed__creator--photo');
    photo.style.backgroundImage = 'url(../../images/author-photo.svg)';

    const creationDate = document.querySelector('#creation__date');
    dateParse(creationDate);

    const comments = document.querySelectorAll('.comment__container');
    for (const i in comments) {
      if (!isNaN(i)) {
        const comment = comments[i];
        const commentDate = comment.querySelector('#comment__date');
        dateParse(commentDate);

        const commentPhoto = comment.querySelector('#comment__photo');
        commentPhoto.style.backgroundImage = 'url(../../images/author-photo.svg)';
      }
    }

    const likeIcon = document.querySelector('.icon--like');
    likeIcon.addEventListener('click', (event) => {
      const eventLike = likeIcon.id === 'love-like-icon' ? 'removeLike' : 'addLike';
      Actions.clickLikeLonely(
        eventLike,
        event.target.parentElement.parentElement.parentElement.parentElement.id,

      );
    });

    const sendComment = document.getElementById('comment__send');
    sendComment.addEventListener('click', (event) => {
      event.preventDefault();
      const input = document.getElementById('comment__input');
      const text = input.value;
      Actions.createComment({ text, postId: config.post.id });
    });

    const edits = document.querySelectorAll('#comment__edit');
    if (edits) {
      for (let index = 0; index < edits.length; index++) {
        const edit = edits[index];
        edit.addEventListener('click', (event) => {
          event.preventDefault();
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
          edit.style.display = 'none';
          save.addEventListener('click', (event2) => {
            event2.preventDefault();
            Actions.updateComment(comment.id, {
              text: input.value,
              postId: post.id,
            });
          });

          const close = comment.querySelector('#comment__close');
          close.style.display = 'inline';
          close.addEventListener('click', (event2) => {
            event2.preventDefault();
            text.innerHTML = textBefore;
            close.style.display = 'none';
            save.style.display = 'none';
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
          const comment = event.target.parentElement.parentElement;
          const post = comment.parentElement.parentElement.parentElement;
          Actions.deleteComment(comment.id, post.id);
        });
      }
    }
  }

  findUser(comments, comment) {
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
