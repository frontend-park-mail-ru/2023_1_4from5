export const URLS = {
  root: '/',
  auth: '/auth',
  register: '/reg',
};
export function notifier(path) {
  switch (path.pathname) {
    case URLS.root:
      console.log('root');
      break;
    case URLS.auth:
      console.log('auth');
      break;
    case URLS.register:
      console.log('reg');
      break;
    default:
      console.log('undefined url');
      break;
  }
}
