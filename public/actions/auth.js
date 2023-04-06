import { ActionTypes } from '../actionTypes/auth.js';
import { dispatcher } from '../dispatcher/dispatcher.js';

export const Actions = {
  // start
  start() {
    dispatcher.dispatch({
      type: ActionTypes.START,
    });
  },

  renderStartPage() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_STARTPAGE,
      parent,
    });
  },

  // authorization
  renderAuth() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_AUTH,
    });
  },

  authorization(input) {
    dispatcher.dispatch({
      type: ActionTypes.AUTHORIZATION,
      input,
    });
  },

  removeAuth() {
    dispatcher.dispatch({
      type: ActionTypes.REMOVE_AUTH,
    });
  },

  // registration
  renderReg() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_REG,
    });
  },

  registration(input) {
    dispatcher.dispatch({
      type: ActionTypes.REGISTRATION,
      input,
    });
  },

  removeReg() {
    dispatcher.dispatch({
      type: ActionTypes.REMOVE_REG,
    });
  },

  // user
  getUser() {
    dispatcher.dispatch({
      type: ActionTypes.GET_USER,
    });
  },

  logout(href, data, parent) {
    dispatcher.dispatch({
      type: ActionTypes.LOGOUT,
      parent,
    });
  },

  // sideBar
  renderSideBar(parent, user) {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_SIDEBAR,
      parent,
      user,
    });
  },

  // winsettings
  renderWinSettings() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_WINSETTINGS,
    });
  },

  removeWinSettings() {
    dispatcher.dispatch({
      type: ActionTypes.REMOVE_WINSETTINGS,
    });
  },

  // settings
  renderSettings() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_SETTINGS,
    });
  },

  // myPage
  renderMyPage() {
    dispatcher.dispatch({
      type: ActionTypes.RENDER_MYPAGE,
    });
  },

  // CRUD post
  createPost(input) {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_POST,
      input,
    });
  },

  deletePost(postId) {
    dispatcher.dispatch({
      type: ActionTypes.DELETE_POST,
      postId,
    });
  },
};
