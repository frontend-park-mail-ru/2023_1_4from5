import { dispatcher } from '../../dispatcher/dispatcher';
import { ActionTypes } from '../../actionTypes/actionTypes';
import { request } from '../../modules/request';
import { feed } from './feed';
import { authorPage } from '../authorPage/authorPage';

class FeedStore {

  // @ts-expect-error TS(7008): Member '#config' implicitly has an 'any' type.
  #config;

  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action: any) {
    switch (action.type) {
      case ActionTypes.LIKE_FEED:
        this.changeLikeState(action);
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
        const res = await result.json();
        const currentPost = this.#config.posts.find((post: any) => post.id === action.postId);
        currentPost.is_liked = true;
        currentPost.likes_count = res.likes_count;
        feed.render(this.#config);
      }
    } else {
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
      const result = await request.put('/api/post/removeLike', { post_id: action.postId });
      if (result.ok) {
        const res = await result.json();
        const currentPost = this.#config.posts.find((post: any) => post.id === action.postId);
        currentPost.is_liked = false;
        currentPost.likes_count = res.likes_count;
        feed.render(this.#config);
      }
    }
  }

  async renderFeed() {
    const req = await request.get('/api/user/feed');
    const posts = await req.json();
    this.#config = {
      posts
    };
    feed.render(this.#config);
  }
}

export const feedStore = new FeedStore();
