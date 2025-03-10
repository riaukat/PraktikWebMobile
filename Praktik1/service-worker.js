const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = ["/", "/index.html", "/Manifest.json"];

// Instalasi service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching files");
      return cache.addAll(urlsToCache);
    })
  );
});

// Aktifkan Service Worker dan Hapus Cache Lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Menghapus cache lama");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetching Cache untuk Offline Mode
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
