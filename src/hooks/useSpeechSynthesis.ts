import { useState, useRef, useEffect } from 'react';
import { SpeechSettings } from '../types';

export const useSpeechSynthesis = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [words, setWords] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [speechSettings, setSpeechSettings] = useState<SpeechSettings>({
    rate: 1.0,
    volume: 1.0
  });
  
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const highlightIntervalRef = useRef<number | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        if (voices.length > 0) {
          const englishVoice = voices.find(voice => 
            voice.lang.startsWith('en') && voice.default
          ) || voices.find(voice => 
            voice.lang.startsWith('en')
          ) || voices[0];
          
          setSelectedVoice(englishVoice);
        }
      };
      
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

  const splitTextIntoWords = (text: string): string[] => {
    return text.split(/\s+/).filter(word => word.length > 0);
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis not supported in this browser');
      return;
    }

    window.speechSynthesis.cancel();
    if (highlightIntervalRef.current) {
      clearInterval(highlightIntervalRef.current);
      highlightIntervalRef.current = null;
    }

    const wordArray = splitTextIntoWords(text);
    setWords(wordArray);
    setCurrentWordIndex(-1);
    setCurrentText(text);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechSettings.rate;
    utterance.volume = speechSettings.volume;
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    const wordsPerMinute = speechSettings.rate * 150;
    const millisecondsPerWord = (60 * 1000) / wordsPerMinute;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setCurrentWordIndex(0);
      
      let wordIndex = 0;
      const interval = setInterval(() => {
        setCurrentWordIndex(wordIndex);
        wordIndex++;
        
        if (wordIndex >= wordArray.length) {
          clearInterval(interval);
          highlightIntervalRef.current = null;
        }
      }, millisecondsPerWord);
      
      highlightIntervalRef.current = interval;
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentWordIndex(-1);
      if (highlightIntervalRef.current) {
        clearInterval(highlightIntervalRef.current);
        highlightIntervalRef.current = null;
      }
    };

    utterance.onpause = () => {
      setIsPaused(true);
      if (highlightIntervalRef.current) {
        clearInterval(highlightIntervalRef.current);
        highlightIntervalRef.current = null;
      }
    };

    utterance.onresume = () => {
      setIsPaused(false);
      if (currentWordIndex >= 0 && currentWordIndex < words.length) {
        let wordIndex = currentWordIndex;
        const interval = setInterval(() => {
          setCurrentWordIndex(wordIndex);
          wordIndex++;
          
          if (wordIndex >= words.length) {
            clearInterval(interval);
            highlightIntervalRef.current = null;
          }
        }, millisecondsPerWord);
        
        highlightIntervalRef.current = interval;
      }
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeech = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    if (highlightIntervalRef.current) {
      clearInterval(highlightIntervalRef.current);
      highlightIntervalRef.current = null;
    }
  };

  const resumeSpeech = () => {
    window.speechSynthesis.resume();
    setIsPaused(false);
    if (currentWordIndex >= 0 && currentWordIndex < words.length) {
      const wordsPerMinute = speechSettings.rate * 150;
      const millisecondsPerWord = (60 * 1000) / wordsPerMinute;
      
      let wordIndex = currentWordIndex;
      const interval = setInterval(() => {
        setCurrentWordIndex(wordIndex);
        wordIndex++;
        
        if (wordIndex >= words.length) {
          clearInterval(interval);
          highlightIntervalRef.current = null;
        }
      }, millisecondsPerWord);
      
      highlightIntervalRef.current = interval;
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentWordIndex(-1);
    if (highlightIntervalRef.current) {
      clearInterval(highlightIntervalRef.current);
      highlightIntervalRef.current = null;
    }
  };

  const testVoice = () => {
    if (selectedVoice) {
      const testText = `This is a test of the ${selectedVoice.name} voice.`;
      speakText(testText);
    }
  };

  return {
    isPlaying,
    isPaused,
    availableVoices,
    selectedVoice,
    setSelectedVoice,
    currentWordIndex,
    words,
    currentText,
    speechSettings,
    setSpeechSettings,
    speakText,
    pauseSpeech,
    resumeSpeech,
    stopSpeech,
    testVoice
  };
};