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

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  ).finally();
});

// onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//   };
//
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
