const tagalogWords = [
    'ang', 'ng', 'sa', 'na', 'at', 'ay', 'mga', 'ko', 'mo', 'niya',
    'ako', 'ikaw', 'siya', 'kami', 'tayo', 'kayo', 'sila', 'ito', 'iyan', 'iyon',
    'dito', 'diyan', 'doon', 'nito', 'niyan', 'noon', 'sino', 'ano', 'saan', 'kailan',
    'paano', 'bakit', 'magkano', 'ilan', 'alin', 'kumain', 'uminom', 'natulog', 'gumising', 'pumunta',
    'umuwi', 'nagbasa', 'nagsulat', 'nakinig', 'tumawa', 'umiyak', 'lumakad', 'tumakbo', 'sumayaw', 'kumanta',
    'bahay', 'paaralan', 'ospital', 'simbahan', 'palengke', 'tindahan', 'parke', 'dagat', 'bundok', 'ilog',
    'ina', 'ama', 'anak', 'kuya', 'ate', 'lolo', 'lola', 'kapatid', 'asawa', 'kaibigan',
    'pusa', 'aso', 'manok', 'baboy', 'kalabaw', 'kabayo', 'isda', 'ibon', 'paru-paro', 'langgam',
    'kanin', 'tinapay', 'gulay', 'prutas', 'tubig', 'gatas', 'kape', 'tsaa', 'saging', 'mansanas',
    'bigas', 'asukal', 'asin', 'suka', 'toyo', 'mantika', 'itlog', 'karne', 'isda', 'manok',
    'pula', 'puti', 'itim', 'dilaw', 'asul', 'berde', 'kahel', 'lila', 'rosas', 'kulay-abo',
    'malaki', 'maliit', 'mataas', 'mababa', 'mahaba', 'maikli', 'mataba', 'payat', 'maganda', 'pangit',
    'mabait', 'masama', 'matalino', 'tanga', 'masipag', 'tamad', 'mayaman', 'mahirap', 'masaya', 'malungkot',
    'mainit', 'malamig', 'masakit', 'masarap', 'mapait', 'matamis', 'maalat', 'maasim', 'mabango', 'mabaho'
];

class TypingTest {
    constructor() {
        this.displayArea = document.getElementById("display-area");
        this.userInput = document.getElementById("user-input");
        this.wordCountSelect = document.getElementById("word-count");
        this.refreshBtn = document.getElementById("refresh-btn");
        this.resultsModal = document.getElementById("results-modal");
        this.retryBtn = document.getElementById("retry-btn");
        
        this.currentWords = [];
        this.startTime = null;
        this.isTestActive = false;
        this.testCompleted = false;
        
        this.initializeEventListeners();
        this.generateNewTest();
    }

    initializeEventListeners() {
        this.userInput.addEventListener('input', () => this.handleInput());
        this.userInput.addEventListener('focus', () => this.startTest());
        this.refreshBtn.addEventListener('click', () => this.generateNewTest());
        this.wordCountSelect.addEventListener('change', () => this.generateNewTest());
        this.retryBtn.addEventListener('click', () => this.closeModal());
        
        // Click on display area to focus input
        this.displayArea.addEventListener('click', () => {
            this.userInput.focus();
        });
    }

    generateNewTest() {
        const wordCount = parseInt(this.wordCountSelect.value);
        this.currentWords = this.getRandomWords(wordCount);
        this.renderWords();
        this.resetTest();
    }

