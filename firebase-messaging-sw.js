importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAPn7Wa7Cw0_NeiGNuCgUlJcIsJjNFTk84",
    authDomain: "astro-quiz-push-2026.firebaseapp.com",
    projectId: "astro-quiz-push-2026",
    storageBucket: "astro-quiz-push-2026.firebasestorage.app",
    messagingSenderId: "659060108550",
    appId: "1:659060108550:web:81bfa17f16d75453580287"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon || '/icon.png', // Fallback icon
        image: payload.notification.image,
        data: payload.data, // Custom data like click_action
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    const clickAction = event.notification.data?.click_action || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === clickAction && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(clickAction);
            }
        })
    );
});
