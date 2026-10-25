// Service Worker for Prajwalkumar Madiwal Streaming Portfolio Shell
const CACHE_NAME = 'pkm-portfolio-shell-v3';
const STATIC_ASSETS = [
  '/',
  '/who',
  '/manifest.json',
  '/favicon.ico',
  '/assets/webp/avatar_recruiter.webp',
  '/assets/webp/avatar_browse.webp',
  '/assets/webp/avatar_sessions.webp',
  '/assets/webp/avatar_networker.webp',
  '/assets/webp/srushti_avatar.webp',
  '/assets/webp/srushti_profile.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Stale-while-revalidate for critical assets
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
  }
});
