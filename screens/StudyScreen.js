// Study Screen Component - Main flashcard study interface

const StudyScreen = ({ flashcards, onShowCollection, onShowSavedCards, onShowDifficultCards, onCompletion, onUpdateSavedCards, onUpdateDifficultCards, initialIndex = 0, initialSavedCards = [], initialDifficultCards = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [flipped, setFlipped] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [savedCards, setSavedCards] = useState(initialSavedCards);
    const [difficultCards, setDifficultCards] = useState(initialDifficultCards);
    const [isSwipeAction, setIsSwipeAction] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState('');
    const [isSwipeAnimating, setIsSwipeAnimating] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const swipeThreshold = 80;
    const pronounceText = useSpeech();

    const currentCard = flashcards[currentIndex];
    const isSaved = savedCards.includes(currentIndex);
    const isDifficult = difficultCards.includes(currentIndex);

    // Removed handleAnimation as it's no longer needed

    const handleSwipeAnimation = (direction, callback) => {
        setIsSwipeAnimating(true);
        setSwipeDirection(direction);
        
        setTimeout(() => {
            callback();
            setIsSwipeAnimating(false);
            setSwipeDirection('');
            // Don't reset flipped state here
            setDragOffset({ x: 0, y: 0 });
        }, 800);
    };

    const handleNext = useCallback(() => {
        if (currentIndex === flashcards.length - 1) {
            // Check if all cards are mastered
            const allMastered = flashcards.every((_, index) => savedCards.includes(index));
            onCompletion(allMastered, savedCards, difficultCards);
        } else {
            // Move to next card and ensure it starts unflipped
            setCurrentIndex((prev) => prev + 1);
            setFlipped(false);
        }
    }, [currentIndex, flashcards.length, savedCards, difficultCards, onCompletion]);

    const handleSwipeRight = useCallback(() => {
        // Add to saved cards and remove from difficult cards
        setSavedCards(prev => prev.includes(currentIndex) ? prev : [...prev, currentIndex]);
        setDifficultCards(prev => prev.filter(i => i !== currentIndex));
        setIsSwipeAction(true);
        
        handleSwipeAnimation('right', () => {
            handleNext();
        });
    }, [currentIndex, handleNext]);

    const handleSwipeLeft = useCallback(() => {
        // Add to difficult cards and remove from saved cards
        setDifficultCards(prev => prev.includes(currentIndex) ? prev : [...prev, currentIndex]);
        setSavedCards(prev => prev.filter(i => i !== currentIndex));
        setIsSwipeAction(true);
        
        handleSwipeAnimation('left', () => {
            handleNext();
        });
    }, [currentIndex, handleNext]);

    const handleFlip = useCallback(() => {
        if (!isSwipeAction) {
            setFlipped(f => !f);
            // Pronounce after flip
            setTimeout(() => {
                const textToSpeak = !flipped ? currentCard.back : currentCard.front;
                pronounceText(textToSpeak.split('\n')[0]);
            }, 300);
        }
        setIsSwipeAction(false);
    }, [flipped, currentCard, pronounceText, isSwipeAction]);

    const goToCard = useCallback((index) => {
        handleAnimation(() => setCurrentIndex(index));
    }, []);

    // Sync card states with parent when they change
    useEffect(() => {
        if (onUpdateSavedCards) {
            onUpdateSavedCards(savedCards);
        }
    }, [savedCards, onUpdateSavedCards]);

    useEffect(() => {
        if (onUpdateDifficultCards) {
            onUpdateDifficultCards(difficultCards);
        }
    }, [difficultCards, onUpdateDifficultCards]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') handleSwipeRight();
            if (e.key === 'ArrowLeft') handleSwipeLeft();
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') handleFlip();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleSwipeRight, handleSwipeLeft, handleFlip]);
    
    useEffect(() => {
        // Auto-pronounce the front of the card when it changes
        pronounceText(currentCard.front.split('\n')[0]);
    }, [currentIndex, currentCard, pronounceText]);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        setIsSwipeAction(false);
        setIsDragging(true);
        setDragOffset({ x: 0, y: 0 });
    };

    const handleTouchMove = (e) => {
        if (!isDragging || isSwipeAnimating) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const deltaX = currentX - touchStartX.current;
        const deltaY = currentY - touchStartY.current;
        
        // Only track horizontal movement for swipe preview
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            setDragOffset({ x: deltaX * 0.5, y: 0 }); // Dampen the movement
            
            // Show preview of swipe direction
            if (Math.abs(deltaX) > 30) {
                setSwipeDirection(deltaX > 0 ? 'swiping-right' : 'swiping-left');
            } else {
                setSwipeDirection('');
            }
        }
    };

    const handleTouchEnd = (e) => {
        if (!isDragging) return;
        
        setIsDragging(false);
        setSwipeDirection('');
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchStartX.current - touchEndX;
        const deltaY = touchStartY.current - touchEndY;
        
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
            // Horizontal swipe
            if (deltaX > 0) {
                // Swiped left (difficult)
                handleSwipeLeft();
            } else {
                // Swiped right (saved)
                handleSwipeRight();
            }
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > swipeThreshold) {
            // Vertical swipe (flip)
            setDragOffset({ x: 0, y: 0 });
            handleFlip();
        } else {
            // It's a tap, not a swipe
            setDragOffset({ x: 0, y: 0 });
            handleFlip();
        }
    };

    return (
        <div className="mobile-center study-mode">
            <ParallaxBackground />
            <div className="w-full h-full flex flex-col items-center justify-center relative touch-none pt-20">
                {/* Top Icons - clean design */}
                <div className="fixed top-8 right-4 flex items-center gap-6 z-50">
                    <button 
                        onClick={() => onShowDifficultCards(difficultCards)} 
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        <Icon name="helpCircle" size={32} fill={isDifficult ? 'currentColor' : 'none'} 
                              className="transition-transform hover:scale-110" />
                    </button>
                    <button 
                        onClick={() => onShowSavedCards(savedCards)} 
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        <Icon name="heart" size={32} fill={isSaved ? 'currentColor' : 'none'} 
                              className="transition-transform hover:scale-110" />
                    </button>
                    <button 
                        onClick={() => onShowCollection(goToCard)} 
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        <Icon name="grid" size={32} className="transition-transform hover:scale-110" />
                    </button>
                </div>

                {/* Card Display */}
                <div className="card-scene mt-12">
                    
                    {/* Swipe Direction Indicators */}
                    <div className={`absolute left-[-80px] top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-red-500 bg-opacity-80 flex items-center justify-center text-2xl transition-opacity duration-300 z-10 ${swipeDirection === 'swiping-left' ? 'opacity-100' : 'opacity-0'}`}>
                        ❌
                    </div>
                    <div className={`absolute right-[-80px] top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-green-500 bg-opacity-80 flex items-center justify-center text-2xl transition-opacity duration-300 z-10 ${swipeDirection === 'swiping-right' ? 'opacity-100' : 'opacity-0'}`}>
                        ❤️
                    </div>

                    <div className="card-animation-container">
                        {/* Next card - only shown during swipe */}
                        {currentIndex < flashcards.length - 1 && (
                            <div className={`card-3d next-card ${(isDragging || swipeDirection) ? 'show-during-swipe' : ''}`}>
                                <CardFace content={flashcards[currentIndex + 1].front} type="front" />
                                <CardFace content={flashcards[currentIndex + 1].back} type="back" emoji={flashcards[currentIndex + 1].emoji} />
                            </div>
                        )}
                        
                        {/* Current card */}
                        <div className={`card-3d current-card
                            ${flipped ? 'flipped' : ''} 
                            ${isSwipeAnimating ? `swipe-${swipeDirection}` : ''}
                            ${!isSwipeAnimating && swipeDirection ? swipeDirection : ''}`}
                            style={{
                                '--drag-x': `${dragOffset.x}px`,
                                '--drag-y': `${dragOffset.x}px`,
                                '--drag-rotate': `${dragOffset.x}`,
                                transform: isDragging && !isSwipeAnimating 
                                    ? `translate3d(${dragOffset.x}px, ${Math.abs(dragOffset.x) * 0.15}px, 0) rotate(${dragOffset.x * 0.08}deg)` 
                                    : undefined,
                                opacity: isDragging ? Math.max(0.5, 1 - Math.abs(dragOffset.x) / 500) : 1
                            }}
                            onTouchStart={handleTouchStart} 
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}>
                            <CardFace content={currentCard.front} type="front" />
                            <CardFace content={currentCard.back} type="back" emoji={currentCard.emoji} />
                        </div>
                    </div>
                </div>

                {/* Progress Counter - no arrows */}
                <div className="mt-12 text-white/80">
                    <p className="text-lg font-medium text-center tracking-wider">{currentIndex + 1} / {flashcards.length}</p>
                </div>
            </div>
        </div>
    );
};
