import { dispatcher } from '../../dispatcher/dispatcher';
import { request } from '../../modules/request';
import { post } from './post';
import { ActionTypes } from '../../actionTypes/actionTypes';
import { authorPage } from '../authorPage/authorPage';

class PostStore {
  // @ts-expect-error TS(7008): Member '#config' implicitly has an 'any' type.
  #config;

  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action: any) {
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

  async changeLikeState(action: any) {
    if (action.typeLike === 'addLike') {
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
      const result = await request.put('/api/post/addLike', { post_id: action.postId });
      if (result.ok) {
        await this.renderPost(action.postId);
      }
    } else {
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
      const result = await request.put('/api/post/removeLike', { post_id: action.postId });
      if (result.ok) {
        await postStore.renderPost(action.postId);
      }
    }
  }

  async createComment(input: any) {
    const token = await request.getHeader('/api/comment/create');
    await request.post('/api/comment/create', {
      text: input.text,
      post_id: input.postId,
    }, token);
    await this.renderPost(input.postId);
  }

  async updateComment(commentId: any, input: any) {
    const token = await request.getHeader(`/api/comment/edit/${commentId}`);
    await request.put(`/api/comment/edit/${commentId}`, {
      text: input.text,
    }, token);
    await this.renderPost(input.postId);
  }

  async deleteComment(commentId: any, postId: any) {
    const token = await request.getHeader(`/api/comment/delete/${commentId}`);
    await request.deleteWithBody(`/api/comment/delete/${commentId}`, {
      post_id: postId
    }, token);
    await this.renderPost(postId);
  }

  async renderPost(postId: any) {
    const req = await request.get(`/api/post/get/${postId}`);
    const result = await req.json();
    const textArr = result.post.text.split('\\n');
    result.post.textWithBreaks = [];
    textArr.forEach((text: any) => {
      result.post.textWithBreaks.push({ text });
    });

    post.render(result);
  }
}

export const postStore = new PostStore();
