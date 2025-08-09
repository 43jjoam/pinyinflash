// Difficult Cards Screen Component - Shows cards marked as difficult (question mark icon)

const DifficultCardsScreen = ({ flashcards, difficultCards, onBackToStudy, onCardSelect }) => {
    const difficultCardsList = difficultCards.map(index => ({
        ...flashcards[index],
        originalIndex: index
    }));

    return (
        <div className="min-h-screen mobile-center">
            <ParallaxBackground />
            <div className="w-full max-w-sm mx-auto p-4 pt-8">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-6">
                    <button 
                        onClick={onBackToStudy} 
                        className="mobile-button text-white flex items-center justify-center"
                    >
                        <Icon name="chevronLeft" size={24} />
                    </button>
                    <h1 className="text-lg font-bold text-white flex items-center gap-2">
                        <Icon name="helpCircle" size={20} fill="currentColor" />
                        Difficult ({difficultCardsList.length})
                    </h1>
                    <div className="w-11"></div> {/* Spacer for centering */}
                </div>
                
                {difficultCardsList.length === 0 ? (
                    <div className="text-center text-white/80 mt-20">
                        <Icon name="helpCircle" size={64} className="mx-auto mb-6 opacity-50" />
                        <p className="text-xl mb-2">No difficult cards yet</p>
                        <p className="text-sm opacity-70">Swipe left on cards to mark them as difficult</p>
                    </div>
                ) : (
                    <div className="space-y-3 max-h-[75vh] overflow-y-auto">
                        {difficultCardsList.map((card, listIndex) => {
                            const [char] = card.front.split('\n');
                            const [english] = card.back.split('\n');
                            
                            return (
                                <div 
                                    key={card.originalIndex}
                                    onClick={() => onCardSelect(card.originalIndex)}
                                    className="watercolor-card p-4 cursor-pointer active:scale-95 transition-transform duration-200 flex items-center gap-4 relative touch-action-manipulation"
                                >
                                    <Icon name="helpCircle" size={14} fill="orange" className="absolute top-2 right-2 text-orange-500" />
                                    <div className="flex-shrink-0">
                                        <div className="chinese-character text-3xl">{char}</div>
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="english-translation text-lg font-medium text-gray-800">{english}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
