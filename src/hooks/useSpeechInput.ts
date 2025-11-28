import { useState, useRef, useEffect, useCallback } from "react";

interface UseSpeechInputOptions {
  onTranscription: (text: string) => void;
  onEnd?: () => void;
}

export function useSpeechInput({ onTranscription, onEnd }: UseSpeechInputOptions) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onTranscriptionRef = useRef(onTranscription);
  const onEndRef = useRef(onEnd);

  // Keep refs updated
  useEffect(() => {
    onTranscriptionRef.current = onTranscription;
    onEndRef.current = onEnd;
  }, [onTranscription, onEnd]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        // Ignore errors when stopping
      }
    }
    setIsListening(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Check if browser supports Web Speech API
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn("Web Speech API is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // Can be changed to 'ar-SA' for Arabic

    recognition.onstart = () => {
      setIsListening(true);
      
      // Set a timeout to auto-stop after 10 seconds of silence
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        stopListening();
      }, 10000);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        }
      }

      // If we have a final transcript, process it
      if (finalTranscript.trim()) {
        onTranscriptionRef.current(finalTranscript.trim());
        stopListening();
        if (onEndRef.current) {
          // Small delay to ensure transcription is processed first
          setTimeout(() => {
            onEndRef.current?.();
          }, 100);
        }
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      // Handle specific errors
      if (event.error === 'no-speech') {
        // User didn't speak, silently stop
        stopListening();
      } else if (event.error === 'audio-capture') {
        alert("No microphone found. Please check your microphone settings.");
        stopListening();
      } else if (event.error === 'not-allowed') {
        alert("Microphone permission denied. Please allow microphone access and try again.");
        stopListening();
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    recognitionRef.current = recognition;

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors when stopping
        }
      }
    };
  }, [stopListening]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        setIsListening(false);
      }
    }
  }, [isListening]);

  return { isListening, startListening, stopListening };
}
