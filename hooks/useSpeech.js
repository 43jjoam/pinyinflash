// Speech Synthesis Hook - Text-to-speech functionality

const useSpeech = () => {
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
            }
        };
        
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);
    
    const detectLanguage = (text) => {
        if (/[\u4e00-\u9fff]/.test(text)) return 'zh-CN';
        if (/[\u0e00-\u0e7f]/.test(text)) return 'th-TH';
        if (/^[a-z]+$/i.test(text) && text.length <= 6) return 'zh-CN'; // Pinyin
        return 'en-US';
    };

    const pronounceText = useCallback((text) => {
        if (!text || !text.trim() || !window.speechSynthesis || voices.length === 0) return;

        window.speechSynthesis.cancel();

        setTimeout(() => {
            const textToPronounce = text.split('\n')[0].trim();
            const utterance = new SpeechSynthesisUtterance(textToPronounce);
            const lang = detectLanguage(textToPronounce);

            utterance.lang = lang;
            let voice;

            if (lang === 'zh-CN') {
                voice = voices.find(v => v.lang.includes('zh-CN') || v.lang.includes('zh-TW') || v.name.toLowerCase().includes('mandarin')) || voices.find(v => v.lang.startsWith('zh'));
                utterance.rate = 0.6;
                utterance.pitch = 1.0;
            } else if (lang === 'th-TH') {
                voice = voices.find(v => v.lang.includes('th-TH')) || voices.find(v => v.lang.startsWith('th'));
                utterance.rate = 0.7;
            } else {
                voice = voices.find(v => v.lang.includes('en-US')) || voices.find(v => v.lang.startsWith('en'));
                utterance.rate = 0.8;
            }
            
            utterance.voice = voice || null;
            
            utterance.onerror = (e) => console.error('Speech synthesis error:', e.error);
            
            window.speechSynthesis.speak(utterance);
        }, 100); // Small delay for cancel to work reliably
    }, [voices]);

    return pronounceText;
};
