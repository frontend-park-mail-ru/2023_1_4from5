const CACHE_NAME = 'subme_cache';
const CACHE_URLS = [
  '/dist/',
];

self.addEventListener('activate', (event) => {
  console.log('SW activated');
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('install', (event) => {
  console.log('SW installed');
  event.waitUntil(
    addResourcesToCache(CACHE_URLS)
  );
});

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};

const cacheFirst = async ({
  request,
  preloadResponsePromise, /* fallbackUrl */
// eslint-disable-next-line consistent-return
}) => {
  if (navigator.onLine) {
    // Next try to get the resource from the network
    let responseFromNetwork;
    try {
      responseFromNetwork = await fetch(request);
      // response may be used only once
      // we need to save clone to put one copy in cache
      // and serve second one
    } catch (error) {
      return new Response('Network error happened', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    await putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  }

  // First try to get the resource from the cache
  if (!navigator.onLine) {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }

    // Next try to use the preloaded response, if it's there
    const preloadResponse = await preloadResponsePromise;
    if (preloadResponse) {
      await putInCache(request, preloadResponse.clone());
      return preloadResponse;
    }
  }
};

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads!
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener('fetch', (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
    })
  );
});
