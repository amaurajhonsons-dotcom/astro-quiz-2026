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
