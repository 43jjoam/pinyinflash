// Card Components - Flashcard face rendering

const CardFront = ({ char, pinyin, onPronounce }) => (
    <div className="card-face card-front" onClick={() => onPronounce(char)}>
        <div className="card-content">
            <div className="chinese-character">{char}</div>
            <div className="pinyin">{pinyin}</div>
        </div>
    </div>
);

const CardBack = ({ english, thai, emoji, onPronounce }) => {
    // Auto-play English when the back face mounts
    useEffect(() => {
        onPronounce(english, { forceLang: 'en-US', rate: 0.9, preferredVoiceNames: ['Google US English'] });
    }, [english, onPronounce]);

    return (
        <div className="card-face card-back" onClick={() => onPronounce(english, { forceLang: 'en-US', preferredVoiceNames: ['Google US English'] })}>
            <div className="card-content">
                <div className="translation-content">
                    {emoji && <div className="emoji-display">{emoji}</div>}
                    <div className="english-translation">{english}</div>
                    <div className="thai-translation">{thai}</div>
                </div>
            </div>
        </div>
    );
};

const CardFace = ({ content, type, emoji }) => {
    const pronounceText = useSpeech();
    
    if (type === 'front') {
        const [char, pinyin] = content.split('\n');
        return <CardFront char={char} pinyin={pinyin} onPronounce={pronounceText} />;
    } else {
        const [english, thai] = content.split('\n');
        return <CardBack english={english} thai={thai} emoji={emoji} onPronounce={pronounceText} />;
    }
};
