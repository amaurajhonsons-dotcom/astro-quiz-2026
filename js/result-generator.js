const zodiacTraits = {
    aries: { name: 'मेष', element: 'अग्नि', lucky: '9', color: 'लाल', trait: 'एनर्जेटिक लीडर' },
    taurus: { name: 'वृषभ', element: 'पृथ्वी', lucky: '6', color: 'हरा', trait: 'स्टेबल & लॉयल' },
    gemini: { name: 'मिथुन', element: 'वायु', lucky: '5', color: 'पीला', trait: 'क्विक & वर्सेटाइल' },
    cancer: { name: 'कर्क', element: 'जल', lucky: '2', color: 'सफेद', trait: 'केयरिंग & इमोशनल' },
    leo: { name: 'सिंह', element: 'अग्नि', lucky: '1', color: 'गोल्ड', trait: 'कॉन्फिडेंट & क्रिएटिव' },
    virgo: { name: 'कन्या', element: 'पृथ्वी', lucky: '5', color: 'नेवी ब्लू', trait: 'परफेक्शनिस्ट & स्मार्ट' },
    libra: { name: 'तुला', element: 'वायु', lucky: '6', color: 'पिंक', trait: 'बैलेंस्ड & चार्मिंग' },
    scorpio: { name: 'वृश्चिक', element: 'जल', lucky: '9', color: 'मैरून', trait: 'इंटेंस & पैशनेट' },
    sagittarius: { name: 'धनु', element: 'अग्नि', lucky: '3', color: 'पर्पल', trait: 'एडवेंचरस & ऑप्टिमिस्ट' },
    capricorn: { name: 'मकर', element: 'पृथ्वी', lucky: '8', color: 'ब्लैक', trait: 'एम्बिशियस & डिसिप्लिन्ड' },
    aquarius: { name: 'कुंभ', element: 'वायु', lucky: '4', color: 'ब्लू', trait: 'यूनिक & इनोवेटिव' },
    pisces: { name: 'मीन', element: 'जल', lucky: '7', color: 'सी ग्रीन', trait: 'ड्रीमर & कम्पैशनेट' }
};

function generateResult(quizId, answers) {
    const zodiac = answers[0];
    const zodiacInfo = zodiacTraits[zodiac];
    const score = Math.floor(Math.random() * 15) + 85;

    // Get user data (name and birth date if available)
    const userData = getUserData();
    const birthDate = userData.birthDate || getDefaultBirthDate(zodiac);
    const userName = userData.name || 'Friend';

    // Generate personalized birth chart
    const birthChart = AstroCalculator.getCompleteBirthChart(birthDate, userData.birthTime, userName);

    // Generate personalized reading using new engine
    const personalizedReading = PersonalizationEngine.generateCompleteReading(birthChart, score);

    let result = {
        title: '',
        score: score,
        details: '',
        chart: birthChart,
        personalized: personalizedReading
    };


    switch (quizId) {
        case 'love-match':
            result = generateLoveMatchResult(zodiacInfo, answers, score);
            break;
        case 'money-luck':
            result = generateMoneyLuckResult(zodiacInfo, answers, score);
            break;
        case 'career-boost':
            result = generateCareerResult(zodiacInfo, answers, score);
            break;
        case 'health-alert':
            result = generateHealthResult(zodiacInfo, answers, score);
            break;
        case 'lucky-month':
            result = generateLuckyMonthResult(zodiacInfo, answers, score);
            break;
        case 'enemy-friend':
            result = generateFriendEnemyResult(zodiacInfo, answers, score);
            break;
        case 'travel-destiny':
            result = generateTravelResult(zodiacInfo, answers, score);
            break;
        case 'marriage-time':
            result = generateMarriageResult(zodiacInfo, answers, score);
            break;
        default:
            result = generateLoveMatchResult(zodiacInfo, answers, score);
    }

    return result;
}

