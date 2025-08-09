// Collection Screen Component - Shows all cards in a grid view

const CollectionScreen = ({ flashcards, onBackToStudy, onCardSelect }) => {
    return (
        <div className="min-h-screen mobile-center">
            <ParallaxBackground />
            <div className="w-full max-w-lg mx-auto p-4 pt-8">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                    <button 
                        onClick={onBackToStudy} 
                        className="text-white/90 hover:text-white flex items-center justify-center
                                 transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        <Icon name="chevronLeft" size={28} />
                    </button>
                    <h1 className="text-xl font-bold text-white flex items-center gap-3 tracking-wide">
                        <Icon name="grid" size={24} />
                        All Cards ({flashcards.length})
                    </h1>
                    <div className="w-[28px]"></div> {/* Spacer for centering */}
                </div>
                
                <div className="space-y-4 max-h-[75vh] overflow-y-auto px-1">
                    {flashcards.map((card, index) => {
                        const [char, pinyin] = card.front.split('\n');
                        const [english, thai] = card.back.split('\n');
                        
                        return (
                            <div 
                                key={index}
                                onClick={() => onCardSelect(index)}
                                className="watercolor-card p-5 cursor-pointer active:scale-95 transition-all duration-200 
                                         flex items-center gap-5 touch-action-manipulation hover:shadow-lg 
                                         hover:bg-white/95 hover:-translate-y-0.5"
                            >
                                <div className="flex-shrink-0 text-center min-w-[60px]">
                                    <div className="chinese-character text-4xl mb-1.5 text-gray-900">{char}</div>
                                    <div className="pinyin text-sm font-medium tracking-wide text-purple-600/80">{pinyin}</div>
                                </div>
                                <div className="flex-1 text-left border-l border-purple-100/50 pl-5">
                                    <div className="english-translation text-lg font-medium text-gray-800 mb-2">{english}</div>
                                    <div className="thai-translation text-base text-gray-600/90 font-medium">{thai}</div>
                                </div>
                                <div className="text-purple-400/50 flex-shrink-0">
                                    <Icon name="chevronRight" size={20} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
