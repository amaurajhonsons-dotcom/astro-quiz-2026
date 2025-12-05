let currentQuizData = null;
let currentQuestion = 0;
let answers = [];

window.addEventListener('load', initializeQuiz);

function initializeQuiz() {
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('id') || 'love-match';
    
    currentQuizData = getQuizData(quizId);
    
    if (!currentQuizData) {
        window.location.href = '../index.html';
        return;
    }
    
    document.getElementById('quizTitle').textContent = currentQuizData.title;
    document.getElementById('quizMainTitle').textContent = currentQuizData.title;
    document.getElementById('quizSubtitle').textContent = currentQuizData.subtitle;
    document.getElementById('totalQuestions').textContent = currentQuizData.questions.length;
    
    displayQuestion();
    updateProgress();
}

function displayQuestion() {
    const question = currentQuizData.questions[currentQuestion];
    
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('questionText').textContent = question.question;
    
    const optionsGrid = document.getElementById('optionsGrid');
    optionsGrid.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionCard = document.createElement('div');
        optionCard.className = 'option-card';
        optionCard.onclick = () => selectOption(index, optionCard);
        
        const isSelected = answers[currentQuestion] === option.value;
        if (isSelected) {
            optionCard.classList.add('selected');
        }
        
        optionCard.innerHTML = `
            <span class="option-emoji">${option.emoji}</span>
            <span class="option-text">${option.text}</span>
        `;
        
        optionsGrid.appendChild(optionCard);
    });
    
    updateNavigationButtons();
}

function selectOption(optionIndex, optionCard) {
    const allOptions = document.querySelectorAll('.option-card');
    allOptions.forEach(card => card.classList.remove('selected'));
    
    optionCard.classList.add('selected');
    
    const question = currentQuizData.questions[currentQuestion];
    answers[currentQuestion] = question.options[optionIndex].value;
    
    updateNavigationButtons();
    
    if (currentQuestion < currentQuizData.questions.length - 1) {
        setTimeout(() => {
            nextQuestion();
        }, 500);
    } else {
        setTimeout(() => {
            finishQuiz();
        }, 500);
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (currentQuestion > 0) {
        prevBtn.style.display = 'block';
    } else {
        prevBtn.style.display = 'none';
    }
    
    if (answers[currentQuestion] !== undefined) {
        nextBtn.style.display = 'block';
        nextBtn.disabled = false;
    } else {
        nextBtn.style.display = 'none';
    }
}

function nextQuestion() {
    if (currentQuestion < currentQuizData.questions.length - 1) {
        currentQuestion++;
        displayQuestion();
        updateProgress();
        window.scrollTo(0, 0);
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        updateProgress();
        window.scrollTo(0, 0);
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / currentQuizData.questions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function finishQuiz() {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('loadingScreen').style.display = 'block';
    
    const loadingTexts = [
        'राशि चार्ट एनालाइज कर रहे हैं...',
        'AI प्रेडिक्शन जनरेट हो रहा है...',
        'वैदिक कैलकुलेशन्स...',
        'तुम्हारा पर्सनल रिजल्ट तैयार है!'
    ];
    
    let textIndex = 0;
    const loadingInterval = setInterval(() => {
        if (textIndex < loadingTexts.length) {
            document.getElementById('loadingText').textContent = loadingTexts[textIndex];
            textIndex++;
        }
    }, 1000);
    
    setTimeout(() => {
        clearInterval(loadingInterval);
        showResults();
    }, 4000);
}

function showResults() {
    document.getElementById('loadingScreen').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'block';
    
    const quizId = new URLSearchParams(window.location.search).get('id');
    const result = generateResult(quizId, answers);
    
    document.getElementById('resultTitle').textContent = result.title;
    document.getElementById('resultScore').textContent = result.score;
    document.getElementById('resultDetails').innerHTML = result.details;
    
    loadMoreQuizzes(quizId);
    
    triggerPopunder();
    
    window.scrollTo(0, 0);
}

function loadMoreQuizzes(currentQuizId) {
    const allQuizzes = [
        { id: 'love-match', title: '💘 लव मैच', icon: '💘' },
        { id: 'money-luck', title: '💰 मनी लक', icon: '💰' },
        { id: 'career-boost', title: '🚀 करियर', icon: '🚀' },
        { id: 'health-alert', title: '❤️ हेल्थ', icon: '❤️' },
        { id: 'lucky-month', title: '🍀 लकी मंथ', icon: '🍀' },
        { id: 'enemy-friend', title: '👥 फ्रेंड', icon: '👥' },
        { id: 'travel-destiny', title: '✈️ ट्रैवल', icon: '✈️' },
        { id: 'marriage-time', title: '💍 शादी', icon: '💍' }
    ];
    
    const otherQuizzes = allQuizzes.filter(q => q.id !== currentQuizId).slice(0, 3);
    
    const moreQuizzesGrid = document.getElementById('moreQuizzes');
    moreQuizzesGrid.innerHTML = '';
    
    otherQuizzes.forEach(quiz => {
        const quizCard = document.createElement('div');
        quizCard.className = 'mini-quiz-card';
        quizCard.onclick = () => {
            window.location.href = `quiz.html?id=${quiz.id}`;
        };
        
        quizCard.innerHTML = `
            <div class="quiz-icon">${quiz.icon}</div>
            <h4>${quiz.title}</h4>
        `;
        
        moreQuizzesGrid.appendChild(quizCard);
    });
}