function generateLoveMatchResult(zodiacInfo, answers, score) {
    const compatibleSigns = {
        aries: 'सिंह या धनु',
        taurus: 'कन्या या मकर',
        gemini: 'तुला या कुंभ',
        cancer: 'वृश्चिक या मीन',
        leo: 'मेष या धनु',
        virgo: 'वृषभ या मकर',
        libra: 'मिथुन या कुंभ',
        scorpio: 'कर्क या मीन',
        sagittarius: 'मेष या सिंह',
        capricorn: 'वृषभ या कन्या',
        aquarius: 'मिथुन या तुला',
        pisces: 'कर्क या वृश्चिक'
    };

    // SHOCKING specific predictions
    const firstLetters = ['A', 'S', 'R', 'M', 'P', 'K', 'V', 'N', 'D', 'T'];
    const soulmateLetter = firstLetters[Math.floor(Math.random() * firstLetters.length)];

    const specificDates = ['17 मार्च', '23 अप्रैल', '8 जून', '15 जुलाई', '3 सितंबर', '21 अक्टूबर', '11 नवंबर'];
    const luckDate = specificDates[Math.floor(Math.random() * specificDates.length)];

    const secrets = [
        'तुमने किसी को दिल में छुपा रखा है जिसे तुम बताते नहीं',
        'तुम्हारे पास एक secret admirer है जो तुम्हें देखता है',
        'तुम जिसे चाहते हो वो भी secretly तुम्हें notice करता है',
        'तुम्हारा कोई पुराना connection 2026 में वापस आएगा',
        'तुम्हारी life में कोई है जो तुम्हें test कर रहा है'
    ];
    const revealedSecret = secrets[Math.floor(Math.random() * secrets.length)];

    const matchSign = compatibleSigns[answers[0]];

    return {
        title: `🚨 SHOCKING: तुम्हारा Soulmate "${soulmateLetter}" से शुरू!`,
        score: score,
        details: `
            <div class="shocking-reveal">
                <div class="reveal-box urgent">
                    <span class="reveal-icon">💘</span>
                    <div>
                        <strong>SOULMATE का FIRST LETTER:</strong>
                        <span class="big-reveal">"${soulmateLetter}"</span>
                    </div>
                </div>
                
                <div class="reveal-box">
                    <span class="reveal-icon">📅</span>
                    <div>
                        <strong>LIFE CHANGING DATE:</strong>
                        <span class="date-reveal">${luckDate} 2026</span>
                        <small>इस दिन कुछ बड़ा होगा!</small>
                    </div>
                </div>
                
                <div class="reveal-box secret">
                    <span class="reveal-icon">🔮</span>
                    <div>
                        <strong>AI ने तुम्हारा SECRET पकड़ा:</strong>
                        <p class="secret-text">"${revealedSecret}"</p>
                    </div>
                </div>
                
                <div class="reveal-box">
                    <span class="reveal-icon">❤️</span>
                    <div>
                        <strong>PERFECT MATCH:</strong> ${matchSign} राशि
                    </div>
                </div>
                
                <div class="reveal-box tip">
                    <span class="reveal-icon">💡</span>
                    <div>
                        <strong>SECRET TIP:</strong> ${zodiacInfo.color} रंग पहनो - attraction बढ़ेगा!
                    </div>
                </div>
            </div>
            
            <style>
                .shocking-reveal { display: flex; flex-direction: column; gap: 12px; }
                .reveal-box { background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; display: flex; align-items: flex-start; gap: 12px; }
                .reveal-box.urgent { background: linear-gradient(135deg, rgba(255,0,100,0.2), rgba(255,100,0,0.1)); border: 1px solid rgba(255,100,100,0.3); animation: pulse 2s infinite; }
                .reveal-box.secret { background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.1)); border: 1px solid rgba(139,92,246,0.3); }
                .reveal-box.tip { background: linear-gradient(135deg, rgba(34,197,94,0.2), rgba(16,185,129,0.1)); }
                .reveal-icon { font-size: 1.5rem; }
                .big-reveal { font-size: 2rem; font-weight: 800; color: #FF6B6B; display: block; }
                .date-reveal { font-size: 1.3rem; font-weight: 700; color: #FFD700; display: block; }
                .secret-text { font-style: italic; color: #D8B4FE; margin: 5px 0 0 0; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
            </style>
        `
    };
}

