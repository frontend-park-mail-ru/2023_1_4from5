import { ActionsAuth } from './auth';
import { ActionsBecomeAuthor } from './becomeAuthor';
import { ActionsDonateWin } from './donateWin';
import { ActionsAuthorPage } from './authorPage';
import { ActionsPost } from './post';
import { ActionsRegister } from './register';
import { ActionsSettings } from './settings';
import { ActionsSideBar } from './sidebar';
import { ActionsStartPage } from './startPage';
import { ActionsUser } from './user';
import { ActionsWinSettings } from './winSettings';
import { ActionsSearch } from './search';
import { ActionSubscription } from './subscription';

export const Actions = {
  ...ActionsAuth,
  ...ActionsBecomeAuthor,
  ...ActionsDonateWin,
  ...ActionsAuthorPage,
  ...ActionsPost,
  ...ActionsRegister,
  ...ActionsSearch,
  ...ActionsSettings,
  ...ActionsSideBar,
  ...ActionsStartPage,
  ...ActionSubscription,
  ...ActionsUser,
  ...ActionsWinSettings,
};
