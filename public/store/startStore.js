// import {dispatcher} from "../dispatcher/dispatcher";
// import {ActionTypes} from "../actionTypes/auth";
// import {request} from "../modules/request";
// import {renderSideBar} from "../index";
//

// TODO на будущее закинуть старт в стор
// export class StartStore {
//   // #user;
//   //
//   constructor() {
//     // this.#user = {
//     //     usernameIn: '',
//     //     isAuthorIn: false,
//     //     isAuthorizedIn: false,
//     //     authorURL: '',
//     // };
//     dispatcher.register(this.reduce.bind(this));
//     console.log('register startStore');
//   }
//
//   //
//   // getUserState() {
//   //     return this.#user;
//   // }
//   //
//   // setState(result) {
//   //     this.#user.usernameIn = result.name;
//   //     this.#user.isAuthorIn = result.is_creator;
//   //     this.#user.isAuthorizedIn = true;
//   //     this.#user.authorURL = result.creator_id;
//   // }
//
//   async reduce(action) {
//     switch (action.type) {
//       case ActionTypes.START:
//         try {
//           // TODO убрал запрос на профиль перед запросом homePage
//           // const response = await request.get('/api/user/profile');
//           const result = await response.json();
//           if (result.login) {
//             userIn.usernameIn = result.name;
//             userIn.isAuthorizedIn = true;
//             const getPage = await request.get('/api/user/homePage');
//             const userHomePage = await getPage.json();
//             userIn.authorURL = userHomePage.creator_id;
//             userIn.isAuthorIn = userHomePage.is_creator;
//
//             renderSideBar(sideBarElement);
//             renderStartPage(contentElement);
//           }
//         } catch (err) {
//           renderSideBar(sideBarElement);
//           renderStartPage(contentElement);
//           console.log(err);
//         }
//         console.log('GET_USER');
//         break;
//       default:
//         break;
//     }
//   }
// }
//
// export const userStore = new StartStore();