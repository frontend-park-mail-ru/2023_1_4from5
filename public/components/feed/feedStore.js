import { dispatcher } from '../../dispatcher/dispatcher';
import { ActionTypes } from '../../actionTypes/actionTypes';
import { request } from '../../modules/request';
import { feed } from './feed';
import { authorPage } from '../authorPage/authorPage';

class FeedStore {

  #config;

  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action) {
    switch (action.type) {
      case ActionTypes.LIKE_FEED:
        this.changeLikeState(action);
        break;

      default:
        break;
    }
  }

  async changeLikeState(action) {
    if (action.typeLike === 'addLike') {
      const result = await request.put('/api/post/addLike', { post_id: action.postId });
      if (result.ok) {
        const res = await result.json();
        const currentPost = this.#config.posts.find((post) => post.id === action.postId);
        currentPost.is_liked = true;
        currentPost.likes_count = res.likes_count;
        feed.render(this.#config);
      }
    } else {
      const result = await request.put('/api/post/removeLike', { post_id: action.postId });
      if (result.ok) {
        const res = await result.json();
        const currentPost = this.#config.posts.find((post) => post.id === action.postId);
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
