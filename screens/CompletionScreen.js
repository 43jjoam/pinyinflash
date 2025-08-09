// Completion Screen Component - Shows when user finishes all cards

const CompletionScreen = ({ onRestart, allMastered = false }) => {
    return (
        <div className="mobile-center">
            <ParallaxBackground />
            <FloatingShapes />
            <div className="w-full max-w-md mx-auto text-center px-4">
                <div className="watercolor-card p-8">
                    {allMastered ? (
                        <>
                            <div className="text-6xl mb-4">🎉</div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                Congratulations!
                            </h1>
                            <p className="text-lg text-gray-600 mb-6">
                                You've mastered all the characters! Now you can get more physical flash cards to advance your level.
                            </p>
                            <button 
                                onClick={onRestart}
                                className="w-full py-3 px-6 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-200"
                            >
                                Continue Learning
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="text-6xl mb-4">🎊</div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                Well Done!
                            </h1>
                            <p className="text-lg text-gray-600 mb-6">
                                You've finished the whole deck
                            </p>
                            <button 
                                onClick={onRestart}
                                className="w-full py-3 px-6 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-200"
                            >
                                Click to Restart
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
