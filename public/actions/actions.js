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
import { ActionSubscriptions } from './subscriptions';
import { ActionsFeed } from './feed';
import { ActionsNotifications } from './notifications';
import { ActionsStatistics } from './statistics';

export const Actions = {
  ...ActionsAuth,
  ...ActionsAuthorPage,
  ...ActionsBecomeAuthor,
  ...ActionsDonateWin,
  ...ActionsFeed,
  ...ActionsNotifications,
  ...ActionsPost,
  ...ActionsRegister,
  ...ActionsSearch,
  ...ActionsSettings,
  ...ActionsSideBar,
  ...ActionsStartPage,
  ...ActionSubscription,
  ...ActionSubscriptions,
  ...ActionsUser,
  ...ActionsWinSettings,
  ...ActionsStatistics,
};
