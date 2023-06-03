import { dispatcher } from '../../dispatcher/dispatcher';
import { request } from '../../modules/request';
import { post } from './post';
import { ActionTypes } from '../../actionTypes/actionTypes';
import { authorPage } from '../authorPage/authorPage';

class PostStore {
  #config;

  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.CREATE_COMMENT:
        await this.createComment(action.input);
        break;

      case ActionTypes.UPDATE_COMMENT:
        await this.updateComment(action.commentId, action.input);
        break;

      case ActionTypes.DELETE_COMMENT:
        await this.deleteComment(action.commentId, action.postId);
        break;

      case ActionTypes.CLICK_LIKE_LONELY:
        await this.changeLikeState(action);
        break;

      default:
        break;
    }
  }

  async changeLikeState(action) {
    if (action.typeLike === 'addLike') {
      const result = await request.put('/api/post/addLike', { post_id: action.postId });
      if (result.ok) {
        await this.renderPost(action.postId);
      }
    } else {
      const result = await request.put('/api/post/removeLike', { post_id: action.postId });
      if (result.ok) {
        await postStore.renderPost(action.postId);
      }
    }
  }

  async createComment(input) {
    const token = await request.getHeader('/api/comment/create');
    await request.post('/api/comment/create', {
      text: input.text,
      post_id: input.postId,
    }, token);
    await this.renderPost(input.postId);
  }

  async updateComment(commentId, input) {
    const token = await request.getHeader(`/api/comment/edit/${commentId}`);
    await request.put(`/api/comment/edit/${commentId}`, {
      text: input.text,
    }, token);
    await this.renderPost(input.postId);
  }

  async deleteComment(commentId, postId) {
    const token = await request.getHeader(`/api/comment/delete/${commentId}`);
    await request.deleteWithBody(`/api/comment/delete/${commentId}`, {
      post_id: postId
    }, token);
    await this.renderPost(postId);
  }

  async renderPost(postId) {
    const req = await request.get(`/api/post/get/${postId}`);
    const result = await req.json();
    const textArr = result.post.text.split('\\n');
    result.post.textWithBreaks = [];
    textArr.forEach((text) => {
      result.post.textWithBreaks.push({ text });
    });

    post.remove();
    post.render(result);
  }
}

export const postStore = new PostStore();