function generateMoneyLuckResult(zodiacInfo, answers, score) {
    // Super specific amounts
    const exactAmounts = ['₹4,73,000', '₹7,21,000', '₹12,45,000', '₹18,90,000', '₹25,60,000'];
    const amount = exactAmounts[Math.floor(Math.random() * exactAmounts.length)];

    // Specific dates
    const specificDates = ['14 फरवरी', '7 मार्च', '22 मई', '11 अगस्त', '3 अक्टूबर', '19 दिसंबर'];
    const bigMoneyDate = specificDates[Math.floor(Math.random() * specificDates.length)];

    // Warning
    const warnings = [
        'अप्रैल में किसी करीबी से पैसे मत लेना - धोखा हो सकता है',
        'जून-जुलाई में कोई investment offer आएगा - वो SCAM है',
        'सितंबर में कोई पुराना दोस्त पैसे मांगेगा - देने से पहले सोचो',
        'नवंबर में एक बड़ा लालच आएगा - उससे बचना'
    ];
    const warning = warnings[Math.floor(Math.random() * warnings.length)];

    const luckyNumber = Math.floor(Math.random() * 9) + 1;
    const luckyNumber2 = Math.floor(Math.random() * 9) + 1;

    return {
        title: `💰 ALERT: ${bigMoneyDate} को आएगा ${amount}!`,
        score: score,
        details: `
            <div class="shocking-reveal">
                <div class="reveal-box urgent">
                    <span class="reveal-icon">💸</span>
                    <div>
                        <strong>BIG MONEY DATE:</strong>
                        <span class="date-reveal">${bigMoneyDate} 2026</span>
                        <span class="big-reveal">${amount}</span>
                    </div>
                </div>
                
                <div class="reveal-box">
                    <span class="reveal-icon">🎰</span>
                    <div>
                        <strong>LUCKY NUMBERS:</strong>
                        <span class="big-reveal" style="color: #22C55E;">${luckyNumber}, ${luckyNumber2}, ${luckyNumber + luckyNumber2}</span>
                        <small>OTP, PIN, या बेट में इस्तेमाल करो</small>
                    </div>
                </div>
                
                <div class="reveal-box secret" style="border-color: #EF4444;">
                    <span class="reveal-icon">⚠️</span>
                    <div>
                        <strong style="color: #EF4444;">DANGER ALERT:</strong>
                        <p class="secret-text" style="color: #FCA5A5;">"${warning}"</p>
                    </div>
                </div>
                
                <div class="reveal-box tip">
                    <span class="reveal-icon">🍀</span>
                    <div>
                        <strong>MONEY TIP:</strong> ${zodiacInfo.color} रंग का wallet रखो - पैसा attract होगा!
                    </div>
                </div>
            </div>
            
            <style>
                .shocking-reveal { display: flex; flex-direction: column; gap: 12px; }
                .reveal-box { background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; display: flex; align-items: flex-start; gap: 12px; }
                .reveal-box.urgent { background: linear-gradient(135deg, rgba(34,197,94,0.2), rgba(16,185,129,0.1)); border: 1px solid rgba(34,197,94,0.3); animation: pulse 2s infinite; }
                .reveal-box.secret { background: linear-gradient(135deg, rgba(239,68,68,0.2), rgba(220,38,38,0.1)); }
                .reveal-box.tip { background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(245,158,11,0.1)); }
                .reveal-icon { font-size: 1.5rem; }
                .big-reveal { font-size: 1.8rem; font-weight: 800; color: #22C55E; display: block; }
                .date-reveal { font-size: 1.2rem; font-weight: 600; color: #FFD700; display: block; margin-bottom: 5px; }
                .secret-text { font-style: italic; margin: 5px 0 0 0; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
            </style>
        `
    };
}

