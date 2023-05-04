const template = require('./subscriptionLevels.handlebars');

class SubscriptionLevels {
  render(config) {
    const levelSpace = document.getElementById('subscriptionLevels');

    levelSpace.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = 'subscriptionLevelsDiv';
    newDiv.innerHTML = template(config);
    levelSpace.appendChild(newDiv);
  }
}

export const subscriptionLevels = new SubscriptionLevels();
