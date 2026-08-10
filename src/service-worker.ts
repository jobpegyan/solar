const CACHE_NAME = 'solar-calculator-v1';
const OFFLINE_URL = '/offline';

const ASSETS_TO_CACHE = [
  '/',
  OFFLINE_URL,
  '/manifest.webmanifest',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  (self as any).skipWaiting();
});

self.addEventListener('activate', (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      );
    })
  );
  (self as any).clients.claim();
});

self.addEventListener('fetch', (event: any) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        // Only cache static assets and successful GET requests
        if (
          event.request.method === 'GET' &&
          (fetchResponse.url.includes('.js') || 
           fetchResponse.url.includes('.css') || 
           fetchResponse.url.includes('.png') ||
           fetchResponse.url.includes('fonts.googleapis.com'))
        ) {
          const responseToCache = fetchResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return fetchResponse;
      });
    })
  );
});