    getRandomWords(count) {
        const words = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * tagalogWords.length);
            words.push(tagalogWords[randomIndex]);
        }
        return words;
    }

    renderWords() {
        this.displayArea.innerHTML = '';
        this.currentWords.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            wordSpan.setAttribute('data-word-index', wordIndex);
            
            [...word].forEach((char, charIndex) => {
                const charSpan = document.createElement('span');
                charSpan.className = 'char';
                charSpan.textContent = char;
                charSpan.setAttribute('data-char-index', charIndex);
                wordSpan.appendChild(charSpan);
            });
            
            this.displayArea.appendChild(wordSpan);
            
            // Add space after each word except the last one
            if (wordIndex < this.currentWords.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.className = 'char space';
                spaceSpan.textContent = ' ';
                this.displayArea.appendChild(spaceSpan);
            }
        });
    }

    resetTest() {
        this.userInput.value = '';
        this.userInput.disabled = false;
        this.startTime = null;
        this.isTestActive = false;
        this.testCompleted = false;
        this.updateStats(0, 100, 0);
        this.resultsModal.style.display = 'none';
    }

    startTest() {
        if (!this.isTestActive && !this.testCompleted) {
            this.startTime = Date.now();
            this.isTestActive = true;
        }
    }

    handleInput() {
        if (!this.isTestActive) this.startTest();
        
        const inputValue = this.userInput.value;
        const expectedText = this.currentWords.join(' ');
        
        this.updateDisplay(inputValue, expectedText);
        
        if (this.isTestActive) {
            this.updateLiveStats(inputValue, expectedText);
        }
        
        // Check if test is complete
        if (inputValue === expectedText) {
            this.completeTest();
        }
    }

    updateDisplay(typed, expected) {
        const allChars = this.displayArea.querySelectorAll('.char');
        
        // Reset all characters
        allChars.forEach(char => {
            char.className = char.classList.contains('space') ? 'char space' : 'char';
        });
        
        // Update based on typed input
        for (let i = 0; i < Math.max(typed.length, expected.length); i++) {
            if (i < allChars.length) {
                const char = allChars[i];
                
                if (i < typed.length) {
                    if (i < expected.length) {
                        // Character has been typed and exists in expected
                        if (typed[i] === expected[i]) {
                            char.classList.add('correct');
                        } else {
                            char.classList.add('incorrect');
                        }
                    } else {
                        // Extra character
                        char.classList.add('incorrect', 'extra');
                    }
                } else if (i === typed.length) {
                    // Current cursor position
                    char.classList.add('cursor');
                }
            }
        }
    }

    updateLiveStats(typed, expected) {
        if (!this.startTime) return;
        
        const timeElapsed = (Date.now() - this.startTime) / 1000;
        const wordsTyped = typed.trim().split(/\s+/).length;
        const wpm = timeElapsed > 0 ? Math.round((wordsTyped / timeElapsed) * 60) : 0;
        
        let correctChars = 0;
        for (let i = 0; i < Math.min(typed.length, expected.length); i++) {
            if (typed[i] === expected[i]) correctChars++;
        }
        
        const accuracy = typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 100;
        
        this.updateStats(wpm, accuracy, Math.round(timeElapsed));
    }

    updateStats(wpm, accuracy, time) {
        document.getElementById('wpm').textContent = wpm;
        document.getElementById('accuracy').textContent = accuracy + '%';
        document.getElementById('time').textContent = time + 's';
    }

    completeTest() {
        if (this.testCompleted) return;
        
        this.testCompleted = true;
        this.isTestActive = false;
        this.userInput.disabled = true;
        
        const timeElapsed = (Date.now() - this.startTime) / 1000;
        const wpm = Math.round((this.currentWords.length / timeElapsed) * 60);
        const accuracy = this.calculateFinalAccuracy();
        
        this.showResults(wpm, accuracy, Math.round(timeElapsed));
    }

    calculateFinalAccuracy() {
        const typed = this.userInput.value;
        const expected = this.currentWords.join(' ');
        
        let correctChars = 0;
        for (let i = 0; i < Math.min(typed.length, expected.length); i++) {
            if (typed[i] === expected[i]) correctChars++;
        }
        
        return Math.round((correctChars / expected.length) * 100);
    }

    showResults(wpm, accuracy, time) {
        document.getElementById('final-wpm').textContent = wpm;
        document.getElementById('final-accuracy').textContent = accuracy + '%';
        document.getElementById('final-time').textContent = time + 's';
        
        this.resultsModal.style.display = 'flex';
    }

    closeModal() {
        this.resultsModal.style.display = 'none';
        this.generateNewTest();
        this.userInput.focus();
    }
}

// Initialize the typing test when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TypingTest();
});