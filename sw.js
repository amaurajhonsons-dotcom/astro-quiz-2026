self.options = {
    "domain": "5gvci.com",
    "zoneId": 10285802
}
self.lary = ""
importScripts('https://5gvci.com/act/files/service-worker.min.js?r=sw')

// PWA Cache (Existing)
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('astro-store').then((cache) => cache.addAll([
            '/',
            '/index.php',
            '/css/style.css',
            '/manifest.json',
            '/icon.png'
        ])),
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});
