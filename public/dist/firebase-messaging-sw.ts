importScripts('https://www.gstatic.com/firebasejs/9.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.8.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyCs9v1WpgN0G-GKCBS8whPK2hPzwDiiyfU',
  authDomain: 'subme-ef6b7.firebaseapp.com',
  projectId: 'subme-ef6b7',
  storageBucket: 'subme-ef6b7.appspot.com',
  messagingSenderId: '759387159264',
  appId: '1:759387159264:web:8bfcf46c688a421c586e85',
  measurementId: 'G-RDQS51ZNB6'
};

// @ts-expect-error TS(2304): Cannot find name 'firebase'.
firebase.initializeApp(firebaseConfig);
// @ts-expect-error TS(2304): Cannot find name 'firebase'.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload: any) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // @ts-expect-error TS(2339): Property 'registration' does not exist on type 'Wi... Remove this comment to see the full error message
  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  ).finally();
});
