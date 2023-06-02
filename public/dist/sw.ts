const CACHE_NAME = 'subme_cache';
const CACHE_URLS = [
  '/dist/',
];

self.addEventListener('activate', (event) => {
  // @ts-expect-error TS(2339): Property 'waitUntil' does not exist on type 'Event... Remove this comment to see the full error message
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('install', (event) => {
  // @ts-expect-error TS(2339): Property 'waitUntil' does not exist on type 'Event... Remove this comment to see the full error message
  event.waitUntil(
    addResourcesToCache(CACHE_URLS)
  );
});

const addResourcesToCache = async (resources: any) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(resources);
};

const putInCache = async (request: any, response: any) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};

const netFirst = async ({
  request,

  // eslint-disable-next-line consistent-return
  preloadResponsePromise /* fallbackUrl */
}: any) => {
  // if (navigator.onLine) {
  // try to get the resource from the network
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    await putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }

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

  if (!request.url.includes('/api/') && !request.url.endsWith('.mp4') && !request.url.endsWith('.mp3')) {
    await putInCache(request, responseFromNetwork.clone());
  }
  return responseFromNetwork;
};

const enableNavigationPreload = async () => {
  // @ts-expect-error TS(2339): Property 'registration' does not exist on type 'Wi... Remove this comment to see the full error message
  if (self.registration.navigationPreload) {
    // Enable navigation preloads!
    // @ts-expect-error TS(2339): Property 'registration' does not exist on type 'Wi... Remove this comment to see the full error message
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener('fetch', (event) => {
  // @ts-expect-error TS(2339): Property 'respondWith' does not exist on type 'Eve... Remove this comment to see the full error message
  event.respondWith(
    netFirst({
      // @ts-expect-error TS(2339): Property 'request' does not exist on type 'Event'.
      request: event.request,
      // @ts-expect-error TS(2339): Property 'preloadResponse' does not exist on type ... Remove this comment to see the full error message
      preloadResponsePromise: event.preloadResponse,
    })
  );
});
