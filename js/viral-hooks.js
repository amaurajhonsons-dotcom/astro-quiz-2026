let referralCount = 0;

function shareWhatsApp() {
    const quizId = new URLSearchParams(window.location.search).get('id');
    const resultText = document.getElementById('resultTitle')?.textContent || 'मेरा 2026 प्रेडिक्शन देखो!';
    
    const message = `🔮 ${resultText}\n\n` +
                   `मैंने अभी ये AI एस्ट्रो क्विज़ लिया - बिल्कुल सटीक! 😱\n\n` +
                   `तुम भी ट्राई करो (फ्री): ${window.location.origin}?ref=whatsapp\n\n` +
                   `#2026Prediction #Astrology #Viral`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    trackShare('whatsapp');
    updateReferralProgress();
}

function shareTwitter() {
    const resultText = document.getElementById('resultTitle')?.textContent || 'मेरा 2026 प्रेडिक्शन';
    
    const tweet = `🔮 ${resultText}\n\n` +
                 `AI + वैदिक एस्ट्रोलॉजी से मिला मेरा 2026 प्रेडिक्शन! बिल्कुल accurate 😱\n\n` +
                 `तुम भी देखो: ${window.location.origin}?ref=twitter\n\n` +
                 `#2026Predictions #Astrology #Viral`;
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(twitterUrl, '_blank');
    
    trackShare('twitter');
    updateReferralProgress();
}

function downloadResult() {
    const resultCard = document.getElementById('resultCard');
    if (!resultCard) return;
    
    if (typeof html2canvas !== 'undefined') {
        html2canvas(resultCard).then(canvas => {
            const link = document.createElement('a');
            link.download = '2026-prediction.png';
            link.href = canvas.toDataURL();
            link.click();
            
            trackShare('download');
            updateReferralProgress();
        });
    } else {
        alert('📥 रिजल्ट का स्क्रीनशॉट ले लो और शेयर करो! 📸');
        trackShare('screenshot');
        updateReferralProgress();
    }
}

function trackShare(platform) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'share', {
            method: platform,
            content_type: 'quiz_result',
            item_id: new URLSearchParams(window.location.search).get('id')
        });
    }
    
    const shares = parseInt(localStorage.getItem('totalShares') || '0');
    localStorage.setItem('totalShares', (shares + 1).toString());
    
    console.log(`Share tracked: ${platform}`);
}

function updateReferralProgress() {
    referralCount++;
    
    const fillElement = document.getElementById('referralFill');
    const countElement = document.getElementById('referralCount');
    
    if (fillElement && countElement) {
        const percentage = Math.min((referralCount / 3) * 100, 100);
        fillElement.style.width = `${percentage}%`;
        countElement.textContent = referralCount;
        
        if (referralCount >= 3) {
            setTimeout(() => {
                showBonusPopup();
            }, 500);
        }
    }
}

function showBonusPopup() {
    const bonusHtml = `
        <div class="bonus-popup" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
             background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 10000;">
            <div style="background: white; padding: 40px; border-radius: 20px; text-align: center; max-width: 400px; animation: popIn 0.3s ease;">
                <div style="font-size: 60px; margin-bottom: 20px;">🎉</div>
                <h2 style="font-size: 28px; margin-bottom: 15px; color: #0F172A;">कमाल! बोनस अनलॉक!</h2>
                <p style="color: #64748b; margin-bottom: 25px;">तुमने 3 शेयर्स कंपलीट कर लिए! अब फ्री बोनस प्रेडिक्शन देखो 🎁</p>
                <button onclick="closeBonusPopup(); showBonusReading();" 
                        style="background: linear-gradient(135deg, #EC4899, #8B5CF6); color: white; 
                               border: none; padding: 15px 40px; border-radius: 10px; font-size: 16px; 
                               font-weight: 700; cursor: pointer; width: 100%;">
                    बोनस देखो! 🎯
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', bonusHtml);
}

function closeBonusPopup() {
    const popup = document.querySelector('.bonus-popup');
    if (popup) popup.remove();
}

function showBonusReading() {
    alert('🎁 बोनस रीडिंग:\n\n2026 में तुम्हें एक सरप्राइज मिलेगा जो तुम्हारी लाइफ चेंज कर देगा! 🌟\n\nडेली अपडेट्स के लिए नोटिफिकेशन्स ऑन करो! 🔔');
}

function triggerPopunder() {
    console.log('Popunder triggered - Adsterra code will execute here');
}

function trackViralMetrics() {
    const sessionData = {
        quizId: new URLSearchParams(window.location.search).get('id'),
        timestamp: Date.now(),
        referrer: document.referrer,
        shares: parseInt(localStorage.getItem('totalShares') || '0'),
        visits: parseInt(localStorage.getItem('visitCount') || '0')
    };
    
    console.log('Viral Metrics:', sessionData);
}

window.addEventListener('load', () => {
    setTimeout(() => {
        trackViralMetrics();
    }, 3000);
});

function showSocialProof() {
    const proofMessages = [
        '🔥 राहुल ने अभी शेयर किया!',
        '✨ प्रिया ने अभी रिजल्ट देखा!',
        '🎯 आर्यन ने अभी क्विज़ लिया!',
        '💯 नेहा ने 3 फ्रेंड्स को भेजा!'
    ];
    
    const randomMessage = proofMessages[Math.floor(Math.random() * proofMessages.length)];
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 25px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = randomMessage;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

setInterval(() => {
    if (Math.random() > 0.7) {
        showSocialProof();
    }
}, 15000);