function generateCareerResult(zodiacInfo, answers, score) {
    const achievements = ['प्रमोशन', 'बेस्ट जॉब ऑफर', 'सक्सेसफुल प्रोजेक्ट', 'रिकग्निशन/अवॉर्ड'];
    const achievement = achievements[Math.floor(Math.random() * achievements.length)];

    return {
        title: `2026 करियर ब्रेकथ्रू: ${achievement} आ रहा है!`,
        score: score,
        details: `
            <p><strong>🚀 बिग न्यूज़:</strong> ${achievement} का चांस बहुत हाई!</p>
            <p><strong>📅 टाइमिंग:</strong> मई-जून या सितंबर-अक्टूबर 2026</p>
            <p><strong>✨ स्ट्रेंथ:</strong> ${zodiacInfo.trait} - इसे leverage करो!</p>
            <p><strong>🔮 AI इनसाइट:</strong> तुम्हारी राशि ${zodiacInfo.name} की ${zodiacInfo.element} एनर्जी तुम्हें ${score > 90 ? 'एक्स्ट्रीम सक्सेस' : 'गुड ग्रोथ'} दिला सकती है। नेटवर्किंग पर फोकस करो!</p>
            <p><strong>💡 टिप:</strong> इंटरव्यू/मीटिंग्स में ${zodiacInfo.color} कलर पहनो!</p>
            <p><strong>🎯 एक्शन:</strong> नई स्किल्स सीखो - AI/टेक बहुत काम आएंगे!</p>
        `
    };
}

function generateHealthResult(zodiacInfo, answers, score) {
    const focuses = ['डाइजेशन', 'इम्युनिटी', 'मेंटल हेल्थ', 'एनर्जी लेवल'];
    const focus = focuses[Math.floor(Math.random() * focuses.length)];

    return {
        title: `2026 हेल्थ स्कोर: ${score}/100 - ${focus} पर ध्यान दो!`,
        score: score,
        details: `
            <p><strong>❤️ ओवरऑल:</strong> तुम्हारी सेहत ${score > 90 ? 'एक्सलेंट' : 'गुड'} रहेगी!</p>
            <p><strong>🎯 फोकस एरिया:</strong> ${focus} को इम्प्रूव करो</p>
            <p><strong>🔮 AI इनसाइट:</strong> ${zodiacInfo.element} तत्व के कारण तुम्हें ${focus === 'मेंटल हेल्थ' ? 'मेडिटेशन/योग' : 'बैलेंस्ड डाइट'} से बहुत फायदा होगा</p>
            <p><strong>⚠️ अलर्ट मंथ्स:</strong> फरवरी और अगस्त 2026 - एक्स्ट्रा केयर लो</p>
            <p><strong>💡 टिप:</strong> रोज़ाना ${zodiacInfo.lucky} मिनट एक्सरसाइज़ करो - लकी नंबर!</p>
            <p><strong>🍀 बूस्टर:</strong> ${zodiacInfo.color} रंग के फूड/ड्रिंक्स तुम्हारे लिए गुड हैं!</p>
        `
    };
}

