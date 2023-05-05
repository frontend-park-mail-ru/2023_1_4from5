const template = require('./posts.handlebars');

class Posts {
  render(config) {
    const postsSpace = document.getElementById('posts');

    postsSpace.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'postsDiv';
    newDiv.innerHTML = template(config);
    postsSpace.appendChild(newDiv);
  }
}

export const posts = new Posts();
