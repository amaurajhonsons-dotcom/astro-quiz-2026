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

function enablePushNotifications() {
    closePushPopup();

    if (window.OneSignalDeferred) {
        window.OneSignalDeferred.push(async function (OneSignal) {
            try {
                // Check if already blocked
                if (OneSignal.Notifications.permission === "denied") {
                    alert("⚠️ आपने Notifications Block कर रखी हैं।\nकृपया Browser Settings में जाकर Reset करें या Allow करें।");
                    return;
                }

                if (OneSignal.Notifications.permission === "granted") {
                    alert('✅ नोटिफिकेशन्स पहले से ही एक्टिव हैं! 🎯');
                    return;
                }

                console.log("Requesting permission...");
                // Request permission and wait for user response
                const accepted = await OneSignal.Notifications.requestPermission();

                console.log("Permission state:", accepted);

                if (accepted) {
                    alert('✅ नोटिफिकेशन्स एक्टिव! डेली अपडेट्स मिलेंगे 🎯');
                } else {
                    console.warn("Permission not granted");
                    // User dismissed or blocked
                    alert("❌ नोटिफिकेशन Allow नहीं किया गया।\nअपडेट्स के लिए कृपया Allow पर क्लिक करें।");
                }
            } catch (error) {
                console.error("Error asking for permission:", error);
                alert("Error: " + error.message);
            }
        });
    } else {
        alert("सिस्टम लोड हो रहा है, कृपया 2 सेकंड बाद कोशिश करें।");
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