<!DOCTYPE html>
<html lang="hi">

<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-D48MDRZJLY"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', 'G-D48MDRZJLY');
    </script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🔮 2026 का तुम्हारा फ्यूचर | फ्री AI एस्ट्रो क्विज़</title>
    <meta name="description"
        content="2026 में क्या होगा? AI से पता करो तुम्हारा लव मैच, करियर, और पैसा! लिमिटेड रीडिंग - 24 घंटे!">
    <link rel="stylesheet" href="css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet">
    <!-- Firebase SDKs -->
    <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>

    <script>
        const firebaseConfig = {
            apiKey: "AIzaSyAPn7Wa7Cw0_NeiGNuCgUlJcIsJjNFTk84",
            authDomain: "astro-quiz-push-2026.firebaseapp.com",
            projectId: "astro-quiz-push-2026",
            storageBucket: "astro-quiz-push-2026.firebasestorage.app",
            messagingSenderId: "659060108550",
            appId: "1:659060108550:web:81bfa17f16d75453580287"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();

        // Initialize Messaging
        let messaging;
        try {
            messaging = firebase.messaging();
        } catch (e) {
            console.log("Firebase Messaging failed (likely HTTP)", e);
        }
    </script>
</head>

<body class="home-body">
    <!-- Adsterra Social Bar (Top Sticky) -->
    <script type="text/javascript"
        src="//pl28198047.effectivegatecpm.com/14/2d/0b/142d0b238e726b90898d76e2bb2b4f20.js"></script>
    <div class="floating-timer">
        ⏰ <span id="timer">23:59:47</span> में खत्म!
    </div>

    <header class="hero">
        <div class="stars"></div>
        <div class="container">
            <div class="badge pulse">🔥 1,24,583 लोगों ने शेयर किया!</div>

            <h1 class="hero-title">
                <span class="gradient-text">2026 का तुम्हारा</span><br>
                <span class="big-text">सीक्रेट फ्यूचर?</span>
            </h1>

            <p class="hero-subtitle">
                AI + वैदिक एस्ट्रोलॉजी से पता करो:<br>
                💘 <strong>लव मैच</strong> कौन? | 💰 <strong>लाखों</strong> मिलेंगे? | 🚀 <strong>करियर बूस्ट</strong>
                कब?
            </p>

            <div class="cta-section">
                <button class="cta-button" onclick="startQuiz()">
                    <span class="btn-text">🎯 फ्री क्विज़ शुरू करो</span>
                    <span class="btn-subtitle">सिर्फ 2 मिनट • 100% फ्री</span>
                </button>
                <p class="social-proof">⚡ अभी <span class="live-count">2,847</span> लोग ले रहे हैं!</p>
            </div>

            <div class="trust-badges">
                <div class="badge-item">⭐ 4.8/5 रेटिंग</div>
                <div class="badge-item">✅ 5L+ यूजर्स</div>
                <div class="badge-item">🔒 100% प्राइवेट</div>
            </div>
        </div>
    </header>

    <section class="quiz-preview">
        <div class="container">
            <h2 class="section-title">🎯 ये क्विज़ ट्राई करो!</h2>

            <div class="quiz-grid">
                <div class="quiz-card" onclick="loadQuiz('love-match')">
                    <div class="quiz-icon">💘</div>
                    <h3>2026 लव मैच</h3>
                    <p>तुम्हारा परफेक्ट पार्टनर कौन?</p>
                    <div class="quiz-stats">
                        <span>🔥 42K ने लिया</span>
                        <span class="trending">TRENDING</span>
                    </div>
                </div>

                <div class="quiz-card" onclick="loadQuiz('money-luck')">
                    <div class="quiz-icon">💰</div>
                    <h3>मनी लक प्रेडिक्शन</h3>
                    <p>₹ लाखों मिलेंगे या नहीं?</p>
                    <div class="quiz-stats">
                        <span>🔥 38K ने लिया</span>
                    </div>
                </div>

                <div class="quiz-card" onclick="loadQuiz('career-boost')">
                    <div class="quiz-icon">🚀</div>
                    <h3>करियर ब्रेकथ्रू</h3>
                    <p>2026 में प्रमोशन या जॉब चेंज?</p>
                    <div class="quiz-stats">
                        <span>🔥 35K ने लिया</span>
                    </div>
                </div>

                <div class="quiz-card" onclick="loadQuiz('health-alert')">
                    <div class="quiz-icon">❤️</div>
                    <h3>हेल्थ अलर्ट 2026</h3>
                    <p>सेहत का सीक्रेट - अभी जानो!</p>
                    <div class="quiz-stats">
                        <span>🔥 29K ने लिया</span>
                        <span class="new">NEW</span>
                    </div>
                </div>

                <div class="quiz-card" onclick="loadQuiz('lucky-month')">
                    <div class="quiz-icon">🍀</div>
                    <h3>लकी मंथ 2026</h3>
                    <p>कौन सा महीना लाएगा खुशियां?</p>
                    <div class="quiz-stats">
                        <span>🔥 31K ने लिया</span>
                    </div>
                </div>

                <div class="quiz-card" onclick="loadQuiz('enemy-friend')">
                    <div class="quiz-icon">👥</div>
                    <h3>फ्रेंड या एनेमी?</h3>
                    <p>कौन देगा धोखा, कौन साथ?</p>
                    <div class="quiz-stats">
                        <span>🔥 27K ने लिया</span>
                    </div>
                </div>

                <div class="quiz-card" onclick="loadQuiz('travel-destiny')">
                    <div class="quiz-icon">✈️</div>
                    <h3>ट्रैवल डेस्टिनी</h3>
                    <p>कहां जाओगे 2026 में?</p>
                    <div class="quiz-stats">
                        <span>🔥 22K ने लिया</span>
                    </div>
                </div>

                <div class="quiz-card" onclick="loadQuiz('marriage-time')">
                    <div class="quiz-icon">💍</div>
                    <h3>शादी का टाइम?</h3>
                    <p>2026 में शादी होगी?</p>
                    <div class="quiz-stats">
                        <span>🔥 45K ने लिया</span>
                        <span class="trending">HOT</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="social-proof-section">
        <div class="container">
            <h2 class="section-title">💬 लोग क्या कह रहे हैं?</h2>
            <div class="testimonial-grid">
                <div class="testimonial">
                    <p>"OMG! मेरा रिजल्ट बिल्कुल सही निकला 😱 2026 लव मैच 95% accurate!"</p>
                    <div class="user">- प्रिया, मुंबई</div>
                </div>
                <div class="testimonial">
                    <p>"AI prediction ने मेरी लाइफ चेंज कर दी! 10/10 recommend 🔥"</p>
                    <div class="user">- राहुल, दिल्ली</div>
                </div>
                <div class="testimonial">
                    <p>"सबको शेयर किया! मेरे सारे फ्रेंड्स भी ले रहे हैं ये क्विज़ 💯"</p>
                    <div class="user">- नेहा, बैंगलोर</div>
                </div>
            </div>
        </div>
    </section>

    <div class="push-notification-popup" id="pushPopup">
        <div class="popup-content">
            <span class="close-popup" onclick="closePushPopup()">&times;</span>
            <div class="popup-icon">🔔</div>
            <h3>डेली अपडेट्स पाओ!</h3>
            <p>हर दिन नए प्रेडिक्शन्स + लकी टिप्स (फ्री!)</p>
            <button class="popup-btn" onclick="enablePushNotifications()">हां, चाहिए! 🎯</button>
            <button class="popup-btn-secondary" onclick="closePushPopup()">बाद में</button>
        </div>
    </div>

    <!-- Adsterra Mobile Banner 320x50 -->
    <div style="text-align: center; margin: 40px 0; padding: 20px;">
        <p style="font-size: 11px; color: rgba(255,255,255,0.6); margin-bottom: 10px;">SPONSORED</p>
        <script type="text/javascript">
            atOptions = {
                'key': '23c858baf0517be4c93981cd8786b93c',
                'format': 'iframe',
                'height': 50,
                'width': 320,
                'params': {}
            };
        </script>
        <script type="text/javascript"
            src="//www.highperformanceformat.com/23c858baf0517be4c93981cd8786b93c/invoke.js"></script>
    </div>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2026 AstroQuiz. All Rights Reserved.</p>
            <div class="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Contact Us</a>
            </div>
        </div>
    </footer>

    <script src="js/main.js?v=2.0"></script>
    <script src="js/quiz-engine.js"></script>
    <script src="js/viral-hooks.js"></script>
</body>

</html>