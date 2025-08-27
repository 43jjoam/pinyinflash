// Create Screen Component - Initial screen for entering access codes

const CreateScreen = ({ onTopicSubmit }) => {
    const [topic, setTopic] = useState('');
    const [slidePosition, setSlidePosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef(null);

    const handleSlide = (clientX) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const maxSlide = rect.width - 56; // 56 is the width of the button
        const newPosition = Math.max(0, Math.min(maxSlide, clientX - rect.left - 28));
        setSlidePosition(newPosition);

        if (newPosition >= maxSlide * 0.95 && topic.trim()) {
            onTopicSubmit(topic.trim());
        }
    };
    
    const handleInteractionStart = (clientX) => {
         if(topic.trim()){
            setIsDragging(true);
            handleSlide(clientX);
         }
    };

    const handleInteractionMove = (clientX) => {
        if (isDragging) {
            handleSlide(clientX);
        }
    };
    
    const handleInteractionEnd = () => {
        if(isDragging) {
            setIsDragging(false);
            const maxSlide = sliderRef.current ? sliderRef.current.getBoundingClientRect().width - 56 : 0;
            if (slidePosition < maxSlide * 0.95) {
                setSlidePosition(0);
            }
        }
    };
    
    useEffect(() => {
        const moveHandler = (e) => handleInteractionMove(e.clientX || e.touches[0].clientX);
        const endHandler = () => handleInteractionEnd();

        if (isDragging) {
            document.addEventListener('mousemove', moveHandler);
            document.addEventListener('mouseup', endHandler);
            document.addEventListener('touchmove', moveHandler);
            document.addEventListener('touchend', endHandler);
        }

        return () => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', endHandler);
            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('touchend', endHandler);
        };
    }, [isDragging]);

    return (
        <div className="mobile-center">
             <FloatingShapes/>
            <div className="w-full max-w-md mx-auto text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{t('flashcardsCode')}</h1>
                <p className="text-white/80 mb-8">Enter a code to start.</p>
                
                <div className="relative">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        onKeyDown={(e) => {if(e.key === 'Enter' && topic.trim()) onTopicSubmit(topic.trim())}}
                        placeholder={t('pasteCodePlaceholder')}
                        className="w-full pl-6 pr-12 py-4 text-lg bg-white/20 text-white placeholder-white/60 border-2 border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-white/80 transition-all duration-300"
                    />
                </div>

                <div ref={sliderRef} className="slide-container relative w-full h-14 bg-white/20 rounded-full mt-6 flex items-center p-1" >
                    <div
                        className="absolute h-12 w-14 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
                        style={{ transform: `translateX(${slidePosition}px)`, transition: isDragging ? 'none' : 'transform 0.2s ease' }}
                        onMouseDown={(e) => handleInteractionStart(e.clientX)}
                        onTouchStart={(e) => handleInteractionStart(e.touches[0].clientX)}
                    >
                        <Icon name="chevronRight" className="text-white"/>
                    </div>
                    <span className="mx-auto text-white/80 transition-opacity duration-300" style={{ opacity: slidePosition > 20 ? 0 : 1 }}>
                        {t('slideToUnlock')}
                    </span>
                </div>
            </div>
        </div>
    );
};
