/**
 * Viral Growth Engine - Share-to-Unlock Mechanism
 * Triggers chain sharing via WhatsApp
 */

const ViralEngine = {
    REQUIRED_SHARES: 3,
    STORAGE_KEY: 'astro_viral_data',

    // Initialize
    init() {
        this.data = this.loadData();
        this.updateUI();
    },

    // Load from localStorage
    loadData() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : {
            shareCount: 0,
            unlocked: false,
            referralCode: this.generateReferralCode(),
            lastShare: null
        };
    },

    // Save to localStorage
    saveData() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    },

    // Generate unique referral code
    generateReferralCode() {
        return 'AQ' + Math.random().toString(36).substring(2, 8).toUpperCase();
    },

    // Track share action
    trackShare(platform) {
        this.data.shareCount++;
        this.data.lastShare = Date.now();
        this.saveData();
        this.updateUI();

        // Check if unlocked
        if (this.data.shareCount >= this.REQUIRED_SHARES && !this.data.unlocked) {
            this.unlockFullResult();
        }

        // Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'share', {
                'event_category': 'viral',
                'event_label': platform,
                'value': this.data.shareCount
            });
        }
    },

    // Update UI elements
    updateUI() {
        // Update referral progress bar
        const fill = document.getElementById('referralFill');
        const count = document.getElementById('referralCount');

        if (fill && count) {
            const percentage = Math.min((this.data.shareCount / this.REQUIRED_SHARES) * 100, 100);
            fill.style.width = percentage + '%';
            count.textContent = this.data.shareCount;
        }

        // Show/hide lock overlay
        const lockOverlay = document.getElementById('viralLockOverlay');
        if (lockOverlay) {
            lockOverlay.style.display = this.data.unlocked ? 'none' : 'flex';
        }

        // Show/hide full result
        const fullResult = document.getElementById('fullResultSection');
        if (fullResult) {
            fullResult.style.display = this.data.unlocked ? 'block' : 'none';
        }
    },

    // Unlock full result with animation
    unlockFullResult() {
        this.data.unlocked = true;
        this.saveData();

        const lockOverlay = document.getElementById('viralLockOverlay');
        if (lockOverlay) {
            lockOverlay.classList.add('unlocking');
            setTimeout(() => {
                lockOverlay.style.display = 'none';
                document.getElementById('fullResultSection').style.display = 'block';
                this.showConfetti();
            }, 1000);
        }
    },

    // Confetti celebration
    showConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.id = 'confetti';
        confettiContainer.innerHTML = '🎉🎊✨🌟💫';
        confettiContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
            z-index: 9999;
            animation: confettiBurst 1.5s ease-out forwards;
        `;
        document.body.appendChild(confettiContainer);
        setTimeout(() => confettiContainer.remove(), 1500);
    },

    // WhatsApp share with viral message
    shareWhatsAppViral(quizResult) {
        const referralLink = `https://astro-quiz-2026-52bxx.ondigitalocean.app/?ref=${this.data.referralCode}`;
        const messages = [
            `🔮 *मेरा 2026 का सीक्रेट निकला!* ${quizResult}%\n\n😱 क्या तुम भी जानना चाहोगे?\n👉 ${referralLink}`,
            `⚡ *SHOCKING!* मेरी 2026 की prediction देखो!\n\n🔥 तुम्हारा क्या निकलेगा?\n👉 ${referralLink}`,
            `💫 *AI ने मेरा फ्यूचर बता दिया!*\n\n🤯 अब तुम्हारी बारी...\n👉 ${referralLink}`
        ];
        const message = messages[Math.floor(Math.random() * messages.length)];
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

        window.open(url, '_blank');
        this.trackShare('whatsapp');
    },

    // Check referral on page load
    checkReferral() {
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get('ref');
        if (ref) {
            // Track referral visit
            if (typeof gtag !== 'undefined') {
                gtag('event', 'referral_visit', {
                    'event_category': 'viral',
                    'event_label': ref
                });
            }
        }
    }
};

// Auto-init on page load
document.addEventListener('DOMContentLoaded', () => {
    ViralEngine.init();
    ViralEngine.checkReferral();
});

// Global function for button onclick
function shareWhatsAppViral() {
    const score = document.getElementById('resultScore')?.textContent || '95';
    ViralEngine.shareWhatsAppViral(score);
}

// Add confetti animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiBurst {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }
    
    .unlocking {
        animation: unlockPulse 1s ease-out forwards;
    }
    
    @keyframes unlockPulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.5; }
        100% { transform: scale(0); opacity: 0; }
    }
    
    #viralLockOverlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(10px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 100;
        border-radius: 20px;
        padding: 30px;
        text-align: center;
    }
    
    .lock-icon {
        font-size: 4rem;
        margin-bottom: 20px;
        animation: shake 0.5s infinite;
    }
    
    @keyframes shake {
        0%, 100% { transform: rotate(-5deg); }
        50% { transform: rotate(5deg); }
    }
    
    .viral-share-btn {
        background: linear-gradient(135deg, #25D366, #128C7E);
        color: white;
        border: none;
        padding: 18px 40px;
        border-radius: 50px;
        font-size: 1.2rem;
        font-weight: 700;
        cursor: pointer;
        margin-top: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
        animation: pulse 2s infinite;
    }
    
    .lock-text {
        color: #FFD700;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 10px;
    }
    
    .lock-subtext {
        color: #CBD5E1;
        font-size: 1rem;
        max-width: 300px;
    }
`;
document.head.appendChild(style);
