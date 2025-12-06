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
    // This function is now termed "Native Request" usually called after Soft Prompt interaction
    // But we keep it compatible with the bell icon click too.
    closePushPopup();

    if (!messaging) return alert("Push not supported.");

    try {
        console.log("Requesting native permission...");
        const newPermission = await Notification.requestPermission();

        if (newPermission === "granted") {
            const token = await messaging.getToken();
            if (token) {
                await saveTokenToBackend(token);
                alert('✅ नोटिफिकेशन्स एक्टिव! डेली अपडेट्स मिलेंगे 🎯');
            }
        } else {
            alert("❌ Notification Blocked. Please reset permissions.");
        }
    } catch (e) {
        console.error(e);
        alert("Error: " + e.message);
    }
}

async function saveTokenToBackend(token) {
    try {
        await fetch('api/subscribe.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token })
        });
        console.log("Token sent to PHP Backend");
    } catch (error) {
        try {
            await fetch('../api/subscribe.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token })
            });
        } catch (e) { console.error("Error saving token:", error); }
    }
}

// --- Soft Prompt Logic ---
async function initSoftPrompt() {
    if (Notification.permission === "granted" || Notification.permission === "denied") {
        return; // Don't show if already decided
    }

    // Fetch Settings
    let config = {
        title: '🔔 Get Daily Astro Updates!',
        subtitle: 'Enable notifications to never miss your daily horoscope.',
        btnText: 'Allow Notifications',
        icon: 'https://cdn-icons-png.flaticon.com/512/3602/3602145.png'
    };

    try {
        const r = await fetch('api/settings.php');
        const data = await r.json();
        if (data.config) config = data.config;
    } catch (e) {
        // Fallback to relative path if needed
        try {
            const r = await fetch('../api/settings.php');
            const data = await r.json();
            if (data.config) config = data.config;
        } catch (err) { }
    }

    // Inject CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .soft-prompt-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9999; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px); }
        .soft-prompt-box { background: white; padding: 30px; border-radius: 16px; text-align: center; max-width: 90%; width: 350px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); animation: popIn 0.3s ease; font-family: 'Poppins', sans-serif; }
        .soft-prompt-icon { width: 60px; height: 60px; margin-bottom: 15px; }
        .soft-prompt-title { font-size: 20px; font-weight: 700; color: #333; margin: 0 0 10px; }
        .soft-prompt-sub { font-size: 14px; color: #666; margin-bottom: 25px; line-height: 1.5; }
        .soft-prompt-btn { background: #6200ea; color: white; border: none; padding: 12px 25px; border-radius: 50px; font-size: 16px; font-weight: 600; cursor: pointer; width: 100%; transition: transform 0.2s; }
        .soft-prompt-btn:active { transform: scale(0.95); }
        .soft-prompt-close { margin-top: 15px; font-size: 12px; color: #999; cursor: pointer; text-decoration: underline; }
        @keyframes popIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
    `;
    document.head.appendChild(style);

    // Create Modal
    const div = document.createElement('div');
    div.className = 'soft-prompt-overlay';
    div.innerHTML = `
        <div class="soft-prompt-box">
            <img src="${config.icon}" class="soft-prompt-icon" alt="icon">
            <h3 class="soft-prompt-title">${config.title}</h3>
            <p class="soft-prompt-sub">${config.subtitle}</p>
            <button class="soft-prompt-btn" onclick="triggerNativePrompt(this)">${config.btnText}</button>
            <div class="soft-prompt-close" onclick="this.closest('.soft-prompt-overlay').remove()">Maybe Later</div>
        </div>
    `;
    document.body.appendChild(div);
}

// Global function for the button
window.triggerNativePrompt = async function (btn) {
    btn.innerHTML = "Submitting...";
    document.querySelector('.soft-prompt-overlay').remove();
    await enablePushNotifications();
};

// Auto-run after 3 seconds
setTimeout(initSoftPrompt, 3000);

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