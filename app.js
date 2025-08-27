// Chinese-Thai Flashcard App - Main Application Entry Point

const { useState, useEffect, useRef, useCallback } = React;

// --- MAIN APPLICATION COMPONENT ---

const FlashcardApp = () => {
    const [mode, setMode] = useState('create'); // 'create', 'loading', 'study', 'collection', 'saved', 'difficult', 'completion'
    const [flashcards, setFlashcards] = useState([]);
    const [savedCards, setSavedCards] = useState([]);
    const [difficultCards, setDifficultCards] = useState([]);
    const [completionData, setCompletionData] = useState({ allMastered: false });
    const [goToCardCallback, setGoToCardCallback] = useState(null);
    const [currentStudyIndex, setCurrentStudyIndex] = useState(0);

    const handleTopicSubmit = (code) => {
        setMode('loading');
        setTimeout(() => {
            let cards;
            if (['Pinyin1', 'pinyin', 'py', '拼音'].includes(code)) {
                cards = PINYIN_CARDS;
            } else if (code === 'the-best-child') {
                cards = THE_BEST_CHILD_CARDS;
            } else {
                cards = [{ front: "Invalid Code", back: "Please try another code.", emoji: "🤷" }];
            }
            setFlashcards(cards);
            setMode('study');
        }, 1500);
    };
    
    const handleShowCollection = (goToCard) => {
        setGoToCardCallback(() => goToCard);
        setMode('collection');
    };

    const handleShowSavedCards = () => {
        setMode('saved');
    };

    const handleShowDifficultCards = () => {
        setMode('difficult');
    };

    const handleUpdateSavedCards = (cards) => {
        setSavedCards(cards);
    };

    const handleUpdateDifficultCards = (cards) => {
        setDifficultCards(cards);
    };

    const handleCompletion = (allMastered, finalSavedCards, finalDifficultCards) => {
        setSavedCards(finalSavedCards);
        setDifficultCards(finalDifficultCards);
        setCompletionData({ allMastered });
        setMode('completion');
    };

    const handleBackToStudy = () => {
        setMode('study');
    };

    const handleCardSelect = (index) => {
        setCurrentStudyIndex(index);
        if (goToCardCallback) {
            goToCardCallback(index);
        }
        setMode('study');
    };

    const handleRestart = () => {
        setCurrentStudyIndex(0); // Reset to first card
        setMode('study');
        // Note: savedCards and difficultCards are preserved across rounds
    };

    const handleExitToMenu = () => {
        setMode('create');
        setFlashcards([]);
        setSavedCards([]);
        setDifficultCards([]);
    };

    // Render appropriate screen based on mode
    switch (mode) {
        case 'loading':
            return <LoadingScreen />;
        
        case 'study':
            return (
                <StudyScreen 
                    flashcards={flashcards} 
                    onShowCollection={handleShowCollection}
                    onShowSavedCards={handleShowSavedCards}
                    onShowDifficultCards={handleShowDifficultCards}
                    onUpdateSavedCards={handleUpdateSavedCards}
                    onUpdateDifficultCards={handleUpdateDifficultCards}
                    onCompletion={handleCompletion}
                    initialIndex={currentStudyIndex}
                    initialSavedCards={savedCards}
                    initialDifficultCards={difficultCards}
                />
            );
        
        case 'collection':
            return (
                <CollectionScreen 
                    flashcards={flashcards}
                    onBackToStudy={handleBackToStudy}
                    onCardSelect={handleCardSelect}
                />
            );
        
        case 'saved':
            return (
                <SavedCardsScreen 
                    flashcards={flashcards}
                    savedCards={savedCards}
                    onBackToStudy={handleBackToStudy}
                    onCardSelect={handleCardSelect}
                />
            );
        
        case 'difficult':
            return (
                <DifficultCardsScreen 
                    flashcards={flashcards}
                    difficultCards={difficultCards}
                    onBackToStudy={handleBackToStudy}
                    onCardSelect={handleCardSelect}
                />
            );
        
        case 'completion':
            return (
                <CompletionScreen 
                    onRestart={handleRestart}
                    allMastered={completionData.allMastered}
                />
            );
        
        default:
            return <CreateScreen onTopicSubmit={handleTopicSubmit} />;
    }
};

// Initialize the app
ReactDOM.render(<FlashcardApp />, document.getElementById('root'));