function generateLuckyMonthResult(zodiacInfo, answers, score) {
    const months = [
        'मार्च 2026', 'अप्रैल 2026', 'जून 2026', 'जुलाई 2026',
        'सितंबर 2026', 'अक्टूबर 2026', 'दिसंबर 2026'
    ];
    const luckyMonth = months[Math.floor(Math.random() * months.length)];

    const events = ['प्रमोशन', 'न्यू रिलेशनशिप', 'बड़ा पैसा', 'ट्रैवल', 'सक्सेस'];
    const event1 = events[Math.floor(Math.random() * events.length)];
    const event2 = events.filter(e => e !== event1)[Math.floor(Math.random() * (events.length - 1))];

    return {
        title: `तुम्हारा सबसे लकी मंथ: ${luckyMonth}!`,
        score: score,
        details: `
            <p><strong>🍀 #1 लकी मंथ:</strong> ${luckyMonth} - इस महीने बड़ा कुछ होगा!</p>
            <p><strong>✨ क्या होगा:</strong> ${event1} या ${event2} का चांस</p>
            <p><strong>🔮 AI इनसाइट:</strong> ${zodiacInfo.name} राशि के लिए ये महीना गोल्डन पीरियड है। तुम्हारी ${zodiacInfo.element} एनर्जी पीक पर होगी!</p>
            <p><strong>🎯 दूसरे गुड मंथ्स:</strong> अप्रैल, अगस्त, नवंबर 2026</p>
            <p><strong>💡 टिप:</strong> लकी मंथ में ${zodiacInfo.color} रंग ज्यादा पहनो!</p>
            <p><strong>📅 अवॉइड:</strong> फरवरी 2026 - थोड़ा स्लो रहेगा</p>
        `
    };
}

function generateFriendEnemyResult(zodiacInfo, answers, score) {
    const friendSigns = ['मेष', 'वृषभ', 'मिथुन', 'सिंह', 'तुला', 'धनु'];
    const enemySigns = ['कर्क', 'कन्या', 'वृश्चिक', 'मकर'];

    const friend = friendSigns[Math.floor(Math.random() * friendSigns.length)];
    const enemy = enemySigns[Math.floor(Math.random() * enemySigns.length)];

    return {
        title: `2026 सोशल मैप: फ्रेंड्स vs एनेमीज़`,
        score: score,
        details: `
            <p><strong>👥 बेस्ट फ्रेंड:</strong> ${friend} राशि - इन पर भरोसा करो!</p>
            <p><strong>⚠️ वॉच आउट:</strong> ${enemy} राशि - थोड़ा सावधान रहो</p>
            <p><strong>🔮 AI इनसाइट:</strong> तुम्हारी ${zodiacInfo.trait} नेचर की वजह से लोग तुम्हारी तरफ खिंचते हैं। लेकिन सबको ट्रस्ट मत करो!</p>
            <p><strong>✨ सोशल टिप:</strong> ${zodiacInfo.color} कलर वाली एक्सेसरीज़ पहनो - ये तुम्हें पॉजिटिव एनर्जी देगी</p>
            <p><strong>🎯 ग्रुप डायनामिक्स:</strong> 2026 में 2-3 नए फ्रेंड्स बनेंगे, 1 पुराना दूर होगा</p>
            <p><strong>💡 अलर्ट:</strong> मार्च और सितंबर में मिसअंडरस्टैंडिंग्स हो सकती हैं - कम्युनिकेशन clear रखो!</p>
        `
    };
}

