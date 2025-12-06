/**
 * Astro Calculator - Birth Chart Calculations
 * Calculates Sun, Moon, Rising signs from birth data
 */

const AstroCalculator = {

    // Zodiac sign date ranges
    zodiacDates: {
        aries: { start: [3, 21], end: [4, 19], symbol: '♈', element: 'Fire', color: '#FF6B6B' },
        taurus: { start: [4, 20], end: [5, 20], symbol: '♉', element: 'Earth', color: '#4ECDC4' },
        gemini: { start: [5, 21], end: [6, 20], symbol: '♊', element: 'Air', color: '#FFE66D' },
        cancer: { start: [6, 21], end: [7, 22], symbol: '♋', element: 'Water', color: '#C7CEEA' },
        leo: { start: [7, 23], end: [8, 22], symbol: '♌', element: 'Fire', color: '#FECA57' },
        virgo: { start: [8, 23], end: [9, 22], symbol: '♍', element: 'Earth', color: '#95E1D3' },
        libra: { start: [9, 23], end: [10, 22], symbol: '♎', element: 'Air', color: '#F8B500' },
        scorpio: { start: [10, 23], end: [11, 21], symbol: '♏', element: 'Water', color: '#8B4513' },
        sagittarius: { start: [11, 22], end: [12, 21], symbol: '♐', element: 'Fire', color: '#7B68EE' },
        capricorn: { start: [12, 22], end: [1, 19], symbol: '♑', element: 'Earth', color: '#2C3E50' },
        aquarius: { start: [1, 20], end: [2, 18], symbol: '♒', element: 'Air', color: '#00D2FF' },
        pisces: { start: [2, 19], end: [3, 20], symbol: '♓', element: 'Water', color: '#B19CD9' }
    },

    /**
     * Calculate Sun Sign from birth date
     */
    calculateSunSign(birthDate) {
        const date = new Date(birthDate);
        const month = date.getMonth() + 1;
        const day = date.getDate();

        for (const [sign, data] of Object.entries(this.zodiacDates)) {
            const [startMonth, startDay] = data.start;
            const [endMonth, endDay] = data.end;

            if (
                (month === startMonth && day >= startDay) ||
                (month === endMonth && day <= endDay)
            ) {
                return {
                    sign: sign,
                    symbol: data.symbol,
                    element: data.element,
                    color: data.color
                };
            }
        }
        return null;
    },

    /**
     * Calculate Moon Sign (simplified - based on birth date + 30 day cycle)
     * Note: Actual calculation requires ephemeris data
     */
    calculateMoonSign(birthDate) {
        const date = new Date(birthDate);
        const daysSinceEpoch = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
        const moonPosition = (daysSinceEpoch % 12); // Simplified: moon changes sign every ~2.5 days

        const signs = Object.keys(this.zodiacDates);
        const moonSign = signs[moonPosition];

        return {
            sign: moonSign,
            symbol: this.zodiacDates[moonSign].symbol,
            element: this.zodiacDates[moonSign].element
        };
    },

    /**
     * Calculate Rising Sign (simplified - based on birth time)
     * Note: Actual calculation requires birth time + location
     */
    calculateRisingSign(birthDate, birthTime) {
        if (!birthTime) return null;

        const [hours, minutes] = birthTime.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        const signIndex = Math.floor((totalMinutes / 1440) * 12); // 1440 minutes in day

        const signs = Object.keys(this.zodiacDates);
        const risingSign = signs[signIndex];

        return {
            sign: risingSign,
            symbol: this.zodiacDates[risingSign].symbol,
            element: this.zodiacDates[risingSign].element
        };
    },

    /**
     * Get 2026 key transits for a sign
     */
    get2026Transits(sunSign) {
        const transits = {
            // Jupiter in Gemini (luck & expansion)
            jupiter: {
                sign: 'gemini',
                period: 'May - June 2026',
                effect: {
                    aries: 'Communication & learning opportunities',
                    taurus: 'Financial gains through networking',
                    gemini: 'Personal growth & new beginnings',
                    cancer: 'Spiritual insights & hidden blessings',
                    leo: 'Social connections bring opportunities',
                    virgo: 'Career advancement & recognition',
                    libra: 'Travel & higher education favored',
                    scorpio: 'Joint finances improve',
                    sagittarius: 'Relationship harmony increases',
                    capricorn: 'Health & daily routine improve',
                    aquarius: 'Creativity & romance flourish',
                    pisces: 'Home & family matters prosper'
                }
            },

            // Saturn in Pisces (discipline & lessons)
            saturn: {
                sign: 'pisces',
                period: 'All of 2026',
                effect: {
                    aries: 'Spiritual growth through introspection',
                    taurus: 'Social responsibilities increase',
                    gemini: 'Career demands focus & discipline',
                    cancer: 'Learning brings long-term rewards',
                    leo: 'Financial restructuring needed',
                    virgo: 'Relationship commitments deepen',
                    libra: 'Health routines become important',
                    scorpio: 'Creative projects require patience',
                    sagittarius: 'Home matters need attention',
                    capricorn: 'Communication skills develop',
                    aquarius: 'Money management improves',
                    pisces: 'Personal transformation intensifies'
                }
            },

            // Rahu-Ketu axis shift
            nodes: {
                rahu: 'pisces',
                ketu: 'virgo',
                period: 'After May 2026',
                effect: {
                    aries: 'Spiritual awakening begins',
                    taurus: 'Social circle expands dramatically',
                    gemini: 'Career takes unexpected turn',
                    cancer: 'Foreign connections grow',
                    leo: 'Financial transformation ahead',
                    virgo: 'Personal identity evolves',
                    libra: 'Hidden talents emerge',
                    scorpio: 'Creative breakthroughs occur',
                    sagittarius: 'Family dynamics shift',
                    capricorn: 'Communication becomes powerful',
                    aquarius: 'Money flows increase',
                    pisces: 'Self-discovery journey begins'
                }
            }
        };

        return {
            jupiter: transits.jupiter.effect[sunSign],
            jupiterPeriod: transits.jupiter.period,
            saturn: transits.saturn.effect[sunSign],
            saturnPeriod: transits.saturn.period,
            nodes: transits.nodes.effect[sunSign],
            nodesPeriod: transits.nodes.period
        };
    },

    /**
     * Generate lucky dates for 2026
     */
    getLuckyDates(sunSign) {
        // Simplified: Generate dates based on sign's ruling planet
        const luckyMonths = {
            aries: [3, 7, 11],
            taurus: [4, 8, 12],
            gemini: [5, 9, 1],
            cancer: [6, 10, 2],
            leo: [7, 11, 3],
            virgo: [8, 12, 4],
            libra: [9, 1, 5],
            scorpio: [10, 2, 6],
            sagittarius: [11, 3, 7],
            capricorn: [12, 4, 8],
            aquarius: [1, 5, 9],
            pisces: [2, 6, 10]
        };

        const months = luckyMonths[sunSign] || [1, 5, 9];
        const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];

        return {
            bestMonth: monthNames[months[0]],
            secondMonth: monthNames[months[1]],
            thirdMonth: monthNames[months[2]],
            specificDates: [
                `${months[0]}/12-18`,
                `${months[1]}/5-11`,
                `${months[2]}/20-26`
            ]
        };
    },

    /**
     * Get complete birth chart
     */
    getCompleteBirthChart(birthDate, birthTime = null, name = 'User') {
        const sunData = this.calculateSunSign(birthDate);
        const moonData = this.calculateMoonSign(birthDate);
        const risingData = birthTime ? this.calculateRisingSign(birthDate, birthTime) : null;
        const transits = this.get2026Transits(sunData.sign);
        const luckyDates = this.getLuckyDates(sunData.sign);

        return {
            name: name,
            birthDate: birthDate,
            birthTime: birthTime,
            sun: sunData,
            moon: moonData,
            rising: risingData,
            transits2026: transits,
            luckyDates: luckyDates,
            signColor: sunData.color
        };
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AstroCalculator;
}
