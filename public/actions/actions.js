import { ActionsAuth } from './auth';
import { ActionsBecomeAuthor } from './becomeAuthor';
import { ActionsDonateWin } from './donateWin';
import { ActionsMyPage } from './authorPage';
import { ActionsPost } from './post';
import { ActionsRegister } from './register';
import { ActionsSettings } from './settings';
import { ActionsSideBar } from './sidebar';
import { ActionsStartPage } from './startPage';
import { ActionsUser } from './user';
import { ActionsWinSettings } from './winSettings';

export const Actions = {
  ...ActionsAuth,
  ...ActionsBecomeAuthor,
  ...ActionsDonateWin,
  ...ActionsMyPage,
  ...ActionsPost,
  ...ActionsRegister,
  ...ActionsSettings,
  ...ActionsSideBar,
  ...ActionsStartPage,
  ...ActionsUser,
  ...ActionsWinSettings,
};
