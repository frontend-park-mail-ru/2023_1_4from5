import { dispatcher } from '../../dispatcher/dispatcher';
import { request } from '../../modules/request';
import { post } from './post';

class PostStore {
  #config;

  constructor() {
    dispatcher.register(this.reduce.bind(this));
  }

  async reduce(action) {
    switch (action.type) {
      default:
        break;
    }
  }

  async renderPost(postId) {
    const req = await request.get(`/api/post/get/${postId}`);
    const result = await req.json();
    const textArr = result.post.text.split('\\n');
    result.post.textWithBreaks = [];
    textArr.forEach((text) => {
      result.post.textWithBreaks.push({ text });
    });


    post.render(result);
  }
}

export const postStore = new PostStore();
