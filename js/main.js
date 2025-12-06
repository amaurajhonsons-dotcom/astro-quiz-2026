let liveCount = 2847;
let timerSeconds = 86387;

function updateLiveCount() {
    liveCount += Math.floor(Math.random() * 5) + 1;
    const countElement = document.querySelector('.live-count');
    if (countElement) {
        countElement.textContent = liveCount.toLocaleString('en-IN');
    }
}

function updateTimer() {
    timerSeconds--;
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = timerSeconds % 60;

    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent =
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    if (timerSeconds <= 0) {
        timerSeconds = 86400;
    }
}

setInterval(updateLiveCount, 5000);
setInterval(updateTimer, 1000);

function startQuiz() {
    loadQuiz('love-match');
}

function loadQuiz(quizId) {
    localStorage.setItem('currentQuiz', quizId);
    window.location.href = `quizzes/quiz.html?id=${quizId}`;
}

setTimeout(() => {
    const popup = document.getElementById('pushPopup');
    if (popup && !localStorage.getItem('pushAsked')) {
        popup.classList.add('active');
        localStorage.setItem('pushAsked', 'true');
    }
}, 10000);

function closePushPopup() {
    const popup = document.getElementById('pushPopup');
    if (popup) {
        popup.classList.remove('active');
    }
}

// Custom Firebase Push Logic
async function enablePushNotifications() {
    closePushPopup();

    if (!messaging) {
        alert("Push Notifications supported only on HTTPS or Localhost.");
        return;
    }

    try {
        const permission = Notification.permission;

        if (permission === "denied") {
            alert("⚠️ आपने Notifications Block कर रखी हैं।\nकृपया Browser Settings में जाकर Reset करें या Allow करें।");
            return;
        }

        if (permission === "granted") {
            // Check if we already have a token
            const token = await messaging.getToken({ vapidKey: "YOUR_PUBLIC_VAPID_KEY_IF_NEEDED" });
            if (token) {
                alert('✅ नोटिफिकेशन्स पहले से ही एक्टिव हैं! 🎯');
                console.log("Existing Token:", token);
                saveTokenToFirestore(token); // Update timestamp
                return;
            }
        }

        console.log("Requesting permission...");
        const newPermission = await Notification.requestPermission();

        if (newPermission === "granted") {
            // Get Token
            const token = await messaging.getToken();
            console.log("Token generated:", token);

            if (token) {
                await saveTokenToFirestore(token);
                alert('✅ नोटिफिकेशन्स एक्टिव! डेली अपडेट्स मिलेंगे 🎯');
            } else {
                console.error("No Instance ID token available.");
            }
        } else {
            console.warn("Permission not granted");
            alert("❌ नोटिफिकेशन Allow नहीं किया गया।\nअपडेट्स के लिए कृपया Allow पर क्लिक करें।");
        }
    } catch (error) {
        console.error("Error asking for permission:", error);
        alert("Error: " + error.message);
    }
}

async function saveTokenToFirestore(token) {
    // Actually saving to PHP backend now
    try {
        await fetch('api/subscribe.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token })
        });
        console.log("Token sent to PHP Backend");
    } catch (error) {
        // Try fallback path if in subfolder
        try {
            await fetch('../api/subscribe.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token })
            });
        } catch (e) {
            console.error("Error saving token:", error);
        }
    }
}

window.addEventListener('load', () => {
    if (localStorage.getItem('visitCount')) {
        let count = parseInt(localStorage.getItem('visitCount'));
        localStorage.setItem('visitCount', count + 1);
    } else {
        localStorage.setItem('visitCount', '1');
    }
});

function trackEvent(eventName, data = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, data);
    }
    console.log('Event:', eventName, data);
}