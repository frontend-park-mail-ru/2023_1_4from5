import { Actions } from '../../actions/actions';
import { breakText, buildText, dateParse } from '../../modules/handler';
import { userStore } from '../user/userStore';
import { router } from '../../modules/Router';
import { URLS } from '../../modules/Notifier';

const template = require('./post.handlebars');

const contentElement = document.querySelector('main');

class Post {
  render(config) {
    if (config.comments) {
      console.log(config.comments)
      config.commentsNum = config.comments.length;

      config.comments.forEach((comment) => {
        comment.text = breakText(comment.text);
        const textWithBreaks = comment.text.split('\n');

        comment.textWithBreaks = [];
        textWithBreaks.forEach((text) => {
          comment.textWithBreaks.push({ text });
        });
      });
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

    const creationDate = document.querySelector('#creation__date');
    dateParse(creationDate);

    const comments = document.querySelectorAll('.comment__container');
    for (const i in comments) {
      if (!isNaN(i)) {
        const comment = comments[i];
        const commentDate = comment.querySelector('#comment__date');
        dateParse(commentDate);
      }
    }

    const photo = document.getElementById('feed__creator--photo');
    photo.addEventListener('click', (event) => {
      event.preventDefault();
      const creatorId = event.target.parentElement.id;
      router.go(URLS.myPage, '', creatorId);
    });

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
      Actions.createComment({
        text,
        postId: config.post.id
      });
    });

    const commentInput = document.getElementById('comment__input');
    commentInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        const text = buildText(commentInput);
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
          const comment = event.target.parentElement.parentElement;
          const post = comment.parentElement.parentElement.parentElement;

          let textBefore = '';
          const textSpace = comment.querySelector('#comment__texts');
          const texts = comment.querySelectorAll('#comment__text');
          texts.forEach((elem) => {
            textBefore += `${elem.innerHTML}\n`;
          });
          const input = document.createElement('textarea');
          input.classList.add('input--form');
          input.classList.add('comment__input--edit');
          input.value = textBefore.replace(/^[\n]+|[\n]+$/g, '');
          textSpace.innerHTML = '';
          textSpace.appendChild(input);

          const save = comment.querySelector('#comment__save');
          save.style.display = 'inline';
          edit.style.display = 'none';
          save.addEventListener('click', (event2) => {
            event2.preventDefault();
            input.value = input.value.replace(/^[\n]+|[\n]+$/g, '');
            const inputText = buildText(input);
            Actions.updateComment(comment.id, {
              text: inputText,
              postId: post.id,
            });
          });

          input.addEventListener('keypress', (event2) => {
            if (event2.key === 'Enter' && !event2.shiftKey) {
              event2.preventDefault();
              input.value = input.value.replace(/^[\n]+|[\n]+$/g, '');
              const inputText = buildText(input);
              Actions.updateComment(comment.id, {
                text: inputText,
                postId: post.id,
              });
            }
          });

          const close = comment.querySelector('#comment__close');
          close.style.display = 'inline';
          close.addEventListener('click', (event2) => {
            event2.preventDefault();
            texts.forEach((elem) => {
              input.remove();
              textSpace.appendChild(elem);
            });
            // text.innerHTML = textBefore;
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

    const backBtn = document.getElementById('post__back');
    backBtn.addEventListener('click', (event) => {
      event.preventDefault();
      router.popstate();
    });
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
