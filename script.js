 const { useState, useEffect, useRef, useCallback } = React;
        
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
            'mainit', 'malamig', 'masakit', 'masarap', 'mapait', 'matamis', 'maalat', 'maasim', 'mabango', 'mabaho', 
            'umakyat', 'bumaba', 'sumakay', 'bumaba', 'umupo', 'tumayo', 'humiga', 'pumasok', 'lumabas', 'nag-aral',
            'nagtrabaho', 'naglinis', 'naglaro', 'nagpahinga', 'naglakad', 'nagmaneho', 'nagbayad', 'nagtanong', 
            'sumagot', 'nagkwento','umorder', 'nagbenta', 'naghintay', 'naghanap', 'nakita', 'narinig', 'naamoy', 
            'nalasahan', 'nadama', 'naramdaman','umasa', 'naniwala', 'nagtiwala', 'nag-isip', 'nangarap', 
            'nagplano', 'nagsimula', 'natapos', 'nakatulog', 'nagising','gabi', 'umaga', 'hapon', 'tanghali', 
            'oras', 'araw', 'buwan', 'taon', 'linggo', 'kahapon','ngayon', 'bukas', 'mamaya', 'kanina', 
            'sandali', 'matagal', 'mabilis', 'mabagal', 'agad', 'dahan-dahan','malapit', 'malayo', 'gitna', 
            'harap', 'likod', 'kaliwa', 'kanan', 'itaas', 'ibaba', 'loob','labas', 'tabi', 'kanto', 'daan', 'kalye', 
            'lungsod', 'bayan', 'barangay', 'bahagi', 'paligid','mesa', 'upuan', 'pinto', 'bintana', 'dingding', 
            'kisame', 'sahig', 'hagdan', 'kusina', 'kwarto','sala', 'banyo', 'telepono', 'kompyuter', 'silya', 'lamesa', 
            'kama', 'unan', 'kumot', 'plato','baso', 'kutsara', 'tinidor', 'kutsilyo', 'kaldero', 'kaserola', 'sandok', 
            'tasa', 'takip', 'kalan','ilaw', 'kuryente', 'tubig', 'hangin', 'apoy', 'ulan', 'araw', 'buwan', 'bituin', 'ulap',
            'bagyo', 'lindol', 'baha', 'init', 'lamig', 'hangin', 'alon', 'dagat', 'baybayin', 'pulo',
            'gubat', 'bukid', 'bukirin', 'bukal', 'talon', 'ilog', 'sapa', 'tulay', 'kalsada', 'daan'
        ];
        
        const TypeMaster = () => {
            const [testMode, setTestMode] = useState('time');
            const [testDuration, setTestDuration] = useState(60);
            const [testWords, setTestWords] = useState(50);
            const [customValue, setCustomValue] = useState('');
            const [currentWords, setCurrentWords] = useState([]);
            const [userInput, setUserInput] = useState('');
            const [currentWordIndex, setCurrentWordIndex] = useState(0);
            const [currentCharIndex, setCurrentCharIndex] = useState(0);
            const [testActive, setTestActive] = useState(false);
            const [testCompleted, setTestCompleted] = useState(false);
            const [startTime, setStartTime] = useState(null);
            const [timeElapsed, setTimeElapsed] = useState(0);
            const [wpm, setWpm] = useState(0);
            const [accuracy, setAccuracy] = useState(100);
            const [cpm, setCpm] = useState(0);
            const [errors, setErrors] = useState(0);
            const [personalBests, setPersonalBests] = useState({ wpm: 0, accuracy: 0 });
            
            const inputRef = useRef(null);
            const timerRef = useRef(null);
            const intervalRef = useRef(null);
            
            const generateWords = useCallback((count) => {
                const words = [];
                for (let i = 0; i < count; i++) {
                    const randomIndex = Math.floor(Math.random() * tagalogWords.length);
                    words.push(tagalogWords[randomIndex]);
                }
                return words;
            }, []);
            
            const resetTest = useCallback(() => {
                setTestActive(false);
                setTestCompleted(false);
                setUserInput('');
                setCurrentWordIndex(0);
                setCurrentCharIndex(0);
                setStartTime(null);
                setTimeElapsed(0);
                setWpm(0);
                setAccuracy(100);
                setCpm(0);
                setErrors(0);
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            }, []);
            
            const startTest = useCallback(() => {
                if (!testActive && !testCompleted) {
                    setTestActive(true);
                    setStartTime(Date.now());
                    inputRef.current?.focus();
                }
            }, [testActive, testCompleted]);
            
            const generateNewTest = useCallback(() => {
                const wordCount = testMode === 'words' ? testWords : 100;
                setCurrentWords(generateWords(wordCount));
                resetTest();
            }, [testMode, testWords, generateWords, resetTest]);
            
            useEffect(() => {
                generateNewTest();
            }, [generateNewTest]);
            
            useEffect(() => {
                if (testActive && !testCompleted) {
                    intervalRef.current = setInterval(() => {
                        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
                    }, 100);
                    
                    return () => {
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                        }
                    };
                }
            }, [testActive, testCompleted, startTime]);
            
            useEffect(() => {
                if (testMode === 'time' && timeElapsed >= testDuration && testActive) {
                    setTestCompleted(true);
                    setTestActive(false);
                    updatePersonalBests();
                }
            }, [timeElapsed, testDuration, testMode, testActive]);
            
            const updatePersonalBests = () => {
                setPersonalBests(prev => ({
                    wpm: Math.max(prev.wpm, wpm),
                    accuracy: Math.max(prev.accuracy, accuracy)
                }));
            };
            
            const calculateStats = useCallback(() => {
                if (!startTime) return;
                
                const timeInMinutes = (Date.now() - startTime) / 60000;
                const typedChars = userInput.length;
                const typedWords = userInput.trim().split(/\s+/).length;
                
                // Calculate WPM
                const calculatedWpm = Math.round(typedWords / timeInMinutes);
                setWpm(calculatedWpm);
                
                // Calculate CPM
                const calculatedCpm = Math.round(typedChars / timeInMinutes);
                setCpm(calculatedCpm);
                
                // Calculate accuracy
                const correctChars = calculateCorrectChars();
                const calculatedAccuracy = Math.round((correctChars / typedChars) * 100) || 100;
                setAccuracy(calculatedAccuracy);
                
                // Calculate errors
                const calculatedErrors = typedChars - correctChars;
                setErrors(Math.max(0, calculatedErrors));
            }, [startTime, userInput]);
            
            const calculateCorrectChars = () => {
                let correct = 0;
                const inputWords = userInput.trim().split(/\s+/);
                
                for (let i = 0; i < Math.min(inputWords.length, currentWords.length); i++) {
                    const inputWord = inputWords[i];
                    const targetWord = currentWords[i];
                    
                    for (let j = 0; j < Math.min(inputWord.length, targetWord.length); j++) {
                        if (inputWord[j] === targetWord[j]) {
                            correct++;
                        }
                    }
                }
                
                return correct;
            };
            
            useEffect(() => {
                if (testActive) {
                    calculateStats();
                }
            }, [userInput, testActive, calculateStats]);
            
            const handleInputChange = (e) => {
                const value = e.target.value;
                setUserInput(value);
                
                // Start test only on first keystroke
                if (!testActive && !testCompleted && value.length > 0) {
                    startTest();
                }
                
                // Check if test is completed by words
                if (testMode === 'words') {
                    const typedWords = value.trim().split(/\s+/).filter(word => word.length > 0);
                    if (typedWords.length >= testWords) {
                        setTestCompleted(true);
                        setTestActive(false);
                        updatePersonalBests();
                    }
                }
            };
            
            const renderWordDisplay = () => {
                const inputWords = userInput.split(/\s+/);
                const displayLimit = testMode === 'words' ? testWords :250
                
                return currentWords.slice(0, displayLimit).map((word, wordIndex) => {
                    const isCurrentWord = wordIndex === currentWordIndex;
                    const inputWord = inputWords[wordIndex] || '';
                    
                    return (
                        <span key={wordIndex} className={`word ${isCurrentWord ? 'word-highlight' : ''}`}>
                            {[...word].map((char, charIndex) => {
                                const isTyped = wordIndex < inputWords.length;
                                const isCurrentChar = isCurrentWord && charIndex === inputWord.length;
                                const isCorrect = isTyped && charIndex < inputWord.length && char === inputWord[charIndex];
                                const isIncorrect = isTyped && charIndex < inputWord.length && char !== inputWord[charIndex];
                                
                                return (
                                    <span
                                        key={charIndex}
                                        className={`char ${
                                            isCurrentChar ? 'char-current' :
                                            isCorrect ? 'char-correct' :
                                            isIncorrect ? 'char-incorrect' : ''
                                        }`}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                            {wordIndex < currentWords.length - 1 && (
                                <span className="char space"> </span>
                            )}
                        </span>
                    );
                });
            };
            
            const formatTime = (seconds) => {
                const mins = Math.floor(seconds / 60);
                const secs = seconds % 60;
                return `${mins}:${secs.toString().padStart(2, '0')}`;
            };
            
            const getProgress = () => {
                if (testMode === 'time') {
                    return (timeElapsed / testDuration) * 100;
                } else {
                    const typedWords = userInput.trim().split(/\s+/).filter(word => word.length > 0);
                    return (typedWords.length / testWords) * 100;
                }
            };
            
            return (
                <div className="min-h-screen p-4 md:p-8">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <header className="text-center mb-8">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 floating-animation">
                                TypeMaster
                            </h1>
                            <p className="text-lg text-white/80 pulse-animation">
                                Master your typing skills with precision
                            </p>
                        </header>
                        
                        {/* Test Mode Selection */}
                        <div className="mb-8">
                            <div className="flex flex-wrap justify-center gap-4 mb-6">
                                <button
                                    className={`mode-btn px-6 py-3 rounded-xl font-medium ${
                                        testMode === 'time' ? 'active' : 'glass-effect text-white'
                                    }`}
                                    onClick={() => setTestMode('time')}
                                >
                                    <i className="fas fa-clock mr-2"></i>Timed Test
                                </button>
                                <button
                                    className={`mode-btn px-6 py-3 rounded-xl font-medium ${
                                        testMode === 'words' ? 'active' : 'glass-effect text-white'
                                    }`}
                                    onClick={() => setTestMode('words')}
                                >
                                    <i className="fas fa-font mr-2"></i>Word Count
                                </button>
                                <button
                                    className={`mode-btn px-6 py-3 rounded-xl font-medium ${
                                        testMode === 'custom' ? 'active' : 'glass-effect text-white'
                                    }`}
                                    onClick={() => setTestMode('custom')}
                                >
                                    <i className="fas fa-cog mr-2"></i>Custom Test
                                </button>
                            </div>
                            
                            {/* Duration/Word Count Selection */}
                            <div className="flex flex-wrap justify-center gap-4 mb-6">
                                {testMode === 'time' && (
                                    <>
                                        {[15, 30, 60, 120].map((duration) => (
                                            <button
                                                key={duration}
                                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                                    testDuration === duration
                                                        ? 'bg-white text-black-900'
                                                        : 'glass-effect text-white hover:bg-white/20'
                                                }`}
                                                onClick={() => setTestDuration(duration)}
                                            >
                                                {duration}s
                                            </button>
                                        ))}
                                    </>
                                )}
                                {testMode === 'words' && (
                                    <>
                                        {[25, 50, 100, 250].map((words) => (
                                            <button
                                                key={words}
                                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                                    testWords === words
                                                        ? 'bg-white text-black-900'
                                                        : 'glass-effect text-white hover:bg-white/20'
                                                }`}
                                                onClick={() => setTestWords(words)}
                                            >
                                                {words} words
                                            </button>
                                        ))}
                                    </>
                                )}
                                {testMode === 'custom' && (
                                    <div className="flex gap-4 items-center">
                                        <input
                                            type="number"
                                            placeholder="Enter value"
                                            className="px-4 py-2 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/60 focus:border-white/40 focus:outline-none"
                                            value={customValue}
                                            onChange={(e) => setCustomValue(e.target.value)}
                                        />
                                        <span className="text-white">seconds/words</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="text-center">
                                <button
                                    className="px-8 py-3 bg-white text-black-900 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
                                    onClick={generateNewTest}
                                >
                                    <i className="fas fa-redo mr-2"></i>Generate New Test
                                </button>
                            </div>
                        </div>
                        
                        {/* Statistics */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                            <div className="stat-card p-4 text-center">
                                <div className="text-2xl font-bold text-black-900">{wpm}</div>
                                <div className="text-sm text-gray-600">WPM</div>
                            </div>
                            <div className="stat-card p-4 text-center">
                                <div className="text-2xl font-bold text-black-900">{accuracy}%</div>
                                <div className="text-sm text-gray-600">Accuracy</div>
                            </div>
                            <div className="stat-card p-4 text-center">
                                <div className="text-2xl font-bold text-black-900">{cpm}</div>
                                <div className="text-sm text-gray-600">CPM</div>
                            </div>
                            <div className="stat-card p-4 text-center">
                                <div className="text-2xl font-bold text-red-500">{errors}</div>
                                <div className="text-sm text-gray-600">Errors</div>
                            </div>
                            <div className="stat-card p-4 text-center">
                                <div className="text-2xl font-bold text-black-900">
                                    {testMode === 'time' ? formatTime(Math.max(0, testDuration - timeElapsed)) : formatTime(timeElapsed)}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {testMode === 'time' ? 'Remaining' : 'Elapsed'}
                                </div>
                            </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="bg-gray-200 rounded-full h-2">
                                <div 
                                    className="progress-bar h-full rounded-full transition-all duration-300"
                                    style={{ width: `${Math.min(100, getProgress())}%` }}
                                ></div>
                            </div>
                        </div>
                        
                        {/* Personal Bests */}
                        <div className="flex justify-center gap-8 mb-8">
                            <div className="glass-effect px-6 py-3 rounded-xl text-center">
                                <div className="text-white/80 text-sm">Personal Best WPM</div>
                                <div className="text-2xl font-bold text-white">{personalBests.wpm}</div>
                            </div>
                            <div className="glass-effect px-6 py-3 rounded-xl text-center">
                                <div className="text-white/80 text-sm">Best Accuracy</div>
                                <div className="text-2xl font-bold text-white">{personalBests.accuracy}%</div>
                            </div>
                        </div>
                        
                        {/* Typing Area */}
                        <div className="typing-area p-8 mb-8">
                            <div className="word-display typing-font mb-8 leading-relaxed" style={{ minHeight: '120px' }}>
                                {renderWordDisplay()}
                            </div>
                            
                            <textarea
                                ref={inputRef}
                                value={userInput}
                                onChange={handleInputChange}
                                disabled={testCompleted}
                                className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg typing-font resize-none focus:border-[var(--accent-gold)] focus:outline-none transition-colors text-[var(--text-dark)]"
                                rows="3"
                                placeholder={testActive ? "Keep typing..." : "Start typing to begin..."}
                                />
                        </div>
                        
                        {/* Results Modal */}
                            {testCompleted && (
                            <div className="results-modal fixed inset-0 flex items-center justify-center z-50 p-4">
                                <div className="result-card p-8 max-w-md w-full text-center">
                                <h2 className="text-3xl font-bold text-[var(--primary-dark)] mb-6">
                                    Test Complete!
                                </h2>

                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div>
                                    <div className="text-3xl font-bold text-[var(--primary-dark)]">{wpm}</div>
                                    <div className="text-gray-600">Words Per Minute</div>
                                    </div>
                                    <div>
                                    <div className="text-3xl font-bold text-[var(--primary-dark)]">{accuracy}%</div>
                                    <div className="text-gray-600">Accuracy</div>
                                    </div>
                                    <div>
                                    <div className="text-3xl font-bold text-[var(--primary-dark)]">{cpm}</div>
                                    <div className="text-gray-600">Characters Per Minute</div>
                                    </div>
                                    <div>
                                    <div className="text-3xl font-bold text-red-500">{errors}</div>
                                    <div className="text-gray-600">Total Errors</div>
                                    </div>
                                </div>

                                <div className="flex gap-4 justify-center">
                                    <button
                                    className="px-6 py-3 bg-[var(--primary-dark)] text-white rounded-xl font-semibold hover:bg-[var(--primary-light)] transition-all"
                                    onClick={generateNewTest}
                                    >
                                    Try Again
                                    </button>
                                    <button
                                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                                    onClick={() => setTestCompleted(false)}
                                    >
                                    Close
                                    </button>
                                </div>
                                </div>
                            </div>
                            )}
                    </div>
                </div>
            );
        };
        
        ReactDOM.render(<TypeMaster />, document.getElementById('root'));