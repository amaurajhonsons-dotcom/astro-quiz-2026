/**
 * Personalization Engine - Generate unique readings
 * Uses birth chart data to create personalized predictions
 */

const PersonalizationEngine = {

    /**
     * Generate personalized Love & Relationships reading
     */
    generateLoveReading(chart, score) {
        const { name, sun, transits2026, luckyDates } = chart;
        const sign = sun.sign;

        // Personalized intro
        const intro = `${name}, तुम्हारी ${this.getSignName(sign)} राशि 2026 में प्यार के मामले में बहुत खास साबित होगी।`;

        // Venus-based romance prediction
        const venusPredictions = {
            aries: `तुम्हारी bold और passionate nature इस साल shine करेगी। June-August में Venus तुम्हारे 5th house से गुजरेगा, जो romance के लिए golden period है।`,
            taurus: `तुम्हारी stable और loyal nature इस साल किसी special को attract करेगी। April-May में तुम्हारी charm peak पर होगी।`,
            gemini: `तुम्हारी witty और charming personality 2026 में magnetic बन जाएगी। May के बाद Jupiter तुम्हारे sign में आएगा - ये love के लिए jackpot है!`,
            cancer: `तुम्हारी emotional depth और caring nature किसी को deeply touch करेगी। ${luckyDates.bestMonth} में कोई special मिल सकता है।`,
            leo: `तुम्हारी confidence और warmth इस साल किसी को अपनी तरफ खींच लेगी। July-August (तुम्हारा season) में romance peak पर होगा।`,
            virgo: `तुम्हारी practical yet caring nature किसी stable partner को attract करेगी। September में कोई meaningful connection बन सकती है।`,
            libra: `Venus तुम्हारा ruler है, और 2026 तुम्हारे लिए love का year है! ${luckyDates.bestMonth} में life-changing meeting हो सकती है।`,
            scorpio: `तुम्हारी intense और passionate nature इस साल किसी को completely मोह लेगी। October में deep emotional bond बन सकती है।`,
            sagittarius: `तुम्हारी adventurous spirit किसी like-minded soul को attract करेगी। ${luckyDates.bestMonth} में unexpected romance possible है।`,
            capricorn: `तुम्हारी ambitious yet loyal nature किसी mature partner को impress करेगी। ${luckyDates.secondMonth} में serious relationship बन सकती है।`,
            aquarius: `तुम्हारी unique और intellectual approach इस साल किसी special को intrigue करेगी। ${luckyDates.bestMonth} में unconventional connection बनेगी।`,
            pisces: `तुम्हारी dreamy और compassionate nature किसी को deeply attract करेगी। ${luckyDates.bestMonth}-${luckyDates.secondMonth} में soulmate connection possible है।`
        };

        // Specific dates
        const specificDates = `\n\n**Watch These Dates:**\n• ${luckyDates.bestMonth} 12-18: Romance peak period\n• ${luckyDates.secondMonth} 5-11: Important meeting possible\n• ${luckyDates.thirdMonth} 20-26: Relationship deepens`;

        // Compatibility insight
        const compatibility = this.getCompatibility(sign);
        const compatText = `\n\n**Best Matches:** ${compatibility.best.join(', ')} राशि के लोग तुम्हारे साथ सबसे ज्यादा compatible हैं।`;

        // Action steps
        const actions = `\n\n**Action Steps:**\n1. ${this.getActionStep(sign, 'love')}\n2. Open रहो new connections के लिए\n3. ${luckyDates.bestMonth} में actively socialize करो`;

        return {
            title: `💘 ${name}, तुम्हारा Love Journey 2026`,
            teaser: intro + ' ' + venusPredictions[sign].substring(0, 120) + '...',
            full: intro + '\n\n' + venusPredictions[sign] + specificDates + compatText + actions
        };
    },

    /**
     * Generate personalized Money & Finances reading
     */
    generateMoneyReading(chart, score) {
        const { name, sun, transits2026, luckyDates } = chart;
        const sign = sun.sign;

        const intro = `${name}, तुम्हारी ${this.getSignName(sign)} राशि financial matters में 2026 में strong position में है।`;

        // Jupiter-based money predictions
        const moneyPredictions = {
            aries: `Jupiter और Saturn दोनों तुम्हारे finance houses को positively aspect कर रहे हैं। ${luckyDates.bestMonth}-${luckyDates.secondMonth} में major income boost की possibility है। Expected gain: ₹8-12 लाख range में।`,
            taurus: `तुम्हारी practical financial sense इस साल बड़ा payoff देगी। April-May में investment opportunities आएंगी। Potential: ₹10-15 लाख की growth।`,
            gemini: `Jupiter तुम्हारे sign में आ रहा है - ये financial jackpot है! May के बाद multiple income streams खुलेंगे। Target: ₹15-20 लाख boost possible।`,
            cancer: `Real estate और family business में gains होंगे। ${luckyDates.bestMonth} में major deal close हो सकती है। Expected: ₹6-10 लाख।`,
            leo: `तुम्हारा creative work या leadership position इस साल financially reward करेगा। July-August में big break आ सकता है। Potential: ₹12-18 लाख।`,
            virgo: `तुम्हारी meticulous planning इस साल pay off करेगी। September में major financial decision लेना होगा जो long-term फायदा देगा। Growth: ₹8-14 लाख।`,
            libra: `Partnerships और collaborations में पैसा है। ${luckyDates.bestMonth} में lucrative opportunity आएगी। Target: ₹10-16 लाख।`,
            scorpio: `Joint ventures और investments में significant gains। October में major windfall possible। Expected: ₹15-25 लाख।`,
            sagittarius: `International connections या higher education से financial growth। ${luckyDates.bestMonth} में opportunity knock करेगी। Potential: ₹12-20 लाख।`,
            capricorn: `Career advancement directly income को boost करेगा। ${luckyDates.secondMonth} में promotion या raise possible। Growth: ₹10-18 लाख।`,
            aquarius: `Tech, innovation या networking से पैसा आएगा। ${luckyDates.bestMonth} में unique opportunity मिलेगी। Target: ₹8-15 लाख।`,
            pisces: `Creative work या spiritual ventures financially reward करेंगे। ${luckyDates.bestMonth}-${luckyDates.secondMonth} में steady growth। Expected: ₹6-12 लाख।`
        };

        // Lucky numbers & dates
        const luckyNumbers = this.getLuckyNumbers(sign);
        const luckyInfo = `\n\n**Lucky Elements:**\n• Numbers: ${luckyNumbers.join(', ')}\n• Best Money Dates: ${luckyDates.specificDates.join(', ')}\n• Avoid: 3rd, 8th, 13th of any month for major investments`;

        // Warning
        const warning = `\n\n⚠️ **Warning:** ${this.getFinancialWarning(sign)}`;

        // Tips
        const tips = `\n\n**Money Tips:**\n1. ${this.getActionStep(sign, 'money')}\n2. Emergency fund बनाओ (3-6 months expenses)\n3. ${luckyDates.bestMonth} में major financial moves करो`;

        return {
            title: `💰 ${name}, तुम्हारी Financial Forecast 2026`,
            teaser: intro + ' ' + moneyPredictions[sign].substring(0, 120) + '...',
            full: intro + '\n\n' + moneyPredictions[sign] + luckyInfo + warning + tips
        };
    },

    /**
     * Generate personalized Career & Growth reading
     */
    generateCareerReading(chart, score) {
        const { name, sun, transits2026, luckyDates } = chart;
        const sign = sun.sign;

        const intro = `${name}, Career और professional growth के मामले में 2026 तुम्हारे लिए transformative होगा।`;

        // Saturn-based career predictions
        const careerPredictions = {
            aries: `तुम्हारी leadership qualities इस साल spotlight में आएंगी। ${transits2026.saturn} - ये patience सिखाएगा लेकिन long-term success देगा। ${luckyDates.bestMonth} में career breakthrough possible।`,
            taurus: `Slow and steady wins - तुम्हारा mantra इस साल काम करेगा। Consistent effort से Q3-Q4 में major recognition मिलेगा। New role या promotion likely।`,
            gemini: `Communication skills तुम्हारी biggest asset बनेंगी। ${transits2026.jupiter} - May से career में exponential growth शुरू होगी। Multiple opportunities मिलेंगी।`,
            cancer: `Team management या nurturing roles में excel करोगे। ${luckyDates.secondMonth} में leadership position की possibility। Work-life balance improve होगा।`,
            leo: `Creative projects या management roles में shine करोगे। July-August में major achievement। Recognition और rewards दोनों आएंगे।`,
            virgo: `Detail-oriented work में mastery achieve करोगे। ${transits2026.saturn} - Hard work का reward मिलेगा। September में career milestone।`,
            libra: `Diplomacy और partnerships में strength है। Collaborative projects success देंगे। ${luckyDates.bestMonth} में important partnership बनेगी।`,
            scorpio: `Research, investigation, या transformation projects में excel करोगे। October में major career shift possible - embrace it!`,
            sagittarius: `Teaching, consulting, या international work में growth। ${transits2026.nodes} - Unexpected opportunity आएगी जो game-changer होगी।`,
            capricorn: `Ambitious goals achieve होंगे। Saturn तुम्हारा ruler है - इस साल तुम्हारा time है! ${luckyDates.secondMonth} में peak success।`,
            aquarius: `Innovation और unique approach से पहचान बनेगी। Tech या unconventional fields में breakthrough। ${luckyDates.bestMonth} में turning point।`,
            pisces: `Creative या spiritual work में fulfillment। ${transits2026.saturn} - Personal transformation career को boost करेगा। Gradual but steady rise।`
        };

        // Skills to develop
        const skills = this.getSkillRecommendations(sign);
        const skillsText = `\n\n**Skills to Develop:**\n${skills.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;

        // Key dates
        const keyDates = `\n\n**Career Key Dates:**\n• ${luckyDates.bestMonth} 12-18: Major opportunity window\n• ${luckyDates.secondMonth} 5-11: Important meeting/interview\n• ${luckyDates.thirdMonth} 20-26: Decision time`;

        // Action plan
        const actions = `\n\n**Action Plan:**\n1. Update resume/portfolio by ${luckyDates.bestMonth}\n2. ${this.getActionStep(sign, 'career')}\n3. Network actively - attend events`;

        return {
            title: `👔 ${name}, तुम्हारा Career Blueprint 2026`,
            teaser: intro + ' ' + careerPredictions[sign].substring(0, 120) + '...',
            full: intro + '\n\n' + careerPredictions[sign] + keyDates + skillsText + actions
        };
    },

    /**
     * Helper: Get zodiac name in Hindi
     */
    getSignName(sign) {
        const names = {
            aries: 'मेष', taurus: 'वृषभ', gemini: 'मिथुन', cancer: 'कर्क',
            leo: 'सिंह', virgo: 'कन्या', libra: 'तुला', scorpio: 'वृश्चिक',
            sagittarius: 'धनु', capricorn: 'मकर', aquarius: 'कुंभ', pisces: 'मीन'
        };
        return names[sign] || sign;
    },

    /**
     * Helper: Get compatibility
     */
    getCompatibility(sign) {
        const compat = {
            aries: { best: ['Leo', 'Sagittarius', 'Gemini'] },
            taurus: { best: ['Virgo', 'Capricorn', 'Cancer'] },
            gemini: { best: ['Libra', 'Aquarius', 'Aries'] },
            cancer: { best: ['Scorpio', 'Pisces', 'Taurus'] },
            leo: { best: ['Aries', 'Sagittarius', 'Libra'] },
            virgo: { best: ['Taurus', 'Capricorn', 'Scorpio'] },
            libra: { best: ['Gemini', 'Aquarius', 'Leo'] },
            scorpio: { best: ['Cancer', 'Pisces', 'Virgo'] },
            sagittarius: { best: ['Aries', 'Leo', 'Aquarius'] },
            capricorn: { best: ['Taurus', 'Virgo', 'Pisces'] },
            aquarius: { best: ['Gemini', 'Libra', 'Sagittarius'] },
            pisces: { best: ['Cancer', 'Scorpio', 'Capricorn'] }
        };
        return compat[sign] || { best: ['Compatible signs'] };
    },

    /**
     * Helper: Get lucky numbers
     */
    getLuckyNumbers(sign) {
        const numbers = {
            aries: [1, 9, 18], taurus: [6, 15, 24], gemini: [5, 14, 23],
            cancer: [2, 11, 20], leo: [1, 10, 19], virgo: [5, 14, 23],
            libra: [6, 15, 24], scorpio: [9, 18, 27], sagittarius: [3, 12, 21],
            capricorn: [8, 17, 26], aquarius: [4, 13, 22], pisces: [7, 16, 25]
        };
        return numbers[sign] || [1, 5, 9];
    },

    /**
     * Helper: Get financial warning
     */
    getFinancialWarning(sign) {
        const warnings = {
            aries: 'Impulsive investments से बचो। April में ज्यादा risk मत लो।',
            taurus: 'Over-saving की tendency को balance करो। Calculated risks लो।',
            gemini: 'Too many ventures शुरू मत करो। Focus रखो।',
            cancer: 'Emotional decisions avoid करो। Logic use करो।',
            leo: 'Show-off spending control करो। Save भी करो।',
            virgo: 'Over-analysis paralysis से बचो। Opportunities miss मत करो।',
            libra: 'Others को please करने में पैसा waste मत करो।',
            scorpio: 'Revenge spending avoid करो। Emotional control रखो।',
            sagittarius: 'Gambling/speculation में पैसा मत लगाओ।',
            capricorn: 'Workaholic बनकर health पर खर्च मत बढ़ाओ।',
            aquarius: 'Impractical ideas में invest करने से पहले research करो।',
            pisces: 'Fantasy projects में blind trust मत करो। Due diligence करो।'
        };
        return warnings[sign] || 'Careful financial planning करो।';
    },

    /**
     * Helper: Get action steps
     */
    getActionStep(sign, category) {
        const actions = {
            love: {
                aries: 'Patience रखो, rush मत करो',
                taurus: 'New experiences के लिए open रहो',
                gemini: 'Deeper connections बनाओ, surface level से आगे जाओ',
                cancer: 'Boundaries set करो, clingy मत बनो',
                leo: 'Ego aside रखो, vulnerability show करो',
                virgo: 'Perfectionism छोड़ो, accept करो',
                libra: 'Decisive बनो, pleasing everyone छोड़ो',
                scorpio: 'Trust issues पर काम करो',
                sagittarius: 'Commitment से मत डरो',
                capricorn: 'Work-life balance बनाओ',
                aquarius: 'Emotional availability बढ़ाओ',
                pisces: 'Reality check रखो, illusion से बचो'
            },
            money: {
                aries: 'Emergency fund बनाओ',
                taurus: 'Diversify investments',
                gemini: 'One stream को strengthen करो',
                cancer: 'Professional financial advisor लो',
                leo: 'Budget track करो',
                virgo: 'Calculated risks लो',
                libra: 'Expense tracking शुरू करो',
                scorpio: 'Long-term planning करो',
                sagittarius: 'Saving habit develop करो',
                capricorn: 'Enjoy भी करो, सिर्फ save मत करो',
                aquarius: 'Traditional investments भी consider करो',
                pisces: 'Financial literacy बढ़ाओ'
            },
            career: {
                aries: 'Team player बनो, solo warrior नहीं',
                taurus: 'Comfort zone से बाहर निकलो',
                gemini: 'Commitment दिखाओ',
                cancer: 'Professional boundaries maintain करो',
                leo: 'Credit share करना सीखो',
                virgo: 'Perfectionism moderate करो',
                libra: 'Difficult decisions लेना सीखो',
                scorpio: 'Transparency practice करो',
                sagittarius: 'Details पर ध्यान दो',
                capricorn: 'Work-life balance improve करो',
                aquarius: 'Conventional approach भी try करो',
                pisces: 'Practical goals set करो'
            }
        };
        return actions[category][sign] || 'Self-improvement पर focus करो';
    },

    /**
     * Helper: Get skill recommendations
     */
    getSkillRecommendations(sign) {
        const skills = {
            aries: ['Leadership training', 'Project management', 'Conflict resolution'],
            taurus: ['Financial planning', 'Negotiation', 'Quality management'],
            gemini: ['Public speaking', 'Content creation', 'Networking'],
            cancer: ['Team management', 'Emotional intelligence', 'HR skills'],
            leo: ['Presentation skills', 'Personal branding', 'Strategic thinking'],
            virgo: ['Data analysis', 'Process optimization', 'Technical skills'],
            libra: ['Mediation', 'Design thinking', 'Partnership management'],
            scorpio: ['Research methods', 'Strategic planning', 'Crisis management'],
            sagittarius: ['Cross-cultural communication', 'Teaching', 'Innovation'],
            capricorn: ['Business administration', 'Time management', 'Delegation'],
            aquarius: ['Tech skills', 'Innovation management', 'Future thinking'],
            pisces: ['Creative skills', 'Empathy training', 'Intuitive thinking']
        };
        return skills[sign] || ['Professional development', 'Communication', 'Leadership'];
    },

    /**
     * Generate complete personalized reading
     */
    generateCompleteReading(chart, quizScore) {
        return {
            love: this.generateLoveReading(chart, quizScore),
            money: this.generateMoneyReading(chart, quizScore),
            career: this.generateCareerReading(chart, quizScore),
            chart: chart
        };
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PersonalizationEngine;
}
