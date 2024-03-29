import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';

import { dispatcher } from '../../dispatcher/dispatcher.js';
import { ActionTypes } from '../../actionTypes/actionTypes.js';
import { request } from '../../modules/request.js';
import { Actions } from '../../actions/actions.js';
import { router } from '../../modules/Router.js';
import { URLS } from '../../modules/Notifier';
import { notificationsStore } from '../notifications/notificationsStore';

class UserStore {
  #user;

  #firebaseConfig;

  constructor() {
    this.#user = {
      usernameIn: '',
      login: '',
      isAuthorIn: false,
      isAuthorizedIn: false,
      authorURL: '',
      profilePhoto: '',
    };

    this.#firebaseConfig = {
      apiKey: 'AIzaSyCs9v1WpgN0G-GKCBS8whPK2hPzwDiiyfU',
      authDomain: 'subme-ef6b7.firebaseapp.com',
      projectId: 'subme-ef6b7',
      storageBucket: 'subme-ef6b7.appspot.com',
      messagingSenderId: '759387159264',
      appId: '1:759387159264:web:8bfcf46c688a421c586e85',
      measurementId: 'G-RDQS51ZNB6'
    };

    dispatcher.register(this.reduce.bind(this));
  }

  getUserState() {
    return this.#user;
  }

  setUserState(user: any) {
    this.#user.usernameIn = user.usernameIn;
    this.#user.isAuthorIn = user.isAuthorIn;
    this.#user.isAuthorizedIn = user.isAuthorizedIn;
    this.#user.authorURL = user.authorURL;
    this.#user.login = user.login;
    this.#user.profilePhoto = user.profilePhoto;
  }

  setState(profile: any) {
    this.#user.isAuthorizedIn = true;
    this.#user.login = profile.login;
    this.#user.usernameIn = profile.name;
    this.#user.profilePhoto = profile.profile_photo;
    this.#user.isAuthorIn = profile.is_creator;
    this.#user.authorURL = profile.creator_id;
  }

  async reduce(action: any) {
    switch (action.type) {
      case ActionTypes.GET_USER:
        await this.getUser();
        break;

      case ActionTypes.LOGOUT:
        await this.logout();
        break;

      case ActionTypes.FOLLOW_ALL:
        await this.followAll();
        break;

      default:
        break;
    }
  }

  async getUser() {
    const getUser = await request.get('/api/user/profile');
    const profile = await getUser.json();
    this.setState(profile);

    Actions.renderSideBar(this.#user);
    await this.followAll();
  }

  async logout() {
    // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
    await request.put('/api/auth/logout');
    // @ts-expect-error TS(2551): Property 'loginIn' does not exist on type '{ usern... Remove this comment to see the full error message
    this.#user.loginIn = '';
    this.#user.usernameIn = '';
    this.#user.isAuthorIn = false;
    this.#user.isAuthorizedIn = false;
    this.#user.profilePhoto = '';
    Actions.removeWinSettings();
    Actions.renderSideBar(this.#user);
    // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
    router.go(URLS.root);
  }

  async followAll() {
    const app = initializeApp(this.#firebaseConfig);
    const messaging = getMessaging(app);

    if (this.getUserState().isAuthorizedIn) {
      const reqFollows = await request.get('/api/user/follows');
      if (reqFollows) {
        const follows = await reqFollows.json();

        if (follows) {
          for (const i in follows) {
            const follow = follows[i];
            getToken(messaging, { vapidKey: 'BATXyq0BC6pv1xAdt7_F9MvESBLVdDRItBugFcktnkC_4pFo04NMvVNkt91enPfP2gjHQ8vpTAO3Dn1Ss98J0d0' })
              .then(async (currentToken) => {
                if (currentToken) {
                  // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
                  await request.put(`/api/user/subscribeToNotifications/${follow.creator}`, { notification_token: currentToken });
                } else {
                  console.log('No registration token available. Request permission to generate one.');
                }
              })
              .catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
              });
          }
        }
      }

      if (this.getUserState().isAuthorIn) {
        getToken(messaging, { vapidKey: 'BATXyq0BC6pv1xAdt7_F9MvESBLVdDRItBugFcktnkC_4pFo04NMvVNkt91enPfP2gjHQ8vpTAO3Dn1Ss98J0d0' })
          .then(async (currentToken) => {
            if (currentToken) {
              // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
              await request.put('/api/creator/subscribeToNotifications', { notification_token: currentToken });
            } else {
              console.log('No registration token available. Request permission to generate one.');
            }
          })
          .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
          });
      }

      onMessage(messaging, (payload) => {
        notificationsStore.addNotification(payload);
      });
    }
  }

  async unfollow(creatorId: any) {
    const app = initializeApp(this.#firebaseConfig);
    const messaging = getMessaging(app);

    getToken(messaging, { vapidKey: 'BATXyq0BC6pv1xAdt7_F9MvESBLVdDRItBugFcktnkC_4pFo04NMvVNkt91enPfP2gjHQ8vpTAO3Dn1Ss98J0d0' })
      .then(async (currentToken) => {
        if (currentToken) {
          // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
          await request.put(`/api/user/unsubscribeFromNotifications/${creatorId}`, { notification_token: currentToken });
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }
}

export const userStore = new UserStore();
