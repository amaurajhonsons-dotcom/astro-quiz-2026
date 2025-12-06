/**
 * Viral Growth Engine v2.0 - Multi-Path Unlock Strategy
 * Path A: Share (Primary)
 * Path B: Enable Push Notifications (Secondary)
 * Path C: Watch Timer (Fallback)
 * FOMO: Live unlock counter
 */

const ViralEngine = {
    REQUIRED_SHARES: 3,
    TIMER_SECONDS: 45,
    STORAGE_KEY: 'astro_viral_data',

    init() {
        this.data = this.loadData();
        this.updateUI();
        this.startFOMOCounter();
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

    // Universal unlock
    unlock(method) {
        this.data.unlocked = true;
        this.saveData();

        const overlay = document.getElementById('viralLockOverlay');
        const blurredTeaser = document.getElementById('blurredTeaser');

        if (overlay) {
            overlay.classList.add('unlocking');
            setTimeout(() => {
                overlay.style.display = 'none';
                if (blurredTeaser) blurredTeaser.style.display = 'none';
                document.getElementById('fullResultSection').style.display = 'block';
                this.showConfetti();
            }, 800);
        }

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
        const msgs = [
            `🔮 *मेरा 2026 का सीक्रेट निकला!* ${score}%\n\n😱 क्या तुम भी जानना चाहोगे?\n👉 ${link}`,
            `⚡ *SHOCKING!* AI ने मेरा फ्यूचर बता दिया!\n\n🔥 तुम्हारी बारी...\n👉 ${link}`,
            `💫 मेरा 2026 prediction: ${score}% accurate!\n\n🤯 तुम्हारा क्या निकलेगा?\n👉 ${link}`
        ];
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msgs[Math.floor(Math.random() * msgs.length)])}`, '_blank');
        this.trackShare('whatsapp');
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

