import { precacheAndRoute } from 'workbox-precaching';

// Этот массив содержит все файлы, которые вы хотите кэшировать с помощью Workbox
// Вам нужно добавить все необходимые файлы, включая HTML, CSS, JS и т.д.
precacheAndRoute(self.__WB_MANIFEST);

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const urlsToCache = workbox.core.__precacheManifest.map(({ url }) => url);

workbox.precaching.precacheAndRoute(urlsToCache);

self.addEventListener('fetch', (event) => {
  console.log('Происходит запрос на сервер');
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        console.log(cachedResponse);
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
  );
});
