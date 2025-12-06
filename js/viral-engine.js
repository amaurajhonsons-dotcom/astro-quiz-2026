/**
 * Viral Growth Engine v2.0 - Multi-Path Unlock Strategy
 * Path A: Share (Primary)
 * Path B: Enable Push Notifications (Secondary)
 * Path C: Watch Timer (Fallback)
 * FOMO: Live unlock counter
 */

const ViralEngine = {
    REQUIRED_SHARES: 2,
    TIMER_SECONDS: 45,
    STORAGE_KEY: 'astro_viral_data',

    init() {
        this.data = this.loadData();
        this.updateUI();
        this.startFOMOCounter();
        this.startLiveViewers();
        this.startTodayCounter();
        this.startExpiryTimer();
        this.populateZodiacBadge();
        if (!this.data.unlocked) {
            this.startTimer();
        }
    },

    loadData() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : {
            shareCount: 0,
            unlocked: false,
            referralCode: this.generateReferralCode(),
            notificationsEnabled: false,
            timerCompleted: false
        };
    },

    saveData() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    },

    generateReferralCode() {
        return 'AQ' + Math.random().toString(36).substring(2, 8).toUpperCase();
    },

    // PATH A: Share tracking
    trackShare(platform) {
        this.data.shareCount++;
        this.saveData();
        this.updateShareCount();

        // Save to Firestore for admin analytics
        if (typeof db !== 'undefined') {
            db.collection('shares').add({
                platform: platform,
                referralCode: this.data.referralCode,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                userAgent: navigator.userAgent.substring(0, 100)
            }).catch(e => console.log('Share log failed', e));
        }

        if (this.data.shareCount >= this.REQUIRED_SHARES) {
            this.unlock('share');
        }

        gtag?.('event', 'share', { event_category: 'viral', event_label: platform });
    },

    // PATH B: Push Notifications unlock
    async unlockWithNotifications() {
        if (typeof enablePushNotifications === 'function') {
            await enablePushNotifications();
            // Check if permission granted
            if (Notification.permission === 'granted') {
                this.data.notificationsEnabled = true;
                this.saveData();
                this.unlock('notifications');
            }
        }
    },

    // PATH C: Timer unlock (partial)
    startTimer() {
        let remaining = this.TIMER_SECONDS;
        const timerEl = document.getElementById('unlockTimer');
        const timerBtn = document.getElementById('timerUnlockBtn');

        if (!timerEl) return;

        const interval = setInterval(() => {
            remaining--;
            timerEl.textContent = remaining;

            if (remaining <= 0) {
                clearInterval(interval);
                this.data.timerCompleted = true;
                this.saveData();
                if (timerBtn) {
                    timerBtn.disabled = false;
                    timerBtn.textContent = '🎁 अभी देखो!';
                    timerBtn.classList.add('ready');
                }
            }
        }, 1000);
    },

    timerUnlock() {
        if (this.data.timerCompleted) {
            this.unlock('timer');
        }
    },

    // FOMO: Fake live counter
    startFOMOCounter() {
        const counter = document.getElementById('fomoCounter');
        if (!counter) return;

        let count = 1247 + Math.floor(Math.random() * 100);
        counter.textContent = count.toLocaleString();

        setInterval(() => {
            count += Math.floor(Math.random() * 3) + 1;
            counter.textContent = count.toLocaleString();
        }, 3000 + Math.random() * 2000);
    },

    // Psychology: Live viewers counter
    startLiveViewers() {
        const el = document.getElementById('liveViewers');
        if (!el) return;

        let viewers = 200 + Math.floor(Math.random() * 600);
        el.textContent = viewers;

        setInterval(() => {
            viewers += Math.floor(Math.random() * 11) - 5; // fluctuate +/- 5
            viewers = Math.max(150, Math.min(999, viewers)); // keep between 150-999
            el.textContent = viewers;
        }, 2000 + Math.random() * 3000);
    },

    // Psychology: Today's count
    startTodayCounter() {
        const el = document.getElementById('todayCount');
        if (!el) return;

        const base = 8000 + Math.floor(Math.random() * 5000);
        el.textContent = base.toLocaleString();

        setInterval(() => {
            const current = parseInt(el.textContent.replace(/,/g, '')) + Math.floor(Math.random() * 5) + 1;
            el.textContent = current.toLocaleString();
        }, 4000 + Math.random() * 3000);
    },

    // Psychology: Expiry timer (24 hour countdown)
    startExpiryTimer() {
        const el = document.getElementById('expiryTime');
        if (!el) return;

        // Calculate time until midnight
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        let remaining = Math.floor((midnight - now) / 1000);

        const updateTimer = () => {
            const h = Math.floor(remaining / 3600);
            const m = Math.floor((remaining % 3600) / 60);
            const s = remaining % 60;
            el.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            remaining--;
            if (remaining < 0) remaining = 86400; // reset to 24 hours
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    },

    // Psychology: Zodiac badge personalization
    populateZodiacBadge() {
        const badge = document.getElementById('zodiacBadge');
        const element = document.getElementById('elementReveal');
        if (!badge) return;

        // Get zodiac from URL or localStorage
        const zodiacSymbols = {
            aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋',
            leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
            sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓'
        };

        const elements = {
            aries: 'Fire 🔥', taurus: 'Earth 🌍', gemini: 'Air 💨', cancer: 'Water 💧',
            leo: 'Fire 🔥', virgo: 'Earth 🌍', libra: 'Air 💨', scorpio: 'Water 💧',
            sagittarius: 'Fire 🔥', capricorn: 'Earth 🌍', aquarius: 'Air 💨', pisces: 'Water 💧'
        };

        // Try to get from recent quiz data
        const stored = localStorage.getItem('lastZodiac');
        if (stored && zodiacSymbols[stored]) {
            badge.textContent = zodiacSymbols[stored];
            if (element) element.textContent = elements[stored];
        }
    },


    // Universal unlock
    unlock(method) {
        this.data.unlocked = true;
        this.saveData();

        // Hide locked sections, show full result
        const elementsToHide = ['reveal-preview', 'unlock-section', 'urgency-box'];
        elementsToHide.forEach(cls => {
            const el = document.querySelector('.' + cls);
            if (el) el.style.display = 'none';
        });

        // Update locked items to unlocked
        document.querySelectorAll('.reveal-item.locked').forEach(item => {
            item.classList.remove('locked');
            item.classList.add('unlocked');
            const status = item.querySelector('.reveal-status');
            if (status) status.textContent = '✅';
            const blur = item.querySelector('.blur-text');
            if (blur) blur.style.filter = 'none';
        });

        // Show full result section
        const fullResult = document.getElementById('fullResultSection');
        if (fullResult) {
            fullResult.style.display = 'block';
            fullResult.style.animation = 'fadeIn 0.5s ease';
        }

        this.showConfetti();
        gtag?.('event', 'unlock', { event_category: 'viral', event_label: method });
    },

    showConfetti() {
        const el = document.createElement('div');
        el.innerHTML = '🎉🎊✨🌟💫';
        el.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:4rem;z-index:9999;animation:confettiBurst 1.5s ease-out forwards;`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1500);
    },

    updateUI() {
        const overlay = document.getElementById('viralLockOverlay');
        const fullResult = document.getElementById('fullResultSection');
        const blurredTeaser = document.getElementById('blurredTeaser');

        if (this.data.unlocked) {
            if (overlay) overlay.style.display = 'none';
            if (blurredTeaser) blurredTeaser.style.display = 'none';
            if (fullResult) fullResult.style.display = 'block';
        }
    },

    updateShareCount() {
        const el = document.getElementById('lockShareCount');
        if (el) el.textContent = this.data.shareCount;
    },

    shareWhatsAppViral(score) {
        const link = `https://astro-quiz-2026-52bxx.ondigitalocean.app/?ref=${this.data.referralCode}`;

        // More compelling challenge-based messages
        const msgs = [
            `🚨 *SHOCKING!* AI ने मेरा 2026 का SECRET बता दिया!\n\n💘 Soulmate का नाम "${this.getRandomLetter()}" से शुरू होगा!\n📅 ${this.getRandomDate()} को life change होगी!\n\n😱 *तेरा क्या निकलेगा? चेक कर:*\n👉 ${link}`,

            `🔮 *मेरा 2026 EXPOSED!*\n\n💰 ₹${Math.floor(Math.random() * 20 + 5)},00,000 आएंगे!\n⚠️ एक WARNING भी मिली जो मैं बता नहीं सकता...\n\n*तू भी देख अपना:*\n👉 ${link}`,

            `⚡ *CHALLENGE!* मेरा score ${score}% आया!\n\n🎯 AI ने मेरे बारे में ऐसी बात बताई जो सिर्फ मुझे पता थी 😳\n\n*तेरा कितना आएगा? BET लगा:*\n👉 ${link}`,

            `😱 *ये Quiz REAL है भाई!*\n\nAI ने बताया:\n💘 मेरा soulmate "${this.getRandomLetter()}" नाम का है\n📅 ${this.getRandomDate()} important date है\n\n*अपना future देख:*\n👉 ${link}`
        ];

        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msgs[Math.floor(Math.random() * msgs.length)])}`, '_blank');
        this.trackShare('whatsapp');
    },

    getRandomLetter() {
        const letters = ['A', 'S', 'R', 'M', 'P', 'K', 'V', 'N', 'D', 'T'];
        return letters[Math.floor(Math.random() * letters.length)];
    },

    getRandomDate() {
        const dates = ['17 March', '23 April', '8 June', '15 July', '3 September', '21 October'];
        return dates[Math.floor(Math.random() * dates.length)];
    },

    checkReferral() {
        const ref = new URLSearchParams(window.location.search).get('ref');
        if (ref) gtag?.('event', 'referral_visit', { event_category: 'viral', event_label: ref });
    }
};

// Init
document.addEventListener('DOMContentLoaded', () => {
    ViralEngine.init();
    ViralEngine.checkReferral();
});

// Global functions
function shareWhatsAppViral() {
    const score = document.getElementById('resultScore')?.textContent || '95';
    ViralEngine.shareWhatsAppViral(score);
}

function unlockWithNotifications() {
    ViralEngine.unlockWithNotifications();
}

function timerUnlock() {
    ViralEngine.timerUnlock();
}

// Inject CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiBurst {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }
    .unlocking { animation: unlockPulse 0.8s ease-out forwards; }
    @keyframes unlockPulse {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(0); opacity: 0; }
    }
    .result-card { position: relative !important; overflow: hidden !important; }
    #viralLockOverlay {
        position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
        background: linear-gradient(135deg, rgba(15,23,42,0.98), rgba(88,28,135,0.95)) !important;
        backdrop-filter: blur(10px);
        display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important;
        z-index: 100 !important; border-radius: 20px; padding: 25px; text-align: center;
    }
    .lock-icon { font-size: 3.5rem; margin-bottom: 15px; animation: shake 0.5s infinite; }
    @keyframes shake { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
    .viral-share-btn {
        background: linear-gradient(135deg, #25D366, #128C7E) !important;
        color: white !important; border: none !important; padding: 16px 35px !important; border-radius: 50px !important;
        font-size: 1.1rem !important; font-weight: 700 !important; cursor: pointer !important; margin: 8px 0 !important;
        display: flex !important; align-items: center !important; gap: 10px !important;
        box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4) !important;
        width: auto !important;
    }
    .notification-btn {
        background: linear-gradient(135deg, #8B5CF6, #6D28D9) !important;
        color: white !important; border: none !important; padding: 14px 30px !important; border-radius: 50px !important;
        font-size: 1rem !important; font-weight: 600 !important; cursor: pointer !important; margin: 8px 0 !important;
        box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3) !important;
        width: auto !important;
    }
    .timer-btn {
        background: rgba(255,255,255,0.1) !important; color: #94A3B8 !important;
        border: 1px solid rgba(255,255,255,0.2) !important; padding: 12px 25px !important;
        border-radius: 50px !important; font-size: 0.9rem !important; cursor: not-allowed !important; margin-top: 15px !important;
        width: auto !important;
    }
    .timer-btn.ready { background: #F59E0B !important; color: #78350F !important; cursor: pointer !important; border: none !important; }
    .lock-text { color: #FFD700 !important; font-size: 1.4rem !important; font-weight: 700 !important; margin-bottom: 8px !important; }
    .lock-subtext { color: #CBD5E1 !important; font-size: 0.95rem !important; max-width: 280px; margin-bottom: 15px !important; }
    .fomo-text { color: #34D399 !important; font-size: 0.85rem !important; margin-top: 12px !important; }
    .or-divider { color: #64748B !important; margin: 10px 0 !important; font-size: 0.85rem !important; }
`;
document.head.appendChild(style);

