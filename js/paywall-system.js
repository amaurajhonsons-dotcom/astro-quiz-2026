/**
 * Paywall & Share Gate System
 * Implements: Teaser → Share Gate → PayWall → Email flow
 * Based on: Strategic conversion optimization
 */

const PaywallSystem = {

    config: {
        price: 49, // ₹49 impulse price point
        currency: '₹',
        requiredShares: 2, // Lower friction
        timerHours: 24, // Urgency window
        teaserPercentage: 25 // Show 25% content
    },

    /**
     * Initialize paywall system
     */
    init(readingData) {
        this.readingData = readingData;
        this.setupUI();
        this.startCountdownTimer();
        this.updateSocialProof();
        this.trackUserBehavior();
    },

    /**
     * Setup paywall UI with teaser
     */
    setupUI() {
        const container = document.getElementById('paywallContainer');
        if (!container) return;

        const html = `
            <!-- Urgency Header -->
            <div class="urgency-header">
                <span class="urgency-icon">⏰</span>
                <span class="urgency-text">
                    यह रीडिंग <strong id="countdownTimer">23:59:59</strong> में expire होगी!
                </span>
            </div>

            <!-- Social Proof Banner -->
            <div class="social-proof-banner">
                <span class="proof-icon">🔥</span>
                <span class="proof-text">
                    <strong id="todayViewers">50,247</strong> लोगों ने आज अपना 2026 देखा
                </span>
            </div>

            <!-- Teaser Section (25% Content) -->
            <div class="reading-sections">
                ${this.generateTeaserSections()}
            </div>

            <!-- Primary Unlock Options -->
            <div class="unlock-options-primary">
                <h3 class="unlock-title">🔓 पूरा 2026 रीडिंग देखो</h3>
                <p class="unlock-subtitle">2 तरीके से unlock करो:</p>

                <!-- Option 1: Share to Unlock (FREE) -->
                <div class="unlock-option share-unlock highlighted">
                    <div class="option-badge">मुफ्त तरीका 🎁</div>
                    <h4>WhatsApp पर 2 Friends को भेजो</h4>
                    <p class="option-detail">
                        अपने दोस्तों को अपना प्रोफाइल भेजो और instantly unlock हो जाओ
                    </p>
                    <div class="share-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" id="shareProgressBar"></div>
                        </div>
                        <p class="progress-text">
                            <span id="shareCount">0</span>/2 शेयर्स • 
                            <span id="unlockCount">8,247</span> ने unlock किया
                        </p>
                    </div>
                    <button class="unlock-btn whatsapp-btn" onclick="PaywallSystem.shareToUnlock()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        WhatsApp पर भेजो = मुफ्त UNLOCK
                    </button>
                </div>

                <!-- OR Divider -->
                <div class="or-divider">
                    <span>या</span>
                </div>

                <!-- Option 2: Pay to Unlock -->
                <div class="unlock-option pay-unlock">
                    <div class="option-badge price-badge">
                        <span class="original-price">₹99</span>
                        <span class="discount-price">₹49</span>
                        <span class="discount-label">50% OFF</span>
                    </div>
                    <h4>Instantly Unlock करो</h4>
                    <p class="option-detail">
                        तुरंत पूरा रीडिंग देखो + Bonus daily predictions
                    </p>
                    <ul class="benefits-list">
                        <li>✓ पूरा 2026 डेस्टिनी कार्ड</li>
                        <li>✓ Love, Money, Career - सबकुछ</li>
                        <li>✓ Lucky dates & numbers</li>
                        <li>✓ Daily horoscope (30 दिन)</li>
                    </ul>
                    <div class="price-urgency">
                        ⏰ ये offer <strong id="priceTimer">59:42</strong> में ख़त्म होगा!
                    </div>
                    <button class="unlock-btn pay-btn" onclick="PaywallSystem.initiatePayment()">
                        ₹49 में अभी UNLOCK करो
                    </button>
                    <p class="guarantee">🔒 100% सुरक्षित payment • Instant access</p>
                </div>
            </div>

            <!-- Alternative Unlock (for those who don't want to share/pay) -->
            <div class="alt-unlock-options">
                <button class="alt-btn" onclick="PaywallSystem.enableNotifications()">
                    🔔 Notifications ON करो (15 दिन मुफ्त)
                </button>
            </div>
        `;

        container.innerHTML = html;
    },

    /**
     * Generate teaser sections (25% visible, 75% blurred)
     */
    generateTeaserSections() {
        const { love, money, career } = this.readingData;

        return `
            <div class="reading-section">
                <div class="section-header">
                    <span class="section-icon">💘</span>
                    <h3 class="section-title">Love & Relationships</h3>
                    <span class="lock-badge">🔒</span>
                </div>
                <div class="section-content">
                    <p class="visible-content">${love.teaser}</p>
                    <div class="locked-content">
                        <div class="blur-overlay">
                            <p class="blur-text">${love.full.substring(0, 200)}</p>
                        </div>
                        <div class="unlock-prompt">
                            <span class="unlock-icon">🔓</span>
                            <span>Share करके पूरा पढ़ो</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="reading-section">
                <div class="section-header">
                    <span class="section-icon">💰</span>
                    <h3 class="section-title">Money & Finances</h3>
                    <span class="lock-badge">🔒</span>
                </div>
                <div class="section-content">
                    <p class="visible-content">${money.teaser}</p>
                    <div class="locked-content">
                        <div class="blur-overlay">
                            <p class="blur-text">${money.full.substring(0, 200)}</p>
                        </div>
                        <div class="unlock-prompt">
                            <span class="unlock-icon">🔓</span>
                            <span>₹49 में unlock करो</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="reading-section">
                <div class="section-header">
                    <span class="section-icon">👔</span>
                    <h3 class="section-title">Career & Growth</h3>
                    <span class="lock-badge">🔒</span>
                </div>
                <div class="section-content">
                    <p class="visible-content">${career.teaser}</p>
                    <div class="locked-content">
                        <div class="blur-overlay">
                            <p class="blur-text">${career.full.substring(0, 200)}</p>
                        </div>
                        <div class="unlock-prompt">
                            <span class="unlock-icon">🔓</span>
                            <span>2 shares = मुफ्त unlock</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Share to unlock (FREE path)
     */
    shareToUnlock() {
        const { name, sun } = this.readingData.chart;
        const signName = sun.sign.charAt(0).toUpperCase() + sun.sign.slice(1);

        // Pre-written WhatsApp share text (psychology-based)
        const shareText = `🔮 मैंने अपना 2026 डेस्टिनी कार्ड देखा!

मैं ${signName} ${sun.symbol} हूँ और मेरा 2026 बहुत खास होने वाला है! 

तुम्हारा क्या? Free में देखो 👇
${window.location.origin}/?ref=${this.getRefCode()}

#Astro2026 #${signName}`;

        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

        // Track share attempt
        this.trackShare('whatsapp');

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Increment share count (simplified - actual tracking needs backend)
        setTimeout(() => {
            this.incrementShareCount();
        }, 3000);
    },

    /**
     * Increment share count and check if unlocked
     */
    incrementShareCount() {
        let shares = parseInt(localStorage.getItem('shareCount') || '0');
        shares++;
        localStorage.setItem('shareCount', shares);

        document.getElementById('shareCount').textContent = shares;
        document.getElementById('shareProgressBar').style.width = `${(shares / this.config.requiredShares) * 100}%`;

        if (shares >= this.config.requiredShares) {
            this.unlockReading('share');
        }
    },

    /**
     * Initiate Razorpay payment
     */
    initiatePayment() {
        const { name } = this.readingData.chart;

        // Razorpay integration
        const options = {
            key: 'rzp_live_XXXXXXXX', // Replace with actual key
            amount: this.config.price * 100, // Convert to paise
            currency: 'INR',
            name: 'AstroQuiz 2026',
            description: 'Complete 2026 Reading',
            image: '/path/to/logo.png',
            handler: (response) => {
                this.unlockReading('payment', response.razorpay_payment_id);
            },
            prefill: {
                name: name,
                email: '', // Collect if available
                contact: ''
            },
            theme: {
                color: '#8b5cf6'
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();

        this.trackEvent('payment_initiated');
    },

    /**
     * Unlock full reading
     */
    unlockReading(method, paymentId = null) {
        // Hide paywall
        document.getElementById('paywallContainer').style.display = 'none';

        // Show full reading
        const fullContent = document.getElementById('fullReadingContent');
        if (fullContent) {
            fullContent.innerHTML = this.generateFullReading();
            fullContent.style.display = 'block';
        }

        // Show celebration
        this.showCelebration();

        // Track unlock
        this.trackUnlock(method, paymentId);

        // Show email capture popup (after 5 seconds)
        setTimeout(() => {
            this.showEmailCapture();
        }, 5000);
    },

    /**
     * Generate full reading content
     */
    generateFullReading() {
        const { love, money, career } = this.readingData;

        return `
            <div class="unlocked-reading">
                <div class="celebration-badge">
                    🎉 Unlocked Successfully!
                </div>

                <div class="full-section">
                    <h2>💘 ${love.title}</h2>
                    <div class="section-content-full">${this.formatReading(love.full)}</div>
                </div>

                <div class="full-section">
                    <h2>💰 ${money.title}</h2>
                    <div class="section-content-full">${this.formatReading(money.full)}</div>
                </div>

                <div class="full-section">
                    <h2>👔 ${career.title}</h2>
                    <div class="section-content-full">${this.formatReading(career.full)}</div>
                </div>

                <div class="share-result-card">
                    <h3>अपने दोस्तों को भी भेजो! 🎁</h3>
                    <button class="share-btn-secondary" onclick="PaywallSystem.shareToUnlock()">
                        WhatsApp पर भेजो
                    </button>
                </div>
            </div>
        `;
    },

    /**
     * Format reading text with line breaks
     */
    formatReading(text) {
        return text.split('\n').map(para => {
            if (para.trim().startsWith('**')) {
                return `<h4>${para.replace(/\*\*/g, '')}</h4>`;
            }
            if (para.trim().startsWith('•')) {
                return `<li>${para.substring(1).trim()}</li>`;
            }
            return `<p>${para}</p>`;
        }).join('');
    },

    /**
     * Show email capture popup
     */
    showEmailCapture() {
        const popup = document.createElement('div');
        popup.className = 'email-capture-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <button class="close-popup" onclick="this.parentElement.parentElement.remove()">×</button>
                <h3>📧 रोज़ Free Predictions पाओ!</h3>
                <p>Daily horoscope + weekly tips सीधे inbox में</p>
                <input type="email" id="emailInput" placeholder="Your email" class="email-input">
                <button class="subscribe-btn" onclick="PaywallSystem.captureEmail()">
                    Subscribe (Free)
                </button>
                <p class="privacy-note">🔒 We respect your privacy</p>
            </div>
        `;
        document.body.appendChild(popup);
    },

    /**
     * Capture email
     */
    captureEmail() {
        const email = document.getElementById('emailInput').value;
        if (!email || !email.includes('@')) {
            alert('Valid email डालो');
            return;
        }

        // Send to backend
        fetch('/api/capture-email.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, source: 'paywall_unlock' })
        });

        document.querySelector('.email-capture-popup').remove();
        alert('✅ Subscribed! Daily tips आने शुरू हो जाएंगे।');
    },

    /**
     * Start countdown timer (24-hour urgency)
     */
    startCountdownTimer() {
        const endTime = Date.now() + (this.config.timerHours * 60 * 60 * 1000);

        const updateTimer = () => {
            const remaining = endTime - Date.now();
            if (remaining <= 0) return;

            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

            const timer = document.getElementById('countdownTimer');
            if (timer) {
                timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    },

    /**
     * Update social proof counters
     */
    updateSocialProof() {
        const baseCount = 50247;
        let count = baseCount + Math.floor(Math.random() * 1000);

        setInterval(() => {
            count += Math.floor(Math.random() * 5) + 1;
            const el = document.getElementById('todayViewers');
            if (el) el.textContent = count.toLocaleString();
        }, 5000);
    },

    /**
     * Show celebration animation
     */
    showCelebration() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-animation';
        confetti.innerHTML = '🎉🎊✨🌟💫'.repeat(10);
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    },

    /**
     * Analytics tracking
     */
    trackEvent(event) {
        gtag?.('event', event, { event_category: 'paywall' });
    },

    trackShare(platform) {
        gtag?.('event', 'share', { event_category: 'paywall', platform });
    },

    trackUnlock(method, paymentId) {
        gtag?.('event', 'unlock', { event_category: 'paywall', method, payment_id: paymentId });
    },

    trackUserBehavior() {
        // Track scroll depth, time on page, etc.
    },

    getRefCode() {
        return 'user' + Math.random().toString(36).substr(2, 9);
    },

    enableNotifications() {
        // Implement notification permission request
        alert('Notifications coming soon!');
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaywallSystem;
}
