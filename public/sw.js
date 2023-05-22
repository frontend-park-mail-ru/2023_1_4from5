const CACHE_NAME = 'subme_cache';
const CACHE_URLS = [
  '/dist/',
];

self.addEventListener('activate', (event) => {
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('install', (event) => {
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
}) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  let preloadResponse;
  try {
    preloadResponse = await Promise.race([
      preloadResponsePromise,
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Preload response timed out')), 5000);
      }),
    ]);
  } catch (error) {
    console.error(error);
  }

  if (preloadResponse) {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, preloadResponse.clone());
    return preloadResponse;
  }

  let responseFromNetwork;
  try {
    responseFromNetwork = await fetch(request);
  } catch (error) {
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  if (!request.url.includes('/api/') && !request.url.endsWith('.mp4') && !request.url.endsWith('.mp3')) {
    await putInCache(request, responseFromNetwork.clone());
  }
  return responseFromNetwork;
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