function generateTravelResult(zodiacInfo, answers, score) {
    const destinations = {
        india: ['गोवा', 'केरल', 'मनाली', 'उदयपुर', 'लद्दाख', 'अंडमान'],
        international: ['बाली', 'दुबई', 'थाईलैंड', 'सिंगापुर', 'मालदीव', 'पेरिस']
    };

    const destType = Math.random() > 0.5 ? 'india' : 'international';
    const destination = destinations[destType][Math.floor(Math.random() * destinations[destType].length)];

    return {
        title: `2026 ट्रैवल डेस्टिनी: ${destination} जाओगे!`,
        score: score,
        details: `
            <p><strong>✈️ मेन डेस्टिनेशन:</strong> ${destination} - ये तुम्हारे लिए परफेक्ट है!</p>
            <p><strong>📅 बेस्ट टाइम:</strong> ${destType === 'india' ? 'मई-जून या अक्टूबर-नवंबर' : 'जनवरी-मार्च'} 2026</p>
            <p><strong>🔮 AI इनसाइट:</strong> ${zodiacInfo.element} तत्व के हिसाब से ${destination} तुम्हें peace और adventure दोनों देगा!</p>
            <p><strong>💰 बजट प्रेडिक्शन:</strong> ₹${destType === 'india' ? '30-50K' : '1-1.5L'} में मस्त ट्रिप हो जाएगी</p>
            <p><strong>👥 साथ में:</strong> ${answers[2] === 'solo' ? 'सोलो ट्रिप' : 'फैमिली/फ्रेंड्स'} के साथ बेस्ट रहेगा</p>
            <p><strong>💡 लकी टिप:</strong> ${zodiacInfo.color} कलर का सूटकेस या बैग ले जाओ!</p>
        `
    };
}

function generateMarriageResult(zodiacInfo, answers, score) {
    const relationshipStatus = answers[2];
    let timeline = '';
    let probability = '';

    if (relationshipStatus === 'single') {
        timeline = 'Q4 2026 या 2027 में';
        probability = '60-70%';
    } else if (relationshipStatus === 'dating' || relationshipStatus === 'committed') {
        timeline = 'Q2 या Q3 2026 में';
        probability = '80-90%';
    } else if (relationshipStatus === 'engaged') {
        timeline = 'Q1 2026 में पक्का!';
        probability = '95%+';
    }

    return {
        title: `2026 शादी प्रेडिक्शन: ${timeline}`,
        score: score,
        details: `
            <p><strong>💍 शादी चांस:</strong> ${probability} - ${score > 90 ? 'बहुत हाई!' : 'गुड!'}</p>
            <p><strong>📅 टाइमलाइन:</strong> ${timeline} तुम्हारी शादी की खबर आ सकती है</p>
            <p><strong>🔮 AI इनसाइट:</strong> ${zodiacInfo.name} राशि के लिए 2026 का ${zodiacInfo.element} तत्व favorable है। ${relationshipStatus === 'single' ? 'पहले पार्टनर मिलेगा फिर शादी!' : 'तुम्हारा रिलेशनशिप next level पर जाएगा!'}</p>
            <p><strong>✨ लकी डेट्स:</strong> ${zodiacInfo.lucky}, ${parseInt(zodiacInfo.lucky) + 9}, ${parseInt(zodiacInfo.lucky) + 18} तारीख शुभ हैं</p>
            <p><strong>🎯 परफेक्ट मैच:</strong> ${answers[0] === 'aries' ? 'सिंह/धनु' : answers[0] === 'taurus' ? 'कन्या/मकर' : 'compatible'} राशि best है!</p>
            <p><strong>💡 टिप:</strong> ${zodiacInfo.color} रंग शादी की तैयारी में यूज़ करो - लकी रहेगा!</p>
        `
    };
}

// Helper functions for personalization
function getUserData() {
    const stored = localStorage.getItem('quizUserData');
    if (stored) {
        return JSON.parse(stored);
    }
    return { name: '', birthDate: null, birthTime: null };
}

function getDefaultBirthDate(zodiac) {
    const zodiacDates = {
        aries: '1995-04-01', taurus: '1995-05-01', gemini: '1995-06-01',
        cancer: '1995-07-01', leo: '1995-08-01', virgo: '1995-09-01',
        libra: '1995-10-01', scorpio: '1995-11-01', sagittarius: '1995-12-01',
        capricorn: '1995-01-01', aquarius: '1995-02-01', pisces: '1995-03-01'
    };
    return zodiacDates[zodiac] || '1995-01-01';
}

function saveUserData(name, birthDate, birthTime) {
    localStorage.setItem('quizUserData', JSON.stringify({ name, birthDate, birthTime }));
}